import { NextResponse } from "next/server";
import { getPayPalAccessToken, PAYPAL_BASE } from "@/app/lib/paypal";
import {
  isWebhookEventProcessed,
  recordWebhookEvent,
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

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

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
      webhook_event: parsedBody,
    }),
    cache: "no-store",
  });

  const verification = await verifyRes.json();
  if (verification.verification_status !== "SUCCESS") {
    console.error("[PayPal Webhook] Verification failed:", verification);
    return NextResponse.json({ error: "Webhook verification failed." }, { status: 400 });
  }

  const event = parsedBody as {
    id: string;
    event_type: string;
    resource: Record<string, unknown>;
  };

  // Use event.id as the idempotency key (PayPal events have their own unique ID)
  const eventId = event.id || transmissionId;

  // ── Idempotency: SELECT first ─────────────────────────────────────────────
  // Same pattern as Stripe: check before writing so that a failed DB write
  // + PayPal retry can succeed. recordWebhookEvent is called only after success.
  const alreadyProcessed = await isWebhookEventProcessed("paypal", eventId);
  if (alreadyProcessed) {
    console.log("[PayPal Webhook] Duplicate event, already processed:", eventId, event.event_type);
    return NextResponse.json({ received: true, duplicate: true });
  }

  // ── Event dispatch ────────────────────────────────────────────────────────
  let processingFailed = false;
  const resource = event.resource;

  try {
    switch (event.event_type) {

      // Secondary confirmation — the capture API route already wrote the paid status.
      // This update is idempotent and safe to re-apply.
      case "PAYMENT.CAPTURE.COMPLETED": {
        const captureId = resource?.id as string | undefined;
        if (captureId) {
          const { error } = await updateDonationByPaymentId("paypal", captureId, {
            payment_status: "paid",
            paid_at: new Date().toISOString(),
          });
          if (error) {
            console.error("[PayPal Webhook] DB write failed for CAPTURE.COMPLETED:", error);
            processingFailed = true;
          }
        }
        if (!processingFailed) {
          console.log("[PayPal Webhook] PAYMENT.CAPTURE.COMPLETED →", captureId);
        }
        break;
      }

      // Payment was denied — mark failed by capture ID and by order ID as fallback
      case "PAYMENT.CAPTURE.DENIED": {
        const captureId = resource?.id as string | undefined;
        const relatedOrderId = (
          resource?.supplementary_data as Record<string, Record<string, string>> | undefined
        )?.related_ids?.order_id;

        if (captureId) {
          const { error } = await updateDonationByPaymentId("paypal", captureId, {
            payment_status: "failed",
          });
          if (error) {
            console.error("[PayPal Webhook] DB write failed for CAPTURE.DENIED (captureId):", error);
            processingFailed = true;
          }
        }

        if (!processingFailed && relatedOrderId) {
          await updateDonationByCheckoutId("paypal", relatedOrderId, {
            payment_status: "failed",
          });
        }

        if (!processingFailed) {
          console.log("[PayPal Webhook] PAYMENT.CAPTURE.DENIED →", captureId);
        }
        break;
      }

      // Full refund issued
      case "PAYMENT.CAPTURE.REFUNDED": {
        const captureId = resource?.id as string | undefined;
        if (captureId) {
          const { error } = await updateDonationByPaymentId("paypal", captureId, {
            payment_status: "refunded",
            refunded_at: new Date().toISOString(),
          });
          if (error) {
            console.error("[PayPal Webhook] DB write failed for CAPTURE.REFUNDED:", error);
            processingFailed = true;
          }
        }
        if (!processingFailed) {
          console.log("[PayPal Webhook] PAYMENT.CAPTURE.REFUNDED →", captureId);
        }
        break;
      }

      // Order approved — before capture, informational only, no DB write needed
      case "CHECKOUT.ORDER.APPROVED": {
        console.log("[PayPal Webhook] CHECKOUT.ORDER.APPROVED →", resource?.id);
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("[PayPal Webhook] Unexpected handler error:", err);
    processingFailed = true;
  }

  // Return 500 if a DB write failed — PayPal will retry the event.
  // The SELECT idempotency check will not block the retry because we only
  // write to webhook_events after a successful donation DB write.
  if (processingFailed) {
    return NextResponse.json({ error: "DB write failed — will retry." }, { status: 500 });
  }

  // Record that this event was fully processed
  await recordWebhookEvent("paypal", eventId, event.event_type);

  return NextResponse.json({ received: true });
}
