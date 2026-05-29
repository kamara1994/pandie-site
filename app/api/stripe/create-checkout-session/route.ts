import { NextResponse } from "next/server";
import Stripe from "stripe";
import { upsertDonation } from "@/app/lib/supabase";

// Currencies that use the smallest unit directly (no ×100)
const ZERO_DECIMAL = new Set([
  "BIF","CLP","DJF","GNF","JPY","KMF","KRW","MGA",
  "PYG","RWF","UGX","VND","VUV","XAF","XOF","XPF",
]);

// Stripe-supported currencies from our full list (SLE not yet supported by Stripe)
const STRIPE_SUPPORTED = new Set([
  "USD","EUR","GBP","CAD","AUD","NZD","CHF","SEK","NOK","DKK",
  "PLN","TRY","SGD","HKD","JPY","CNY","THB","INR","AED","SAR",
  "NGN","GHS","ZAR","KES",
]);

// Stripe minimum charge in smallest currency unit
const STRIPE_MINIMUMS: Record<string, number> = {
  USD:50, EUR:50, GBP:30, CAD:50, AUD:50, NZD:50, CHF:50,
  SEK:300, NOK:300, DKK:250, PLN:200, TRY:1500, SGD:50,
  HKD:400, JPY:50, CNY:100, THB:2000, INR:5000, AED:200,
  SAR:100, GHS:200, NGN:10000, ZAR:1000, KES:1000,
};

function toStripeAmount(amount: number, currency: string): number {
  return ZERO_DECIMAL.has(currency) ? Math.round(amount) : Math.round(amount * 100);
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Secure payment processing is being configured. Please try again soon." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const {
    amount, currency, frequency, donorName, donorEmail,
    phone, message, anonymous, emailUpdates,
  } = body as {
    amount: number; currency: string; frequency: string;
    donorName: string; donorEmail: string; phone?: string;
    message?: string; anonymous?: boolean; emailUpdates?: boolean;
  };

  // Server-side validation — never trust client data
  if (!donorEmail || typeof donorEmail !== "string" || !donorEmail.includes("@")) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }
  if (!amount || typeof amount !== "number" || amount <= 0 || !isFinite(amount)) {
    return NextResponse.json({ error: "A valid donation amount is required." }, { status: 400 });
  }
  if (frequency !== "one-time" && frequency !== "monthly") {
    return NextResponse.json({ error: "Invalid donation frequency." }, { status: 400 });
  }

  const curr = (typeof currency === "string" ? currency : "USD").toUpperCase();
  if (!STRIPE_SUPPORTED.has(curr)) {
    return NextResponse.json(
      { error: `${curr} is not supported for card payment. Please select USD, EUR, GBP, or another supported currency, or use PayPal below.` },
      { status: 400 },
    );
  }

  const stripeAmount = toStripeAmount(amount, curr);
  const minimum = STRIPE_MINIMUMS[curr] ?? 50;
  if (stripeAmount < minimum) {
    const minDisplay = ZERO_DECIMAL.has(curr) ? minimum : minimum / 100;
    return NextResponse.json(
      { error: `Minimum donation for ${curr} is ${minDisplay}. Please increase your amount.` },
      { status: 400 },
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const safeDonorName = anonymous ? "Anonymous" : String(donorName || "").slice(0, 500);

  const metadata: Record<string, string> = {
    donorName: safeDonorName,
    donorEmail: String(donorEmail),
    anonymous: String(Boolean(anonymous)),
    emailUpdates: String(Boolean(emailUpdates)),
    message: String(message || "").slice(0, 500),
    phone: String(phone || "").slice(0, 50),
    frequency: String(frequency),
    currency: curr,
  };

  try {
    let session: Stripe.Checkout.Session;

    if (frequency === "one-time") {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: curr.toLowerCase(),
              product_data: {
                name: "Donation — Pandie Foundation",
                description:
                  "Supporting vulnerable children in Sierra Leone through education, nutrition, and medical care.",
              },
              unit_amount: stripeAmount,
            },
            quantity: 1,
          },
        ],
        customer_email: donorEmail,
        metadata,
        payment_intent_data: { metadata },
        success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/donate/cancel`,
      });
    } else {
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: curr.toLowerCase(),
              product_data: {
                name: "Monthly Donation — Pandie Foundation",
                description: "Monthly support for vulnerable children in Sierra Leone.",
              },
              unit_amount: stripeAmount,
              recurring: { interval: "month" },
            },
            quantity: 1,
          },
        ],
        customer_email: donorEmail,
        metadata,
        subscription_data: { metadata },
        success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/donate/cancel`,
      });
    }

    // Create pending donation record in the database.
    // Non-fatal: the webhook will upsert on checkout.session.completed even if this fails.
    await upsertDonation({
      provider: "stripe",
      provider_checkout_id: session.id,
      donor_name: safeDonorName,
      donor_email: donorEmail,
      phone: phone?.trim() || null,
      anonymous: Boolean(anonymous),
      email_updates: Boolean(emailUpdates),
      message: message?.trim() || null,
      amount_minor: stripeAmount,
      currency: curr.toLowerCase(),
      frequency: frequency === "monthly" ? "monthly" : "one_time",
      payment_status: "pending",
      receipt_status: "pending",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg =
      err instanceof Stripe.errors.StripeError
        ? err.message
        : "Failed to create checkout session.";
    console.error("[Stripe Checkout Error]", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
