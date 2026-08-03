# Monitoring & Observability

## What's real today

- **Structured logs** (`server/shared/logger.ts`): every log call is JSON in production, human-readable in dev. PII (phone/CNIC/email/tokens) is auto-masked by key-name pattern-matching before anything is logged — see `scrubSensitive()`.
- **Correlation IDs**: `withErrorHandler` (every route) generates/reuses an `X-Request-Id` header and runs the handler inside an `AsyncLocalStorage` context (`server/shared/request-context.ts`). Every `logger.*` call made anywhere during that request — services, repositories — automatically includes the same `requestId`, without it being threaded through function signatures. Verified: `npx tsc --noEmit` passes with this wired through `response.ts`.
- **Health checks**: `GET /api/v1/health` (aggregate), `/health/db`, `/health/redis`, `/health/storage`, `/health/queue` (individual), `/health/live` (liveness — process is up, no dependency checks), `/health/ready` (readiness — gates only on the database, since Redis/storage degrade gracefully rather than block traffic).

## What's scaffolded but unverified

- **Sentry** (`server/shared/observability/sentry.ts`): `npm install @sentry/nextjs` failed in this sandboxed Windows environment (`@sentry/cli`'s postinstall script spawns `cmd.exe`, which errors here). The package is **not installed**. The wrapper is written against Sentry's documented API, dynamically imports the package only when `SENTRY_DSN` is set, and silently no-ops if the import fails for any reason (including the package being absent, as it is now). To activate: run `npm install @sentry/nextjs` somewhere that install succeeds, set `SENTRY_DSN`, trigger a real error, confirm it appears in Sentry.
- **OpenTelemetry** (`instrumentation.ts`, using `@vercel/otel` — this one IS installed and type-checks): registers only when `OTEL_EXPORTER_OTLP_ENDPOINT` is set. Never tested against a real collector (no collector available here). To activate: point a real OTLP endpoint at it (Grafana Tempo, Honeycomb, etc.), deploy, confirm traces arrive.
- **Prometheus/Grafana**: no metrics endpoint exists (no `/metrics` route, no `prom-client` dependency). If added later, the natural integration point is a new `GET /api/v1/metrics` route reading from the same health-check functions in `server/shared/health.ts`, plus whatever counters matter (request counts, job run outcomes) — none of that instrumentation exists yet.

## Slow query detection

Not implemented as a distinct feature. Two things partially cover it today:
1. `checkDatabase()`'s `latencyMs` on every health check ping.
2. Prisma's own query logging (`server/shared/db.ts` logs `query` level in development) — this shows every query's SQL but not a duration threshold/alert. A real "slow query" feature would mean wrapping the Prisma client with `$extends` to time every query and log/alert above a threshold — not built, since it adds overhead to every single query and there's no production traffic pattern yet to calibrate a sensible threshold against.

## Error aggregation

Until Sentry is actually installed and configured, "aggregation" means: structured JSON logs → whatever log platform the host (Vercel, a Docker log driver) forwards them to. `apiError()`'s unhandled-error branch already logs every 500 with a `requestId`, so grep/query by that id ties a client-visible error back to its full server-side log trail even without an APM tool.
