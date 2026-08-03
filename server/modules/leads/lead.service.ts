import { LeadEventType, LeadStatus } from "@prisma/client";
import { LeadRepository } from "./lead.repository";
import { CreateLeadInput } from "./lead.validators";
import { logger } from "@/server/shared/logger";
import { ValidationError, NotFoundError, ForbiddenError, ConflictError } from "@/server/shared/errors";
import { CustomerService } from "@/server/modules/customers/customer.service";
import { DispatchService } from "@/server/modules/dispatch/dispatch.service";
import { NotificationService } from "@/server/modules/notifications/notification.service";
import { NOTIFICATION_EVENTS } from "@/server/modules/notifications/notification.types";
import { recordAuditLog } from "@/server/shared/audit";

export class LeadService {
  private static async generateReferenceCode(): Promise<string> {
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = `FK-${Math.floor(1000 + Math.random() * 9000)}`;
      if (!(await LeadRepository.isReferenceCodeTaken(code))) return code;
    }
    throw new ConflictError("Could not generate a unique lead reference. Please try again.");
  }

  static async createLead(input: CreateLeadInput) {
    const city = await LeadRepository.findCityBySlug(input.city);
    if (!city) throw new ValidationError("Invalid city selection.", [{ field: "city", issue: "City not found." }]);

    const area = await LeadRepository.findAreaByCityAndSlug(city.id, input.area);
    if (!area) throw new ValidationError("Invalid area selection.", [{ field: "area", issue: "Area not found in the selected city." }]);

    const category = await LeadRepository.findCategoryBySlug(input.service);
    if (!category) throw new ValidationError("Invalid service selection.", [{ field: "service", issue: "Service category not found." }]);

    // Lazily provisions User + CustomerProfile by phone — this flow is
    // anonymous (no Supabase session), mirroring the same lazy-provisioning
    // pattern already used in auth.middleware.ts and the Customer module.
    const customerProfile = await CustomerService.getOrCreateProfileByPhone(input.phone, input.name);

    const referenceCode = await this.generateReferenceCode();

    const lead = await LeadRepository.create({
      referenceCode,
      customerId: customerProfile.id,
      customerName: input.name,
      customerPhone: input.phone,
      citySlug: input.city,
      areaName: input.area,
      serviceSlug: input.service,
      cityId: city.id,
      areaId: area.id,
      categoryId: category.id,
      description: input.description,
      preferredDate: input.preferredDate,
      preferredTimeSlot: input.preferredTimeSlot,
    });

    await LeadRepository.recordEvent(lead.id, LeadEventType.CREATED);

    logger.info({
      module: "leads",
      action: "createLead",
      message: `New lead created: ${lead.id} (${referenceCode}) for ${input.service} in ${input.city}`,
      data: { leadId: lead.id, referenceCode, city: input.city, service: input.service },
    });

    await NotificationService.trigger(customerProfile.userId, NOTIFICATION_EVENTS.LEAD_CREATED, { leadId: lead.id, referenceCode });

    // Attempt immediate matching. No background job/cron exists in this
    // codebase yet — if no vendor is currently available the lead simply
    // stays UNASSIGNED; a future scheduled job is the natural place to retry.
    await DispatchService.assignNextVendor(lead.id);

    // Non-null: we just created this row above in the same request.
    return (await LeadRepository.findByIdWithRelations(lead.id))!;
  }

  static async getLeadById(id: string, requestingUserId: string) {
    const lead = await LeadRepository.findByIdWithRelations(id);
    if (!lead) throw new NotFoundError("Lead not found.");

    const isOwner = lead.customer?.userId === requestingUserId;
    const isAssignedVendor = lead.currentVendor?.userId === requestingUserId;
    if (!isOwner && !isAssignedVendor) {
      throw new ForbiddenError("You do not have permission to view this lead.");
    }

    return lead;
  }

  /** Called by the vendor accept route. Returns the lead on success. */
  static async acceptLead(leadId: string, vendorProfileId: string) {
    const lead = await LeadRepository.findById(leadId);
    if (!lead) throw new NotFoundError("Lead not found.");

    if (lead.status === LeadStatus.CANCELLED || lead.status === LeadStatus.EXPIRED || lead.status === LeadStatus.ACCEPTED) {
      throw new ConflictError(`Lead cannot be accepted — current status is ${lead.status}.`);
    }
    if (lead.currentVendorId !== vendorProfileId) {
      throw new ForbiddenError("This lead is not currently assigned to you.");
    }

    const transitioned = await LeadRepository.tryTransition(leadId, LeadStatus.ASSIGNED, LeadStatus.ACCEPTED, vendorProfileId);
    if (!transitioned) {
      // Someone else (a concurrent reject/expire) changed it first.
      throw new ConflictError("Lead is no longer available to accept.");
    }

    await LeadRepository.recordEvent(leadId, LeadEventType.ACCEPTED, vendorProfileId);

    logger.info({ module: "leads", action: "acceptLead", message: `Lead ${leadId} accepted by vendor ${vendorProfileId}` });

    const updatedLead = await LeadRepository.findByIdWithRelations(leadId);
    if (updatedLead?.customer?.userId) {
      await NotificationService.trigger(updatedLead.customer.userId, NOTIFICATION_EVENTS.VENDOR_ACCEPTED, { leadId });
    }

    return updatedLead;
  }

  /** Called by the vendor reject route. Attempts reassignment to the next candidate. */
  static async rejectLead(leadId: string, vendorProfileId: string) {
    const lead = await LeadRepository.findById(leadId);
    if (!lead) throw new NotFoundError("Lead not found.");

    if (lead.currentVendorId !== vendorProfileId || lead.status !== LeadStatus.ASSIGNED) {
      throw new ForbiddenError("This lead is not currently assigned to you.");
    }

    const transitioned = await LeadRepository.tryTransition(leadId, LeadStatus.ASSIGNED, LeadStatus.UNASSIGNED, vendorProfileId);
    if (!transitioned) {
      throw new ConflictError("Lead is no longer available to reject.");
    }

    await LeadRepository.recordEvent(leadId, LeadEventType.REJECTED, vendorProfileId);

    const leadWithCustomer = await LeadRepository.findByIdWithRelations(leadId);
    if (leadWithCustomer?.customer?.userId) {
      await NotificationService.trigger(leadWithCustomer.customer.userId, NOTIFICATION_EVENTS.VENDOR_REJECTED, { leadId });
    }

    logger.info({ module: "leads", action: "rejectLead", message: `Lead ${leadId} rejected by vendor ${vendorProfileId}` });

    const nextVendorId = await DispatchService.assignNextVendor(leadId);
    if (!nextVendorId) {
      await LeadRepository.tryTransition(leadId, LeadStatus.UNASSIGNED, LeadStatus.EXPIRED);
      await LeadRepository.recordEvent(leadId, LeadEventType.EXPIRED);
    }

    return LeadRepository.findByIdWithRelations(leadId);
  }


  static async listAssignedToVendor(vendorProfileId: string) {
    return LeadRepository.findAssignedToVendor(vendorProfileId);
  }

  /**
   * Background job entry point (see server/shared/jobs/definitions/expire-stale-leads.job.ts).
   * Idempotent: each lead's transition is guarded by tryTransition, so running
   * this twice in overlapping windows just no-ops on leads already moved on.
   */
  static async expireStaleAssignments(thresholdMs: number): Promise<{ processed: number; reassigned: number; expired: number }> {
    const olderThan = new Date(Date.now() - thresholdMs);
    const staleLeads = await LeadRepository.findStaleAssigned(olderThan);

    let reassigned = 0;
    let expired = 0;

    for (const lead of staleLeads) {
      if (!lead.currentVendorId) continue;

      const transitioned = await LeadRepository.tryTransition(lead.id, LeadStatus.ASSIGNED, LeadStatus.UNASSIGNED, lead.currentVendorId);
      if (!transitioned) continue; // already moved on by something else

      await LeadRepository.recordEvent(lead.id, LeadEventType.EXPIRED, lead.currentVendorId, "No vendor response within the acceptance window");

      const nextVendorId = await DispatchService.assignNextVendor(lead.id);
      if (nextVendorId) {
        reassigned += 1;
      } else {
        await LeadRepository.tryTransition(lead.id, LeadStatus.UNASSIGNED, LeadStatus.EXPIRED);
        await LeadRepository.recordEvent(lead.id, LeadEventType.EXPIRED, undefined, "No candidates available after timeout");
        expired += 1;
      }
    }

    return { processed: staleLeads.length, reassigned, expired };
  }

  // ---- Admin platform (Phase 14) ----

  static async adminSearch(filters: { status?: LeadStatus; citySlug?: string; search?: string }, page: number, pageSize: number) {
    return LeadRepository.listAll(filters, page, pageSize);
  }

  static async adminGetById(id: string) {
    const lead = await LeadRepository.findByIdWithRelations(id);
    if (!lead) throw new NotFoundError("Lead not found.");
    return lead;
  }

  /** Manual assignment — admin picks the vendor directly, bypassing the matching engine. */
  static async adminAssign(leadId: string, vendorId: string, adminUserId: string, ipAddress: string | null, notes?: string) {
    const lead = await LeadRepository.findById(leadId);
    if (!lead) throw new NotFoundError("Lead not found.");
    if (lead.status === LeadStatus.ACCEPTED || lead.status === LeadStatus.CANCELLED) {
      throw new ConflictError(`Cannot assign — lead is already ${lead.status}.`);
    }

    await LeadRepository.adminAssignToVendor(leadId, vendorId, notes);

    await recordAuditLog({
      adminUserId,
      action: "LEAD_MANUALLY_ASSIGNED",
      targetType: "Lead",
      targetId: leadId,
      previousState: { status: lead.status, currentVendorId: lead.currentVendorId },
      newState: { status: LeadStatus.ASSIGNED, currentVendorId: vendorId, notes },
      ipAddress,
    });

    logger.info({ module: "leads", action: "adminAssign", message: `Lead ${leadId} manually assigned to vendor ${vendorId} by admin ${adminUserId}` });

    return LeadRepository.findByIdWithRelations(leadId);
  }

  /** Forces reassignment via the normal matching engine, excluding the currently/previously assigned vendor. */
  static async adminReassign(leadId: string, adminUserId: string, ipAddress: string | null) {
    const lead = await LeadRepository.findById(leadId);
    if (!lead) throw new NotFoundError("Lead not found.");
    if (lead.status === LeadStatus.ACCEPTED || lead.status === LeadStatus.CANCELLED) {
      throw new ConflictError(`Cannot reassign — lead is already ${lead.status}.`);
    }

    if (lead.currentVendorId) {
      await LeadRepository.recordEvent(leadId, LeadEventType.REJECTED, lead.currentVendorId, "Reassigned by admin");
    }

    const nextVendorId = await DispatchService.assignNextVendor(leadId);

    await recordAuditLog({
      adminUserId,
      action: "LEAD_REASSIGNED",
      targetType: "Lead",
      targetId: leadId,
      previousState: { currentVendorId: lead.currentVendorId },
      newState: { currentVendorId: nextVendorId },
      ipAddress,
    });

    if (!nextVendorId) {
      await LeadRepository.tryTransition(leadId, LeadStatus.UNASSIGNED, LeadStatus.EXPIRED);
      await LeadRepository.recordEvent(leadId, LeadEventType.EXPIRED, undefined, "No candidates available on admin reassignment");
    }

    return LeadRepository.findByIdWithRelations(leadId);
  }

  static async adminCancel(leadId: string, adminUserId: string, ipAddress: string | null, notes?: string) {
    const lead = await LeadRepository.findById(leadId);
    if (!lead) throw new NotFoundError("Lead not found.");

    const transitioned =
      (await LeadRepository.tryTransition(leadId, LeadStatus.UNASSIGNED, LeadStatus.CANCELLED)) ||
      (await LeadRepository.tryTransition(leadId, LeadStatus.ASSIGNED, LeadStatus.CANCELLED));

    if (!transitioned) {
      throw new ConflictError(`Lead cannot be cancelled — current status is ${lead.status}.`);
    }

    await LeadRepository.recordEvent(leadId, LeadEventType.CANCELLED, undefined, notes);

    await recordAuditLog({
      adminUserId,
      action: "LEAD_CANCELLED",
      targetType: "Lead",
      targetId: leadId,
      previousState: { status: lead.status },
      newState: { status: LeadStatus.CANCELLED, notes },
      ipAddress,
    });

    return LeadRepository.findByIdWithRelations(leadId);
  }

  static async adminExpire(leadId: string, adminUserId: string, ipAddress: string | null, notes?: string) {
    const lead = await LeadRepository.findById(leadId);
    if (!lead) throw new NotFoundError("Lead not found.");

    const transitioned =
      (await LeadRepository.tryTransition(leadId, LeadStatus.UNASSIGNED, LeadStatus.EXPIRED)) ||
      (await LeadRepository.tryTransition(leadId, LeadStatus.ASSIGNED, LeadStatus.EXPIRED));

    if (!transitioned) {
      throw new ConflictError(`Lead cannot be expired — current status is ${lead.status}.`);
    }

    await LeadRepository.recordEvent(leadId, LeadEventType.EXPIRED, undefined, notes);

    await recordAuditLog({
      adminUserId,
      action: "LEAD_EXPIRED",
      targetType: "Lead",
      targetId: leadId,
      previousState: { status: lead.status },
      newState: { status: LeadStatus.EXPIRED, notes },
      ipAddress,
    });

    return LeadRepository.findByIdWithRelations(leadId);
  }
}
