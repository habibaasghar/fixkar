# Background Jobs

## Architecture

`server/shared/jobs/` is a small registry/runner, not a scheduler:

- `job.types.ts` — a `JobDefinition` is just `{ name, description, run() }`.
- `job.registry.ts` — `registerJob()`/`getJob()`/`listJobs()`, an in-process `Map`.
- `job.runner.ts` — `runJob(name)` looks up and executes one job, logging start/success/failure.
- `definitions/*.job.ts` — the six actual jobs.
- `index.ts` — `ensureJobsRegistered()` registers all six exactly once; import this, not individual job files.

**No scheduler exists.** Jobs are triggered today only via `POST /api/v1/admin/jobs/:name/run` (requires `ADMIN_SYSTEM_MANAGE`, i.e. SUPER_ADMIN only). There is no live Supabase project in this environment to wire up `pg_cron` or a Supabase Edge Function against — see "Production scheduling plan" below for what to do once one exists.

## The six jobs

| Job name | What it does | Idempotency guarantee |
|---|---|---|
| `expire-stale-leads` | Reassigns/expires leads whose vendor hasn't responded within 5 minutes | `LeadRepository.tryTransition` is a guarded atomic update — a lead already moved on by another path is silently skipped |
| `process-notifications` | Drains up to 100 due `NotificationDispatch` rows through their provider | `QueueRepository.tryClaim` atomically guards PENDING→PROCESSING |
| `refresh-vendor-availability` | Clears `isVacationMode` once `vacationEnd` has passed | The `updateMany` WHERE clause only ever matches rows still needing the change |
| `reconcile-wallets` | Recomputes every wallet's balance from the ledger, alerts (does not auto-fix) on drift | Pure read — no writes at all |
| `cleanup-old-dispatches` | Deletes terminal-state notification dispatches older than 30 days | The `deleteMany` WHERE clause only matches rows past the cutoff |
| `generate-daily-report` | Computes yesterday's commission/earnings/refund summary, logs it | Pure read — no writes |

## Production scheduling plan (not yet implemented)

Once a real Supabase project exists:

1. Create a Supabase Edge Function per job (or one function that takes a job name) that calls `POST /api/v1/admin/jobs/:name/run` with a service-role/admin credential.
2. Schedule via `pg_cron`:
   ```sql
   select cron.schedule('expire-stale-leads', '*/2 * * * *', $$select net.http_post('https://<project>.functions.supabase.co/run-job', '{"name":"expire-stale-leads"}')$$);
   ```
   Suggested cadences: `expire-stale-leads` every 2 min, `process-notifications` every 1 min, `refresh-vendor-availability` hourly, `reconcile-wallets` daily, `cleanup-old-dispatches` daily, `generate-daily-report` daily (early morning, after the day's data has settled).
3. Alternative: any external scheduler (GitHub Actions `schedule:` trigger, a cron-as-a-service product) hitting the same admin endpoint works identically — the job functions themselves don't know or care who called them.
