import { z } from "zod";
import { phoneSchema, cnicSchema } from "@/server/shared/validation";

/**
 * Registration is multipart/form-data (text fields + files together) so files
 * are validated separately by FileService in the route handler, not here.
 */
export const registerVendorSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phone: phoneSchema,
  citySlug: z.string().min(1, "City selection is required."),
  areaSlug: z.string().min(1, "Working area is required."),
  categorySlug: z.string().min(1, "Primary service category is required."),
  experienceYears: z.coerce.number().int().min(0).default(1),
  businessName: z.string().max(120).optional(),
  bio: z.string().max(1000).optional(),
  cnicNumber: cnicSchema,
});

export type RegisterVendorInput = z.infer<typeof registerVendorSchema>;

export const updateVendorProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  businessName: z.string().max(120).optional(),
  tagline: z.string().max(150).optional(),
  bio: z.string().max(1000).optional(),
  experienceYears: z.number().int().min(0).optional(),
  skills: z.array(z.string().min(1)).max(20).optional(),
  languagesSpoken: z.array(z.string().min(1)).max(10).optional(),
  areaSlugs: z.array(z.string().min(1)).min(1).max(20).optional(),
  categorySlugs: z.array(z.string().min(1)).min(1).max(10).optional(),
});

export type UpdateVendorProfileInput = z.infer<typeof updateVendorProfileSchema>;

const timeOfDaySchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be in HH:MM 24-hour format.");

export const updateVendorAvailabilitySchema = z.object({
  workingDays: z.array(z.number().int().min(0).max(6)).max(7).optional(),
  workingHoursStart: timeOfDaySchema.optional(),
  workingHoursEnd: timeOfDaySchema.optional(),
  isVacationMode: z.boolean().optional(),
  vacationStart: z.coerce.date().optional(),
  vacationEnd: z.coerce.date().optional(),
  isEmergencyAvailable: z.boolean().optional(),
});

export type UpdateVendorAvailabilityInput = z.infer<typeof updateVendorAvailabilitySchema>;

export const addVendorDocumentSchema = z.object({
  type: z.enum(["BUSINESS_DOCUMENT", "CERTIFICATION"]),
  filePath: z.string().min(1, "filePath from a prior /v1/files/upload call is required."),
});

export type AddVendorDocumentInput = z.infer<typeof addVendorDocumentSchema>;

export const addPortfolioItemSchema = z.object({
  imageUrl: z.string().url(),
  caption: z.string().max(200).optional(),
});

export type AddPortfolioItemInput = z.infer<typeof addPortfolioItemSchema>;
