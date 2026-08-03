import { db } from "@/server/shared/db";
import { Prisma } from "@prisma/client";

const DETAIL_INCLUDE = {
  customer: { select: { id: true, name: true } },
  vendor: { select: { id: true, slug: true, fullName: true } },
  booking: { select: { id: true } },
};

export class ReviewRepository {
  static async listAll(filters: { isHidden?: boolean; vendorId?: string }, page: number, pageSize: number) {
    const where: Prisma.ReviewWhereInput = {
      ...(filters.isHidden !== undefined ? { isHidden: filters.isHidden } : {}),
      ...(filters.vendorId ? { vendorId: filters.vendorId } : {}),
    };

    const [total, items] = await Promise.all([
      db.review.count({ where }),
      db.review.findMany({ where, include: DETAIL_INCLUDE, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    ]);

    return { total, items };
  }

  static async findById(id: string) {
    return db.review.findUnique({ where: { id }, include: DETAIL_INCLUDE });
  }

  static async setHidden(id: string, isHidden: boolean, hiddenReason?: string) {
    return db.review.update({ where: { id }, data: { isHidden, hiddenReason: isHidden ? hiddenReason : null } });
  }
}
