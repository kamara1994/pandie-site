import { NextResponse } from "next/server";
import { getPayPalAccessToken, PAYPAL_BASE } from "@/app/lib/paypal";

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

  const { orderId, donorName, donorEmail, amount, currency, frequency, anonymous, message } =
    body as {
      orderId: string; donorName?: string; donorEmail?: string;
      amount?: number; currency?: string; frequency?: string;
      anonymous?: boolean; message?: string;
    };

  if (!orderId || typeof orderId !== "string") {
    return NextResponse.json({ error: "Order ID required." }, { status: 400 });
  }

  let accessToken: string;
  try {
    accessToken = await getPayPalAccessToken();
  } catch (err) {
    console.error("[PayPal] Auth error:", err);
    return NextResponse.json({ error: "PayPal authentication failed." }, { status: 500 });
  }

  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=minimal",
    },
    cache: "no-store",
  });

  const capture = await res.json();

  if (!res.ok || capture.status !== "COMPLETED") {
    console.error("[PayPal Capture Error]", capture);
    return NextResponse.json(
      { error: capture?.message ?? "Payment capture failed. Please try again." },
      { status: 500 },
    );
  }

  const txnCapture = capture.purchase_units?.[0]?.payments?.captures?.[0];
  const transactionId: string = txnCapture?.id ?? orderId;
  const capturedAmount: string = txnCapture?.amount?.value ?? String(amount ?? 0);
  const capturedCurrency: string = txnCapture?.amount?.currency_code ?? (currency ?? "USD");

  const donationId = `pf_paypal_${orderId.slice(-12)}`;

  // Safe donation record — never stores card/wallet credentials
  const record = {
    id: donationId,
    provider: "paypal" as const,
    providerSessionId: orderId,
    providerTransactionId: transactionId,
    donorName: anonymous ? "Anonymous" : (donorName || ""),
    donorEmail: donorEmail || "",
    anonymous: Boolean(anonymous),
    amount: Number(capturedAmount),
    currency: capturedCurrency.toUpperCase(),
    frequency: (frequency as "one-time" | "monthly") || "one-time",
    status: "completed" as const,
    receiptStatus: "pending" as const,
    message: (message || "").slice(0, 500),
    createdAt: new Date().toISOString(),
  };

  // ── Replace the console.log below with your database write (Supabase, PlanetScale, etc.)
  console.log("[PANDIE PAYPAL DONATION RECORD — COMPLETED]", JSON.stringify(record, null, 2));

  return NextResponse.json({ success: true, transactionId, donationId });
}
