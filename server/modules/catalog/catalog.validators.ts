import { z } from "zod";

export const createCategorySchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug must be lowercase, alphanumeric, and hyphens only."),
  name: z.string().min(2),
  shortName: z.string().min(2),
  iconUrl: z.string().url().optional(),
  sortOrder: z.number().int().default(0),
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
});
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial();
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export const createCitySchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  name: z.string().min(2),
  status: z.enum(["ACTIVE", "COMING_SOON"]).default("COMING_SOON"),
});
export type CreateCityInput = z.infer<typeof createCitySchema>;

export const updateCitySchema = createCitySchema.partial();
export type UpdateCityInput = z.infer<typeof updateCitySchema>;

export const createAreaSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  name: z.string().min(2),
});
export type CreateAreaInput = z.infer<typeof createAreaSchema>;

export const updateAreaSchema = createAreaSchema.partial();
export type UpdateAreaInput = z.infer<typeof updateAreaSchema>;
