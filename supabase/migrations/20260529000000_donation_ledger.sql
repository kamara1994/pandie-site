-- ============================================================
-- PANDIE FOUNDATION — Donation Ledger Migration
-- Run once in Supabase Dashboard → SQL Editor
-- Service role writes only — public access fully blocked via RLS
-- ============================================================

-- Extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- TABLE: donations
-- One row per checkout session (Stripe) or order (PayPal).
-- Monthly donations: one row per subscription, updated in-place.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS donations (
  id                       UUID        NOT NULL DEFAULT uuid_generate_v4(),
  provider                 TEXT        NOT NULL CHECK (provider IN ('stripe', 'paypal')),

  -- Provider identifiers
  provider_checkout_id     TEXT        NOT NULL,      -- Stripe cs_xxx or PayPal order ID
  provider_payment_id      TEXT,                      -- PaymentIntent ID or PayPal capture ID
  provider_customer_id     TEXT,                      -- Stripe customer ID (nullable)
  provider_subscription_id TEXT,                      -- Stripe subscription ID (monthly only)

  -- Donor information (never store card/wallet tokens here)
  donor_name               TEXT        NOT NULL DEFAULT '',
  donor_email              TEXT        NOT NULL,
  phone                    TEXT,
  anonymous                BOOLEAN     NOT NULL DEFAULT FALSE,
  email_updates            BOOLEAN     NOT NULL DEFAULT FALSE,
  message                  TEXT,

  -- Amount in smallest currency unit (cents for USD, yen for JPY, etc.)
  amount_minor             BIGINT      NOT NULL DEFAULT 0,
  currency                 TEXT        NOT NULL DEFAULT 'usd',

  frequency                TEXT        NOT NULL DEFAULT 'one_time'
                             CHECK (frequency IN ('one_time', 'monthly')),

  payment_status           TEXT        NOT NULL DEFAULT 'pending'
                             CHECK (payment_status IN (
                               'pending',
                               'paid',
                               'failed',
                               'cancelled',
                               'refunded',
                               'partially_refunded',
                               'subscription_active',
                               'subscription_cancelled'
                             )),

  receipt_status           TEXT        NOT NULL DEFAULT 'pending'
                             CHECK (receipt_status IN (
                               'pending',
                               'provider_sent',
                               'not_available',
                               'failed'
                             )),

  -- Timestamps
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at                  TIMESTAMPTZ,
  refunded_at              TIMESTAMPTZ,
  cancelled_at             TIMESTAMPTZ,

  CONSTRAINT donations_pkey PRIMARY KEY (id),

  -- Prevents duplicate records for the same checkout session/order
  CONSTRAINT donations_provider_checkout_unique UNIQUE (provider, provider_checkout_id)
);

-- ────────────────────────────────────────────────────────────
-- TABLE: webhook_events
-- Idempotency ledger — ensures each provider event is processed
-- exactly once even if the provider retries delivery.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS webhook_events (
  id                  UUID        NOT NULL DEFAULT uuid_generate_v4(),
  provider            TEXT        NOT NULL CHECK (provider IN ('stripe', 'paypal')),
  provider_event_id   TEXT        NOT NULL,
  event_type          TEXT        NOT NULL,
  processed_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processing_status   TEXT        NOT NULL DEFAULT 'processed'
                        CHECK (processing_status IN ('processed', 'failed', 'ignored')),
  error_message       TEXT,

  CONSTRAINT webhook_events_pkey PRIMARY KEY (id),

  -- Enforces at-most-once processing per event at the DB level
  CONSTRAINT webhook_events_unique UNIQUE (provider, provider_event_id)
);

-- ────────────────────────────────────────────────────────────
-- TRIGGER: auto-update updated_at on donations
-- ────────────────────────────────────────────────────────────
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

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- Service role bypasses RLS automatically.
-- anon and authenticated roles are fully blocked.
-- ────────────────────────────────────────────────────────────
ALTER TABLE donations     ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;

-- Drop before recreating to allow safe re-runs
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

-- ────────────────────────────────────────────────────────────
-- INDEXES for common lookups
-- ────────────────────────────────────────────────────────────
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
