import { cities, isCategoryActiveInCity } from "./services";
import type { City } from "./types";

/**
 * Discovery catalog for the /services hub.
 *
 * This is a *display layer* only. `lib/services.ts` stays the single source
 * of truth for what has a real `/[city]/[category]` page and where it is
 * operational. A hub service links to a real page only when `liveSlug` is set
 * AND that category is active in the chosen city; every other combination
 * becomes a WhatsApp enquiry — no thin or doorway pages are implied.
 *
 * `slug` is the planned clean URL segment (/services/<slug>) for future
 * service pages; it is used here only for in-page anchors.
 */
export type HubServiceId =
  | "ac-cooling" | "electrical" | "plumbing" | "home-renovation" | "solar" | "painting"
  | "kitchen-renovation" | "bathroom-renovation" | "roofing-waterproofing" | "flooring-tiling"
  | "carpentry" | "false-ceiling-gypsum" | "doors-windows" | "cctv-home-security"
  | "appliance-services" | "cleaning-maintenance" | "moving-home-shifting" | "handyman";

export type GlyphName =
  | "ac" | "electrical" | "plumbing" | "solar" | "renovation" | "kitchen" | "bathroom"
  | "painting" | "waterproofing" | "cctv" | "flooring" | "carpentry" | "ceiling"
  | "doors" | "appliance" | "cleaning" | "moving" | "handyman";

export type HubService = {
  slug: HubServiceId;
  name: string;
  /** Short name for chips and selectors. */
  short: string;
  description: string;
  /** Natural customer phrasing, shown as small tags and used for search. */
  terms: string[];
  glyph: GlyphName;
  /** primary = large tile, secondary = compact tile, more = list row. */
  tier: "primary" | "secondary" | "more";
  /** "small" repairs vs "project" enquiries — drives the enquiry wording. */
  kind: "job" | "project";
  /** Real category slug in lib/services.ts, if a live page exists. */
  liveSlug?: string;
  /** Genuine trade relationships, used by the service network map. */
  related: HubServiceId[];
};

export const hubServices: HubService[] = [
  {
    slug: "ac-cooling", name: "AC & Cooling", short: "AC", glyph: "ac", tier: "primary", kind: "job",
    description: "AC installation, repair, gas refill, servicing and cooling-related work.",
    terms: ["AC repair", "AC installation", "AC service", "gas refill"],
    liveSlug: "ac-repair", related: ["electrical"],
  },
  {
    slug: "home-renovation", name: "Home Renovation", short: "Renovation", glyph: "renovation", tier: "primary", kind: "project",
    description: "House renovation, remodelling and larger home improvement projects across several trades.",
    terms: ["house renovation", "home renovation contractor", "remodelling"],
    related: ["painting", "electrical", "plumbing", "flooring-tiling", "kitchen-renovation", "bathroom-renovation", "false-ceiling-gypsum", "carpentry"],
  },
  {
    slug: "solar", name: "Solar & Energy", short: "Solar", glyph: "solar", tier: "primary", kind: "project",
    description: "Residential solar panel and solar system installation, inverter and related energy work.",
    terms: ["solar panel installation", "solar system installation", "inverter"],
    related: ["electrical", "roofing-waterproofing", "home-renovation"],
  },
  {
    slug: "electrical", name: "Electrical", short: "Electrician", glyph: "electrical", tier: "primary", kind: "job",
    description: "Electrical repairs, wiring, fixtures, switches, lighting and distribution board work.",
    terms: ["electrician", "electrical work", "wiring", "switchboard"],
    liveSlug: "electrician", related: ["solar", "home-renovation", "kitchen-renovation"],
  },
  {
    slug: "plumbing", name: "Plumbing", short: "Plumber", glyph: "plumbing", tier: "primary", kind: "job",
    description: "Plumbing repairs, installation, leaks, drainage and water-related work.",
    terms: ["plumber", "plumbing service", "leakage", "drain"],
    liveSlug: "plumbing", related: ["bathroom-renovation", "kitchen-renovation", "home-renovation"],
  },
  {
    slug: "painting", name: "Painting", short: "Painter", glyph: "painting", tier: "primary", kind: "project",
    description: "Interior and exterior house painting, wall finishing and repainting.",
    terms: ["house painting", "painter", "wall finishing"],
    liveSlug: "painter", related: ["home-renovation", "roofing-waterproofing"],
  },
  {
    slug: "kitchen-renovation", name: "Kitchen Renovation", short: "Kitchen", glyph: "kitchen", tier: "secondary", kind: "project",
    description: "Kitchen remodelling, cabinets, countertops, surfaces and related work.",
    terms: ["kitchen renovation", "kitchen cabinets", "countertop"],
    related: ["plumbing", "electrical", "flooring-tiling", "carpentry"],
  },
  {
    slug: "bathroom-renovation", name: "Bathroom Renovation", short: "Bathroom", glyph: "bathroom", tier: "secondary", kind: "project",
    description: "Bathroom remodelling, fixtures, tiling and improvements.",
    terms: ["bathroom renovation", "bathroom tiles", "sanitary fittings"],
    related: ["plumbing", "roofing-waterproofing", "flooring-tiling"],
  },
  {
    slug: "roofing-waterproofing", name: "Roofing & Waterproofing", short: "Waterproofing", glyph: "waterproofing", tier: "secondary", kind: "project",
    description: "Roof repair, roof and terrace waterproofing, seepage and moisture-related work.",
    terms: ["roof waterproofing", "roof leakage", "seepage"],
    related: ["solar", "bathroom-renovation", "painting"],
  },
  {
    slug: "flooring-tiling", name: "Flooring & Tiling", short: "Flooring", glyph: "flooring", tier: "secondary", kind: "project",
    description: "Floor installation, replacement, tile fixing and finishing.",
    terms: ["flooring", "tile fixing", "marble", "wooden floor"],
    related: ["home-renovation", "kitchen-renovation", "bathroom-renovation"],
  },
  {
    slug: "false-ceiling-gypsum", name: "False Ceiling & Gypsum", short: "False Ceiling", glyph: "ceiling", tier: "secondary", kind: "project",
    description: "False ceilings, gypsum work and decorative interior finishing.",
    terms: ["false ceiling", "gypsum ceiling"],
    related: ["home-renovation", "electrical", "painting"],
  },
  {
    slug: "carpentry", name: "Carpentry & Woodwork", short: "Carpenter", glyph: "carpentry", tier: "secondary", kind: "job",
    description: "Custom woodwork, doors, cabinets and general carpentry.",
    terms: ["carpenter", "wardrobe", "woodwork"],
    related: ["kitchen-renovation", "doors-windows", "home-renovation"],
  },
  {
    slug: "cctv-home-security", name: "CCTV & Home Security", short: "CCTV", glyph: "cctv", tier: "secondary", kind: "job",
    description: "CCTV camera installation and residential security systems.",
    terms: ["CCTV installation", "security cameras"],
    related: ["electrical"],
  },
  {
    slug: "doors-windows", name: "Doors & Windows", short: "Doors & Windows", glyph: "doors", tier: "more", kind: "job",
    description: "Door and window installation, repair and replacement.",
    terms: ["aluminium windows", "door repair", "UPVC"],
    related: ["carpentry", "home-renovation"],
  },
  {
    slug: "appliance-services", name: "Appliance Services", short: "Appliances", glyph: "appliance", tier: "more", kind: "job",
    description: "Installation, repair and maintenance of household appliances.",
    terms: ["appliance repair", "washing machine", "fridge repair"],
    related: ["electrical", "ac-cooling"],
  },
  {
    slug: "cleaning-maintenance", name: "Cleaning & Maintenance", short: "Cleaning", glyph: "cleaning", tier: "more", kind: "job",
    description: "Residential deep cleaning, sofa and carpet cleaning, and recurring maintenance.",
    terms: ["deep cleaning", "sofa cleaning", "carpet cleaning"],
    liveSlug: "cleaning", related: ["painting"],
  },
  {
    slug: "moving-home-shifting", name: "Moving & Home Shifting", short: "Shifting", glyph: "moving", tier: "more", kind: "job",
    description: "Residential moving, packing and home shifting.",
    terms: ["home shifting", "packers and movers"],
    related: ["cleaning-maintenance"],
  },
  {
    slug: "handyman", name: "General Handyman", short: "Handyman", glyph: "handyman", tier: "more", kind: "job",
    description: "Smaller household repair and maintenance requirements.",
    terms: ["handyman", "small repairs", "fixing"],
    related: ["electrical", "plumbing", "carpentry"],
  },
];

export function getHubService(slug: HubServiceId): HubService {
  return hubServices.find((s) => s.slug === slug)!;
}

/**
 * Cities shown on the hub. `route` is set only when a real `/[city]` page
 * exists in lib/services.ts. Gujrat is a market FixKar takes enquiries for
 * but has no city hub page yet, so it routes to a WhatsApp enquiry.
 */
export type HubCity = { slug: string; name: string; route?: string; city?: City };

const hubCityNames: { slug: string; name: string }[] = [
  { slug: "lahore", name: "Lahore" },
  { slug: "islamabad", name: "Islamabad" },
  { slug: "rawalpindi", name: "Rawalpindi" },
  { slug: "karachi", name: "Karachi" },
  { slug: "gujranwala", name: "Gujranwala" },
  { slug: "gujrat", name: "Gujrat" },
];

export const hubCities: HubCity[] = hubCityNames.map(({ slug, name }) => {
  const city = cities.find((c) => c.slug === slug);
  return { slug, name, city, route: city ? `/${slug}` : undefined };
});

/** The real page for this service in this city, or undefined → use an enquiry instead. */
export function liveServiceHref(service: HubService, hubCity: HubCity): string | undefined {
  if (!service.liveSlug || !hubCity.city) return undefined;
  return isCategoryActiveInCity(hubCity.city, service.liveSlug) ? `/${hubCity.slug}/${service.liveSlug}` : undefined;
}

/**
 * Link to a city hub only when that city is fully active. Cities with partial
 * or no live coverage route to a city-specific enquiry instead, so hub
 * visitors never land on a "coming soon" page.
 */
export function cityHubHref(hubCity: HubCity): string | undefined {
  return hubCity.city?.status === "active" ? `/${hubCity.slug}` : undefined;
}

export function enquiryMessage(service: HubService | null, cityName?: string): string {
  const where = cityName ? ` in ${cityName}` : "";
  if (!service) return `Hi FixKar, I need a home service${where}. Here's what I need: `;
  const lead =
    service.kind === "project"
      ? `I'm planning a project: ${service.name}${where}.`
      : `I need help with ${service.name}${where}.`;
  return `Hi FixKar, ${lead} Here's what I need: `;
}
