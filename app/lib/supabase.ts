// SERVER-SIDE ONLY — never import this in "use client" components.
// SUPABASE_SERVICE_ROLE_KEY is never prefixed NEXT_PUBLIC_ and is never browser-accessible.
// The service role bypasses Row Level Security, giving full table access.

import { createClient } from "@supabase/supabase-js";

// ── Row types ────────────────────────────────────────────────────────────────
// Defined here to enforce shape at call sites without requiring `supabase gen types`.

export type DonationStatus =
  | "pending" | "paid" | "failed" | "cancelled"
  | "refunded" | "partially_refunded"
  | "subscription_active" | "subscription_cancelled";

export type ReceiptStatus = "pending" | "provider_sent" | "not_available" | "failed";
export type DonationFrequency = "one_time" | "monthly";
export type Provider = "stripe" | "paypal";
export type WebhookProcessingStatus = "processed" | "failed" | "ignored";

export interface DonationInsert {
  provider: Provider;
  provider_checkout_id: string;
  provider_payment_id?: string | null;
  provider_customer_id?: string | null;
  provider_subscription_id?: string | null;
  donor_name: string;
  donor_email: string;
  phone?: string | null;
  anonymous: boolean;
  email_updates: boolean;
  message?: string | null;
  amount_minor: number;
  currency: string;
  frequency: DonationFrequency;
  payment_status?: DonationStatus;
  receipt_status?: ReceiptStatus;
  paid_at?: string | null;
  refunded_at?: string | null;
  cancelled_at?: string | null;
}

export interface WebhookEventInsert {
  provider: Provider;
  provider_event_id: string;
  event_type: string;
  processing_status?: WebhookProcessingStatus;
  error_message?: string | null;
}

// ── Client singleton ─────────────────────────────────────────────────────────
// Returns null when Supabase is not configured (no env vars).
// All callers must guard: const db = getDb(); if (!db) { ... }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = ReturnType<typeof createClient<any>>;
let _client: AnyClient | null = null;

export function getDb(): AnyClient | null {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // Supabase not yet configured — donation records fall back to console.log
    return null;
  }

  // createClient<any> gives an untyped client; our interfaces enforce shape above
  _client = createClient<any>(url, key, { // eslint-disable-line @typescript-eslint/no-explicit-any
    auth: { autoRefreshToken: false, persistSession: false },
  });

  return _client;
}

// ── DB helper: idempotency check (SELECT only) ───────────────────────────────
// Returns true if this event was already successfully processed.
// Call this BEFORE writing to donations. If true, return 200 immediately.
// The provider can safely retry events we have not yet fully recorded.
export async function isWebhookEventProcessed(
  provider: Provider,
  providerEventId: string,
): Promise<boolean> {
  const db = getDb();
  if (!db) return false; // No DB — process every event (development fallback)

  const { data } = await db
    .from("webhook_events")
    .select("id")
    .eq("provider", provider)
    .eq("provider_event_id", providerEventId)
    .maybeSingle();

  return Boolean(data);
}

// ── DB helper: record successfully processed event (INSERT) ───────────────────
// Call this AFTER donations have been written successfully.
// If the INSERT fails because the row already exists (race condition between two
// simultaneous retries), that is safe to ignore — the donation write is idempotent.
export async function recordWebhookEvent(
  provider: Provider,
  providerEventId: string,
  eventType: string,
): Promise<void> {
  const db = getDb();
  if (!db) return;

  const row: WebhookEventInsert = {
    provider,
    provider_event_id: providerEventId,
    event_type: eventType,
    processing_status: "processed",
  };

  const { error } = await db.from("webhook_events").insert(row);

  if (error && error.code !== "23505") {
    // Log but do not throw — the donation write already succeeded.
    // A missing webhook_events row means this event could be reprocessed,
    // but upsertDonation is idempotent so that is safe.
    console.error(`[DB] recordWebhookEvent failed (${provider}/${eventType}):`, error.message);
  }
}

// ── DB helper: upsert donation ────────────────────────────────────────────────
// Creates a new donation or updates an existing one matched by (provider, provider_checkout_id).
export async function upsertDonation(data: DonationInsert): Promise<{ error: string | null }> {
  const db = getDb();
  if (!db) {
    // No database configured — log the safe record as fallback
    console.log("[DB FALLBACK — Supabase not configured] Donation record:", JSON.stringify(data));
    return { error: null };
  }

  const { error } = await db
    .from("donations")
    .upsert(data, { onConflict: "provider,provider_checkout_id" });

  if (error) {
    console.error("[DB] upsertDonation error:", error.message);
    return { error: error.message };
  }

  return { error: null };
}

// ── DB helper: update by checkout ID ─────────────────────────────────────────
export async function updateDonationByCheckoutId(
  provider: Provider,
  providerCheckoutId: string,
  updates: Partial<Pick<DonationInsert,
    "payment_status" | "receipt_status" | "provider_payment_id" |
    "provider_subscription_id" | "paid_at" | "refunded_at" | "cancelled_at">>,
): Promise<{ error: string | null }> {
  const db = getDb();
  if (!db) return { error: null };

  const { error } = await db
    .from("donations")
    .update(updates)
    .eq("provider", provider)
    .eq("provider_checkout_id", providerCheckoutId);

  if (error) {
    console.error("[DB] updateDonationByCheckoutId error:", error.message);
    return { error: error.message };
  }

  return { error: null };
}

// ── DB helper: update by subscription ID ─────────────────────────────────────
export async function updateDonationBySubscriptionId(
  subscriptionId: string,
  updates: Partial<Pick<DonationInsert,
    "payment_status" | "receipt_status" | "paid_at" | "refunded_at" | "cancelled_at">>,
): Promise<{ error: string | null }> {
  const db = getDb();
  if (!db) return { error: null };

  const { error } = await db
    .from("donations")
    .update(updates)
    .eq("provider", "stripe")
    .eq("provider_subscription_id", subscriptionId);

  if (error) {
    console.error("[DB] updateDonationBySubscriptionId error:", error.message);
    return { error: error.message };
  }

  return { error: null };
}

// ── DB helper: update by payment / capture ID ─────────────────────────────────
export async function updateDonationByPaymentId(
  provider: Provider,
  providerPaymentId: string,
  updates: Partial<Pick<DonationInsert,
    "payment_status" | "receipt_status" | "paid_at" | "refunded_at" | "cancelled_at">>,
): Promise<{ error: string | null }> {
  const db = getDb();
  if (!db) return { error: null };

  const { error } = await db
    .from("donations")
    .update(updates)
    .eq("provider", provider)
    .eq("provider_payment_id", providerPaymentId);

  if (error) {
    console.error("[DB] updateDonationByPaymentId error:", error.message);
    return { error: error.message };
  }

  return { error: null };
}
