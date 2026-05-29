import { NextResponse } from "next/server";
import { getPayPalAccessToken, PAYPAL_BASE, PAYPAL_SUPPORTED_CURRENCIES } from "@/app/lib/paypal";

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

  const { amount, currency, donorEmail, donorName, anonymous, message, phone } = body as {
    amount: number; currency: string; donorEmail: string;
    donorName?: string; anonymous?: boolean; message?: string; phone?: string;
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

  // PayPal requires exactly 2 decimal places for non-zero-decimal currencies
  // JPY is zero-decimal in PayPal — pass as integer string
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

  // Log intent — full record saved on capture
  console.log("[PANDIE PAYPAL ORDER CREATED]", {
    orderId: order.id,
    currency: orderCurrency,
    amount: valueStr,
    donorEmail: anonymous ? "anonymous" : donorEmail,
    donorName: anonymous ? "Anonymous" : (donorName || ""),
    message: (message || "").slice(0, 200),
    phone: (phone || "").slice(0, 50),
  });

  return NextResponse.json({ id: order.id });
}
