import { NextResponse } from "next/server";
import { getPayPalAccessToken, PAYPAL_BASE } from "@/app/lib/paypal";
import { upsertDonation } from "@/app/lib/supabase";
import { toMinorUnit } from "@/app/lib/currency";
import { guard } from "@/app/lib/apiGuard";
import { DONATIONS_LIVE } from "@/app/lib/flags";

export async function POST(request: Request) {
  if (!DONATIONS_LIVE) {
    return NextResponse.json({ error: "Online donations are coming soon. Thank you for your patience." }, { status: 503 });
  }

  // Origin check + 16KB cap + 20 capture attempts/min per IP.
  const blocked = guard(request, { bucket: "paypal-capture", limit: 20, windowMs: 60_000, maxBytes: 16 * 1024 });
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

  const {
    orderId, donorName, donorEmail, amount, currency,
    anonymous, message, phone, emailUpdates,
  } = body as {
    orderId: string; donorName?: string; donorEmail?: string;
    amount?: number; currency?: string;
    anonymous?: boolean; message?: string; phone?: string; emailUpdates?: boolean;
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

  // Server-side capture — the authoritative payment confirmation.
  // return=representation is required: the minimal response omits purchase_units,
  // which would force the amount fallback below onto client-supplied values.
  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=representation",
    },
    cache: "no-store",
  });

  let capture: Record<string, unknown> & {
    status?: string;
    purchase_units?: Array<{ payments?: { captures?: Array<{ id?: string; amount?: { value?: string; currency_code?: string } }> } }>;
  };
  try {
    capture = await res.json();
  } catch {
    console.error("[PayPal Capture Error] Non-JSON response, status:", res.status);
    return NextResponse.json(
      { error: "Payment capture failed. Please try again." },
      { status: 502 },
    );
  }

  if (!res.ok || capture.status !== "COMPLETED") {
    console.error("[PayPal Capture Error]", capture);
    return NextResponse.json(
      { error: "Payment capture failed. Please try again." },
      { status: 502 },
    );
  }

  // Extract verified amounts from PayPal's capture response
  const txnCapture = capture.purchase_units?.[0]?.payments?.captures?.[0];
  if (!txnCapture?.amount?.value) {
    // Should not happen with return=representation — if it does, the DB row
    // below is recording the client-claimed amount, not PayPal's verified one.
    console.error("[PayPal Capture] Missing verified amount in response for order:", orderId);
  }
  const transactionId: string = txnCapture?.id ?? orderId;
  const capturedAmount: string = txnCapture?.amount?.value ?? String(amount ?? 0);
  const capturedCurrency: string =
    (txnCapture?.amount?.currency_code ?? currency ?? "USD").toUpperCase();

  const safeDonorName = anonymous ? "Anonymous" : String(donorName || "").slice(0, 500);
  const donationId = `pf_paypal_${orderId.slice(-12)}`;
  const paidAt = new Date().toISOString();

  // Upsert: updates the pending record created in create-order, or creates a new one
  // if create-order's DB insert failed. Capture is server-verified — safe to mark paid.
  await upsertDonation({
    provider: "paypal",
    provider_checkout_id: orderId,
    provider_payment_id: transactionId,
    donor_name: safeDonorName,
    donor_email: donorEmail || "",
    phone: phone?.trim() || null,
    anonymous: Boolean(anonymous),
    email_updates: Boolean(emailUpdates),
    message: message?.trim() || null,
    amount_minor: toMinorUnit(capturedAmount, capturedCurrency),
    currency: capturedCurrency.toLowerCase(),
    frequency: "one_time",
    payment_status: "paid",
    receipt_status: "pending",
    paid_at: paidAt,
  });

  // Log non-identifying references only — no donor PII in server logs.
  console.log("[PANDIE PAYPAL CAPTURED]", {
    orderId,
    transactionId,
    capturedAmount,
    capturedCurrency,
    paidAt,
  });

  return NextResponse.json({ success: true, transactionId, donationId });
}
