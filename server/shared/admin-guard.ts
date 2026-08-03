import { authenticateRequest, AuthContext } from "./middleware/auth.middleware";
import { requirePermission, Permission } from "./permissions";
import { getClientIp } from "./middleware/rate-limit.middleware";

/**
 * Every admin route needs the same three things: an authenticated identity,
 * a permission check, and the caller's IP for the audit log entry the
 * underlying service call will write. Extracted once so 30+ admin routes
 * don't each hand-roll it.
 */
export async function requireAdminAuth(request: Request, permission: Permission): Promise<{ auth: AuthContext; ipAddress: string }> {
  const auth = await authenticateRequest(request);
  requirePermission(auth, permission);
  return { auth, ipAddress: getClientIp(request) };
}
