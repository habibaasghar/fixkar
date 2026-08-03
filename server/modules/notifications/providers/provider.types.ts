import { NotificationChannel } from "@prisma/client";

export interface SendParams {
  to: string; // phone number, email address, device token, or userId (IN_APP)
  subject?: string; // EMAIL only
  body: string;
}

export interface SendResult {
  success: boolean;
  providerMessageId?: string;
  error?: string;
}

/**
 * Unified interface every channel adapter implements. Business modules never
 * see this — only QueueService.processDispatch() calls a provider, resolved
 * by channel via the registry in provider.registry.ts. Swapping a mock for a
 * real WhatsApp Business API / Twilio / SMTP / FCM client later means adding
 * one adapter file and one registry entry — nothing else in the codebase
 * changes.
 */
export interface NotificationProvider {
  readonly channel: NotificationChannel;
  readonly name: string;
  send(params: SendParams): Promise<SendResult>;
}
