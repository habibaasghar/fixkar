import { db } from "@/server/shared/db";
import { LeadStatus, LeadEventType, Prisma } from "@prisma/client";

const DETAIL_INCLUDE = {
  city: { select: { slug: true, name: true } },
  area: { select: { slug: true, name: true } },
  category: { select: { slug: true, name: true } },
  customer: { select: { id: true, userId: true, name: true } },
  currentVendor: { select: { id: true, slug: true, fullName: true, userId: true } },
  statusLogs: { orderBy: { createdAt: "asc" as const } },
};

export interface CreateLeadData {
  referenceCode: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  citySlug: string;
  areaName: string;
  serviceSlug: string;
  cityId: string;
  areaId: string;
  categoryId: string;
  description?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
}

export class LeadRepository {
  static async create(data: CreateLeadData) {
    return db.lead.create({ data });
  }

  static async isReferenceCodeTaken(referenceCode: string): Promise<boolean> {
    const existing = await db.lead.findUnique({ where: { referenceCode }, select: { id: true } });
    return existing !== null;
  }

  static async findById(id: string) {
    return db.lead.findUnique({ where: { id } });
  }

  static async findByIdWithRelations(id: string) {
    return db.lead.findUnique({ where: { id }, include: DETAIL_INCLUDE });
  }

  static async findCityBySlug(slug: string) {
    return db.city.findUnique({ where: { slug } });
  }

  static async findAreaByCityAndSlug(cityId: string, areaSlug: string) {
    return db.area.findUnique({ where: { cityId_slug: { cityId, slug: areaSlug } } });
  }

  static async findCategoryBySlug(slug: string) {
    return db.serviceCategory.findUnique({ where: { slug } });
  }

  static async getRejectedVendorIds(leadId: string): Promise<string[]> {
    const rows = await db.leadStatusLog.findMany({
      where: { leadId, event: LeadEventType.REJECTED },
      select: { vendorId: true },
    });
    return rows.map((r) => r.vendorId).filter((id): id is string => !!id);
  }

  static async recordEvent(leadId: string, event: LeadEventType, vendorId?: string, notes?: string) {
    return db.leadStatusLog.create({ data: { leadId, event, vendorId, notes } });
  }

  /**
   * Atomic guarded transition: succeeds (returns true) only if the lead was
   * still in `fromStatus` (and, if given, still assigned to `currentVendorId`)
   * at the moment of the UPDATE. This is what prevents two concurrent
   * accept/reject calls — or an accept racing an expiry — from both applying.
   */
  static async tryTransition(leadId: string, fromStatus: LeadStatus, toStatus: LeadStatus, currentVendorId?: string): Promise<boolean> {
    const result = await db.lead.updateMany({
      where: {
        id: leadId,
        status: fromStatus,
        ...(currentVendorId ? { currentVendorId } : {}),
      },
      data: { status: toStatus },
    });
    return result.count === 1;
  }

  static async assignToVendor(leadId: string, vendorId: string) {
    return db.$transaction([
      db.lead.update({ where: { id: leadId }, data: { status: LeadStatus.ASSIGNED, currentVendorId: vendorId } }),
      db.leadStatusLog.create({ data: { leadId, vendorId, event: LeadEventType.ASSIGNED } }),
    ]);
  }

  static async findAssignedToVendor(vendorId: string) {
    return db.lead.findMany({
      where: { currentVendorId: vendorId, status: LeadStatus.ASSIGNED },
      include: DETAIL_INCLUDE,
      orderBy: { createdAt: "desc" },
    });
  }

  static async listAll(filters: { status?: LeadStatus; citySlug?: string; search?: string }, page: number, pageSize: number) {
    const where: Prisma.LeadWhereInput = {
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.citySlug ? { citySlug: filters.citySlug } : {}),
      ...(filters.search
        ? {
            OR: [
              { referenceCode: { contains: filters.search, mode: "insensitive" } },
              { customerName: { contains: filters.search, mode: "insensitive" } },
              { customerPhone: { contains: filters.search } },
            ],
          }
        : {}),
    };

    const [total, items] = await Promise.all([
      db.lead.count({ where }),
      db.lead.findMany({ where, include: DETAIL_INCLUDE, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
    ]);

    return { total, items };
  }

  /** Admin override — assigns directly, no matching-engine filter, no exclusion of prior rejecters. */
  static async adminAssignToVendor(leadId: string, vendorId: string, adminNotes?: string) {
    return db.$transaction([
      db.lead.update({ where: { id: leadId }, data: { status: LeadStatus.ASSIGNED, currentVendorId: vendorId } }),
      db.leadStatusLog.create({ data: { leadId, vendorId, event: LeadEventType.ASSIGNED, notes: adminNotes } }),
    ]);
  }

  /** For the lead-expiration job: leads assigned to a vendor who hasn't accepted/rejected within the timeout window. */
  static async findStaleAssigned(olderThan: Date) {
    return db.lead.findMany({
      where: { status: LeadStatus.ASSIGNED, updatedAt: { lt: olderThan } },
      select: { id: true, currentVendorId: true },
    });
  }
}
