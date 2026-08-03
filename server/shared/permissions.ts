import { Role } from "@prisma/client";
import { ForbiddenError } from "./errors";
import { AuthContext } from "./middleware/auth.middleware";

/**
 * Permission registry: adding a role only ever means adding one Role enum
 * value (an additive Prisma migration) plus one entry to ROLE_PERMISSIONS
 * below — the authorization logic itself (hasPermission/requirePermission)
 * never changes. This is what "supports future roles without redesign"
 * means in practice; it does not require abandoning the Postgres enum for a
 * free-text role column, which would trade away DB-level type safety for a
 * flexibility V1 doesn't actually need (the full V1 role set was already
 * fixed in Phase 8: CUSTOMER/VENDOR/ADMIN/SUPER_ADMIN).
 */
export const PERMISSIONS = {
  CUSTOMER_PROFILE_READ_OWN: "customer:profile:read:own",
  CUSTOMER_PROFILE_WRITE_OWN: "customer:profile:write:own",
  VENDOR_PROFILE_READ_OWN: "vendor:profile:read:own",
  VENDOR_PROFILE_WRITE_OWN: "vendor:profile:write:own",
  VENDOR_DOCUMENT_WRITE_OWN: "vendor:document:write:own",
  VENDOR_VERIFY: "vendor:verify",
  ADMIN_ACCESS: "admin:access",
  // Admin platform (Phase 14) — granular per-domain permissions so the 4
  // admin roles (SUPPORT/OPERATIONS/ADMIN/SUPER_ADMIN) differ in what they
  // can actually do, not just in name.
  ADMIN_DASHBOARD_VIEW: "admin:dashboard:view",
  ADMIN_SEARCH: "admin:search",
  ADMIN_VENDOR_VIEW: "admin:vendor:view",
  ADMIN_VENDOR_MANAGE: "admin:vendor:manage", // approve/reject/suspend/restore
  ADMIN_CUSTOMER_VIEW: "admin:customer:view",
  ADMIN_CUSTOMER_MANAGE: "admin:customer:manage", // suspend/restore
  ADMIN_LEAD_MANAGE: "admin:lead:manage", // assign/reassign/cancel/expire
  ADMIN_BOOKING_MANAGE: "admin:booking:manage", // edit/force-status/cancel/complete
  ADMIN_CATALOG_MANAGE: "admin:catalog:manage", // categories/cities/areas CRUD
  ADMIN_REVIEW_MODERATE: "admin:review:moderate",
  // Financial engine (Phase 15)
  ADMIN_FINANCE_VIEW: "admin:finance:view", // dashboard revenue, reports, wallet/settlement viewing
  ADMIN_FINANCE_MANAGE: "admin:finance:manage", // manual adjustments, refunds, settlements, commission rules
  // Communication platform (Phase 16)
  ADMIN_NOTIFICATION_MANAGE: "admin:notification:manage", // history, retry, templates, provider status, queue processing
  // Production hardening (Phase 17) — infra-level operations (manually
  // running background jobs, detailed health/cache internals). Deliberately
  // SUPER_ADMIN-only, not granted to ADMIN: this is the first genuinely
  // super-admin-exclusive permission, resolving the "SUPER_ADMIN has nothing
  // ADMIN doesn't" gap flagged as technical debt back in Phase 11.2.
  ADMIN_SYSTEM_MANAGE: "admin:system:manage",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ADMIN_READ_PERMISSIONS: Permission[] = [
  PERMISSIONS.ADMIN_DASHBOARD_VIEW,
  PERMISSIONS.ADMIN_SEARCH,
  PERMISSIONS.ADMIN_VENDOR_VIEW,
  PERMISSIONS.ADMIN_CUSTOMER_VIEW,
];

const ADMIN_FULL_PERMISSIONS: Permission[] = [
  ...ADMIN_READ_PERMISSIONS,
  PERMISSIONS.ADMIN_ACCESS,
  PERMISSIONS.VENDOR_VERIFY,
  PERMISSIONS.ADMIN_VENDOR_MANAGE,
  PERMISSIONS.ADMIN_CUSTOMER_MANAGE,
  PERMISSIONS.ADMIN_LEAD_MANAGE,
  PERMISSIONS.ADMIN_BOOKING_MANAGE,
  PERMISSIONS.ADMIN_CATALOG_MANAGE,
  PERMISSIONS.ADMIN_REVIEW_MODERATE,
  PERMISSIONS.ADMIN_FINANCE_VIEW,
  PERMISSIONS.ADMIN_FINANCE_MANAGE,
  PERMISSIONS.ADMIN_NOTIFICATION_MANAGE,
];

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.CUSTOMER]: [PERMISSIONS.CUSTOMER_PROFILE_READ_OWN, PERMISSIONS.CUSTOMER_PROFILE_WRITE_OWN],
  [Role.VENDOR]: [
    PERMISSIONS.VENDOR_PROFILE_READ_OWN,
    PERMISSIONS.VENDOR_PROFILE_WRITE_OWN,
    PERMISSIONS.VENDOR_DOCUMENT_WRITE_OWN,
  ],
  // Read-only across the board + support search — no approve/suspend/cancel/edit actions.
  [Role.SUPPORT]: ADMIN_READ_PERMISSIONS,
  // Day-to-day marketplace operations: leads/bookings, but not vendor
  // verification, customer suspension, catalog, or review moderation.
  [Role.OPERATIONS]: [...ADMIN_READ_PERMISSIONS, PERMISSIONS.ADMIN_LEAD_MANAGE, PERMISSIONS.ADMIN_BOOKING_MANAGE],
  [Role.ADMIN]: ADMIN_FULL_PERMISSIONS,
  // First real super-admin-exclusive permission: ADMIN_SYSTEM_MANAGE (see
  // its definition above) — this resolves the Phase 11.2 gap.
  [Role.SUPER_ADMIN]: [...ADMIN_FULL_PERMISSIONS, PERMISSIONS.ADMIN_SYSTEM_MANAGE],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function requirePermission(context: AuthContext, permission: Permission) {
  if (!hasPermission(context.role, permission)) {
    throw new ForbiddenError("You do not have permission to perform this action.");
  }
}

/**
 * Resource-ownership guard for routes that take an :id rather than acting on
 * "me" (e.g. a future `PATCH /vendors/:id` used by an admin-impersonation
 * tool, or any endpoint accepting an explicit id). Routes that already scope
 * their query by `auth.userId` directly (all current /me endpoints) don't
 * need this — they can't leak another user's row by construction.
 */
export function assertOwnsResource(context: AuthContext, resourceOwnerUserId: string) {
  if (context.userId !== resourceOwnerUserId) {
    throw new ForbiddenError("You do not have permission to access this resource.");
  }
}
