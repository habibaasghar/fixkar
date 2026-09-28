import { cities } from "./services";

/**
 * Full Pakistan city list for the global location selector, per
 * docs/CITY_COVERAGE_STRATEGY.md Tier 1 + Tier 2. This is display/capture
 * data only — it does NOT claim service availability.
 *
 * `citySlug` is present only for cities that have a real `/[city]` page
 * (i.e. exist in `lib/services.ts`). Selecting one of those routes there.
 * Selecting any other city does not claim availability and does not create
 * a fake page — see LocationSelector.tsx, which routes those to a WhatsApp
 * message instead (the existing, honest quote-relay channel).
 */
export type LocationOption = {
  name: string;
  citySlug?: string;
};

const realCitySlugs = new Set(cities.map((c) => c.slug));

const rawNames = [
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Karachi",
  "Faisalabad",
  "Gujranwala",
  "Sialkot",
  "Multan",
  "Peshawar",
  "Hyderabad",
  "Quetta",
  "Bahawalpur",
  "Sargodha",
  "Abbottabad",
  "Gujrat",
  "Sheikhupura",
  "Sahiwal",
  "Wah Cantt",
  "Jhelum",
];

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export const allLocations: LocationOption[] = rawNames.map((name) => {
  const slug = slugify(name);
  return realCitySlugs.has(slug) ? { name, citySlug: slug } : { name };
});
