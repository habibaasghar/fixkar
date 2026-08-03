import { Role } from "@prisma/client";
import { AuthenticationError, ForbiddenError } from "../errors";
import { supabaseAdmin } from "../supabase";
import { db } from "../db";

export interface AuthContext {
  /** Our Prisma `User.id` — NOT the Supabase Auth user id. They are different UUID spaces. */
  userId: string;
  phone: string;
  role: Role;
}

/** Supabase stores verified phones as E.164 digits with no leading '+' (e.g. "923001234567"). */
function toLocalPhone(e164Phone: string): string {
  const digits = e164Phone.replace(/\D/g, "");
  return digits.startsWith("92") ? `0${digits.slice(2)}` : digits;
}

export async function authenticateRequest(req: Request): Promise<AuthContext> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError("Missing or invalid Authorization header.");
  }

  const token = authHeader.split(" ")[1];
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user || !user.phone) {
    throw new AuthenticationError("Invalid or expired session token.");
  }

  const localPhone = toLocalPhone(user.phone);

  // Role is read from OUR database, never from Supabase `user_metadata` — that
  // field is client-writable by default (via the client SDK's updateUser call)
  // and must never be trusted as an authorization signal. Only our own
  // `users.role` column, written exclusively by server-side code (e.g. vendor
  // registration), is authoritative.
  let dbUser = await db.user.findUnique({ where: { phone: localPhone } });
  if (!dbUser) {
    // First-time verified phone with no domain record yet — create the bare
    // account shell. Attaching a CustomerProfile is Customer-module scope,
    // deliberately not done here.
    dbUser = await db.user.create({ data: { phone: localPhone, role: Role.CUSTOMER } });
  }

  return {
    userId: dbUser.id,
    phone: dbUser.phone,
    role: dbUser.role,
  };
}

export function requireRole(context: AuthContext, allowedRoles: Role[]) {
  if (!allowedRoles.includes(context.role)) {
    throw new ForbiddenError("You do not have permission to perform this action.");
  }
}
