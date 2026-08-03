import { z } from "zod";

export const updateCustomerProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  preferredArea: z.string().max(100).optional(),
  preferredLanguage: z.enum(["EN", "ROMAN_UR"]).optional(),
});

export type UpdateCustomerProfileInput = z.infer<typeof updateCustomerProfileSchema>;

const addressLabelSchema = z.enum(["HOME", "OFFICE", "OTHER"]);

export const createAddressSchema = z.object({
  label: addressLabelSchema.default("HOME"),
  citySlug: z.string().min(1, "City is required."),
  areaSlug: z.string().min(1, "Area is required."),
  street: z.string().min(3, "Street address is required."),
  landmark: z.string().max(150).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  isDefault: z.boolean().default(false),
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>;

export const updateAddressSchema = z.object({
  label: addressLabelSchema.optional(),
  citySlug: z.string().min(1).optional(),
  areaSlug: z.string().min(1).optional(),
  street: z.string().min(3).optional(),
  landmark: z.string().max(150).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  isDefault: z.boolean().optional(),
});

export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
