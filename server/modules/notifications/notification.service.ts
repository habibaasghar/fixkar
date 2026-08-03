import { Prisma, NotificationChannel } from "@prisma/client";
import { logger } from "@/server/shared/logger";
import { NotificationEvent } from "./notification.types";
import { TemplateService } from "./template.service";
import { PreferenceService } from "./preference.service";
import { QueueService } from "./queue.service";

/**
 * Fallback copy used only when no NotificationTemplate row exists yet for an
 * (event, channel, locale) — keeps the system fully functional out of the
 * box before any admin has authored templates. Business modules never see
 * this map; it lives entirely inside the notification layer.
 */
const EVENT_COPY: Record<NotificationEvent, { title: string; body: string }> = {
  LEAD_CREATED: { title: "Request received", body: "We've received your service request and are finding you a Fixer." },
  LEAD_ASSIGNED: { title: "New job available", body: "A new job matching your services is available." },
  VENDOR_ACCEPTED: { title: "Fixer assigned", body: "A verified Fixer has accepted your request." },
  VENDOR_REJECTED: { title: "Job declined", body: "You declined a job. Looking for another match if available." },
  BOOKING_CONFIRMED: { title: "Booking confirmed", body: "Your booking has been confirmed." },
  BOOKING_CANCELLED: { title: "Booking cancelled", body: "A booking has been cancelled." },
  BOOKING_COMPLETED: { title: "Job completed", body: "The job has been marked completed." },
  VENDOR_VERIFICATION_APPROVED: { title: "Verification approved", body: "Your vendor verification has been approved." },
  VENDOR_VERIFICATION_REJECTED: { title: "Verification rejected", body: "Your vendor verification was rejected. Please review and resubmit." },
  VENDOR_SUSPENDED: { title: "Account suspended", body: "Your vendor account has been suspended." },
  VENDOR_RESTORED: { title: "Account restored", body: "Your vendor account has been restored." },
  CUSTOMER_SUSPENDED: { title: "Account suspended", body: "Your account has been suspended." },
  CUSTOMER_RESTORED: { title: "Account restored", body: "Your account has been restored." },
  SETTLEMENT_CREATED: { title: "Settlement initiated", body: "A settlement for your earnings has been created and is being processed." },
  SETTLEMENT_COMPLETED: { title: "Settlement completed", body: "Your settlement has been paid out." },
  REFUND_ISSUED: { title: "Refund issued", body: "A refund has been credited to your account." },
  VENDOR_REGISTERED: { title: "Welcome to FixKar.pk", body: "Your vendor application has been received and is pending verification." },
  CUSTOMER_REGISTERED: { title: "Welcome to FixKar.pk", body: "Your account is ready." },
};

/** Formal/record-keeping events additionally go out over email; everything gets IN_APP + SMS + WHATSAPP by default. PUSH isn't fired anywhere yet — no device-token registration flow exists (V2 mobile), so it would only ever permanently fail. */
const EMAIL_EVENTS = new Set<NotificationEvent>([
  "VENDOR_REGISTERED",
  "VENDOR_VERIFICATION_APPROVED",
  "VENDOR_VERIFICATION_REJECTED",
  "CUSTOMER_REGISTERED",
  "BOOKING_CONFIRMED",
  "SETTLEMENT_COMPLETED",
  "REFUND_ISSUED",
]);

function channelsFor(event: NotificationEvent): NotificationChannel[] {
  const channels: NotificationChannel[] = [NotificationChannel.IN_APP, NotificationChannel.SMS, NotificationChannel.WHATSAPP];
  if (EMAIL_EVENTS.has(event)) channels.push(NotificationChannel.EMAIL);
  return channels;
}

function metadataToVariables(metadata?: Prisma.InputJsonValue): Record<string, string | number> {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return {};
  const variables: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(metadata as Record<string, unknown>)) {
    if (typeof value === "string" || typeof value === "number") variables[key] = value;
  }
  return variables;
}

export class NotificationService {
  /**
   * The single entry point every business module calls. It never sends
   * anything itself — it resolves the user's preferences and language,
   * renders (or falls back to default copy for) each applicable channel,
   * and enqueues a NotificationDispatch per channel. Actual delivery happens
   * in QueueService.processPendingBatch(), invoked separately (see that
   * file's docstring for why this isn't triggered inline here).
   */
  static async trigger(userId: string, event: NotificationEvent, metadata?: Prisma.InputJsonValue) {
    const variables = metadataToVariables(metadata);
    const locale = await PreferenceService.getLanguageCode(userId);
    const fallback = EVENT_COPY[event];

    const dispatches = [];

    for (const channel of channelsFor(event)) {
      const enabled = await PreferenceService.isChannelEnabled(userId, channel);
      if (!enabled) continue;

      const rendered = await TemplateService.render(event, channel, locale, variables);
      const body = rendered.body || fallback.body;
      const subject = rendered.subject ?? (channel === NotificationChannel.EMAIL ? fallback.title : undefined);

      const dispatch = await QueueService.enqueue({
        userId,
        event,
        channel,
        renderedSubject: subject,
        renderedBody: body,
        metadata: metadata ?? undefined,
      });
      dispatches.push(dispatch);
    }

    logger.info({
      module: "notifications",
      action: "trigger",
      message: `Notification event ${event} queued on ${dispatches.length} channel(s) for user`,
      data: { userId, event, channelCount: dispatches.length },
    });

    return dispatches;
  }
}
