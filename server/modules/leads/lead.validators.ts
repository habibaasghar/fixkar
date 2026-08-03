import { z } from "zod";
import { phoneSchema } from "@/server/shared/validation";

export const createLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  phone: phoneSchema,
  city: z.string().min(2, "City slug is required."),
  area: z.string().min(2, "Area name is required."),
  service: z.string().min(2, "Service slug is required."),
  description: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTimeSlot: z.string().optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
