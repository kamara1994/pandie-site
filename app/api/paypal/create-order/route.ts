import { NextResponse } from "next/server";
import { getPayPalAccessToken, PAYPAL_BASE, PAYPAL_SUPPORTED_CURRENCIES } from "@/app/lib/paypal";
import { upsertDonation } from "@/app/lib/supabase";
import { toMinorUnit } from "@/app/lib/currency";
import { guard } from "@/app/lib/apiGuard";

export async function POST(request: Request) {
  // Origin check + 16KB cap + 15 order attempts/min per IP.
  const blocked = guard(request, { bucket: "paypal-order", limit: 15, windowMs: 60_000, maxBytes: 16 * 1024 });
  if (blocked) return blocked;

  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    return NextResponse.json({ error: "PayPal not configured." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { amount, currency, donorEmail, donorName, anonymous, message, phone, emailUpdates } =
    body as {
      amount: number; currency: string; donorEmail: string;
      donorName?: string; anonymous?: boolean; message?: string;
      phone?: string; emailUpdates?: boolean;
    };

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
  }
  if (!donorEmail || !donorEmail.includes("@")) {
    return NextResponse.json({ error: "Valid email required for donation receipt." }, { status: 400 });
  }

  // Reject unsupported currencies instead of silently charging the same numeric
  // value in USD (e.g. 5000 JPY must not become 5000 USD).
  const curr = (typeof currency === "string" ? currency : "USD").toUpperCase();
  if (!PAYPAL_SUPPORTED_CURRENCIES.has(curr)) {
    return NextResponse.json(
      { error: `${curr} is not supported by PayPal. Please choose USD or another supported currency, or pay by card.` },
      { status: 400 },
    );
  }
  const orderCurrency = curr;

  // PayPal requires exactly 2 decimal places; JPY-like currencies use integers
  const JPY_LIKE = new Set(["JPY", "TWD", "HUF"]);
  const valueStr = JPY_LIKE.has(orderCurrency)
    ? String(Math.round(amount))
    : amount.toFixed(2);

  let accessToken: string;
  try {
    accessToken = await getPayPalAccessToken();
  } catch (err) {
    console.error("[PayPal] Auth error:", err);
    return NextResponse.json({ error: "PayPal authentication failed." }, { status: 500 });
  }

  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: orderCurrency, value: valueStr },
          description: "Donation — Pandie Foundation",
          custom_id: `${anonymous ? "anon" : donorEmail.slice(0, 20)}_${Date.now()}`,
          soft_descriptor: "PANDIE FDN",
        },
      ],
      application_context: {
        brand_name: "Pandie Foundation",
        user_action: "PAY_NOW",
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/donate/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/donate/cancel`,
      },
    }),
    cache: "no-store",
  });

  const order = await res.json();

  if (!res.ok) {
    console.error("[PayPal Create Order Error]", order);
    return NextResponse.json(
      { error: "We couldn't start your PayPal donation right now. Please try again." },
      { status: 502 },
    );
  }

  // Create pending donation record — will be updated to "paid" on capture
  const safeDonorName = anonymous ? "Anonymous" : String(donorName || "").slice(0, 500);

  await upsertDonation({
    provider: "paypal",
    provider_checkout_id: order.id,
    donor_name: safeDonorName,
    donor_email: donorEmail,
    phone: phone?.trim() || null,
    anonymous: Boolean(anonymous),
    email_updates: Boolean(emailUpdates),
    message: message?.trim() || null,
    amount_minor: toMinorUnit(amount, orderCurrency),
    currency: orderCurrency.toLowerCase(),
    frequency: "one_time",              // PayPal monthly requires pre-created subscription plans
    payment_status: "pending",
    receipt_status: "pending",
  });

  return NextResponse.json({ id: order.id });
}
