import type { City, ServiceCategory } from "./types";

export const cities: City[] = [
  {
    slug: "lahore",
    name: "Lahore",
    status: "active",
    areas: [
      "DHA",
      "Gulberg",
      "Bahria Town",
      "Johar Town",
      "Model Town",
      "Cantt",
      "Faisal Town",
      "Garden Town",
      "Iqbal Town",
      "Valencia",
    ],
    metaTitle: "Verified Home Service Professionals in Lahore | FixKar.pk",
    metaDescription:
      "Book background-checked electricians, plumbers, AC technicians, cleaners, and painters in Lahore. Transparent rates, pay after service.",
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    status: "coming_soon",
    activeCategories: ["sofa-carpet-cleaning", "sofa-cleaning", "carpet-cleaning"],
    areas: ["F-6", "F-7", "F-8", "F-10", "G-11", "DHA Phase 2", "Bahria Town"],
    metaTitle: "Home Services in Islamabad | FixKar.pk — Coming Soon",
    metaDescription:
      "FixKar.pk is expanding to Islamabad. Join the waitlist for background-verified home service professionals.",
  },
  {
    slug: "rawalpindi",
    name: "Rawalpindi",
    status: "coming_soon",
    areas: ["Saddar", "Satellite Town", "Bahria Town", "Gulraiz"],
    metaTitle: "Home Services in Rawalpindi | FixKar.pk — Coming Soon",
    metaDescription:
      "FixKar.pk is coming soon to Rawalpindi. Verified electricians, plumbers, and technicians.",
  },
  {
    slug: "karachi",
    name: "Karachi",
    status: "coming_soon",
    areas: ["DHA", "Clifton", "PECHS", "Gulshan-e-Iqbal", "Nazimabad"],
    metaTitle: "Home Services in Karachi | FixKar.pk — Coming Soon",
    metaDescription:
      "FixKar.pk is expanding to Karachi. Verified handymen and home service professionals.",
  },
  {
    slug: "gujranwala",
    name: "Gujranwala",
    status: "coming_soon",
    activeCategories: ["sofa-carpet-cleaning", "sofa-cleaning", "carpet-cleaning"],
    areas: ["DC Colony", "Wapda Town", "Model Town", "Garden Town"],
    metaTitle: "Home Services in Gujranwala | FixKar.pk — Coming Soon",
    metaDescription:
      "FixKar.pk home repair and maintenance services coming soon to Gujranwala.",
  },
];

export const categories: ServiceCategory[] = [
  {
    slug: "ac-repair",
    name: "AC Repair & Gas Refill",
    shortName: "AC Repair",
    h1Template: (city) => `AC Repair & Gas Refill Services in ${city}`,
    metaTitleTemplate: (city) => `AC Repair in ${city} | Verified Technicians`,
    metaDescriptionTemplate: (city) =>
      `Need urgent AC repair or gas refill in ${city}? Book verified technicians via WhatsApp. No advance payment. Fast response, transparent pricing.`,
    intro: (city) =>
      `A broken AC in the middle of summer is unbearable. FixKar.pk connects you with CNIC-verified AC technicians in ${city} for gas refills, cooling issues, and fast installations. You don't pay anything upfront—only pay the technician directly once you're satisfied with the repair.`,
    commonIssues: [
      "AC gas refill / low cooling",
      "AC not turning on",
      "Water leakage from indoor unit",
      "Strange noise from outdoor unit",
      "New AC installation & uninstallation",
    ],
    pricingNote: "The prices below are approximate market rates. The technician will inspect the AC and confirm the exact cost before starting any work.",
    priceRanges: [
      { item: "AC Gas Refill (1.5 Ton)", range: "Rs. 3,000 – 12,000" },
      { item: "General Service / Cleaning", range: "Rs. 1,500 – 3,500" },
      { item: "AC Installation (Split)", range: "Rs. 2,500 – 4,500" },
    ],
  },
  {
    slug: "electrician",
    name: "Electrician Services",
    shortName: "Electrician",
    h1Template: (city) => `Certified Electrician Services in ${city}`,
    metaTitleTemplate: (city) => `Electrician in ${city} | Verified Professionals`,
    metaDescriptionTemplate: (city) =>
      `Home wiring fault, UPS repair, or new installation in ${city}? Get a verified electrician via WhatsApp. Safe, fast, and no advance payments.`,
    intro: (city) =>
      `Electrical faults can be dangerous to risk on your own. FixKar.pk connects you with background-checked electricians in ${city} for safe and fast repairs. We dispatch a verified professional to your location, and you only pay after the fault is fixed.`,
    commonIssues: [
      "Home wiring fault fixing",
      "UPS / inverter repair & wiring",
      "Switchboard & socket installation",
      "Short circuit troubleshooting",
      "Breaker & DB Box panel replacement",
    ],
    pricingNote: "The prices below are approximate market rates. The electrician will inspect the fault and confirm the exact cost before starting any work.",
    priceRanges: [
      { item: "Socket / Switch Replacement", range: "Rs. 300 – 800" },
      { item: "UPS Wiring / Installation", range: "Rs. 1,500 – 3,500" },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing Services",
    shortName: "Plumbing",
    h1Template: (city) => `Emergency Plumber Services in ${city}`,
    metaTitleTemplate: (city) => `Emergency Plumber in ${city}`,
    metaDescriptionTemplate: (city) =>
      `Water leakage, geyser repair, or blocked drain in ${city}? Book a verified plumber via WhatsApp. No advance payment. Same-day service.`,
    intro: (city) =>
      `A sudden water leak or broken geyser needs immediate attention. FixKar.pk sends a CNIC-verified plumber directly to your door in ${city}. You only pay once the leakage is stopped or the installation is completed.`,
    commonIssues: [
      "Water leakage detection & repair",
      "Geyser / water heater repair & installation",
      "Blocked drain & sewerage line unblocking",
      "Tap, mixer & sanitary fitting installation",
      "Overhead water tank cleaning",
    ],
    pricingNote: "The prices below are approximate market rates. The plumber will inspect the issue and provide a final quote before starting the repair.",
    priceRanges: [
      { item: "Geyser Repair", range: "Rs. 1,000 – 3,000" },
      { item: "Tap / Mixer Fitting", range: "Rs. 500 – 1,500" },
    ],
  },
  {
    slug: "cleaning",
    name: "Deep Cleaning Services",
    shortName: "Cleaning",
    h1Template: (city) => `Deep Cleaning Services in ${city}`,
    metaTitleTemplate: (city) => `Deep Cleaning Service in ${city}`,
    metaDescriptionTemplate: (city) =>
      `Sofa, carpet, water tank or full home deep cleaning in ${city}. Verified cleaning teams, book via WhatsApp. No upfront payments.`,
    intro: (city) =>
      `Whether you need your sofas shampooed or a full post-construction deep clean, FixKar.pk provides trained and trustworthy cleaning professionals in ${city}. Enjoy a spotless home with our hygienic, reliable teams.`,
    commonIssues: [
      "Full home deep cleaning",
      "Sofa & mattress shampooing",
      "Overhead & underground water tank cleaning",
      "Post-construction deep cleaning",
      "Kitchen & washroom deep sanitization",
    ],
    pricingNote: "Pricing varies based on square footage, room count, and condition. A team lead will provide an exact quote upon inspection.",
    priceRanges: [
      { item: "Sofa Set Cleaning (5 Seater)", range: "Rs. 2,000 – 4,000" },
      { item: "Water Tank Cleaning", range: "Rs. 2,500 – 5,000" },
    ],
  },
  {
    slug: "painter",
    name: "House Painting Services",
    shortName: "Painter",
    h1Template: (city) => `Professional House Painting Services in ${city}`,
    metaTitleTemplate: (city) => `House Painter in ${city} | Verified Painters`,
    metaDescriptionTemplate: (city) =>
      `Interior and exterior house painting in ${city}. Verified painters, transparent pricing. Book via WhatsApp.`,
    intro: (city) =>
      `Don't let peeling paint or dampness ruin your home's look. FixKar.pk connects you with experienced, verified painters in ${city} for single rooms or full home repaints. Quality work with zero advance payments required.`,
    commonIssues: [
      "Full home interior painting",
      "Exterior weather-sheet painting",
      "Single room & accent wall paint",
      "Ceiling & trim repair",
      "Wall dampness / Seepages treatment",
    ],
    pricingNote: "A physical inspection is highly recommended for an accurate labor and paint material estimation.",
    priceRanges: [
      { item: "Single Room Paint (Labor only)", range: "Rs. 3,500 – 7,000" },
      { item: "Dampness & Seepage Treatment", range: "Rs. 2,000 – 6,000" },
    ],
  },
  {
    slug: "sofa-carpet-cleaning",
    name: "Sofa & Carpet Cleaning Services",
    shortName: "Sofa & Carpet Cleaning",
    h1Template: (city) => `Sofa & Carpet Cleaning Services in ${city}`,
    metaTitleTemplate: (city) => `Sofa & Carpet Cleaning in ${city} | Verified Teams`,
    metaDescriptionTemplate: (city) =>
      `Doorstep sofa and carpet shampoo/steam cleaning in ${city}. Verified teams, transparent pricing, pay after the job. Book via WhatsApp.`,
    intro: (city) =>
      `Dusty sofas and carpets need more than a quick vacuum. FixKar.pk connects you with verified sofa and carpet cleaning teams in ${city} who use steam and shampoo cleaning to lift deep-set dirt, stains, and allergens — right at your doorstep. No advance payment, pay only once you're happy with the result.`,
    commonIssues: [
      "Sofa shampoo & steam cleaning (all fabric types)",
      "Carpet deep cleaning & stain removal",
      "Dust mite & allergen treatment",
      "Pet odor and stain removal",
      "Combined sofa + carpet package for full living rooms",
    ],
    pricingNote:
      "Sofa pricing is per seat, carpet pricing is per room/sqft — the team confirms the exact quote before starting work.",
    priceRanges: [
      { item: "Sofa Cleaning (per seat)", range: "Rs. 350 – 500" },
      { item: "5-Seater Sofa Set", range: "Rs. 1,800 – 2,500" },
      { item: "Carpet Cleaning (per room)", range: "Rs. 1,500 – 3,500" },
    ],
  },
  {
    slug: "sofa-cleaning",
    name: "Sofa Cleaning Services",
    shortName: "Sofa Cleaning",
    h1Template: (city) => `Sofa Cleaning Service in ${city}`,
    metaTitleTemplate: (city) => `Sofa Cleaning Service in ${city} | Same-Day Booking`,
    metaDescriptionTemplate: (city) =>
      `Professional sofa shampoo & steam cleaning in ${city} — all fabric types. No advance payment, pay after the job is done.`,
    intro: (city) =>
      `Years of daily use leave sofas stained, dull, and full of trapped dust. FixKar.pk sends a verified sofa cleaning team to your home in ${city} for steam and shampoo cleaning that restores fabric without damaging it. Every job is quoted upfront — no surprises, no advance payment.`,
    commonIssues: [
      "Fabric sofa shampoo cleaning",
      "Suede & velvet sofa cleaning",
      "Stubborn stain & spot removal",
      "Pet hair & odor removal",
      "Dust mite / allergen treatment",
    ],
    pricingNote:
      "Priced per seat — a team lead confirms the exact quote based on fabric type and condition before starting.",
    priceRanges: [
      { item: "Sofa Cleaning (per seat)", range: "Rs. 350 – 500" },
      { item: "5-Seater Sofa Set", range: "Rs. 1,800 – 2,500" },
      { item: "7-Seater Sofa Set", range: "Rs. 2,500 – 3,500" },
    ],
  },
  {
    slug: "carpet-cleaning",
    name: "Carpet Cleaning Services",
    shortName: "Carpet Cleaning",
    h1Template: (city) => `Carpet Cleaning Service in ${city}`,
    metaTitleTemplate: (city) => `Carpet Cleaning Service in ${city} | Deep Shampoo & Stain Removal`,
    metaDescriptionTemplate: (city) =>
      `Deep carpet shampoo, stain and allergen removal in ${city}. Verified teams, transparent pricing, pay after service.`,
    intro: (city) =>
      `Carpets trap dust, allergens, and stains that a regular vacuum can't reach. FixKar.pk connects you with verified carpet cleaning teams in ${city} for deep shampoo cleaning that's safe for wall-to-wall carpets and area rugs alike. Pay only after you've inspected the result.`,
    commonIssues: [
      "Wall-to-wall carpet deep shampoo",
      "Area rug & runner cleaning",
      "Stain and spot treatment",
      "Odor and allergen removal",
      "Post-event / post-construction carpet cleaning",
    ],
    pricingNote:
      "Priced per room or per square foot depending on carpet size — final quote confirmed on inspection.",
    priceRanges: [
      { item: "Carpet Cleaning (per room)", range: "Rs. 1,500 – 3,500" },
      { item: "Area Rug Cleaning", range: "Rs. 1,000 – 2,500" },
    ],
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCategory(slug: string): ServiceCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

/**
 * A category can be live in a city either because the whole city is
 * "active", or because it's individually listed in that city's
 * `activeCategories` override (e.g. a single vendor covers Islamabad for
 * sofa/carpet cleaning before Islamabad fully launches).
 */
export function isCategoryActiveInCity(city: City, categorySlug: string): boolean {
  return city.status === "active" || (city.activeCategories?.includes(categorySlug) ?? false);
}
