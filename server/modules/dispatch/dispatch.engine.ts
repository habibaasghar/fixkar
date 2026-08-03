import { db } from "@/server/shared/db";
import { VerificationStatus } from "@prisma/client";
import { MatchCriteria } from "./dispatch.types";

/**
 * V1 matching: a strict priority filter (city -> area -> category -> verified
 * -> active -> available), all mandatory, not a cascade that relaxes earlier
 * criteria when no match is found — Phase 13 asked for the filter list, not
 * a fallback-relaxation search. Ties broken by averageRating desc.
 *
 * EXTENSION POINT for future AI routing (Phase 8's "Smart Lead Routing"):
 * replace the `orderBy` (and/or this whole query) with a call to a ranking
 * model that scores the same candidate set — the candidate *shape* returned
 * here (ordered VendorProfile[] with id + averageRating) is what any future
 * scoring layer should still produce, so callers (dispatch.service.ts) don't
 * need to change.
 */
export async function findMatchingVendors(criteria: MatchCriteria) {
  return db.vendorProfile.findMany({
    where: {
      deletedAt: null, // active
      isOnDuty: true, // available
      cityId: criteria.cityId, // same city
      areas: { some: { id: criteria.areaId } }, // same area
      categories: { some: { id: criteria.categoryId } }, // requested category
      verification: { status: VerificationStatus.VERIFIED }, // verified only
      availability: { is: { isVacationMode: false } },
      ...(criteria.excludeVendorIds?.length ? { id: { notIn: criteria.excludeVendorIds } } : {}),
    },
    orderBy: { averageRating: "desc" },
    select: { id: true, userId: true, averageRating: true },
    // Phase 17 audit fix: this previously fetched every matching vendor in
    // the city with no limit, even though callers only ever use candidates[0].
    take: criteria.limit ?? 1,
  });
}
