import { db } from "./db";
import { Prisma } from "@prisma/client";
import { logger } from "./logger";

export interface AuditLogInput {
  adminUserId: string;
  action: string;
  targetType: string;
  targetId: string;
  previousState?: Prisma.InputJsonValue;
  newState?: Prisma.InputJsonValue;
  ipAddress?: string | null;
}

/**
 * Every admin action must write an immutable AuditLog row (Phase 14). This
 * is the single write path for that table — no admin route/service should
 * ever call `db.auditLog.create` directly, so every action is guaranteed
 * consistent shape and nothing is skipped.
 */
export async function recordAuditLog(input: AuditLogInput) {
  const entry = await db.auditLog.create({
    data: {
      adminId: input.adminUserId,
      action: input.action,
      targetType: input.targetType,
      targetId: input.targetId,
      previousState: input.previousState ?? Prisma.JsonNull,
      newState: input.newState ?? Prisma.JsonNull,
      ipAddress: input.ipAddress ?? undefined,
    },
  });

  logger.info({
    module: "audit",
    action: input.action,
    message: `Admin action: ${input.action} on ${input.targetType}:${input.targetId}`,
    data: { adminUserId: input.adminUserId, targetType: input.targetType, targetId: input.targetId },
  });

  return entry;
}
