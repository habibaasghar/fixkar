import { NotificationChannel } from "@prisma/client";
import { NotificationProvider } from "./provider.types";
import { MockSmsProvider } from "./mock-sms.provider";
import { MockWhatsAppProvider } from "./mock-whatsapp.provider";
import { MockEmailProvider } from "./mock-email.provider";
import { MockPushProvider } from "./mock-push.provider";
import { InAppProvider } from "./in-app.provider";

const registry: Record<NotificationChannel, NotificationProvider> = {
  [NotificationChannel.IN_APP]: new InAppProvider(),
  [NotificationChannel.SMS]: new MockSmsProvider(),
  [NotificationChannel.WHATSAPP]: new MockWhatsAppProvider(),
  [NotificationChannel.EMAIL]: new MockEmailProvider(),
  [NotificationChannel.PUSH]: new MockPushProvider(),
};

/** The only place that maps a channel to its concrete adapter. Replacing a mock with a real provider means changing one line here. */
export function getProvider(channel: NotificationChannel): NotificationProvider {
  return registry[channel];
}

/** Admin "provider status" API — since these are mocks, status is always healthy; a real adapter would report actual connectivity here. */
export function getAllProviderStatuses() {
  return Object.values(registry).map((provider) => ({ channel: provider.channel, name: provider.name, status: "healthy" as const, isMock: provider.name.startsWith("mock") || provider.name === "in-app-db" }));
}
