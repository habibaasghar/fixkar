export type City = {
  slug: string;
  name: string;
  areas: string[];
};

export type ServiceCategory = {
  slug: string;
  name: string;
  shortName: string;
  h1Template: (city: string) => string;
  metaTitleTemplate: (city: string) => string;
  metaDescriptionTemplate: (city: string) => string;
  intro: (city: string) => string;
  commonIssues: string[];
  // Only include price ranges we can actually source — do not invent numbers.
  pricingNote?: string;
  priceRanges?: { item: string; range: string }[];
};

export const cities: City[] = [
  {
    slug: "lahore",
    name: "Lahore",
    areas: ["DHA", "Gulberg", "Bahria Town", "Johar Town", "Model Town"],
  },
];

export const categories: ServiceCategory[] = [
  {
    slug: "ac-repair",
    name: "AC Repair & Gas Refill",
    shortName: "AC Repair",
    h1Template: (city) => `AC Repair & Gas Refill Services in ${city}`,
    metaTitleTemplate: (city) =>
      `AC Repair in ${city} | Verified Technicians`,
    metaDescriptionTemplate: (city) =>
      `Need urgent AC repair or gas refill in ${city}? Book verified technicians via WhatsApp. Fast response, transparent pricing.`,
    intro: (city) =>
      `Summer mein AC kharab hona sabse bara stress hota hai. FixKar.pk aapko ${city} ke verified AC technicians se connect karta hai — gas refill, cooling issues, aur installation, sab ek WhatsApp message door.`,
    commonIssues: [
      "AC gas refill / low cooling",
      "AC not turning on",
      "Water leakage from indoor unit",
      "Strange noise from outdoor unit",
      "New AC installation",
    ],
    pricingNote: "Approximate market rates — final price confirmed by technician after inspection.",
    priceRanges: [
      { item: "AC Gas Refill (1.5 Ton)", range: "Rs. 3,000 – 12,000" },
      { item: "General Service / Cleaning", range: "Rs. 1,500 – 3,500" },
    ],
  },
  {
    slug: "electrician",
    name: "Electrician Services",
    shortName: "Electrician",
    h1Template: (city) => `Certified Electrician Services in ${city}`,
    metaTitleTemplate: (city) =>
      `Electrician in ${city} | Verified Professionals`,
    metaDescriptionTemplate: (city) =>
      `Home wiring fault, UPS repair, or new installation in ${city}? Get a verified electrician via WhatsApp — safe, fast, reliable.`,
    intro: (city) =>
      `Wiring fault ho ya UPS ka masla, bijli ka kaam khud risk lene wala nahi hota. FixKar.pk ${city} ke verified electricians ko aapse connect karta hai — turant WhatsApp par.`,
    commonIssues: [
      "Home wiring fault fixing",
      "UPS / inverter repair",
      "Switchboard & socket installation",
      "Short circuit troubleshooting",
      "Solar panel wiring",
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing Services",
    shortName: "Plumbing",
    h1Template: (city) => `Emergency Plumber Services in ${city}`,
    metaTitleTemplate: (city) =>
      `Emergency Plumber in ${city}`,
    metaDescriptionTemplate: (city) =>
      `Water leakage, geyser repair, or blocked drain in ${city}? Book a verified plumber via WhatsApp — same-day service.`,
    intro: (city) =>
      `Paani ka leakage ya geyser kharab — yeh masle wait nahi kar sakte. FixKar.pk ${city} mein verified plumbers ko seedha aapke ghar bhejta hai, WhatsApp pe ek message se.`,
    commonIssues: [
      "Water leakage detection & repair",
      "Geyser / water heater repair",
      "Blocked drain / sewerage",
      "Tap & fitting installation",
      "Water tank cleaning",
    ],
    pricingNote: "Approximate market rates — final price confirmed by plumber after inspection.",
    priceRanges: [{ item: "Geyser Repair", range: "Rs. 1,000 – 3,000" }],
  },
  {
    slug: "cleaning",
    name: "Deep Cleaning Services",
    shortName: "Cleaning",
    h1Template: (city) => `Deep Cleaning Services in ${city}`,
    metaTitleTemplate: (city) =>
      `Deep Cleaning Service in ${city}`,
    metaDescriptionTemplate: (city) =>
      `Sofa, carpet, water tank or full home deep cleaning in ${city}. Verified cleaning teams, book via WhatsApp.`,
    intro: (city) =>
      `Ghar ki deep cleaning ho ya sofa/carpet cleaning, FixKar.pk ${city} ke trained cleaning professionals ko aapse connect karta hai — hygienic aur reliable.`,
    commonIssues: [
      "Full home deep cleaning",
      "Sofa & carpet cleaning",
      "Water tank cleaning",
      "Post-construction cleaning",
      "Kitchen & bathroom deep cleaning",
    ],
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
