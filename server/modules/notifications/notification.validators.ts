import { z } from "zod";

export const updatePreferencesSchema = z.object({
  inAppEnabled: z.boolean().optional(),
  smsEnabled: z.boolean().optional(),
  whatsappEnabled: z.boolean().optional(),
  emailEnabled: z.boolean().optional(),
  pushEnabled: z.boolean().optional(),
  language: z.enum(["EN", "ROMAN_UR"]).optional(),
  quietHoursStart: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).nullable().optional(),
  quietHoursEnd: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).nullable().optional(),
});
export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;

export const createTemplateSchema = z.object({
  key: z.string().min(2),
  channel: z.enum(["IN_APP", "SMS", "WHATSAPP", "EMAIL", "PUSH"]),
  locale: z.string().min(2).default("en"),
  subject: z.string().max(200).optional(),
  body: z.string().min(1).max(2000),
});
export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;

export const previewTemplateSchema = z.object({
  key: z.string().min(2),
  channel: z.enum(["IN_APP", "SMS", "WHATSAPP", "EMAIL", "PUSH"]),
  locale: z.string().min(2).default("en"),
  variables: z.record(z.string(), z.union([z.string(), z.number()])).default({}),
});
export type PreviewTemplateInput = z.infer<typeof previewTemplateSchema>;

export const processQueueSchema = z.object({
  batchSize: z.coerce.number().int().min(1).max(200).default(50),
});
export type ProcessQueueInput = z.infer<typeof processQueueSchema>;
