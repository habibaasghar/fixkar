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
    metaTitle: "Home Service Partners in Lahore | FixKar.pk",
    metaDescription:
      "Book electricians, plumbers, AC technicians, cleaners, and painters in Lahore through vetted vendor partners. Transparent rates, pay after service.",
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    status: "coming_soon",
    activeCategories: ["sofa-carpet-cleaning", "sofa-cleaning", "carpet-cleaning"],
    areas: ["F-6", "F-7", "F-8", "F-10", "G-11", "DHA Phase 2", "Bahria Town"],
    metaTitle: "Home Services in Islamabad | FixKar.pk — Coming Soon",
    metaDescription:
      "FixKar.pk is expanding to Islamabad. Join the waitlist for vetted home service vendor partners.",
  },
  {
    slug: "rawalpindi",
    name: "Rawalpindi",
    status: "coming_soon",
    areas: ["Saddar", "Satellite Town", "Bahria Town", "Gulraiz"],
    metaTitle: "Home Services in Rawalpindi | FixKar.pk — Coming Soon",
    metaDescription:
      "FixKar.pk is coming soon to Rawalpindi. Vetted electricians, plumbers, and technicians.",
  },
  {
    slug: "karachi",
    name: "Karachi",
    status: "coming_soon",
    areas: ["DHA", "Clifton", "PECHS", "Gulshan-e-Iqbal", "Nazimabad"],
    metaTitle: "Home Services in Karachi | FixKar.pk — Coming Soon",
    metaDescription:
      "FixKar.pk is expanding to Karachi. Vetted handymen and home service vendor partners.",
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
    metaTitleTemplate: (city) => `AC Repair in ${city} | Vetted Technicians`,
    metaDescriptionTemplate: (city) =>
      `Need urgent AC repair or gas refill in ${city}? Get a quote from a vetted technician via WhatsApp. No advance payment, transparent pricing.`,
    intro: (city) =>
      `A broken AC in the middle of summer is unbearable. FixKar.pk connects you with vetted AC technicians in ${city} for gas refills, cooling issues, and fast installations. You don't pay anything upfront—only pay the technician directly once you're satisfied with the repair.`,
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
    faqs: [
      {
        question: "Do you repair all AC brands and types?",
        answer:
          "Yes — our vendor partners work on split, window, and inverter AC units from all major brands. Mention the brand and issue when you book so the right technician is matched.",
      },
      {
        question: "How is AC gas refill priced?",
        answer:
          "Gas refill pricing depends on tonnage and the refrigerant your unit uses (R22 vs R410A). The technician checks your unit on-site and confirms the exact price before starting work.",
      },
      {
        question: "How soon can a technician reach me?",
        answer:
          "For most active service areas we aim to connect you with a technician the same day. Message us on WhatsApp for the fastest response.",
      },
      {
        question: "Do I need to pay before the technician starts?",
        answer:
          "No. FixKar.pk works on a pay-after-service model — you pay the technician directly, in cash or via JazzCash/EasyPaisa, only after the job is done and you're satisfied.",
      },
      {
        question: "What should I do before the technician arrives?",
        answer:
          "Keep the indoor and outdoor unit accessible, and have a rough idea of the issue (e.g. low cooling, noise, leakage) ready to describe.",
      },
    ],
  },
  {
    slug: "electrician",
    name: "Electrician Services",
    shortName: "Electrician",
    h1Template: (city) => `Certified Electrician Services in ${city}`,
    metaTitleTemplate: (city) => `Electrician in ${city} | Vetted Partners`,
    metaDescriptionTemplate: (city) =>
      `Home wiring fault, UPS repair, or new installation in ${city}? Get a quote from a vetted electrician via WhatsApp. Safe, and no advance payments.`,
    intro: (city) =>
      `Electrical faults can be dangerous to risk on your own. FixKar.pk connects you with vetted electricians in ${city} for safe repairs. We confirm a vendor partner for your location, and you only pay after the fault is fixed.`,
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
    faqs: [
      {
        question: "Is it safe to book an electrician for urgent short-circuit issues?",
        answer:
          "Yes — every electrician we connect you with is a vetted vendor partner. If it's safe to do so, turn off the main breaker and message us on WhatsApp so we can get you a partner urgently.",
      },
      {
        question: "Can you fix UPS/inverter wiring, not just building wiring?",
        answer:
          "Yes, our electricians handle both home wiring faults and UPS/inverter installation and wiring.",
      },
      {
        question: "How is the price decided for electrical work?",
        answer:
          "Simple jobs like socket or switch replacement have a listed price range. For wiring faults or panel work, the electrician inspects the issue on-site and confirms the price before starting.",
      },
      {
        question: "Do I pay in advance?",
        answer:
          "No advance payment is required — you pay directly to the electrician after the work is completed and tested.",
      },
      {
        question: "What information should I share when booking?",
        answer:
          "Briefly describe the issue (e.g. \"socket not working\" or \"lights flickering\") and your area — this helps us match the right electrician faster.",
      },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing Services",
    shortName: "Plumbing",
    h1Template: (city) => `Emergency Plumber Services in ${city}`,
    metaTitleTemplate: (city) => `Emergency Plumber in ${city}`,
    metaDescriptionTemplate: (city) =>
      `Water leakage, geyser repair, or blocked drain in ${city}? Get a quote from a vetted plumber via WhatsApp. No advance payment.`,
    intro: (city) =>
      `A sudden water leak or broken geyser needs immediate attention. FixKar.pk connects you with a vetted plumber vendor partner in ${city}. You only pay once the leakage is stopped or the installation is completed.`,
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
    faqs: [
      {
        question: "Do you handle geyser repair as well as leakages?",
        answer:
          "Yes — our plumbers handle geyser/water heater repair and installation, water leakage detection, blocked drains, and tap/sanitary fitting.",
      },
      {
        question: "Is this available for emergency leaks?",
        answer:
          "Yes, message us on WhatsApp for urgent leakage or blocked-drain issues and we'll prioritize dispatch in your area.",
      },
      {
        question: "How is pricing decided for plumbing work?",
        answer:
          "Straightforward jobs like tap fitting have a listed price range. For leakage or blocked-line issues, the plumber inspects first and gives you a final quote before starting.",
      },
      {
        question: "Do I need to buy parts myself?",
        answer:
          "You can discuss this with the plumber directly — some jobs use parts you already have, others may need a replacement part, which the plumber will quote separately before fitting it.",
      },
      {
        question: "Do I pay before or after the job?",
        answer:
          "After. You inspect the completed repair first, then pay the plumber directly — no advance payment.",
      },
    ],
  },
  {
    slug: "cleaning",
    name: "Deep Cleaning Services",
    shortName: "Cleaning",
    h1Template: (city) => `Deep Cleaning Services in ${city}`,
    metaTitleTemplate: (city) => `Deep Cleaning Service in ${city}`,
    metaDescriptionTemplate: (city) =>
      `Book vetted house & deep cleaning teams in ${city} — full home cleaning, water tank cleaning, and post-construction clean-up. No upfront payments.`,
    intro: (city) =>
      `Keeping a home spotless takes more than a weekly sweep. FixKar.pk provides trained, trustworthy cleaning teams in ${city} for full home deep cleans, water tank cleaning, and post-construction clean-up. Looking for sofa or carpet cleaning specifically? See our dedicated Sofa & Carpet Cleaning service below for specialized equipment and pricing.`,
    commonIssues: [
      "Full home deep cleaning",
      "Move-in / move-out home cleaning",
      "Overhead & underground water tank cleaning",
      "Post-construction deep cleaning",
      "Kitchen & washroom deep sanitization",
    ],
    pricingNote: "Pricing varies based on square footage, room count, and condition. A team lead will provide an exact quote upon inspection.",
    priceRanges: [
      { item: "Water Tank Cleaning", range: "Rs. 2,500 – 5,000" },
    ],
    faqs: [
      {
        question: "What does a deep cleaning session usually include?",
        answer:
          "A typical deep clean covers full-home dusting and mopping plus kitchen and washroom sanitization, and can include add-ons like water tank cleaning or post-construction clean-up — let the team know what you need when booking.",
      },
      {
        question: "Do you also clean sofas or carpets as part of house cleaning?",
        answer:
          "Sofa and carpet cleaning is its own dedicated service with specialized equipment — see our Sofa & Carpet Cleaning service for that. General cleaning bookings focus on the rest of the home.",
      },
      {
        question: "How is the price calculated?",
        answer:
          "Pricing depends on square footage, number of rooms, and the home's condition. The team lead confirms an exact quote after a quick inspection or a description of your space.",
      },
      {
        question: "Do I need to provide cleaning supplies?",
        answer:
          "No — the cleaning team brings its own equipment and supplies. Let us know if you have specific product preferences.",
      },
      {
        question: "Can I book a one-time clean or only recurring service?",
        answer:
          "Both — most bookings are one-time deep cleans, but you can ask the team about recurring visits if you'd like ongoing service.",
      },
    ],
    relatedCategories: ["sofa-carpet-cleaning"],
  },
  {
    slug: "painter",
    name: "House Painting Services",
    shortName: "Painter",
    h1Template: (city) => `Professional House Painting Services in ${city}`,
    metaTitleTemplate: (city) => `House Painter in ${city} | Vetted Painters`,
    metaDescriptionTemplate: (city) =>
      `Interior and exterior house painting in ${city}. Vetted painters, transparent pricing. Book via WhatsApp.`,
    intro: (city) =>
      `Don't let peeling paint or dampness ruin your home's look. FixKar.pk connects you with experienced, vetted painters in ${city} for single rooms or full home repaints. Quality work with zero advance payments required.`,
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
    faqs: [
      {
        question: "Do you handle both interior and exterior painting?",
        answer:
          "Yes — our painters take on single-room touch-ups, full interior repaints, and exterior weather-sheet painting.",
      },
      {
        question: "Can you fix wall dampness before painting?",
        answer:
          "Yes, dampness and seepage treatment is offered as a separate step before painting if your walls need it — mention this when booking so the right prep work is quoted.",
      },
      {
        question: "How is painting priced?",
        answer:
          "Painting is priced mainly on labor plus material coverage, which varies by room size and paint quality. The painter visits to inspect the space and gives you a firm quote before starting.",
      },
      {
        question: "Do you supply the paint or do I buy it?",
        answer:
          "Either way works — some customers buy their own paint brand/color, others ask the painter to source it. Confirm this upfront when you get your quote.",
      },
      {
        question: "Is payment required before work starts?",
        answer:
          "No advance payment is required for labor — you pay after inspecting the finished work. If paint or material is purchased on your behalf, that cost is usually settled separately at the time of purchase.",
      },
    ],
  },
  {
    slug: "sofa-carpet-cleaning",
    name: "Sofa & Carpet Cleaning Services",
    shortName: "Sofa & Carpet Cleaning",
    h1Template: (city) => `Sofa & Carpet Cleaning Services in ${city}`,
    metaTitleTemplate: (city) => `Sofa & Carpet Cleaning in ${city} | Vetted Teams`,
    metaDescriptionTemplate: (city) =>
      `Doorstep sofa and carpet shampoo/steam cleaning in ${city}. Vetted teams, transparent pricing, pay after the job. Book via WhatsApp.`,
    intro: (city) =>
      `Dusty sofas and carpets need more than a quick vacuum. FixKar.pk connects you with vetted sofa and carpet cleaning teams in ${city} who use steam and shampoo cleaning to lift deep-set dirt, stains, and allergens — right at your doorstep. No advance payment, pay only once you're happy with the result.`,
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
    faqs: [
      {
        question: "Can I book sofa and carpet cleaning together in one visit?",
        answer:
          "Yes — this combined service is for exactly that. The team brings equipment for both and cleans your sofas and carpets in the same visit.",
      },
      {
        question: "What if I only need one of the two done?",
        answer:
          "You can also book Sofa Cleaning or Carpet Cleaning separately if you only need one — this combined page is for when you want both done together.",
      },
      {
        question: "Is the cleaning safe for all fabric types?",
        answer:
          "The team checks the fabric/material type before starting and adjusts the shampoo/steam method accordingly to avoid damage.",
      },
      {
        question: "How long does a typical session take?",
        answer:
          "This depends on how many seats and how much carpet area is involved — the team will give you a time estimate when confirming your booking.",
      },
      {
        question: "How soon after cleaning can I use the sofa/carpet again?",
        answer:
          "Steam and shampoo cleaning needs some drying time — the team will tell you the expected drying time on the day based on humidity and fabric type.",
      },
    ],
    relatedCategories: ["sofa-cleaning", "carpet-cleaning"],
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
      `Years of daily use leave sofas stained, dull, and full of trapped dust. FixKar.pk connects you with a vetted sofa cleaning team in ${city} for steam and shampoo cleaning that restores fabric without damaging it. Every job is quoted upfront — no surprises, no advance payment.`,
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
    faqs: [
      {
        question: "How is sofa cleaning priced — per seat or per set?",
        answer:
          "Pricing is per seat, with typical 5-seater and 7-seater set totals shown above. The team confirms the exact price based on fabric type and condition before starting.",
      },
      {
        question: "Can you remove old stains, not just dust?",
        answer:
          "The team assesses visible stains during the visit — many stains lift significantly with steam/shampoo cleaning, though very old or set-in stains may only partially improve.",
      },
      {
        question: "Do you clean suede and velvet sofas too?",
        answer:
          "Yes, the cleaning method is adjusted for delicate fabrics like suede and velvet to avoid damaging the material.",
      },
      {
        question: "Will my sofa be wet for a long time after cleaning?",
        answer:
          "There's a drying period after steam/shampoo cleaning — the team will tell you the expected drying time on the day depending on fabric and weather.",
      },
      {
        question: "Do I need to move the sofa or clear the room first?",
        answer:
          "It helps to clear small items off and around the sofa beforehand so the team can work quickly, but moving heavy furniture isn't necessary.",
      },
    ],
    relatedCategories: ["sofa-carpet-cleaning", "carpet-cleaning"],
  },
  {
    slug: "carpet-cleaning",
    name: "Carpet Cleaning Services",
    shortName: "Carpet Cleaning",
    h1Template: (city) => `Carpet Cleaning Service in ${city}`,
    metaTitleTemplate: (city) => `Carpet Cleaning Service in ${city} | Deep Shampoo & Stain Removal`,
    metaDescriptionTemplate: (city) =>
      `Deep carpet shampoo, stain and allergen removal in ${city}. Vetted teams, transparent pricing, pay after service.`,
    intro: (city) =>
      `Carpets trap dust, allergens, and stains that a regular vacuum can't reach. FixKar.pk connects you with vetted carpet cleaning teams in ${city} for deep shampoo cleaning that's safe for wall-to-wall carpets and area rugs alike. Pay only after you've inspected the result.`,
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
    faqs: [
      {
        question: "Do you clean wall-to-wall carpets or only area rugs?",
        answer:
          "Both — the team handles fitted wall-to-wall carpets as well as loose area rugs and runners.",
      },
      {
        question: "How is carpet cleaning priced?",
        answer:
          "Pricing is per room or based on carpet size — the team confirms the exact price after seeing the space or the carpet dimensions.",
      },
      {
        question: "Can you remove pet odor and stains?",
        answer:
          "Yes, odor and stain treatment is part of the standard carpet cleaning process — mention any specific problem areas when booking.",
      },
      {
        question: "How long before I can walk on the carpet again?",
        answer:
          "Carpets need time to dry after shampoo cleaning — the team will confirm the expected drying time based on the carpet material and weather on the day.",
      },
      {
        question: "Do you do post-construction carpet cleaning?",
        answer:
          "Yes, this is one of our common jobs — let the team know it's a post-construction clean so they bring the right equipment for heavier dust and debris.",
      },
    ],
    relatedCategories: ["sofa-carpet-cleaning", "sofa-cleaning"],
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

/** True if the city has at least one real, bookable category (vs. showing only the generic ComingSoonState). */
export function cityHasAnyActiveCategory(city: City): boolean {
  return city.status === "active" || categories.some((c) => isCategoryActiveInCity(city, c.slug));
}
