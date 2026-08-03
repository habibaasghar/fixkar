export interface MatchCriteria {
  cityId: string;
  areaId: string;
  categoryId: string;
  /** Vendors to skip — e.g. those who already rejected this exact lead. */
  excludeVendorIds?: string[];
  /** Max candidates to return. Only candidates[0] is used today (single-vendor sequential assignment) — kept small rather than fetching every matching vendor in the city. */
  limit?: number;
}
