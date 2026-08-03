import { NotificationChannel } from "@prisma/client";
import { PreferenceRepository } from "./preference.repository";
import { UpdatePreferencesInput } from "./notification.validators";

const CHANNEL_FIELD: Record<NotificationChannel, "inAppEnabled" | "smsEnabled" | "whatsappEnabled" | "emailEnabled" | "pushEnabled"> = {
  IN_APP: "inAppEnabled",
  SMS: "smsEnabled",
  WHATSAPP: "whatsappEnabled",
  EMAIL: "emailEnabled",
  PUSH: "pushEnabled",
};

export class PreferenceService {
  static async get(userId: string) {
    return PreferenceRepository.getOrCreate(userId);
  }

  static async update(userId: string, input: UpdatePreferencesInput) {
    return PreferenceRepository.update(userId, input);
  }

  /** Whether a given channel should fire for this user right now — the single opt-in/out check QueueService consults before enqueueing. */
  static async isChannelEnabled(userId: string, channel: NotificationChannel): Promise<boolean> {
    const prefs = await PreferenceRepository.getOrCreate(userId);
    return prefs[CHANNEL_FIELD[channel]];
  }

  static async getLanguageCode(userId: string): Promise<string> {
    const prefs = await PreferenceRepository.getOrCreate(userId);
    return prefs.language === "ROMAN_UR" ? "roman-ur" : "en";
  }
}
