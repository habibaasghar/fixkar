import { db } from "@/server/shared/db";
import { Role, VendorDocumentType, VerificationStatus, Prisma } from "@prisma/client";
import { NOT_DELETED, softDeleteData } from "@/server/shared/soft-delete";

const ADMIN_FULL_INCLUDE = {
  city: true,
  areas: true,
  categories: true,
  verification: true,
  availability: true,
  documents: true, // admin CAN see fileUrl/bucket, unlike the vendor's own "me" view
  portfolioItems: { orderBy: { sortOrder: "asc" as const } },
  bookings: { select: { id: true, status: true, createdAt: true }, orderBy: { createdAt: "desc" as const }, take: 20 },
};

const PUBLIC_PROFILE_INCLUDE = {
  city: { select: { slug: true, name: true } },
  areas: { select: { slug: true, name: true } },
  categories: { select: { slug: true, name: true } },
  portfolioItems: { select: { imageUrl: true, caption: true }, orderBy: { sortOrder: "asc" as const } },
};

export class VendorRepository {
  static async findCityBySlug(slug: string) {
    return db.city.findUnique({ where: { slug } });
  }

  static async findAreaByCityAndSlug(cityId: string, areaSlug: string) {
    return db.area.findUnique({ where: { cityId_slug: { cityId, slug: areaSlug } } });
  }

  static async findAreasBySlug(cityId: string, slugs: string[]) {
    return db.area.findMany({ where: { cityId, slug: { in: slugs } } });
  }

  static async findCategoryBySlug(slug: string) {
    return db.serviceCategory.findUnique({ where: { slug } });
  }

  static async findCategoriesBySlug(slugs: string[]) {
    return db.serviceCategory.findMany({ where: { slug: { in: slugs } } });
  }

  static async findUserByPhone(phone: string) {
    return db.user.findUnique({ where: { phone }, include: { vendorProfile: true, customerProfile: true } });
  }

  static async isSlugTaken(slug: string): Promise<boolean> {
    const existing = await db.vendorProfile.findUnique({ where: { slug }, select: { id: true } });
    return existing !== null;
  }

  /**
   * Creates (or links to an existing) User, plus VendorProfile, VendorVerification,
   * and a default VendorAvailability row, all atomically.
   */
  static async registerVendor(params: {
    phone: string;
    slug: string;
    fullName: string;
    businessName?: string;
    bio?: string;
    experienceYears: number;
    cityId: string;
    areaId: string;
    categoryId: string;
    cnicNumber: string;
    cnicFrontUrl: string;
    cnicBackUrl: string;
    selfieUrl?: string;
  }) {
    return db.$transaction(async (tx) => {
      let user = await tx.user.findUnique({ where: { phone: params.phone }, include: { vendorProfile: true, customerProfile: true } });

      if (user?.vendorProfile) {
        throw new Error("VENDOR_ALREADY_REGISTERED");
      }

      if (!user) {
        user = await tx.user.create({ data: { phone: params.phone, role: Role.VENDOR }, include: { vendorProfile: true, customerProfile: true } });
      } else if (!user.customerProfile) {
        // Shell account with no real identity attached yet — safe to promote to VENDOR.
        user = await tx.user.update({ where: { id: user.id }, data: { role: Role.VENDOR }, include: { vendorProfile: true, customerProfile: true } });
      }
      // If the user already has a customerProfile, leave `role` as CUSTOMER and just
      // attach a vendorProfile below — this account now has both capabilities.

      const vendorProfile = await tx.vendorProfile.create({
        data: {
          userId: user.id,
          slug: params.slug,
          fullName: params.fullName,
          businessName: params.businessName,
          bio: params.bio,
          experienceYears: params.experienceYears,
          cityId: params.cityId,
          areas: { connect: [{ id: params.areaId }] },
          categories: { connect: [{ id: params.categoryId }] },
          verification: {
            create: {
              cnicNumber: params.cnicNumber,
              cnicFrontUrl: params.cnicFrontUrl,
              cnicBackUrl: params.cnicBackUrl,
              selfieUrl: params.selfieUrl,
            },
          },
          availability: { create: {} },
        },
        include: { verification: true, availability: true },
      });

      return vendorProfile;
    });
  }

  static async findPublicProfileById(id: string) {
    return db.vendorProfile.findFirst({
      where: { id, ...NOT_DELETED },
      include: PUBLIC_PROFILE_INCLUDE,
    });
  }

  static async findFullProfileByUserId(userId: string) {
    return db.vendorProfile.findFirst({
      where: { userId, ...NOT_DELETED },
      include: {
        city: true,
        areas: true,
        categories: true,
        verification: true,
        availability: true,
        documents: { select: { id: true, type: true, createdAt: true } }, // never expose fileUrl/bucket here
        portfolioItems: { orderBy: { sortOrder: "asc" } },
      },
    });
  }

  static async updateProfile(vendorId: string, data: {
    fullName?: string;
    businessName?: string;
    tagline?: string;
    bio?: string;
    experienceYears?: number;
    skills?: string[];
    languagesSpoken?: string[];
    areaIds?: string[];
    categoryIds?: string[];
  }) {
    return db.vendorProfile.update({
      where: { id: vendorId },
      data: {
        fullName: data.fullName,
        businessName: data.businessName,
        tagline: data.tagline,
        bio: data.bio,
        experienceYears: data.experienceYears,
        skills: data.skills,
        languagesSpoken: data.languagesSpoken,
        ...(data.areaIds ? { areas: { set: data.areaIds.map((id) => ({ id })) } } : {}),
        ...(data.categoryIds ? { categories: { set: data.categoryIds.map((id) => ({ id })) } } : {}),
      },
    });
  }

  static async deactivateProfile(vendorId: string) {
    return db.vendorProfile.update({ where: { id: vendorId }, data: softDeleteData() });
  }

  static async restoreProfile(vendorId: string) {
    return db.vendorProfile.update({ where: { id: vendorId }, data: { deletedAt: null } });
  }

  /** Admin view — includes fields never exposed via the vendor's own "me" endpoints (CNIC/document URLs, verification notes). */
  static async findFullProfileById(vendorId: string) {
    return db.vendorProfile.findUnique({ where: { id: vendorId }, include: ADMIN_FULL_INCLUDE });
  }

  static async listAll(filters: { verificationStatus?: VerificationStatus; citySlug?: string; search?: string }, page: number, pageSize: number) {
    const where: Prisma.VendorProfileWhereInput = {
      ...(filters.verificationStatus ? { verification: { status: filters.verificationStatus } } : {}),
      ...(filters.citySlug ? { city: { slug: filters.citySlug } } : {}),
      ...(filters.search
        ? { OR: [{ fullName: { contains: filters.search, mode: "insensitive" } }, { businessName: { contains: filters.search, mode: "insensitive" } }] }
        : {}),
    };

    const [total, items] = await Promise.all([
      db.vendorProfile.count({ where }),
      db.vendorProfile.findMany({
        where,
        include: { city: { select: { slug: true, name: true } }, verification: { select: { status: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return { total, items };
  }

  static async updateVerificationStatus(vendorId: string, status: VerificationStatus, notes?: string) {
    return db.vendorVerification.update({
      where: { vendorId },
      data: { status, notes, verifiedAt: status === VerificationStatus.VERIFIED ? new Date() : undefined },
    });
  }

  static async upsertAvailability(vendorId: string, data: {
    workingDays?: number[];
    workingHoursStart?: string;
    workingHoursEnd?: string;
    isVacationMode?: boolean;
    vacationStart?: Date;
    vacationEnd?: Date;
    isEmergencyAvailable?: boolean;
  }) {
    return db.vendorAvailability.upsert({
      where: { vendorId },
      create: { vendorId, ...data },
      update: data,
    });
  }

  /** For the vendor-availability-refresh job: nothing currently auto-clears isVacationMode once vacationEnd passes. Returns the count updated. */
  static async clearExpiredVacationMode(): Promise<number> {
    const result = await db.vendorAvailability.updateMany({
      where: { isVacationMode: true, vacationEnd: { lt: new Date() } },
      data: { isVacationMode: false },
    });
    return result.count;
  }

  static async addDocument(vendorId: string, type: VendorDocumentType, fileUrl: string, bucket: string) {
    return db.vendorDocument.create({ data: { vendorId, type, fileUrl, bucket } });
  }

  static async addPortfolioItem(vendorId: string, imageUrl: string, caption?: string) {
    const count = await db.portfolioItem.count({ where: { vendorId } });
    return db.portfolioItem.create({ data: { vendorId, imageUrl, caption, sortOrder: count } });
  }
}
