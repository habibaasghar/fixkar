import { z } from "zod";
import { phoneSchema, otpCodeSchema } from "@/server/shared/validation";

export const sendOtpSchema = z.object({
  phone: phoneSchema,
});

export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  otp: otpCodeSchema,
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export const refreshSessionSchema = z.object({
  refreshToken: z.string().min(1, "refreshToken is required."),
});

export type RefreshSessionInput = z.infer<typeof refreshSessionSchema>;

export const logoutSchema = z.object({
  scope: z.enum(["global", "local", "others"]).default("global"),
});

export type LogoutInput = z.infer<typeof logoutSchema>;
