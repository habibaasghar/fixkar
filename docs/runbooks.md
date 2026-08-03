# Operational Runbooks

## "Notifications aren't being delivered"

1. `GET /api/v1/admin/notifications?status=PENDING` — is there a backlog? If large, the queue simply hasn't been processed recently (no scheduler exists yet — see `docs/background-jobs.md`).
2. `POST /api/v1/admin/notifications/process-queue` to drain it manually.
3. `GET /api/v1/admin/notifications/failed` — check `lastError` on any FAILED rows. Since only mock providers exist (`server/modules/notifications/providers/mock-*.provider.ts`), a FAILED row here almost always means "no destination address" (missing phone/email on the user), not a real provider outage.
4. `GET /api/v1/admin/notifications/providers` — confirm which providers are mock vs. real once a real provider is wired up.

## "A vendor's lead never got reassigned after they didn't respond"

The `expire-stale-leads` job handles this, but nothing schedules it automatically yet. Trigger manually: `POST /api/v1/admin/jobs/expire-stale-leads/run` (requires SUPER_ADMIN / `ADMIN_SYSTEM_MANAGE`). Check the response's `reassigned`/`expired` counts.

## "Wallet balances look wrong"

1. `POST /api/v1/admin/jobs/reconcile-wallets/run` — this never auto-corrects, only reports. Check the response's `mismatches` array.
2. If a mismatch is found: it means some code path mutated a wallet's stored balance without going through `LedgerService.post()` (the single write path — see `docs/architecture.md`). Grep for any `db.wallet.update` call outside `server/modules/wallets/wallet.repository.ts`'s `applyDelta` — there shouldn't be one; if there is, that's the bug to fix, not the balance.
3. Do not manually UPDATE a wallet row to "fix" it — use `POST /api/v1/admin/wallets/:id/adjust` (an admin manual adjustment), which posts a proper offsetting ledger entry instead of silently editing a number.

## "Rate limiting seems too aggressive / not working"

- Check `REDIS_URL` — if unset, rate limits are per-instance (in-memory). On a multi-instance deploy without Redis configured, each instance has its own independent counter, so the *effective* limit is `limit × instance count` — this can look like "rate limiting isn't working" when it's actually working per-instance as designed.
- Limits are defined in `server/shared/rate-limit.config.ts` — check the specific endpoint's configured `limit`/`windowMs` there.

## "Health check is failing / returning degraded"

- `GET /api/v1/health` — read the `checks` object. `redis: degraded` with "REDIS_URL not configured" is expected and fine for a single-instance deployment, not an incident.
- `database: unhealthy` is the one that actually blocks readiness (`/health/ready`) — check `DATABASE_URL`/`DIRECT_URL` and that the Supabase project is reachable.

## "A background job needs to run right now, off its normal cadence"

Every job is manually triggerable and safe to run out-of-band: `POST /api/v1/admin/jobs/:name/run`. All six are idempotent — see the guarantee column in `docs/background-jobs.md` — so running one early, or twice in a row, does not double-apply anything.
