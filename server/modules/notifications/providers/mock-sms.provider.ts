import { NotificationChannel } from "@prisma/client";
import { NotificationProvider, SendParams, SendResult } from "./provider.types";
import { logger, maskPhone } from "@/server/shared/logger";

/** Mock adapter — no real Twilio/local SMS gateway credentials exist yet. Logs only. Swap for a real adapter behind the same interface when a gateway is chosen. */
export class MockSmsProvider implements NotificationProvider {
  readonly channel = NotificationChannel.SMS;
  readonly name = "mock-sms";

  async send(params: SendParams): Promise<SendResult> {
    logger.info({
      module: "notifications",
      action: "mockSmsSend",
      message: `[MOCK SMS] to ${maskPhone(params.to)}: ${params.body}`,
    });
    return { success: true, providerMessageId: `mock-sms-${Date.now()}` };
  }
}
