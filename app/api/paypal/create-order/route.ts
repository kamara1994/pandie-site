import { NextResponse } from "next/server";
import { getPayPalAccessToken, PAYPAL_BASE, PAYPAL_SUPPORTED_CURRENCIES } from "@/app/lib/paypal";
import { upsertDonation } from "@/app/lib/supabase";
import { toMinorUnit } from "@/app/lib/currency";

export async function POST(request: Request) {
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

  // Fall back to USD for currencies PayPal doesn't support
  const curr = (typeof currency === "string" ? currency : "USD").toUpperCase();
  const orderCurrency = PAYPAL_SUPPORTED_CURRENCIES.has(curr) ? curr : "USD";

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
      { error: order?.message ?? "Failed to create PayPal order." },
      { status: 500 },
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
