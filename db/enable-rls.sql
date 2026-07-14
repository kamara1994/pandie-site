-- ─────────────────────────────────────────────────────────────────────────────
-- Row-Level Security for donor-data tables (defense-in-depth)
-- ─────────────────────────────────────────────────────────────────────────────
-- HOW TO RUN: Supabase Dashboard → SQL Editor → paste this → Run.
--
-- WHY THIS IS SAFE FOR THE APP:
--   The website writes to these tables ONLY through the Supabase *service role*
--   (server-side, in app/lib/supabase.ts). The service role has the BYPASSRLS
--   attribute, so it is unaffected by the policies below and keeps full access.
--
--   Enabling RLS with NO permissive policy makes these tables deny-all to the
--   public `anon` and `authenticated` roles. There is no public read path today,
--   so this changes nothing about current behavior — it's insurance: if the anon
--   key is ever exposed, or someone later adds a public query by mistake, donor
--   names/emails/amounts stay locked instead of leaking.
--
-- VERIFY AFTER RUNNING (should return rowsecurity = true for both):
--   select tablename, rowsecurity from pg_tables
--   where schemaname = 'public' and tablename in ('donations','webhook_events');

alter table public.donations       enable row level security;
alter table public.webhook_events  enable row level security;

-- Intentionally NO "create policy" statements: with RLS enabled and no
-- permissive policy, non-service roles get zero rows and cannot read or write.
-- (Do NOT add a broad "using (true)" policy — that would re-open public access.)
