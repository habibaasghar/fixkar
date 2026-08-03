# Deployment Guide

## Status: no live environment exists yet

Nothing in this document has been exercised end-to-end — there is no live Supabase project, Redis instance, or deployed environment behind this codebase as of Phase 17. Every step below is written from the actual code (`prisma.config.ts`, `server/shared/*`, `Dockerfile`, `.github/workflows/ci.yml`) and documented Next.js/Supabase/Prisma behavior, not verified against a real deploy. Treat this as a checklist to validate on first real deployment, not a guarantee.

## Environments

Three environments, separated by **where the environment variables come from**, not by separate config files committed to the repo:

| Environment | How env vars are supplied | Database |
|---|---|---|
| Development | `.env.local` (gitignored) | Local Postgres via `docker-compose.yml`, or a Supabase dev project |
| Staging | Host's env var UI (Vercel per-environment vars, or a CI/CD secret store) | A separate Supabase project from production |
| Production | Host's env var UI / secret manager | Production Supabase project |

`.env.example` documents every variable used across all three — it is a reference, not something loaded automatically outside local dev.

## First-time setup (once a real Supabase project exists)

1. Create the Supabase project. Copy its pooled connection string (port 6543, `?pgbouncer=true`) into `DATABASE_URL`, and the direct connection string (port 5432) into `DIRECT_URL`.
2. `npx prisma migrate dev --name init` — this project has **no `prisma/migrations/` directory yet** (nothing has ever run against a live database). This first migration establishes the baseline; review it carefully since it encodes every schema decision made across all 17 phases in one shot.
3. Create the four Supabase Storage buckets referenced in `.env.example` (`vendor-documents` private, `portfolio-images`/`blog-images`/`category-icons` public).
4. Set `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `JWT_SECRET` (a real random secret, not the placeholder).
5. Optionally provision Redis (Upstash or similar) and set `REDIS_URL` — the app runs correctly without it (single-instance) but needs it before running more than one instance.

## Deploying

### Option A — Vercel (simplest for a Next.js app)
Connect the repo, set env vars per-environment in the Vercel dashboard, deploy. `next.config.ts`'s `output: "standalone"` is irrelevant on Vercel (Vercel has its own build output handling) but doesn't hurt.

### Option B — Docker
```
docker build -t fixkar-web .
docker run -p 3000:3000 --env-file .env.production fixkar-web
```
or `docker compose -f docker-compose.prod.yml up -d`. See `docs/docker.md`.

## Rollback

- **Application code**: redeploy the previous Vercel deployment / previous Docker image tag. No special procedure — this is a stateless Next.js app.
- **Database migrations**: `npx prisma migrate resolve --rolled-back <migration-name>` marks a failed migration as rolled back in Prisma's `_prisma_migrations` table, but **Prisma does not auto-generate down-migrations** — reverting schema changes means writing and applying a new forward migration that undoes them. Never hand-edit `_prisma_migrations` directly.
- **Before any migration in production**: take a manual Supabase backup/snapshot first (see `docs/backup-recovery.md`) — Prisma migrations against a table with real rows can be destructive if a column is dropped or narrowed.

## Post-deploy checklist

- [ ] `GET /api/v1/health` returns `200` with all checks `healthy` (or `degraded` only for Redis if intentionally not provisioned yet)
- [ ] `GET /api/v1/health/ready` returns `200`
- [ ] Run `POST /api/v1/admin/jobs/process-notifications/run` once manually to confirm the queue processes (no scheduler is wired yet — see `docs/background-jobs.md`)
- [ ] Confirm `SENTRY_DSN` / `OTEL_EXPORTER_OTLP_ENDPOINT` are set if you want error tracking / tracing — both are silent no-ops otherwise
