import { NextResponse } from "next/server";
import { getPayPalAccessToken, PAYPAL_BASE } from "@/app/lib/paypal";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (
    !process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
    !process.env.PAYPAL_CLIENT_SECRET ||
    !process.env.PAYPAL_WEBHOOK_ID
  ) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const rawBody = await request.text();

  const transmissionId = request.headers.get("paypal-transmission-id") ?? "";
  const transmissionTime = request.headers.get("paypal-transmission-time") ?? "";
  const certUrl = request.headers.get("paypal-cert-url") ?? "";
  const authAlgo = request.headers.get("paypal-auth-algo") ?? "";
  const transmissionSig = request.headers.get("paypal-transmission-sig") ?? "";

  // Verify webhook signature with PayPal
  let accessToken: string;
  try {
    accessToken = await getPayPalAccessToken();
  } catch (err) {
    console.error("[PayPal Webhook] Auth error:", err);
    return NextResponse.json({ error: "Auth error." }, { status: 500 });
  }

  const verifyRes = await fetch(`${PAYPAL_BASE}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      auth_algo: authAlgo,
      cert_url: certUrl,
      transmission_id: transmissionId,
      transmission_sig: transmissionSig,
      transmission_time: transmissionTime,
      webhook_id: process.env.PAYPAL_WEBHOOK_ID,
      webhook_event: JSON.parse(rawBody),
    }),
    cache: "no-store",
  });

  const verification = await verifyRes.json();
  if (verification.verification_status !== "SUCCESS") {
    console.error("[PayPal Webhook] Verification failed:", verification);
    return NextResponse.json({ error: "Webhook verification failed." }, { status: 400 });
  }

  const event = JSON.parse(rawBody) as { event_type: string; resource: Record<string, unknown> };

  switch (event.event_type) {
    case "PAYMENT.CAPTURE.COMPLETED":
      console.log("[PANDIE PAYPAL WEBHOOK] Payment capture completed:", event.resource?.id);
      break;
    case "PAYMENT.CAPTURE.DENIED":
      console.log("[PANDIE PAYPAL WEBHOOK] Payment capture denied:", event.resource?.id);
      break;
    case "PAYMENT.CAPTURE.REFUNDED":
      console.log("[PANDIE PAYPAL WEBHOOK] Payment refunded:", event.resource?.id);
      break;
    case "CHECKOUT.ORDER.APPROVED":
      console.log("[PANDIE PAYPAL WEBHOOK] Order approved:", event.resource?.id);
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
