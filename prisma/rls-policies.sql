-- =============================================================================
-- Row-Level Security strategy reference (Phase 11.2)
-- =============================================================================
-- STATUS: Documented, NOT applied. There is no live Supabase project connected
-- yet (DATABASE_URL/DIRECT_URL are still placeholders), so nothing here has
-- been run. This file is meant to be executed as a raw SQL migration once a
-- real project exists — Prisma's schema DSL doesn't manage RLS policies, so
-- they must live outside prisma/schema.prisma either way.
--
-- CRITICAL CAVEAT — read before assuming RLS "protects" anything today:
-- This backend's entire read/write path is server/shared/db.ts, a Prisma
-- Client connecting through Supabase's pooled `DATABASE_URL`. That connection
-- authenticates as the Postgres `postgres` role (or `service_role` on a
-- pgbouncer'd Supabase project) — BOTH bypass RLS by design in Postgres/
-- Supabase. Every policy below is a no-op against our current access path.
--
-- The REAL enforcement boundary today is application code:
--   - server/shared/middleware/auth.middleware.ts (identity + role)
--   - server/shared/permissions.ts (requirePermission / assertOwnsResource)
--   - every repository method scoping queries by `WHERE userId = ...`
--
-- RLS only becomes load-bearing if something queries Postgres directly as
-- the `anon` or `authenticated` Postgres role — e.g. a future direct
-- Supabase-client read from the browser (bypassing our API), or someone
-- browsing via Supabase Studio's "as authenticated user" impersonation. If
-- that access pattern is never introduced, these policies remain optional
-- defense-in-depth, not a substitute for the app-layer checks above.
--
-- SECOND CAVEAT — auth.uid() vs. our own users.id:
-- Standard Supabase RLS policies compare `auth.uid()` (the Postgres session's
-- JWT `sub` claim, i.e. Supabase's OWN auth.users.id) against a `user_id`
-- column. But this schema's `public.users.id` is a Prisma-generated UUID that
-- is deliberately NOT the same value as Supabase's auth.users.id (see
-- server/shared/middleware/auth.middleware.ts's toLocalPhone() reconciliation
-- — we match by phone instead, precisely because the two ID spaces differ).
-- Every policy below therefore assumes a `public.users.supabase_auth_id`
-- column that DOES NOT YET EXIST in prisma/schema.prisma. Do not run this
-- file until that column is added (a one-line additive migration) and
-- backfilled — otherwise auth.uid() has nothing correct to join against.

-- -----------------------------------------------------------------------------
-- Prerequisite migration (not yet applied):
--   ALTER TABLE users ADD COLUMN supabase_auth_id uuid UNIQUE;
-- -----------------------------------------------------------------------------

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY users_select_own ON users
  FOR SELECT USING (supabase_auth_id = auth.uid());
CREATE POLICY users_update_own ON users
  FOR UPDATE USING (supabase_auth_id = auth.uid());
-- No public INSERT/DELETE policy: account creation is server-side only.

ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY customer_profiles_owner_all ON customer_profiles
  FOR ALL USING (user_id IN (SELECT id FROM users WHERE supabase_auth_id = auth.uid()));

ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY vendor_profiles_public_read ON vendor_profiles
  FOR SELECT USING (deleted_at IS NULL); -- public catalog; app layer still projects to PublicVendorProfile fields only
CREATE POLICY vendor_profiles_owner_write ON vendor_profiles
  FOR UPDATE USING (user_id IN (SELECT id FROM users WHERE supabase_auth_id = auth.uid()));

ALTER TABLE vendor_verifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY vendor_verifications_owner_read ON vendor_verifications
  FOR SELECT USING (
    vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id IN (SELECT id FROM users WHERE supabase_auth_id = auth.uid()))
  );
-- No client UPDATE policy at all: verification status is admin-only, written
-- exclusively via the (not-yet-built) admin module's service-role path.

ALTER TABLE vendor_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY vendor_documents_owner_all ON vendor_documents
  FOR ALL USING (
    vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id IN (SELECT id FROM users WHERE supabase_auth_id = auth.uid()))
  );
-- fileUrl here is a private-bucket *path*, not a signed URL — even a leaked
-- row via a policy bug doesn't expose the file itself without a fresh
-- FileService.getSignedUrl() call, which stays server-side only.

ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY portfolio_items_public_read ON portfolio_items FOR SELECT USING (true);
CREATE POLICY portfolio_items_owner_write ON portfolio_items
  FOR INSERT WITH CHECK (
    vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id IN (SELECT id FROM users WHERE supabase_auth_id = auth.uid()))
  );

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY bookings_party_read ON bookings
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customer_profiles WHERE user_id IN (SELECT id FROM users WHERE supabase_auth_id = auth.uid()))
    OR vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id IN (SELECT id FROM users WHERE supabase_auth_id = auth.uid()))
  );
-- Deferred to the Booking module phase — sketched here only for completeness.

ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
CREATE POLICY wallets_owner_read ON wallets
  FOR SELECT USING (
    vendor_id IN (SELECT id FROM vendor_profiles WHERE user_id IN (SELECT id FROM users WHERE supabase_auth_id = auth.uid()))
  );
-- No client UPDATE policy: balance is only ever written via the
-- single-write-path + row-lock discipline decided in Phase 9.1, server-side.

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY reviews_public_read ON reviews FOR SELECT USING (true);

-- Public reference/catalog tables: world-readable, no client writes.
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY cities_public_read ON cities FOR SELECT USING (true);
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY areas_public_read ON areas FOR SELECT USING (true);
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY service_categories_public_read ON service_categories FOR SELECT USING (true);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY services_public_read ON services FOR SELECT USING (true);

-- Never exposed to anon/authenticated roles at all — no policies means no
-- access once RLS is enabled (default-deny), which is the desired outcome:
--   audit_logs, system_settings, transactions (wallet ledger), leads
--   (pre-booking, contains raw customer_phone), notifications.
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
