/**
 * Informational-only JWT payload decode — NOT a signature verification.
 * Real validation already happens via supabaseAdmin.auth.getUser(token),
 * which round-trips to Supabase per request. This is only used to surface
 * `exp`/`iat` to the client for display (e.g. "session expires at ...").
 */
export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = Buffer.from(parts[1].replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8");
    return JSON.parse(payload);
  } catch {
    return null;
  }
}
