-- ============================================================
-- PANDIE FOUNDATION - Donation Ledger Migration
-- Run once in Supabase Dashboard -> SQL Editor
-- Service role writes only - public access fully blocked via RLS
-- No API keys, passwords, or payment credentials in this file
-- Does not activate Stripe, PayPal, or live donations
-- ============================================================

-- Required for uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------
-- TABLE: donations
-- One row per Stripe Checkout Session or PayPal Order.
-- Monthly donations: one row per subscription, updated in place.
-- NEVER stores card numbers, CVV, or wallet tokens.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS donations (
  id                       UUID        NOT NULL DEFAULT uuid_generate_v4(),
  provider                 TEXT        NOT NULL,
  provider_checkout_id     TEXT        NOT NULL,
  provider_payment_id      TEXT,
  provider_customer_id     TEXT,
  provider_subscription_id TEXT,
  donor_name               TEXT        NOT NULL DEFAULT '',
  donor_email              TEXT        NOT NULL,
  phone                    TEXT,
  anonymous                BOOLEAN     NOT NULL DEFAULT FALSE,
  email_updates            BOOLEAN     NOT NULL DEFAULT FALSE,
  message                  TEXT,
  amount_minor             BIGINT      NOT NULL DEFAULT 0,
  currency                 TEXT        NOT NULL DEFAULT 'usd',
  frequency                TEXT        NOT NULL DEFAULT 'one_time',
  payment_status           TEXT        NOT NULL DEFAULT 'pending',
  receipt_status           TEXT        NOT NULL DEFAULT 'pending',
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at                  TIMESTAMPTZ,
  refunded_at              TIMESTAMPTZ,
  cancelled_at             TIMESTAMPTZ,
  CONSTRAINT donations_pkey PRIMARY KEY (id),
  CONSTRAINT donations_provider_checkout_unique UNIQUE (provider, provider_checkout_id),
  CONSTRAINT donations_provider_check CHECK (
    provider IN ('stripe', 'paypal')
  ),
  CONSTRAINT donations_frequency_check CHECK (
    frequency IN ('one_time', 'monthly')
  ),
  CONSTRAINT donations_payment_status_check CHECK (
    payment_status IN (
      'pending',
      'paid',
      'failed',
      'cancelled',
      'refunded',
      'partially_refunded',
      'subscription_active',
      'subscription_cancelled'
    )
  ),
  CONSTRAINT donations_receipt_status_check CHECK (
    receipt_status IN (
      'pending',
      'provider_sent',
      'not_available',
      'failed'
    )
  )
);

-- ------------------------------------------------------------
-- TABLE: webhook_events
-- Idempotency ledger. UNIQUE(provider, provider_event_id)
-- ensures each Stripe or PayPal event is processed exactly once
-- even when the provider retries delivery.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS webhook_events (
  id                UUID        NOT NULL DEFAULT uuid_generate_v4(),
  provider          TEXT        NOT NULL,
  provider_event_id TEXT        NOT NULL,
  event_type        TEXT        NOT NULL,
  processed_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processing_status TEXT        NOT NULL DEFAULT 'processed',
  error_message     TEXT,
  CONSTRAINT webhook_events_pkey PRIMARY KEY (id),
  CONSTRAINT webhook_events_unique UNIQUE (provider, provider_event_id),
  CONSTRAINT webhook_events_provider_check CHECK (
    provider IN ('stripe', 'paypal')
  ),
  CONSTRAINT webhook_events_status_check CHECK (
    processing_status IN ('processed', 'failed', 'ignored')
  )
);

-- ------------------------------------------------------------
-- FUNCTION + TRIGGER: auto-update donations.updated_at
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION pandie_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS donations_set_updated_at ON donations;

CREATE TRIGGER donations_set_updated_at
  BEFORE UPDATE ON donations
  FOR EACH ROW EXECUTE FUNCTION pandie_set_updated_at();

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- The service role bypasses RLS automatically and is the only
-- role that can read or write these tables.
-- The anon role (unauthenticated) and authenticated role
-- (logged-in users) are fully blocked on both tables.
-- ------------------------------------------------------------
ALTER TABLE donations      ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "deny_public_donations"      ON donations;
DROP POLICY IF EXISTS "deny_public_webhook_events" ON webhook_events;

CREATE POLICY "deny_public_donations"
  ON donations
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "deny_public_webhook_events"
  ON webhook_events
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- ------------------------------------------------------------
-- INDEXES
-- ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_donations_provider_checkout
  ON donations (provider, provider_checkout_id);

CREATE INDEX IF NOT EXISTS idx_donations_provider_payment
  ON donations (provider, provider_payment_id)
  WHERE provider_payment_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_donations_subscription
  ON donations (provider_subscription_id)
  WHERE provider_subscription_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_donations_email
  ON donations (donor_email);

CREATE INDEX IF NOT EXISTS idx_donations_status
  ON donations (payment_status);

CREATE INDEX IF NOT EXISTS idx_webhook_events_lookup
  ON webhook_events (provider, provider_event_id);
