# Security Review (Phase 17)

## Findings fixed this phase

| # | Area | Finding | Fix |
|---|---|---|---|
| 1 | XSS | `components/seo/JsonLd.tsx` used `JSON.stringify()` without escaping `<`, so a `</script>` inside any string value would break out of the script tag | Escape `<` → `<` before embedding (valid JSON, breaks the injection) |
| 2 | Performance/DoS-adjacent | `dispatch.engine.ts` fetched every matching vendor in a city with no limit, though only the top one is ever used | Added `take: 1` (configurable) |
| 3 | Performance | `queue.service.ts`'s batch processor did one `db.user.findUnique` per dispatch (N+1, up to ~200/batch) | Batched into one `findMany` before the loop |
| 4 | Performance | Three unbounded `findMany` calls (`Booking`/`Settlement` history lists) could return unboundedly large payloads for long-tenured accounts | Added pagination (page/pageSize), threaded through routes |
| 5 | Missing indexes | `Lead.citySlug`, `VendorVerification.status`, `LedgerTransaction(type, createdAt)`, `AuditLog` (adminId / targetType+targetId / createdAt), `VendorProfile(cityId, isOnDuty)` were queried with no supporting index | Added all five; also corrected a misleading schema comment that claimed an unrelated index served the dispatch engine |

Full findings list (including ones assessed as low-risk / not requiring a code change) came from a targeted agent-assisted audit of every `*.repository.ts`/`*.service.ts` against `prisma/schema.prisma` — see git history for this phase's commits for the complete trail.

## RBAC

6 roles (`CUSTOMER`, `VENDOR`, `SUPPORT`, `OPERATIONS`, `ADMIN`, `SUPER_ADMIN`), permission-based (not role-string checks) via `server/shared/permissions.ts`. `SUPER_ADMIN` now has one exclusive permission (`ADMIN_SYSTEM_MANAGE` — background jobs, system internals), resolving a gap flagged since Phase 11.2 where it was identical to `ADMIN`. Verified: `requirePermission`/`requireAdminAuth` are the only gates on every `/admin/*` route (checked during this phase's audit).

## RLS

Documented, not enforced at the database level — see `prisma/rls-policies.sql`'s header comment. The app connects via a service-role/superuser Postgres connection (through Prisma), which bypasses RLS by Postgres design. Real enforcement is entirely in the application layer (`auth.middleware.ts`, `permissions.ts`, per-repository `WHERE userId = ...` scoping). This was a deliberate architectural decision made in Phase 11.2, re-confirmed still accurate in this phase's review — nothing changed the access path since then.

## Rate limiting

Every mutating/sensitive endpoint is rate-limited (`server/shared/rate-limit.config.ts`). As of this phase, backed by the cache abstraction (Redis if `REDIS_URL` is set, in-memory otherwise) instead of a bare in-process `Map` — correct across multiple instances once Redis is actually provisioned.

## CORS / CSP / Security headers

- CORS: allowlist-based (`server/shared/cors.ts`), empty by default (same-origin only) — reviewed, unchanged this phase.
- Security headers (`next.config.ts`): `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, HSTS — all present.
- **CSP is deliberately not set** — documented in `next.config.ts` since Phase 10: third-party script sources (analytics, maps, WhatsApp widgets) aren't finalized, and shipping a wrong CSP with no live environment to catch breakage risks blank-paging the site. Still accurate; still open technical debt.

## CSRF

Not applicable in the traditional sense: this API is Bearer-token authenticated (Supabase JWT in the `Authorization` header), not cookie-session authenticated. CSRF exploits ambient cookie auth that browsers attach automatically to cross-site requests — a Bearer token in a header is never attached automatically by the browser, so the standard CSRF attack vector doesn't apply here. No CSRF token system was added, because none is needed for this auth model; this would need revisiting only if cookie-based session auth is introduced later.

## XSS

React/Next.js auto-escape by default. The one `dangerouslySetInnerHTML` usage in the codebase (`JsonLd.tsx`) was audited and fixed (see finding #1 above). Grepped for other occurrences — none found.

## SQL injection

Not a risk anywhere in the current codebase — 100% Prisma query builder usage, zero `$queryRaw`/`$executeRaw` calls anywhere (verified by grep this phase). The moment any raw SQL is introduced, it must use Prisma's tagged-template `$queryRaw` (parameterized) form, never string concatenation.

## SSRF

No code path fetches a user-supplied URL server-side (verified by grep for `fetch(` across `server/`) — the only outbound calls are to Supabase (fixed, trusted endpoints) and mock notification providers. No SSRF surface exists today; revisit if a future feature (e.g., fetching a URL for link-preview) is added.

## File upload validation

Unchanged from Phase 10/11 review, reconfirmed still correct: mimetype allowlist + size limit enforced in `FileService`, private buckets never exposed via public URL, filenames are randomized (not user-controlled) before storage.

## Secret management

`server/shared/env-validation.ts` fails fast in production if required secrets are missing; allows placeholders in development. Docker images never bake in real secrets (see `Dockerfile` comments) — only placeholder build-time values, with real secrets injected at container run time via `--env-file`/orchestrator secret stores.

## Remaining security technical debt

- CSP still not set (see above) — needs a live environment to safely finalize third-party script sources first.
- `npm audit` currently reports vulnerabilities in transitive dependencies (4 high-severity per the last `npm install` run) — not triaged individually in this phase; CI's audit step is advisory (`continue-on-error: true`) until they are.
- No automated test suite exists — see `docs/deployment.md`'s CI notes.
