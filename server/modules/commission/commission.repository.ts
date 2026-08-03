import { db } from "@/server/shared/db";
import { CommissionType } from "@prisma/client";

export class CommissionRepository {
  /** All rules that could apply (exact match, category-only, city-only, or global) — ranked by specificity in CommissionEngine. */
  static async findAllApplicable(categoryId: string, cityId: string) {
    return db.commissionRule.findMany({
      where: { isActive: true, OR: [{ categoryId, cityId }, { categoryId, cityId: null }, { categoryId: null, cityId }, { categoryId: null, cityId: null }] },
    });
  }

  static async getSystemSetting(key: string) {
    return db.systemSetting.findUnique({ where: { key } });
  }

  static async listAll() {
    return db.commissionRule.findMany({
      include: { category: { select: { slug: true, name: true } }, city: { select: { slug: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  static async create(data: { categoryId?: string; cityId?: string; type: CommissionType; value: number }) {
    return db.commissionRule.create({ data });
  }

  static async update(id: string, data: Partial<{ type: CommissionType; value: number; isActive: boolean }>) {
    return db.commissionRule.update({ where: { id }, data });
  }

  static async findById(id: string) {
    return db.commissionRule.findUnique({ where: { id } });
  }
}
