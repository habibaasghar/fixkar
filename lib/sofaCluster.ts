import { getCity } from "./services";
import type { City } from "./types";

/**
 * Sofa & upholstery cleaning cluster.
 *
 * Architecture: flat URLs under the existing `/[city]/[category]` route
 * (`/lahore/sofa-cleaning`, `/lahore/leather-sofa-cleaning`, …) — the pattern
 * already indexed and documented in docs/SOFA_CARPET_CLEANING_LAUNCH_PLAN.md.
 *
 * The core `sofa-cleaning` page is a regular entry in `categories`
 * (lib/services.ts). The *additional* intent pages below are kept in this
 * separate registry on purpose, so they do not leak into the footer, the
 * partner-registration dropdown, city category grids, or the "coming soon"
 * lists for other cities. A page exists only for combinations listed in
 * `sofaIntentCities`; anything else 404s instead of rendering a thin page.
 */

export type SofaBlock =
  | { kind: "cards"; h2: string; intro?: string; items: { title: string; text: string }[] }
  | { kind: "h3"; h2: string; intro?: string; items: { title: string; text: string }[] }
  | { kind: "steps"; h2: string; intro?: string; items: { title: string; text: string }[] }
  | { kind: "bullets"; h2: string; intro?: string; items: string[] }
  | { kind: "table"; h2: string; intro?: string; head: string[]; rows: string[][] }
  | { kind: "text"; h2: string; paragraphs: string[] };

export type SofaFaq = { question: string; answer: string };

export type SofaIntent = {
  slug: string;
  /** Breadcrumb / link label. */
  shortName: string;
  name: string;
  h1: (city: string) => string;
  title: (city: string) => string;
  description: (city: string) => string;
  /** Opening answer paragraphs (2–4). `areas` is a readable list of the city's listed areas. */
  opening: (city: string, areas: string) => string[];
  /** Short direct answers placed near the top for answer engines. Not mirrored into FAQ schema. */
  quick: (city: string) => SofaFaq[];
  blocks: (city: string) => SofaBlock[];
  /** City-specific paragraph, rendered inside the page body (unique per city). */
  local: Record<string, string>;
  /** Heading for the cost section's factor list is shared; the factors are intent-specific. */
  costFactors: string[];
  costNote: string;
  prep: string[];
  faqs: (city: string) => SofaFaq[];
  /** Other intent slugs to cross-link to (kept short and relevant). */
  related: string[];
  whatsappLabel: string;
};

/** Cities where each intent page is live. Anything not listed returns 404. */
export const sofaCities = ["lahore", "islamabad", "gujranwala"] as const;

export const sofaIntentSlugs = [
  "leather-sofa-cleaning",
  "upholstery-cleaning",
  "office-sofa-cleaning",
  "restaurant-upholstery-cleaning",
  "hotel-upholstery-cleaning",
] as const;

/** Every slug the rich sofa template renders, core page included. */
export const sofaPageSlugs = ["sofa-cleaning", ...sofaIntentSlugs] as const;

export function isSofaPage(slug: string): boolean {
  return (sofaPageSlugs as readonly string[]).includes(slug);
}

export function isSofaPageLive(citySlug: string, slug: string): boolean {
  return isSofaPage(slug) && (sofaCities as readonly string[]).includes(citySlug);
}

/** All `{city, category}` pairs for the extra intent pages (core page is generated from `categories`). */
export function sofaIntentParams(): { city: string; category: string }[] {
  return sofaCities.flatMap((city) => sofaIntentSlugs.map((category) => ({ city, category })));
}

export function areaList(city: City): string {
  const a = city.areas;
  if (a.length <= 1) return a.join("");
  return `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;
}

export function requireCity(slug: string): City {
  const c = getCity(slug);
  if (!c) throw new Error(`Unknown city: ${slug}`);
  return c;
}
