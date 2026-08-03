import { LeadRepository } from "@/server/modules/leads/lead.repository";
import { findMatchingVendors } from "./dispatch.engine";
import { NotificationService } from "@/server/modules/notifications/notification.service";
import { NOTIFICATION_EVENTS } from "@/server/modules/notifications/notification.types";
import { logger } from "@/server/shared/logger";

export class DispatchService {
  /**
   * Finds the best remaining candidate and assigns the lead to them
   * atomically, writing the LeadStatusLog entry in the same transaction
   * (via LeadRepository.assignToVendor). Returns the assigned vendor's id,
   * or null if no candidate was available (lead is left in UNASSIGNED — a
   * valid state, not an error, for a young marketplace with few vendors
   * online).
   */
  static async assignNextVendor(leadId: string): Promise<string | null> {
    const lead = await LeadRepository.findById(leadId);
    if (!lead) return null;

    const excludeVendorIds = await LeadRepository.getRejectedVendorIds(leadId);

    const candidates = await findMatchingVendors({
      cityId: lead.cityId,
      areaId: lead.areaId,
      categoryId: lead.categoryId,
      excludeVendorIds,
    });

    if (candidates.length === 0) {
      logger.info({ module: "dispatch", action: "assignNextVendor", message: `No matching vendors for lead ${leadId}` });
      return null;
    }

    const vendor = candidates[0];
    await LeadRepository.assignToVendor(leadId, vendor.id);
    await NotificationService.trigger(vendor.userId, NOTIFICATION_EVENTS.LEAD_ASSIGNED, { leadId });

    logger.info({
      module: "dispatch",
      action: "assignNextVendor",
      message: `Lead ${leadId} assigned to vendor ${vendor.id}`,
      data: { leadId, vendorId: vendor.id },
    });

    return vendor.id;
  }
}
