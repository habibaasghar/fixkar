import { NotificationChannel, NotificationDeliveryStatus } from "@prisma/client";
import { QueueRepository, EnqueueData } from "./queue.repository";
import { getProvider } from "./providers/provider.registry";
import { NotFoundError } from "@/server/shared/errors";
import { logger } from "@/server/shared/logger";
import { db } from "@/server/shared/db";

const BASE_RETRY_DELAY_MS = 30_000; // 30s
const MAX_RETRY_DELAY_MS = 60 * 60 * 1000; // cap at 1h

function computeBackoff(attempts: number): Date {
  const delay = Math.min(BASE_RETRY_DELAY_MS * 2 ** (attempts - 1), MAX_RETRY_DELAY_MS);
  return new Date(Date.now() + delay);
}

type UserContact = { phone: string; email: string | null };

/** One query for the whole batch instead of one findUnique per dispatch (Phase 17 audit fix — this was a real N+1: up to `batchSize` sequential lookups per processPendingBatch() call). */
async function loadUserContacts(userIds: string[]): Promise<Map<string, UserContact>> {
  const uniqueIds = [...new Set(userIds)];
  const users = await db.user.findMany({ where: { id: { in: uniqueIds } }, select: { id: true, phone: true, email: true } });
  return new Map(users.map((u) => [u.id, { phone: u.phone, email: u.email }]));
}

/** Resolves the "to" address a provider needs from a user id + channel — separate from the queue row itself, which only stores userId. */
function resolveDestination(userId: string, channel: NotificationChannel, contacts: Map<string, UserContact>): string | null {
  if (channel === NotificationChannel.IN_APP) return userId;

  const user = contacts.get(userId);
  if (!user) return null;

  if (channel === NotificationChannel.SMS || channel === NotificationChannel.WHATSAPP) return user.phone;
  if (channel === NotificationChannel.EMAIL) return user.email;
  return null; // PUSH: no device-token registration flow exists yet (V2 mobile) — see technical debt.
}

export class QueueService {
  static async enqueue(data: EnqueueData) {
    const dispatch = await QueueRepository.enqueue(data);
    logger.info({
      module: "notifications",
      action: "enqueue",
      message: `Queued ${data.event} via ${data.channel}`,
      data: { dispatchId: dispatch.id, event: data.event, channel: data.channel },
    });
    return dispatch;
  }

  /**
   * Drains up to `batchSize` due dispatches and attempts delivery. This is
   * NOT invoked automatically on any request — per Phase 16's instruction
   * not to cron-poll on every request, it's meant to be called by a future
   * background worker/scheduled job (none exists in this codebase yet, same
   * gap as Lead expiry in Phase 13) or manually via the admin
   * "process queue" endpoint for testing.
   */
  static async processPendingBatch(batchSize: number) {
    const due = await QueueRepository.findDueForProcessing(batchSize);
    const contacts = await loadUserContacts(due.map((d) => d.userId));
    const results = { processed: 0, sent: 0, failed: 0, retrying: 0, skipped: 0 };

    for (const dispatch of due) {
      const claimed = await QueueRepository.tryClaim(dispatch.id);
      if (!claimed) continue; // another worker already grabbed it

      results.processed += 1;

      const destination = resolveDestination(dispatch.userId, dispatch.channel, contacts);
      if (!destination) {
        await QueueRepository.markPermanentlyFailed(dispatch.id, dispatch.attempts + 1, "No destination address available for this channel (missing phone/email/device token).");
        results.failed += 1;
        continue;
      }

      const provider = getProvider(dispatch.channel);
      const attemptNumber = dispatch.attempts + 1;

      try {
        const result = await provider.send({ to: destination, subject: dispatch.renderedSubject ?? undefined, body: dispatch.renderedBody });

        if (result.success) {
          await QueueRepository.markSent(dispatch.id, provider.name, attemptNumber);
          if (dispatch.channel === NotificationChannel.IN_APP) {
            // The DB write IS the delivery for in-app — no separate confirmation step exists.
            await QueueRepository.markDelivered(dispatch.id);
          }
          results.sent += 1;
        } else {
          await this.handleFailure(dispatch.id, attemptNumber, dispatch.maxAttempts, result.error ?? "Unknown provider error");
          results.retrying += 1;
        }
      } catch (err) {
        await this.handleFailure(dispatch.id, attemptNumber, dispatch.maxAttempts, err instanceof Error ? err.message : "Unknown error");
        results.retrying += 1;
      }
    }

    logger.info({ module: "notifications", action: "processPendingBatch", message: `Processed ${results.processed} dispatches`, data: results });
    return results;
  }

  private static async handleFailure(dispatchId: string, attempts: number, maxAttempts: number, error: string) {
    if (attempts >= maxAttempts) {
      await QueueRepository.markPermanentlyFailed(dispatchId, attempts, error);
    } else {
      await QueueRepository.markRetryable(dispatchId, attempts, computeBackoff(attempts), error);
    }
  }

  static async retry(dispatchId: string) {
    const dispatch = await QueueRepository.findById(dispatchId);
    if (!dispatch) throw new NotFoundError("Notification dispatch not found.");
    const result = await QueueRepository.retry(dispatchId);
    if (result.count === 0) {
      throw new NotFoundError("Dispatch is not in a FAILED state — nothing to retry.");
    }
    return QueueRepository.findById(dispatchId);
  }

  static async listAll(filters: { status?: NotificationDeliveryStatus; userId?: string; channel?: NotificationChannel }, page: number, pageSize: number) {
    return QueueRepository.listAll(filters, page, pageSize);
  }

  static async listFailed(page: number, pageSize: number) {
    return QueueRepository.listAll({ status: NotificationDeliveryStatus.FAILED }, page, pageSize);
  }

  /** For the cleanup job — retention housekeeping on terminal-state rows only. */
  static async cleanupOldDispatches(retentionDays: number): Promise<number> {
    const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
    return QueueRepository.deleteTerminalOlderThan(cutoff);
  }
}
