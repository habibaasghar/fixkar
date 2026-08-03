import { VendorDocumentType, VerificationStatus } from "@prisma/client";
import { VendorRepository } from "./vendor.repository";
import { FileService } from "@/server/modules/files/file.service";
import { NotFoundError, ValidationError, ConflictError } from "@/server/shared/errors";
import { logger, maskPhone } from "@/server/shared/logger";
import {
  RegisterVendorInput,
  UpdateVendorProfileInput,
  UpdateVendorAvailabilityInput,
  AddVendorDocumentInput,
  AddPortfolioItemInput,
} from "./vendor.validators";
import { PublicVendorProfile } from "./vendor.types";
import { recordAuditLog } from "@/server/shared/audit";
import { NotificationService } from "@/server/modules/notifications/notification.service";
import { NOTIFICATION_EVENTS } from "@/server/modules/notifications/notification.types";

export interface RegistrationFiles {
  cnicFront: { file: Buffer; filename: string; mimeType: string };
  cnicBack: { file: Buffer; filename: string; mimeType: string };
  selfie?: { file: Buffer; filename: string; mimeType: string };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "vendor";
}

export class VendorService {
  private static async generateUniqueSlug(base: string): Promise<string> {
    const root = slugify(base);
    let candidate = root;
    let attempt = 0;
    while (await VendorRepository.isSlugTaken(candidate)) {
      attempt += 1;
      candidate = `${root}-${Math.random().toString(36).slice(2, 6)}`;
      if (attempt > 5) throw new ConflictError("Could not generate a unique profile slug. Please try again.");
    }
    return candidate;
  }

  static async registerVendor(input: RegisterVendorInput, files: RegistrationFiles) {
    const city = await VendorRepository.findCityBySlug(input.citySlug);
    if (!city) throw new ValidationError("Invalid city selection.", [{ field: "citySlug", issue: "City not found." }]);

    const area = await VendorRepository.findAreaByCityAndSlug(city.id, input.areaSlug);
    if (!area) throw new ValidationError("Invalid area selection.", [{ field: "areaSlug", issue: "Area not found in the selected city." }]);

    const category = await VendorRepository.findCategoryBySlug(input.categorySlug);
    if (!category) throw new ValidationError("Invalid category selection.", [{ field: "categorySlug", issue: "Service category not found." }]);

    const slug = await this.generateUniqueSlug(input.businessName || input.fullName);

    const [cnicFrontUpload, cnicBackUpload, selfieUpload] = await Promise.all([
      FileService.uploadFile({ ...files.cnicFront, bucket: "vendorDocs" }),
      FileService.uploadFile({ ...files.cnicBack, bucket: "vendorDocs" }),
      files.selfie ? FileService.uploadFile({ ...files.selfie, bucket: "vendorDocs" }) : Promise.resolve(undefined),
    ]);

    try {
      const vendorProfile = await VendorRepository.registerVendor({
        phone: input.phone,
        slug,
        fullName: input.fullName,
        businessName: input.businessName,
        bio: input.bio,
        experienceYears: input.experienceYears,
        cityId: city.id,
        areaId: area.id,
        categoryId: category.id,
        cnicNumber: input.cnicNumber,
        cnicFrontUrl: cnicFrontUpload.path,
        cnicBackUrl: cnicBackUpload.path,
        selfieUrl: selfieUpload?.path,
      });

      logger.info({
        module: "vendors",
        action: "registerVendor",
        message: `New vendor registered: ${vendorProfile.id} (${maskPhone(input.phone)})`,
        data: { vendorId: vendorProfile.id, citySlug: input.citySlug, categorySlug: input.categorySlug },
      });

      await NotificationService.trigger(vendorProfile.userId, NOTIFICATION_EVENTS.VENDOR_REGISTERED, { vendorId: vendorProfile.id });

      return {
        vendorId: vendorProfile.id,
        slug: vendorProfile.slug,
        verificationStatus: vendorProfile.verification!.status,
      };
    } catch (err) {
      if (err instanceof Error && err.message === "VENDOR_ALREADY_REGISTERED") {
        throw new ConflictError("This phone number is already registered as a vendor.");
      }
      throw err;
    }
  }

  static async getPublicProfile(id: string): Promise<PublicVendorProfile> {
    const profile = await VendorRepository.findPublicProfileById(id);
    if (!profile) throw new NotFoundError("Vendor profile not found.");

    return {
      id: profile.id,
      slug: profile.slug,
      fullName: profile.fullName,
      businessName: profile.businessName,
      tagline: profile.tagline,
      bio: profile.bio,
      profilePhotoUrl: profile.profilePhotoUrl,
      skills: profile.skills,
      languagesSpoken: profile.languagesSpoken,
      experienceYears: profile.experienceYears,
      city: profile.city,
      areas: profile.areas,
      categories: profile.categories,
      verificationTier: profile.verificationTier,
      averageRating: profile.averageRating,
      totalReviews: profile.totalReviews,
      portfolio: profile.portfolioItems,
    };
  }

  static async getOwnProfile(userId: string) {
    const profile = await VendorRepository.findFullProfileByUserId(userId);
    if (!profile) throw new NotFoundError("No vendor profile exists for this account.");
    return profile;
  }

  static async updateOwnProfile(userId: string, input: UpdateVendorProfileInput) {
    const profile = await VendorRepository.findFullProfileByUserId(userId);
    if (!profile) throw new NotFoundError("No vendor profile exists for this account.");

    let areaIds: string[] | undefined;
    if (input.areaSlugs) {
      const areas = await VendorRepository.findAreasBySlug(profile.cityId, input.areaSlugs);
      if (areas.length !== input.areaSlugs.length) {
        throw new ValidationError("One or more areas are invalid for this vendor's city.", [{ field: "areaSlugs", issue: "Unrecognized area slug." }]);
      }
      areaIds = areas.map((a) => a.id);
    }

    let categoryIds: string[] | undefined;
    if (input.categorySlugs) {
      const categories = await VendorRepository.findCategoriesBySlug(input.categorySlugs);
      if (categories.length !== input.categorySlugs.length) {
        throw new ValidationError("One or more categories are invalid.", [{ field: "categorySlugs", issue: "Unrecognized category slug." }]);
      }
      categoryIds = categories.map((c) => c.id);
    }

    return VendorRepository.updateProfile(profile.id, {
      fullName: input.fullName,
      businessName: input.businessName,
      tagline: input.tagline,
      bio: input.bio,
      experienceYears: input.experienceYears,
      skills: input.skills,
      languagesSpoken: input.languagesSpoken,
      areaIds,
      categoryIds,
    });
  }

  static async updateAvailability(userId: string, input: UpdateVendorAvailabilityInput) {
    const profile = await VendorRepository.findFullProfileByUserId(userId);
    if (!profile) throw new NotFoundError("No vendor profile exists for this account.");
    return VendorRepository.upsertAvailability(profile.id, input);
  }

  static async addDocument(userId: string, input: AddVendorDocumentInput) {
    const profile = await VendorRepository.findFullProfileByUserId(userId);
    if (!profile) throw new NotFoundError("No vendor profile exists for this account.");
    return VendorRepository.addDocument(profile.id, input.type as VendorDocumentType, input.filePath, "vendorDocs");
  }

  static async addPortfolioItem(userId: string, input: AddPortfolioItemInput) {
    const profile = await VendorRepository.findFullProfileByUserId(userId);
    if (!profile) throw new NotFoundError("No vendor profile exists for this account.");
    return VendorRepository.addPortfolioItem(profile.id, input.imageUrl, input.caption);
  }

  // ---- Admin platform (Phase 14) ----

  static async adminListVendors(filters: { verificationStatus?: VerificationStatus; citySlug?: string; search?: string }, page: number, pageSize: number) {
    return VendorRepository.listAll(filters, page, pageSize);
  }

  static async adminGetVendor(vendorId: string) {
    const profile = await VendorRepository.findFullProfileById(vendorId);
    if (!profile) throw new NotFoundError("Vendor not found.");
    return profile;
  }

  /**
   * Phase 18 fix: the admin verification queue previously received only the
   * private-bucket storage *paths* of a vendor's KYC documents, with no way
   * to view them. This generates short-lived signed URLs (5-min default via
   * FileService) for the CNIC front/back, selfie, and any uploaded business
   * docs/certifications — all in the private `vendorDocs` bucket. Admin-only;
   * the URLs expire quickly so they can't be shared or leaked long-term.
   */
  static async adminGetDocumentSignedUrls(vendorId: string) {
    const profile = await VendorRepository.findFullProfileById(vendorId);
    if (!profile) throw new NotFoundError("Vendor not found.");

    const verification = profile.verification;
    const [cnicFrontUrl, cnicBackUrl, selfieUrl] = await Promise.all([
      verification?.cnicFrontUrl ? FileService.getSignedUrl("vendorDocs", verification.cnicFrontUrl) : Promise.resolve(null),
      verification?.cnicBackUrl ? FileService.getSignedUrl("vendorDocs", verification.cnicBackUrl) : Promise.resolve(null),
      verification?.selfieUrl ? FileService.getSignedUrl("vendorDocs", verification.selfieUrl) : Promise.resolve(null),
    ]);

    const documents = await Promise.all(
      profile.documents.map(async (doc) => ({
        id: doc.id,
        type: doc.type,
        signedUrl: await FileService.getSignedUrl("vendorDocs", doc.fileUrl),
      }))
    );

    return {
      vendorId,
      verificationStatus: verification?.status ?? null,
      cnicFrontUrl,
      cnicBackUrl,
      selfieUrl,
      documents,
    };
  }

  private static async adminUpdateVerification(
    vendorId: string,
    status: VerificationStatus,
    notes: string | undefined,
    adminUserId: string,
    ipAddress: string | null,
    event: typeof NOTIFICATION_EVENTS.VENDOR_VERIFICATION_APPROVED | typeof NOTIFICATION_EVENTS.VENDOR_VERIFICATION_REJECTED,
  ) {
    const profile = await VendorRepository.findFullProfileById(vendorId);
    if (!profile) throw new NotFoundError("Vendor not found.");

    const previousStatus = profile.verification?.status;
    await VendorRepository.updateVerificationStatus(vendorId, status, notes);

    await recordAuditLog({
      adminUserId,
      action: status === VerificationStatus.VERIFIED ? "VENDOR_APPROVED" : "VENDOR_REJECTED",
      targetType: "VendorProfile",
      targetId: vendorId,
      previousState: { verificationStatus: previousStatus },
      newState: { verificationStatus: status, notes },
      ipAddress,
    });

    await NotificationService.trigger(profile.userId, event, { vendorId, notes });

    return VendorRepository.findFullProfileById(vendorId);
  }

  static async adminApprove(vendorId: string, notes: string | undefined, adminUserId: string, ipAddress: string | null) {
    return this.adminUpdateVerification(vendorId, VerificationStatus.VERIFIED, notes, adminUserId, ipAddress, NOTIFICATION_EVENTS.VENDOR_VERIFICATION_APPROVED);
  }

  static async adminReject(vendorId: string, notes: string | undefined, adminUserId: string, ipAddress: string | null) {
    return this.adminUpdateVerification(vendorId, VerificationStatus.REJECTED, notes, adminUserId, ipAddress, NOTIFICATION_EVENTS.VENDOR_VERIFICATION_REJECTED);
  }

  static async adminSuspend(vendorId: string, adminUserId: string, ipAddress: string | null, notes?: string) {
    const profile = await VendorRepository.findFullProfileById(vendorId);
    if (!profile) throw new NotFoundError("Vendor not found.");

    await VendorRepository.deactivateProfile(vendorId);
    await VendorRepository.updateVerificationStatus(vendorId, VerificationStatus.SUSPENDED, notes);

    await recordAuditLog({
      adminUserId,
      action: "VENDOR_SUSPENDED",
      targetType: "VendorProfile",
      targetId: vendorId,
      previousState: { deletedAt: null },
      newState: { deletedAt: new Date().toISOString(), notes },
      ipAddress,
    });

    await NotificationService.trigger(profile.userId, NOTIFICATION_EVENTS.VENDOR_SUSPENDED, { vendorId });

    logger.info({ module: "vendors", action: "adminSuspend", message: `Vendor ${vendorId} suspended by admin ${adminUserId}` });

    return VendorRepository.findFullProfileById(vendorId);
  }

  static async adminRestore(vendorId: string, adminUserId: string, ipAddress: string | null) {
    const profile = await VendorRepository.findFullProfileById(vendorId);
    if (!profile) throw new NotFoundError("Vendor not found.");

    await VendorRepository.restoreProfile(vendorId);

    await recordAuditLog({
      adminUserId,
      action: "VENDOR_RESTORED",
      targetType: "VendorProfile",
      targetId: vendorId,
      previousState: { deletedAt: profile.deletedAt },
      newState: { deletedAt: null },
      ipAddress,
    });

    await NotificationService.trigger(profile.userId, NOTIFICATION_EVENTS.VENDOR_RESTORED, { vendorId });

    logger.info({ module: "vendors", action: "adminRestore", message: `Vendor ${vendorId} restored by admin ${adminUserId}` });

    return VendorRepository.findFullProfileById(vendorId);
  }
}
