/**
 * Explicit soft-delete helpers (Phase 10 decision). Deliberately not a Prisma
 * Client Extension that auto-filters every query — with no test suite yet in
 * place, an implicit global interceptor is harder to audit than a fragment
 * every repository spreads into its own `where`/`update` calls.
 *
 * Only these models carry `deletedAt`: User, CustomerProfile, VendorProfile,
 * Booking. See the policy comment in prisma/schema.prisma for the reasoning.
 */

/** Spread into a `where` clause to exclude soft-deleted rows: `db.user.findMany({ where: { ...NOT_DELETED } })` */
export const NOT_DELETED = { deletedAt: null } as const;

/** Spread into an `update` data payload in place of calling `.delete()`. */
export function softDeleteData() {
  return { deletedAt: new Date() };
}
