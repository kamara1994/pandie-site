import { NextResponse } from "next/server";
import { getPayPalAccessToken, PAYPAL_BASE } from "@/app/lib/paypal";
import {
  checkAndRecordWebhookEvent,
  updateDonationByPaymentId,
  updateDonationByCheckoutId,
} from "@/app/lib/supabase";

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

  // ── Verify webhook signature with PayPal ───────────────────────────────────
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

  const event = JSON.parse(rawBody) as {
    id: string;
    event_type: string;
    resource: Record<string, unknown>;
  };

  // ── Idempotency check ──────────────────────────────────────────────────────
  // PayPal may retry events. webhook_events UNIQUE(provider, provider_event_id)
  // prevents duplicate processing at the database level.
  const { duplicate } = await checkAndRecordWebhookEvent(
    "paypal",
    event.id || transmissionId,  // PayPal events have their own `id`
    event.event_type,
  );

  if (duplicate) {
    console.log("[PayPal Webhook] Duplicate event ignored:", event.id, event.event_type);
    return NextResponse.json({ received: true, duplicate: true });
  }

  // ── Event dispatch ─────────────────────────────────────────────────────────
  const resource = event.resource;

  switch (event.event_type) {

    // ── Capture completed (secondary confirmation — capture route already marked paid) ─
    case "PAYMENT.CAPTURE.COMPLETED": {
      const captureId = resource?.id as string | undefined;
      // Idempotent update: only updates if payment is still "pending"
      // (capture route usually beats the webhook here, so this is often a no-op)
      if (captureId) {
        await updateDonationByPaymentId("paypal", captureId, {
          payment_status: "paid",
          paid_at: new Date().toISOString(),
        });
      }
      console.log("[PayPal Webhook] PAYMENT.CAPTURE.COMPLETED →", captureId);
      break;
    }

    // ── Capture denied ────────────────────────────────────────────────────────
    case "PAYMENT.CAPTURE.DENIED": {
      const captureId = resource?.id as string | undefined;
      if (captureId) {
        await updateDonationByPaymentId("paypal", captureId, {
          payment_status: "failed",
        });
      }
      // Also try to find by order ID if capture ID not in provider_payment_id
      const relatedOrderId = (
        resource?.supplementary_data as Record<string, Record<string, string>> | undefined
      )?.related_ids?.order_id;
      if (relatedOrderId) {
        await updateDonationByCheckoutId("paypal", relatedOrderId, {
          payment_status: "failed",
        });
      }
      console.log("[PayPal Webhook] PAYMENT.CAPTURE.DENIED →", captureId);
      break;
    }

    // ── Refund ────────────────────────────────────────────────────────────────
    case "PAYMENT.CAPTURE.REFUNDED": {
      const captureId = resource?.id as string | undefined;
      if (captureId) {
        await updateDonationByPaymentId("paypal", captureId, {
          payment_status: "refunded",
          refunded_at: new Date().toISOString(),
        });
      }
      console.log("[PayPal Webhook] PAYMENT.CAPTURE.REFUNDED →", captureId);
      break;
    }

    // ── Order approved (before capture — informational only) ─────────────────
    case "CHECKOUT.ORDER.APPROVED": {
      console.log("[PayPal Webhook] CHECKOUT.ORDER.APPROVED →", resource?.id);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
