import { db } from "@/server/shared/db";
import { LeadStatus, BookingStatus, VerificationStatus } from "@prisma/client";
import { NOT_DELETED } from "@/server/shared/soft-delete";
import { ReportService } from "@/server/modules/reports/report.service";

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export class DashboardService {
  static async getKpis() {
    const now = new Date();
    const weekAgo = new Date(Date.now() - ONE_WEEK_MS);

    const [
      activeLeads,
      activeBookings,
      pendingVendors,
      totalCustomers,
      newCustomersThisWeek,
      totalVendors,
      totalBookingsCompleted,
      totalCommissionRevenue,
      monthlyRevenue,
    ] = await Promise.all([
      db.lead.count({ where: { status: { in: [LeadStatus.UNASSIGNED, LeadStatus.ASSIGNED] } } }),
      db.booking.count({ where: { ...NOT_DELETED, status: { notIn: [BookingStatus.COMPLETED, BookingStatus.CANCELLED] } } }),
      db.vendorProfile.count({ where: { ...NOT_DELETED, verification: { status: { in: [VerificationStatus.PENDING, VerificationStatus.UNDER_REVIEW] } } } }),
      db.customerProfile.count({ where: NOT_DELETED }),
      db.customerProfile.count({ where: { ...NOT_DELETED, createdAt: { gte: weekAgo } } }),
      db.vendorProfile.count({ where: NOT_DELETED }),
      db.booking.count({ where: { ...NOT_DELETED, status: BookingStatus.COMPLETED } }),
      // Phase 15 closes the gap flagged here in Phase 14: real numbers from
      // the ledger, not a placeholder, now that the Wallet module exists.
      ReportService.getCommissionTotal(),
      ReportService.getMonthlyRevenue(now.getFullYear(), now.getMonth() + 1),
    ]);

    return {
      leads: { active: activeLeads },
      bookings: { active: activeBookings, completed: totalBookingsCompleted },
      vendors: { total: totalVendors, pendingVerification: pendingVendors },
      customers: { total: totalCustomers, newThisWeek: newCustomersThisWeek },
      revenue: { totalCollected: totalCommissionRevenue, thisMonth: monthlyRevenue },
    };
  }
}
