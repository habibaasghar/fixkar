import { z } from "zod";

/**
 * Shared Zod primitives reused across backend modules (and safe to import
 * from client components too — this file has zero server-only dependencies).
 */

export const phoneSchema = z
  .string()
  .regex(/^03\d{9}$/, "Phone number must be a valid 11-digit Pakistani mobile number (03XXXXXXXXX).");

export const cnicSchema = z
  .string()
  .regex(/^\d{5}-\d{7}-\d{1}$/, "CNIC must follow format 12345-1234567-1.");

export const otpCodeSchema = z.string().length(6, "OTP must be a 6-digit code.");

export const uuidSchema = z.string().uuid("Must be a valid UUID.");

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

/** Converts a local "03XXXXXXXXX" number to E.164 ("+92XXXXXXXXXX") for Supabase Auth / SMS gateways. */
export function toE164(localPhone: string): string {
  return `+92${localPhone.replace(/^0/, "")}`;
}
