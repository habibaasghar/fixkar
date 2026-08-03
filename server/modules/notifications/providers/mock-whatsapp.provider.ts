import { NotificationChannel } from "@prisma/client";
import { NotificationProvider, SendParams, SendResult } from "./provider.types";
import { logger, maskPhone } from "@/server/shared/logger";

/** Mock adapter for WhatsApp Business API — no credentials configured yet (see Phase 8 §11). */
export class MockWhatsAppProvider implements NotificationProvider {
  readonly channel = NotificationChannel.WHATSAPP;
  readonly name = "mock-whatsapp";

  async send(params: SendParams): Promise<SendResult> {
    logger.info({
      module: "notifications",
      action: "mockWhatsAppSend",
      message: `[MOCK WHATSAPP] to ${maskPhone(params.to)}: ${params.body}`,
    });
    return { success: true, providerMessageId: `mock-whatsapp-${Date.now()}` };
  }
}
