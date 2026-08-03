import { db } from "@/server/shared/db";
import { NotificationChannel } from "@prisma/client";

export class TemplateRepository {
  static async findActive(key: string, channel: NotificationChannel, locale: string) {
    return db.notificationTemplate.findFirst({
      where: { key, channel, locale, isActive: true },
      orderBy: { version: "desc" },
    });
  }

  static async findLatestVersion(key: string, channel: NotificationChannel, locale: string) {
    return db.notificationTemplate.findFirst({
      where: { key, channel, locale },
      orderBy: { version: "desc" },
    });
  }

  static async create(data: { key: string; channel: NotificationChannel; locale: string; version: number; subject?: string; body: string }) {
    return db.notificationTemplate.create({ data });
  }

  static async listAll() {
    return db.notificationTemplate.findMany({ orderBy: [{ key: "asc" }, { channel: "asc" }, { locale: "asc" }, { version: "desc" }] });
  }

  static async findById(id: string) {
    return db.notificationTemplate.findUnique({ where: { id } });
  }

  static async setActive(id: string, isActive: boolean) {
    return db.notificationTemplate.update({ where: { id }, data: { isActive } });
  }
}
