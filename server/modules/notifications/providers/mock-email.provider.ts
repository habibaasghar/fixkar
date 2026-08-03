import { NotificationChannel } from "@prisma/client";
import { NotificationProvider, SendParams, SendResult } from "./provider.types";
import { logger, maskEmail } from "@/server/shared/logger";

/** Mock adapter for SMTP/Resend/SendGrid — no credentials configured yet. */
export class MockEmailProvider implements NotificationProvider {
  readonly channel = NotificationChannel.EMAIL;
  readonly name = "mock-email";

  async send(params: SendParams): Promise<SendResult> {
    logger.info({
      module: "notifications",
      action: "mockEmailSend",
      message: `[MOCK EMAIL] to ${maskEmail(params.to)} subject="${params.subject ?? ""}": ${params.body}`,
    });
    return { success: true, providerMessageId: `mock-email-${Date.now()}` };
  }
}
