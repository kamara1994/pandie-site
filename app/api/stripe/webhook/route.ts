import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  checkAndRecordWebhookEvent,
  upsertDonation,
  updateDonationByCheckoutId,
  updateDonationBySubscriptionId,
  updateDonationByPaymentId,
} from "@/app/lib/supabase";

export const dynamic = "force-dynamic";

// Zero-decimal currencies — amount_total is already the display unit
const ZERO_DECIMAL = new Set([
  "BIF","CLP","DJF","GNF","JPY","KMF","KRW","MGA",
  "PYG","RWF","UGX","VND","VUV","XAF","XOF","XPF",
]);

function parseAmount(amountTotal: number | null, currency: string): number {
  if (!amountTotal) return 0;
  return ZERO_DECIMAL.has(currency.toUpperCase()) ? amountTotal : amountTotal / 100;
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Must read raw body before any JSON parsing for HMAC verification
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

  // ── Idempotency check ──────────────────────────────────────────────────────
  // Stripe may retry events. The webhook_events table UNIQUE(provider, provider_event_id)
  // guarantees each event is processed at most once at the database level.
  const { duplicate, error: idempotencyErr } = await checkAndRecordWebhookEvent(
    "stripe",
    event.id,
    event.type,
  );

  if (duplicate) {
    console.log("[Stripe Webhook] Duplicate event ignored:", event.id, event.type);
    return NextResponse.json({ received: true, duplicate: true });
  }

  if (idempotencyErr) {
    console.error("[Stripe Webhook] Idempotency DB error (processing anyway):", idempotencyErr);
  }

  // ── Event dispatch ─────────────────────────────────────────────────────────
  try {
    switch (event.type) {

      // ── One-time payment OR first monthly payment completed ────────────────
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = (session.metadata ?? {}) as Record<string, string>;
        const currency = (session.currency ?? "usd").toUpperCase();
        const txnId =
          typeof session.payment_intent === "string" ? session.payment_intent : null;
        const subscriptionId =
          typeof session.subscription === "string" ? session.subscription : null;

        const isMonthly = meta.frequency === "monthly" || Boolean(subscriptionId);
        const paymentStatus = isMonthly ? "subscription_active" : "paid";
        const paidAt = new Date().toISOString();

        // Upsert: creates the record if the pending insert failed, or updates existing
        await upsertDonation({
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
          payment_status: paymentStatus,
          receipt_status: "pending",
          paid_at: paidAt,
        });

        console.log("[Stripe Webhook] checkout.session.completed →", paymentStatus, session.id);
        break;
      }

      // ── Async payment failed (e.g. bank debit declined after redirect) ─────
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = (session.metadata ?? {}) as Record<string, string>;

        await upsertDonation({
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

        console.log("[Stripe Webhook] async_payment_failed →", session.id);
        break;
      }

      // ── Recurring invoice paid ─────────────────────────────────────────────
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as unknown as {
          id: string;
          amount_paid: number;
          currency: string;
          customer_email: string | null;
          subscription?: string;
        };

        if (invoice.subscription) {
          await updateDonationBySubscriptionId(invoice.subscription, {
            payment_status: "subscription_active",
            paid_at: new Date().toISOString(),
          });
        }

        console.log("[Stripe Webhook] invoice.payment_succeeded →", invoice.id);
        break;
      }

      // ── Recurring invoice failed ───────────────────────────────────────────
      case "invoice.payment_failed": {
        const invoice = event.data.object as unknown as {
          id: string;
          customer_email: string | null;
          subscription?: string;
        };

        // Stripe may retry the invoice. Status remains subscription_active
        // unless the subscription itself is deleted (handled below).
        // Log only — do not flip subscription to failed on first failed invoice.
        console.log("[Stripe Webhook] invoice.payment_failed →", invoice.id, {
          subscriptionId: invoice.subscription,
          customerEmail: invoice.customer_email,
        });
        break;
      }

      // ── Subscription cancelled (by owner, by customer, or after max retries) ──
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        await updateDonationBySubscriptionId(sub.id, {
          payment_status: "subscription_cancelled",
          cancelled_at: new Date().toISOString(),
        });

        console.log("[Stripe Webhook] subscription.deleted →", sub.id);
        break;
      }

      // ── Full or partial refund ─────────────────────────────────────────────
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId =
          typeof charge.payment_intent === "string" ? charge.payment_intent : null;

        if (paymentIntentId) {
          const isFullRefund = charge.amount_refunded >= charge.amount;
          await updateDonationByPaymentId("stripe", paymentIntentId, {
            payment_status: isFullRefund ? "refunded" : "partially_refunded",
            refunded_at: new Date().toISOString(),
          });
        }

        console.log("[Stripe Webhook] charge.refunded →", {
          chargeId: charge.id,
          paymentIntentId,
          amountRefunded: charge.amount_refunded,
          currency: charge.currency,
        });
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("[Stripe Webhook] Handler error:", err);
    return NextResponse.json({ error: "Webhook handler error." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
