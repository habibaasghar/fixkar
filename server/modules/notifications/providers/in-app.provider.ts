import { NotificationChannel } from "@prisma/client";
import { NotificationProvider, SendParams, SendResult } from "./provider.types";
import { db } from "@/server/shared/db";

/**
 * Not really "external" — delivery IS the database write. `to` is the
 * userId here (not a phone/email/token like the other channels), and the
 * write populates the existing `Notification` inbox table so the in-app UI
 * keeps working unchanged.
 */
export class InAppProvider implements NotificationProvider {
  readonly channel = NotificationChannel.IN_APP;
  readonly name = "in-app-db";

  async send(params: SendParams): Promise<SendResult> {
    const notification = await db.notification.create({
      data: { userId: params.to, title: params.subject ?? "Notification", body: params.body },
    });
    return { success: true, providerMessageId: notification.id };
  }
}
