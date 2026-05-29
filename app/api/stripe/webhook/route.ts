import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  isWebhookEventProcessed,
  recordWebhookEvent,
  upsertDonation,
  updateDonationBySubscriptionId,
  updateDonationByPaymentId,
} from "@/app/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Raw body must be read before any other parsing — required for HMAC verification
  const rawBody = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Webhook signature invalid." }, { status: 400 });
  }

  // ── Idempotency: SELECT first ─────────────────────────────────────────────
  // We check before writing so that a failed donation write + Stripe retry can
  // succeed. INSERT-first idempotency would block the retry after a partial failure.
  const alreadyProcessed = await isWebhookEventProcessed("stripe", event.id);
  if (alreadyProcessed) {
    console.log("[Stripe Webhook] Duplicate event, already processed:", event.id, event.type);
    return NextResponse.json({ received: true, duplicate: true });
  }

  // ── Event dispatch ────────────────────────────────────────────────────────
  // processingFailed = true causes a 500 return so Stripe will retry the event.
  // recordWebhookEvent is only called on success, keeping the idempotency record
  // absent until we are sure the donation was written.
  let processingFailed = false;

  try {
    switch (event.type) {

      // One-time payment OR first subscription payment completed
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = (session.metadata ?? {}) as Record<string, string>;
        const currency = (session.currency ?? "usd").toUpperCase();
        const txnId =
          typeof session.payment_intent === "string" ? session.payment_intent : null;
        const subscriptionId =
          typeof session.subscription === "string" ? session.subscription : null;

        const isMonthly = meta.frequency === "monthly" || Boolean(subscriptionId);

        const { error } = await upsertDonation({
          provider: "stripe",
          provider_checkout_id: session.id,
          provider_payment_id: txnId,
          provider_customer_id:
            typeof session.customer === "string" ? session.customer : null,
          provider_subscription_id: subscriptionId,
          donor_name: meta.donorName || "Anonymous",
          donor_email: session.customer_email ?? meta.donorEmail ?? "",
          phone: meta.phone || null,
          anonymous: meta.anonymous === "true",
          email_updates: meta.emailUpdates === "true",
          message: meta.message || null,
          amount_minor: session.amount_total ?? 0,
          currency: currency.toLowerCase(),
          frequency: isMonthly ? "monthly" : "one_time",
          payment_status: isMonthly ? "subscription_active" : "paid",
          receipt_status: "pending",
          paid_at: new Date().toISOString(),
        });

        if (error) {
          console.error("[Stripe Webhook] DB write failed for checkout.session.completed:", error);
          processingFailed = true;
        } else {
          console.log(
            "[Stripe Webhook] checkout.session.completed →",
            isMonthly ? "subscription_active" : "paid",
            session.id,
          );
        }
        break;
      }

      // Async payment method declined after the user was redirected to success
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = (session.metadata ?? {}) as Record<string, string>;

        const { error } = await upsertDonation({
          provider: "stripe",
          provider_checkout_id: session.id,
          donor_name: meta.donorName || "Anonymous",
          donor_email: session.customer_email ?? meta.donorEmail ?? "",
          phone: meta.phone || null,
          anonymous: meta.anonymous === "true",
          email_updates: meta.emailUpdates === "true",
          message: meta.message || null,
          amount_minor: session.amount_total ?? 0,
          currency: (session.currency ?? "usd").toLowerCase(),
          frequency: meta.frequency === "monthly" ? "monthly" : "one_time",
          payment_status: "failed",
          receipt_status: "not_available",
        });

        if (error) {
          console.error("[Stripe Webhook] DB write failed for async_payment_failed:", error);
          processingFailed = true;
        } else {
          console.log("[Stripe Webhook] async_payment_failed →", session.id);
        }
        break;
      }

      // Recurring monthly invoice paid
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as unknown as {
          id: string;
          amount_paid: number;
          currency: string;
          customer_email: string | null;
          subscription?: string;
        };

        if (invoice.subscription) {
          const { error } = await updateDonationBySubscriptionId(invoice.subscription, {
            payment_status: "subscription_active",
            paid_at: new Date().toISOString(),
          });
          if (error) {
            console.error("[Stripe Webhook] DB write failed for invoice.payment_succeeded:", error);
            processingFailed = true;
          }
        }

        if (!processingFailed) {
          console.log("[Stripe Webhook] invoice.payment_succeeded →", invoice.id);
        }
        break;
      }

      // Recurring invoice failed — Stripe may retry; subscription stays active until deleted
      case "invoice.payment_failed": {
        const invoice = event.data.object as unknown as {
          id: string;
          customer_email: string | null;
          subscription?: string;
        };
        console.log("[Stripe Webhook] invoice.payment_failed (Stripe will retry) →", invoice.id, {
          subscriptionId: invoice.subscription,
          customerEmail: invoice.customer_email,
        });
        break;
      }

      // Subscription cancelled — by donor, by owner, or after exhausting retries
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        const { error } = await updateDonationBySubscriptionId(sub.id, {
          payment_status: "subscription_cancelled",
          cancelled_at: new Date().toISOString(),
        });

        if (error) {
          console.error("[Stripe Webhook] DB write failed for subscription.deleted:", error);
          processingFailed = true;
        } else {
          console.log("[Stripe Webhook] subscription.deleted →", sub.id);
        }
        break;
      }

      // Full or partial refund
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId =
          typeof charge.payment_intent === "string" ? charge.payment_intent : null;

        if (paymentIntentId) {
          const isFullRefund = charge.amount_refunded >= charge.amount;
          const { error } = await updateDonationByPaymentId("stripe", paymentIntentId, {
            payment_status: isFullRefund ? "refunded" : "partially_refunded",
            refunded_at: new Date().toISOString(),
          });

          if (error) {
            console.error("[Stripe Webhook] DB write failed for charge.refunded:", error);
            processingFailed = true;
          }
        }

        if (!processingFailed) {
          console.log("[Stripe Webhook] charge.refunded →", charge.id, {
            paymentIntentId,
            amountRefunded: charge.amount_refunded,
          });
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("[Stripe Webhook] Unexpected handler error:", err);
    processingFailed = true;
  }

  // Return 500 if the donation write failed — Stripe will retry the event.
  // The SELECT idempotency check at the top will not block the retry because
  // we only write to webhook_events AFTER a successful donation write.
  if (processingFailed) {
    return NextResponse.json({ error: "DB write failed — will retry." }, { status: 500 });
  }

  // Record that this event was fully processed — blocks future duplicate processing
  await recordWebhookEvent("stripe", event.id, event.type);

  return NextResponse.json({ received: true });
}
