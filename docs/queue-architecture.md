# Queue Architecture (Notifications)

## Where it lives

`server/modules/notifications/` — built in Phase 16, hardened in Phase 17. This is the only queue in the codebase; there is no separate job queue library (BullMQ etc.) installed, because a real one needs Redis to be meaningful and none is available to test against here. The notification queue is Postgres-backed (the `NotificationDispatch` table), which is a deliberate, defensible choice for this codebase's actual volume — see "Why not BullMQ yet" below.

## State machine

```
PENDING --(tryClaim)--> PROCESSING --(provider succeeds)--> SENT --(IN_APP only)--> DELIVERED
   ^                         |
   |                    (provider fails, attempts < max)
   |                         v
   +---------------- PENDING (nextAttemptAt = backoff) 
                             |
                    (attempts >= maxAttempts)
                             v
                          FAILED  <-- dead-letter state. Admin can retry (resets attempts to 0) or leave it.
PENDING --(admin cancel)--> CANCELLED
```

- **Retry / backoff**: exponential, `30s × 2^(attempts-1)`, capped at 1 hour. Configurable per-dispatch via `maxAttempts` (default 3).
- **Dead-letter queue**: `FAILED` status *is* the DLQ — deliberately not a separate table, since that would just duplicate the same rows. `GET /api/v1/admin/notifications/failed` inspects it; `POST /api/v1/admin/notifications/:id/retry` requeues.
- **Priority**: `NotificationDispatch.priority` (int, default 0, higher processed first). Nothing sets it above 0 yet — no event was defined as needing elevated priority when Phase 16 built the event list. Bumping an event's priority is a one-line change in `NotificationService.trigger`.
- **Delayed jobs**: `nextAttemptAt` — a dispatch with a future timestamp isn't picked up by `findDueForProcessing` until then. Currently only used for retry backoff; nothing enqueues with an initial delay yet, but the mechanism supports it.

## Processing

`QueueService.processPendingBatch(batchSize)` drains up to `batchSize` due dispatches. **Not invoked automatically anywhere** — per Phase 16/17's explicit instruction not to cron-poll on every request. It's called by:
- `POST /api/v1/admin/notifications/process-queue` (manual, for testing/ops)
- The `process-notifications` background job (see `docs/background-jobs.md`) — which itself needs a real scheduler to run automatically.

## Why not BullMQ (or similar) yet

A "production-ready queue" in the usual sense (BullMQ, SQS, etc.) needs a message broker — BullMQ specifically needs Redis. This environment has no Redis instance to develop or test against, and installing BullMQ without ever exercising it against a real broker would be exactly the kind of "fabricated integration" this phase was explicit about avoiding. The Postgres-backed queue here is real, tested against the actual schema, and already has the properties that matter (atomicity via `tryClaim`, retry/backoff, DLQ, priority). **Migration path once Redis is confirmed available**: swap `QueueRepository`'s Prisma calls for BullMQ job operations behind the same `QueueService` public interface — no caller (`NotificationService.trigger`, the admin routes) needs to change, since they only depend on `QueueService`'s method signatures.
