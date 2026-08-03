import { db } from "@/server/shared/db";
import { NOT_DELETED } from "@/server/shared/soft-delete";

/**
 * Unified support search — the caller doesn't have to know which entity type
 * a query (a booking id, a lead reference code, a phone number...) belongs
 * to. Tries all of them and returns whatever matched; empty arrays for types
 * that didn't.
 */
export class AdminSearchService {
  static async search(query: string) {
    const [bookings, leads, vendors, customers] = await Promise.all([
      db.booking.findMany({
        where: { ...NOT_DELETED, id: query },
        include: { customer: { select: { name: true } }, vendor: { select: { fullName: true } } },
        take: 5,
      }),
      db.lead.findMany({
        where: {
          OR: [
            { referenceCode: { contains: query, mode: "insensitive" } },
            { customerPhone: { contains: query } },
            { customerName: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
      db.vendorProfile.findMany({
        where: {
          ...NOT_DELETED,
          OR: [
            { fullName: { contains: query, mode: "insensitive" } },
            { businessName: { contains: query, mode: "insensitive" } },
            { user: { phone: { contains: query } } },
          ],
        },
        include: { user: { select: { phone: true } } },
        take: 10,
      }),
      db.customerProfile.findMany({
        where: {
          ...NOT_DELETED,
          OR: [{ name: { contains: query, mode: "insensitive" } }, { user: { phone: { contains: query } } }],
        },
        include: { user: { select: { phone: true } } },
        take: 10,
      }),
    ]);

    return { bookings, leads, vendors, customers };
  }
}
