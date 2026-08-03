# Architecture Overview

FixKar.pk is a Next.js 16 (App Router) monolith with a Prisma/PostgreSQL data layer and Supabase for Auth + Storage. It follows a strict layered pattern in every module: **route → service → repository**, with shared cross-cutting infrastructure under `server/shared/`.

## Layers

- **`app/api/v1/**`** — thin route handlers. Parse input, call a service, return via `apiSuccess`/`withErrorHandler`. Never contain business logic.
- **`server/modules/*/`** — one directory per domain (auth, leads, bookings, vendors, customers, dispatch, wallets, commission, settlements, notifications, reports, admin). Each has `*.service.ts` (business rules), `*.repository.ts` (Prisma access only), `*.validators.ts` (Zod schemas), `*.types.ts` where needed.
- **`server/shared/`** — infrastructure with no business logic: auth middleware, permissions/RBAC, rate limiting, cache abstraction, error classes, logging, background jobs, health checks, observability hooks.

## Domain Model (high level)

```
User (phone-based identity, one Prisma id ≠ Supabase auth id — see auth.middleware.ts)
 ├── CustomerProfile ──< CustomerAddress
 ├── VendorProfile ──< VendorVerification, VendorAvailability, VendorDocument, PortfolioItem, Wallet
 └── Role (CUSTOMER/VENDOR/SUPPORT/OPERATIONS/ADMIN/SUPER_ADMIN)

Lead (customer request) ──1:1──> Booking ──< BookingStatusLog, BookingItem, Review
   assigned via DispatchService (city→area→category→verified→active→available filter)

Wallet (CUSTOMER/VENDOR/PLATFORM) ──< LedgerEntry >── LedgerTransaction (double-entry, immutable)
   balances: availableBalance (prepaid/spendable), pendingBalance (earned, unsettled),
             settlementBalance (locked in an in-flight Settlement)

Notification event → NotificationDispatch (per channel: IN_APP/SMS/WHATSAPP/EMAIL/PUSH)
   → provider adapter (mock in this environment) → Notification (in-app inbox row)
```

## Why key decisions were made this way

- **Prisma driver adapter (`@prisma/adapter-pg`)**: Prisma 7 requires a driver adapter — bare connection strings are no longer supported. `DATABASE_URL` (pooled, PgBouncer) is used at runtime; `DIRECT_URL` (unpooled) is used only by the Prisma CLI, since PgBouncer's transaction-pooling mode doesn't support the session features `prisma migrate` needs.
- **Two ID spaces for identity**: Supabase's `auth.users.id` and this app's `users.id` are deliberately different UUIDs. `auth.middleware.ts` reconciles them by phone number on every request, and reads `role` from our own database — never from Supabase's client-writable `user_metadata` (a real privilege-escalation risk that was caught and fixed during the Vendor module build).
- **Soft-delete policy**: only actor/account entities that can be reactivated (`User`, `CustomerProfile`, `VendorProfile`, `Booking`) carry `deletedAt`. Append-only historical records (Lead, Review, Transaction/LedgerEntry, AuditLog, etc.) never do — see the policy comment at the top of `prisma/schema.prisma`.
- **Double-entry ledger with an `isExternal` flag**: every LedgerTransaction's entries must sum to zero across ALL entries (including external ones), but only non-external entries mutate a wallet's stored balance. External entries represent value crossing the system boundary (COD cash in, a payout leaving to a vendor's bank) — there's no second real wallet to debit/credit for those.
- **Cache abstraction over raw Redis**: `server/shared/cache/` decouples every caller (the rate limiter today) from ioredis directly. `REDIS_URL` unset → `MemoryCacheProvider` (single-instance only); set → `RedisCacheProvider`. Nothing else in the codebase needs to change when Redis becomes available.

See `docs/deployment.md`, `docs/background-jobs.md`, `docs/queue-architecture.md`, and `docs/monitoring.md` for the operational pieces built on top of this.
