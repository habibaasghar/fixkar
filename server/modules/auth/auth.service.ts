import { supabaseAdmin } from "@/server/shared/supabase";
import { logger, maskPhone, maskToken } from "@/server/shared/logger";
import { AuthenticationError, ExternalServiceError } from "@/server/shared/errors";
import { toE164 } from "@/server/shared/validation";
import { decodeJwtPayload } from "@/server/shared/jwt";

export type LogoutScope = "global" | "local" | "others";

export class AuthService {
  static async sendOtp(phone: string) {
    logger.info({
      module: "auth",
      action: "sendOtp",
      message: `Sending OTP to ${maskPhone(phone)}`,
    });

    const { error } = await supabaseAdmin.auth.signInWithOtp({
      phone: toE164(phone),
    });

    if (error) {
      logger.error({
        module: "auth",
        action: "sendOtp",
        message: "OTP send failed",
        data: { phone },
        error,
      });
      throw new ExternalServiceError("Failed to send OTP. Please try again shortly.");
    }

    return { success: true };
  }

  static async verifyOtp(phone: string, token: string) {
    logger.info({
      module: "auth",
      action: "verifyOtp",
      message: `Verifying OTP for ${maskPhone(phone)}`,
    });

    const { data, error } = await supabaseAdmin.auth.verifyOtp({
      phone: toE164(phone),
      token,
      type: "sms",
    });

    if (error || !data.session) {
      throw new AuthenticationError(error?.message || "Invalid or expired OTP.");
    }

    return data.session;
  }

  /**
   * Revokes refresh tokens server-side by JWT. `scope: "global"` (default)
   * revokes every session for this user across all devices; "local" revokes
   * only the session tied to this specific access token; "others" revokes
   * every session except this one — the building block for a future
   * "log out other devices" feature.
   */
  static async logout(accessToken: string, scope: LogoutScope = "global") {
    const { error } = await supabaseAdmin.auth.admin.signOut(accessToken, scope);
    if (error) {
      throw new ExternalServiceError("Failed to sign out. Please try again.");
    }
    logger.info({
      module: "auth",
      action: "logout",
      message: `Session signed out (scope=${scope})`,
      data: { token: maskToken(accessToken) },
    });
    return { success: true };
  }

  static async refreshSession(refreshToken: string) {
    const { data, error } = await supabaseAdmin.auth.refreshSession({ refresh_token: refreshToken });
    if (error || !data.session) {
      throw new AuthenticationError(error?.message || "Invalid or expired refresh token.");
    }
    return data.session;
  }

  /** Best-effort, informational only — see decodeJwtPayload's caveat. */
  static getSessionExpiry(accessToken: string): Date | null {
    const payload = decodeJwtPayload(accessToken);
    const exp = payload?.exp;
    return typeof exp === "number" ? new Date(exp * 1000) : null;
  }
}
