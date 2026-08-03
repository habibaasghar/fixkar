/**
 * Central registry of rate limits, per Phase 8 API Blueprint §14.
 * Keeping limits here (instead of scattered magic numbers per route) is the
 * single source of truth referenced by every route handler.
 */
export const RATE_LIMITS = {
  /** POST /v1/auth/send-otp — per phone number. Prevents SMS-bombing a single number. */
  sendOtp: { limit: 5, windowMs: 15 * 60 * 1000 },
  /** POST /v1/auth/verify-otp — per phone number. Prevents OTP brute-forcing. */
  verifyOtp: { limit: 10, windowMs: 15 * 60 * 1000 },
  /** POST /v1/auth/refresh — per IP (no bearer token to key on yet at this point). */
  authRefresh: { limit: 20, windowMs: 15 * 60 * 1000 },
  /** POST /v1/leads — per IP address. Prevents anonymous lead-spam. */
  leadSubmission: { limit: 3, windowMs: 10 * 60 * 1000 },
  /** POST /v1/partner/register — per phone number. Prevents CNIC-upload spam via the anonymous registration flow. */
  partnerRegister: { limit: 3, windowMs: 30 * 60 * 1000 },
  /** Authenticated general API — per JWT token/user. */
  general: { limit: 100, windowMs: 60 * 1000 },
  /** Authenticated admin API — per admin token. */
  admin: { limit: 300, windowMs: 60 * 1000 },
  /** POST /v1/files/upload — per authenticated user. */
  fileUpload: { limit: 10, windowMs: 5 * 60 * 1000 },
} as const;
