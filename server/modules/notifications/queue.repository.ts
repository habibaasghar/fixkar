import { db } from "@/server/shared/db";
import { NotificationChannel, NotificationDeliveryStatus, Prisma } from "@prisma/client";

export interface EnqueueData {
  userId: string;
  event: string;
  channel: NotificationChannel;
  renderedSubject?: string;
  renderedBody: string;
  metadata?: Prisma.InputJsonValue;
  priority?: number;
}

export class QueueRepository {
  static async enqueue(data: EnqueueData) {
    return db.notificationDispatch.create({ data });
  }

  static async findDueForProcessing(batchSize: number) {
    return db.notificationDispatch.findMany({
      where: {
        status: NotificationDeliveryStatus.PENDING,
        OR: [{ nextAttemptAt: null }, { nextAttemptAt: { lte: new Date() } }],
      },
      orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
      take: batchSize,
    });
  }

  /** Atomic guarded claim — PENDING -> PROCESSING only if still PENDING, so two concurrent workers can't both process the same dispatch. */
  static async tryClaim(id: string): Promise<boolean> {
    const result = await db.notificationDispatch.updateMany({
      where: { id, status: NotificationDeliveryStatus.PENDING },
      data: { status: NotificationDeliveryStatus.PROCESSING },
    });
    return result.count === 1;
  }

  static async markSent(id: string, provider: string, attempts: number) {
    return db.notificationDispatch.update({
      where: { id },
      data: { status: NotificationDeliveryStatus.SENT, provider, attempts, sentAt: new Date(), lastError: null },
    });
  }

  static async markDelivered(id: string) {
    return db.notificationDispatch.update({ where: { id }, data: { status: NotificationDeliveryStatus.DELIVERED, deliveredAt: new Date() } });
  }

  static async markRetryable(id: string, attempts: number, nextAttemptAt: Date, error: string) {
    return db.notificationDispatch.update({
      where: { id },
      data: { status: NotificationDeliveryStatus.PENDING, attempts, nextAttemptAt, lastError: error },
    });
  }

  static async markPermanentlyFailed(id: string, attempts: number, error: string) {
    return db.notificationDispatch.update({
      where: { id },
      data: { status: NotificationDeliveryStatus.FAILED, attempts, failedAt: new Date(), lastError: error },
    });
  }

  static async cancel(id: string) {
    return db.notificationDispatch.updateMany({
      where: { id, status: NotificationDeliveryStatus.PENDING },
      data: { status: NotificationDeliveryStatus.CANCELLED },
    });
  }

  static async retry(id: string) {
    return db.notificationDispatch.updateMany({
      where: { id, status: NotificationDeliveryStatus.FAILED },
      data: { status: NotificationDeliveryStatus.PENDING, attempts: 0, nextAttemptAt: null, lastError: null },
    });
  }

  static async findById(id: string) {
    return db.notificationDispatch.findUnique({ where: { id } });
  }

  static async listAll(filters: { status?: NotificationDeliveryStatus; userId?: string; channel?: NotificationChannel }, page: number, pageSize: number) {
    const where: Prisma.NotificationDispatchWhereInput = {
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.userId ? { userId: filters.userId } : {}),
      ...(filters.channel ? { channel: filters.channel } : {}),
    };
    const [total, items] = await Promise.all([
      db.notificationDispatch.count({ where }),
      db.notificationDispatch.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    ]);
    return { total, items };
  }

  /** For the cleanup job: terminal-state dispatches (SENT/DELIVERED/FAILED/CANCELLED) past a retention window. Never deletes PENDING/PROCESSING rows. */
  static async deleteTerminalOlderThan(cutoff: Date): Promise<number> {
    const result = await db.notificationDispatch.deleteMany({
      where: {
        createdAt: { lt: cutoff },
        status: { in: [NotificationDeliveryStatus.SENT, NotificationDeliveryStatus.DELIVERED, NotificationDeliveryStatus.FAILED, NotificationDeliveryStatus.CANCELLED] },
      },
    });
    return result.count;
  }
}
