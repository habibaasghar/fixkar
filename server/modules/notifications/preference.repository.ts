import { db } from "@/server/shared/db";
import { Language } from "@prisma/client";

export class PreferenceRepository {
  static async findByUserId(userId: string) {
    return db.notificationPreference.findUnique({ where: { userId } });
  }

  static async getOrCreate(userId: string) {
    const existing = await this.findByUserId(userId);
    if (existing) return existing;
    return db.notificationPreference.create({ data: { userId } });
  }

  static async update(userId: string, data: Partial<{
    inAppEnabled: boolean;
    smsEnabled: boolean;
    whatsappEnabled: boolean;
    emailEnabled: boolean;
    pushEnabled: boolean;
    language: Language;
    quietHoursStart: string | null;
    quietHoursEnd: string | null;
  }>) {
    return db.notificationPreference.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });
  }
}
