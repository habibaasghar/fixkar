export type IconName = "snow" | "bolt" | "droplet" | "sparkle" | "paint" | "leaf" | "wrench" | "home" | "shield";

/**
 * Master service taxonomy for the /services/ hub — the 11 long-term
 * categories from docs/SERVICE_TAXONOMY.md, plus Business Services and
 * Projects & Contracts as discovery pathways.
 *
 * This is a *display/grouping* layer on top of `lib/services.ts`, which
 * remains the single source of truth for what's actually bookable
 * (categories, cities, pricing, FAQs). `liveCategorySlugs` here must only
 * ever reference real slugs that exist in `categories` in `lib/services.ts` —
 * a taxonomy group with no live slugs renders as "Coming Soon" and links
 * nowhere, so we never imply availability that doesn't exist.
 */
export type TaxonomyGroup = {
  slug: string;
  name: string;
  description: string;
  representativeServices: string[];
  icon: IconName;
  accent: {
    bg: string;
    border: string;
    text: string;
    iconBg: string;
  };
  /** Real category slugs (from lib/services.ts) live under this group, in display order. Empty = not launched yet. */
  liveCategorySlugs: string[];
};

export const taxonomyGroups: TaxonomyGroup[] = [
  {
    slug: "ac-cooling",
    name: "AC & Cooling",
    description: "Repair, gas refill, and installation for home cooling systems.",
    representativeServices: ["AC Repair", "Gas Refilling", "Installation", "General Service"],
    icon: "snow",
    accent: { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-700", iconBg: "bg-sky-600" },
    liveCategorySlugs: ["ac-repair"],
  },
  {
    slug: "electrical",
    name: "Electrical",
    description: "Wiring faults, installations, and electrical repairs done safely.",
    representativeServices: ["Wiring Repair", "Switchboard Install", "UPS Wiring", "Breaker Panel"],
    icon: "bolt",
    accent: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", iconBg: "bg-amber-500" },
    liveCategorySlugs: ["electrician"],
  },
  {
    slug: "plumbing",
    name: "Plumbing & Water",
    description: "Leak repairs, geyser fixes, and water system installation.",
    representativeServices: ["Leak Repair", "Geyser Repair", "Tap Installation", "Drain Unblocking"],
    icon: "droplet",
    accent: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700", iconBg: "bg-cyan-600" },
    liveCategorySlugs: ["plumbing"],
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    description: "Home, deep, and specialized sofa & carpet cleaning at your doorstep.",
    representativeServices: ["Deep Cleaning", "Sofa Cleaning", "Carpet Cleaning", "Water Tank Cleaning"],
    icon: "sparkle",
    accent: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", iconBg: "bg-emerald-600" },
    liveCategorySlugs: ["cleaning", "sofa-carpet-cleaning", "sofa-cleaning", "carpet-cleaning"],
  },
  {
    slug: "painting",
    name: "Painting & Wall",
    description: "Interior and exterior painting, texture work, and wall treatments.",
    representativeServices: ["Interior Painting", "Exterior Painting", "Dampness Treatment", "Wall Texture"],
    icon: "paint",
    accent: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", iconBg: "bg-rose-600" },
    liveCategorySlugs: ["painter"],
  },
  {
    slug: "gardening",
    name: "Gardening & Landscaping",
    description: "Garden upkeep and landscaping for homes and properties.",
    representativeServices: ["Garden Maintenance", "Lawn Care", "Tree Trimming", "Landscaping"],
    icon: "leaf",
    accent: { bg: "bg-lime-50", border: "border-lime-200", text: "text-lime-700", iconBg: "bg-lime-600" },
    liveCategorySlugs: [],
  },
  {
    slug: "carpentry",
    name: "Carpentry & Woodwork",
    description: "Furniture repair, custom woodwork, and door/cabinet fixes.",
    representativeServices: ["Furniture Repair", "Door Repair", "Cabinets", "Custom Woodwork"],
    icon: "wrench",
    accent: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", iconBg: "bg-orange-600" },
    liveCategorySlugs: [],
  },
  {
    slug: "renovation",
    name: "Renovation & Construction",
    description: "Ceiling, flooring, and renovation work for homes and offices.",
    representativeServices: ["False Ceiling", "Flooring", "Home Renovation", "Wall Construction"],
    icon: "home",
    accent: { bg: "bg-stone-50", border: "border-stone-200", text: "text-stone-700", iconBg: "bg-stone-600" },
    liveCategorySlugs: [],
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    description: "Treatment for termites, cockroaches, and other household pests.",
    representativeServices: ["General Pest Control", "Termite Control", "Mosquito Control", "Fumigation"],
    icon: "shield",
    accent: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700", iconBg: "bg-teal-600" },
    liveCategorySlugs: [],
  },
  {
    slug: "appliance-repair",
    name: "Appliance Repair",
    description: "Repairs for refrigerators, washing machines, and home appliances.",
    representativeServices: ["Refrigerator Repair", "Washing Machine", "Microwave Repair", "Geyser Repair"],
    icon: "wrench",
    accent: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", iconBg: "bg-indigo-600" },
    liveCategorySlugs: [],
  },
  {
    slug: "security-smart-home",
    name: "Security & Smart Home",
    description: "CCTV, smart locks, and home networking installation.",
    representativeServices: ["CCTV Installation", "Smart Door Lock", "Intercom", "Wi-Fi Setup"],
    icon: "shield",
    accent: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", iconBg: "bg-violet-600" },
    liveCategorySlugs: [],
  },
];

export function isTaxonomyGroupLive(group: TaxonomyGroup): boolean {
  return group.liveCategorySlugs.length > 0;
}
