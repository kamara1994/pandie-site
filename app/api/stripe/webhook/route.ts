import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

// Zero-decimal currencies — amount_total is already in the display unit
const ZERO_DECIMAL = new Set([
  "BIF","CLP","DJF","GNF","JPY","KMF","KRW","MGA",
  "PYG","RWF","UGX","VND","VUV","XAF","XOF","XPF",
]);

function parseAmount(amountTotal: number | null, currency: string): number {
  if (!amountTotal) return 0;
  return ZERO_DECIMAL.has(currency.toUpperCase()) ? amountTotal : amountTotal / 100;
}

function safeDonationRecord(
  provider: "stripe",
  sessionId: string,
  transactionId: string | undefined,
  metadata: Record<string, string>,
  amountTotal: number | null,
  currency: string,
  status: "completed" | "failed" | "pending",
) {
  return {
    id: `pf_stripe_${sessionId.slice(-16)}`,
    provider,
    providerSessionId: sessionId,
    providerTransactionId: transactionId,
    donorName: metadata.donorName || "Anonymous",
    donorEmail: metadata.donorEmail || "",
    anonymous: metadata.anonymous === "true",
    amount: parseAmount(amountTotal, currency),
    currency: currency.toUpperCase(),
    frequency: (metadata.frequency as "one-time" | "monthly") || "one-time",
    status,
    receiptStatus: "pending" as const,
    message: metadata.message || "",
    createdAt: new Date().toISOString(),
  };
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = (session.metadata ?? {}) as Record<string, string>;
        const currency = session.currency ?? "usd";
        const txnId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : undefined;

        const record = safeDonationRecord(
          "stripe", session.id, txnId, meta,
          session.amount_total, currency, "completed",
        );
        // ── Replace the console.log below with your database write (Supabase, PlanetScale, etc.)
        console.log("[PANDIE DONATION RECORD — COMPLETED]", JSON.stringify(record, null, 2));
        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = (session.metadata ?? {}) as Record<string, string>;
        const record = safeDonationRecord(
          "stripe", session.id, undefined, meta,
          session.amount_total, session.currency ?? "usd", "failed",
        );
        console.log("[PANDIE DONATION RECORD — FAILED]", JSON.stringify(record, null, 2));
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as unknown as {
          id: string; amount_paid: number; currency: string;
          customer_email: string | null; subscription?: string; parent?: unknown;
        };
        console.log("[PANDIE RECURRING PAYMENT]", {
          invoiceId: invoice.id,
          subscriptionId: invoice.subscription,
          amountPaid: invoice.amount_paid,
          currency: invoice.currency,
          customerEmail: invoice.customer_email,
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as unknown as {
          id: string; customer_email: string | null; subscription?: string;
        };
        console.log("[PANDIE RECURRING PAYMENT FAILED]", {
          invoiceId: invoice.id,
          subscriptionId: invoice.subscription,
          customerEmail: invoice.customer_email,
        });
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        console.log("[PANDIE SUBSCRIPTION CANCELLED]", sub.id);
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
