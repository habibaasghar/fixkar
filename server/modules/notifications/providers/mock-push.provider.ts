import { NotificationChannel } from "@prisma/client";
import { NotificationProvider, SendParams, SendResult } from "./provider.types";
import { logger, maskToken } from "@/server/shared/logger";

/** Future-ready mock for Firebase Cloud Messaging — no device-token registration flow exists yet (V2 mobile apps, per Phase 8). */
export class MockPushProvider implements NotificationProvider {
  readonly channel = NotificationChannel.PUSH;
  readonly name = "mock-push";

  async send(params: SendParams): Promise<SendResult> {
    logger.info({
      module: "notifications",
      action: "mockPushSend",
      message: `[MOCK PUSH] to device ${maskToken(params.to)}: ${params.body}`,
    });
    return { success: true, providerMessageId: `mock-push-${Date.now()}` };
  }
}
