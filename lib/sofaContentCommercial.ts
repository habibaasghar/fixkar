import type { SofaIntent } from "./sofaCluster";

/**
 * Commercial intents. These describe customer *types* and use cases only.
 * No real business is named and no client or partnership is implied.
 */

export const officeIntent: SofaIntent = {
  slug: "office-sofa-cleaning",
  shortName: "Office Sofa Cleaning",
  name: "Office Sofa Cleaning",
  whatsappLabel: "Request Office Sofa Cleaning",
  h1: (c) => `Office Sofa and Reception Seating Cleaning in ${c}`,
  title: (c) => `Office Sofa & Reception Seating Cleaning in ${c}`,
  description: (c) =>
    `Cleaning for office sofas, reception and waiting-area seating in ${c}. Send seat counts and photos, and get a quote planned around your working hours.`,
  opening: (c) => [
    `FixKar.pk connects offices and other commercial spaces in ${c} with a vetted cleaning team for sofas, reception seating and waiting-area furniture. These seats are used by visitors and staff every day, so they pick up dust, marks and odor faster than most home sofas.`,
    `Commercial jobs are scoped around the space: how many seats, what material, and when the team can work without disturbing the office. Many customers prefer early mornings, evenings or weekends, and the team can discuss timing when confirming the quote.`,
    `Send your requirement on WhatsApp or through the form, including the number of seats and a few photos. The quote is confirmed before the work, and there is no advance payment.`,
  ],
  quick: (c) => [
    {
      question: `Do you clean office sofas in ${c}?`,
      answer: "Yes. Office, reception and waiting-area sofas can be requested through FixKar and the team plans the work around your hours.",
    },
    {
      question: "Can cleaning be done outside working hours?",
      answer: "You can ask for an early, late or weekend slot. The service partner confirms what is possible when they quote.",
    },
  ],
  blocks: () => [
    {
      kind: "cards",
      h2: "Who We Serve",
      intro: "These are the kinds of spaces that most often ask us about commercial sofa and seating cleaning. This describes customer types, not a list of clients.",
      items: [
        { title: "Offices and corporate offices", text: "Reception sofas, executive lounges, meeting-room seating and breakout areas." },
        { title: "Co-working spaces", text: "Shared lounge seating that many different people use every day." },
        { title: "Clinics and salons", text: "Waiting-area sofas and chairs, where appearance and freshness matter to visitors." },
        { title: "Showrooms and retail stores", text: "Customer seating and display sofas that need to look presentable." },
        { title: "Schools and institutes", text: "Staff rooms, reception and waiting-area seating." },
        { title: "Guest houses and lounges", text: "Common-area seating. For hotels, see our hotel upholstery page." },
      ],
    },
    {
      kind: "bullets",
      h2: "Common Office Seating Problems",
      items: [
        "Dust and grime on reception and waiting-area sofas",
        "Coffee, tea and cold-drink spills",
        "Darker patches where hands and arms rest",
        "Stale odor in closed rooms",
        "Uneven appearance when some seats are used far more than others",
      ],
    },
    {
      kind: "steps",
      h2: "How Commercial Sofa Cleaning Is Planned",
      items: [
        { title: "Describe the space", text: "Tell us the type of business, the number of seats and the material, with photos." },
        { title: "Agree timing", text: "Say when the space is quiet. The service partner confirms the slot and how long the work will take." },
        { title: "Clean in sections", text: "Where possible, seating is cleaned in groups so part of the space stays usable." },
        { title: "Drying and handover", text: "You are told how long seats need to dry before being used, and the work is checked before you pay." },
      ],
    },
    {
      kind: "table",
      h2: "Home or Office: What Is Different?",
      head: ["", "Home sofa", "Office seating"],
      rows: [
        ["Scheduling", "Around the household", "Around opening hours and visitors"],
        ["Quote based on", "Seats and material", "Seats, material, number of pieces and access"],
        ["Typical concern", "Family use, spills", "Constant use by many people"],
        ["Drying plan", "Keep the sofa unused", "Rotate or close off sections if needed"],
      ],
    },
  ],
  local: {
    lahore:
      "Lahore's business districts, including Gulberg, Cantt and the commercial streets around DHA, have a steady mix of offices, clinics and showrooms with customer-facing seating. If you manage a space in another part of the city, list the location in your message and we will confirm whether we can arrange it.",
    islamabad:
      "Islamabad has many offices, institutes and clinics in its sectors, including around F-6, F-7 and F-8. Mention your sector and building access rules, such as visitor registration, so the team can plan arrival time.",
    gujranwala:
      "Businesses in Gujranwala such as clinics, institutes and showrooms often have customer-facing seating in busy areas. Tell us your location, for example Model Town or Garden Town, and the number of seats, and we will confirm the next steps.",
  },
  costFactors: [
    "Total number of seats and pieces",
    "Material and condition of the seating",
    "Whether work has to happen outside working hours",
    "Access to the building and number of floors",
    "Whether it is a one-time clean or a repeat arrangement you want to discuss",
    "Your location in the city",
  ],
  costNote:
    "Commercial quotes depend on the seats, the space and the timing, so there is no standard rate. Send the details and the service partner quotes before the work is scheduled.",
  prep: [
    "Count the seats and note where each group is located.",
    "Photograph the seating, including any visible stains.",
    "Decide which time slot suits your operation.",
    "Arrange building access, parking or visitor passes if needed.",
    "Tell reception or security that the team is expected.",
  ],
  faqs: (c) => [
    {
      question: `Can you clean sofas for an office in ${c}?`,
      answer: `Yes. Send the number of seats, the material and your location in ${c}, and FixKar connects the request with a cleaning team who confirms the plan and quote.`,
    },
    {
      question: "Is the cleaning suitable for reception and waiting areas?",
      answer: "Yes. Reception and waiting-area seating is a common request, and cleaning can be planned in sections so part of the space stays usable.",
    },
    {
      question: "Can you work in the evening or on weekends?",
      answer: "You can request it. The service partner confirms availability for your slot when they give you a quote.",
    },
    {
      question: "Do you offer regular cleaning for offices?",
      answer: "You can raise a recurring requirement in your enquiry. Whether it can be arranged is confirmed after the team understands the space and frequency.",
    },
    {
      question: "How do offices get a quote?",
      answer: "Send the number of seats, material, photos and preferred timing on WhatsApp or the form. The quote is confirmed before work begins.",
    },
  ],
  related: ["sofa-cleaning", "restaurant-upholstery-cleaning", "hotel-upholstery-cleaning"],
};

export const restaurantIntent: SofaIntent = {
  slug: "restaurant-upholstery-cleaning",
  shortName: "Restaurant Upholstery Cleaning",
  name: "Restaurant and Café Upholstery Cleaning",
  whatsappLabel: "Request Restaurant Seating Cleaning",
  h1: (c) => `Restaurant and Café Upholstery Cleaning in ${c}`,
  title: (c) => `Restaurant & Café Upholstery Cleaning in ${c}`,
  description: (c) =>
    `Cleaning for restaurant booths, café sofas and upholstered chairs in ${c}. Send seat counts and photos and get a quote that fits around your service hours.`,
  opening: (c) => [
    `FixKar.pk connects restaurants and cafés in ${c} with a vetted cleaning team for upholstered seating: booths, banquettes, café sofas, dining chairs and lounge seating. Food and drink spills, grease in the air and heavy daily use mean this seating often looks tired sooner than home furniture.`,
    `Because the dining room has to reopen, timing matters as much as method. The team can discuss cleaning after closing or on a quiet day, and how long each section needs to dry, when they confirm your quote.`,
    `Send the seat count, the type of upholstery and a few photos on WhatsApp or through the form. You get a quote before any work is scheduled and there is no advance payment.`,
  ],
  quick: (c) => [
    {
      question: `Do you clean restaurant seating in ${c}?`,
      answer: "Yes, restaurant and café upholstery such as booths, café sofas and upholstered chairs can be requested as a commercial enquiry.",
    },
    {
      question: "How is restaurant seating cleaned without closing for long?",
      answer: "Seating can be cleaned in sections, often after closing, with drying time planned so the area is ready before service resumes. The service partner confirms the plan with you.",
    },
  ],
  blocks: () => [
    {
      kind: "cards",
      h2: "Who We Serve",
      intro: "These are customer types, not a list of clients.",
      items: [
        { title: "Restaurants", text: "Booths, banquettes and upholstered dining chairs in main dining rooms." },
        { title: "Cafés and coffee shops", text: "Lounge sofas, armchairs and bench seating that customers use for hours at a time." },
        { title: "Banquet halls and event venues", text: "Seating used for events. Timing is planned around the booking calendar." },
        { title: "Fast-casual and food courts", text: "Upholstered bench and chair seating in high-turnover spaces." },
        { title: "Private dining rooms", text: "Smaller rooms with sofas or upholstered chairs reserved for groups." },
      ],
    },
    {
      kind: "h3",
      h2: "What Makes Restaurant Upholstery Different",
      items: [
        { title: "Frequent spills", text: "Food, sauce, tea and cold drinks land on seats every day. Fresh and set-in marks are treated differently." },
        { title: "Kitchen odor and grease", text: "Cooking smells settle into fabric and foam, so odor treatment is often as important as stain treatment." },
        { title: "Limited cleaning windows", text: "Work usually has to happen between closing and opening, which affects the method and drying plan." },
        { title: "Mixed materials", text: "A single venue can have fabric booths, leatherette chairs and wooden seats. Each is handled on its own terms." },
      ],
    },
    {
      kind: "bullets",
      h2: "Common Restaurant Seating Problems",
      items: [
        "Food and drink stains on booths and chairs",
        "Grease marks and darker patches on seat edges",
        "Odor held in fabric and foam",
        "Flattened, dull-looking upholstery on well-used seats",
        "Uneven cleanliness between busy and quiet areas",
      ],
    },
    {
      kind: "steps",
      h2: "How Restaurant Seating Cleaning Is Planned",
      items: [
        { title: "Share the layout", text: "Tell us how many booths, chairs and sofas there are and what they are made of, with photos." },
        { title: "Agree a window", text: "Choose a time outside service hours. The service partner confirms the duration and drying time." },
        { title: "Clean in sections", text: "Booths and chairs are cleaned in groups so drying fits the reopening time." },
        { title: "Inspect and pay", text: "You check the work and pay once you are satisfied." },
      ],
    },
  ],
  local: {
    lahore:
      "Lahore's restaurant and café scene is concentrated in areas such as Gulberg, DHA and Johar Town, where venues run long hours and cleaning windows are tight. Tell us your area and your closing time and we will confirm how the team can fit around it.",
    islamabad:
      "Islamabad's restaurants and cafés, including those in sectors like F-6, F-7 and F-8, often have upholstered lounge seating and outdoor-adjacent dining rooms. Mention if seating is exposed to outdoor dust so the team can plan accordingly.",
    gujranwala:
      "Gujranwala's restaurants, cafés and banquet-style venues often need seating cleaned before busy event periods. If you are planning around a booking or event, say so in your message and we will confirm what timing the team can offer.",
  },
  costFactors: [
    "Number of booths, chairs and sofas",
    "Upholstery material and condition",
    "Level of grease, stains and odor",
    "Available cleaning window and number of sections",
    "Access and loading conditions at the venue",
    "Your location in the city",
  ],
  costNote:
    "Restaurant seating is quoted from the number of pieces, their condition and the cleaning window, so there is no standard rate. The service partner confirms a quote before scheduling.",
  prep: [
    "Count booths, chairs and sofas, and photograph each type.",
    "Choose a cleaning window outside service hours.",
    "Clear tables, condiments and decor from the seating area.",
    "Point out heavily stained or odorous seats.",
    "Plan how seats will dry before opening.",
  ],
  faqs: (c) => [
    {
      question: `Can you clean booths and café sofas in ${c}?`,
      answer: "Yes. Booths, banquettes, café sofas and upholstered chairs can be requested. The team confirms the method once they see the material.",
    },
    {
      question: "Will the restaurant need to close for the cleaning?",
      answer: "Work is usually planned for after closing or a quiet period, and in sections where possible. The service partner confirms the plan with you.",
    },
    {
      question: "Can odor from cooking be treated?",
      answer: "Odor treatment is part of the conversation. How much improvement is possible depends on the fabric, foam and how long the odor has been present.",
    },
    {
      question: "Do you clean banquet and event seating?",
      answer: "Yes. Send the number of chairs and the date you need them ready, and the service partner confirms what is possible.",
    },
    {
      question: "How do restaurants get a quote?",
      answer: "Send seat counts, materials, photos and your available window on WhatsApp or through the form. The quote is confirmed before work is scheduled.",
    },
  ],
  related: ["office-sofa-cleaning", "hotel-upholstery-cleaning", "upholstery-cleaning"],
};

export const hotelIntent: SofaIntent = {
  slug: "hotel-upholstery-cleaning",
  shortName: "Hotel Upholstery Cleaning",
  name: "Hotel and Guest House Upholstery Cleaning",
  whatsappLabel: "Request Hotel Upholstery Cleaning",
  h1: (c) => `Hotel and Guest House Upholstery Cleaning in ${c}`,
  title: (c) => `Hotel & Guest House Upholstery Cleaning in ${c}`,
  description: (c) =>
    `Upholstery and sofa cleaning for hotel lobbies, rooms and guest houses in ${c}. Share room and seat counts and get a quote planned around occupancy.`,
  opening: (c) => [
    `FixKar.pk connects hotels, guest houses and serviced apartments in ${c} with a vetted cleaning team for sofas, lobby seating, lounge chairs, headboards and room upholstery. Guest turnover means furniture is used by many different people, and presentation is part of the guest experience.`,
    `Hospitality jobs are planned around occupancy. The team can discuss cleaning rooms when they are vacant, working through lobbies and lounges at quiet hours, and how long each area needs to dry before guests return.`,
    `Send your list of areas and a few photos on WhatsApp or through the form. The quote is confirmed before the work is scheduled and there is no advance payment.`,
  ],
  quick: (c) => [
    {
      question: `Do you clean hotel sofas and upholstery in ${c}?`,
      answer: "Yes. Lobby sofas, lounge chairs, room seating and headboards can be requested as a commercial enquiry.",
    },
    {
      question: "Can hotel cleaning be done around guests?",
      answer: "Work can be planned for vacant rooms and quiet hours, and by area. The service partner confirms the plan when they quote.",
    },
  ],
  blocks: () => [
    {
      kind: "cards",
      h2: "Who We Serve",
      intro: "These are customer types, not a list of clients.",
      items: [
        { title: "Hotels", text: "Lobby and lounge sofas, guest-room armchairs and headboards, and restaurant seating inside the property." },
        { title: "Guest houses", text: "Common-room sofas and guest-room furniture in smaller properties." },
        { title: "Serviced apartments", text: "Living-room sofas and bedroom upholstery between guest stays." },
        { title: "Banquet halls and event venues", text: "Chairs and lounge seating prepared before events." },
        { title: "Wedding and event lounges", text: "Bridal rooms and lounge sofas that need to look fresh for a specific date." },
      ],
    },
    {
      kind: "h3",
      h2: "What Hospitality Seating Needs",
      items: [
        { title: "Lobby and lounge sofas", text: "The first thing guests see. They collect dust and hand marks from constant use, so appearance matters." },
        { title: "Guest-room furniture", text: "Armchairs, desk chairs and headboards that guests touch and rest against every night." },
        { title: "Turnaround planning", text: "Rooms can be done between stays, with drying time built into the schedule." },
        { title: "Event preparation", text: "Seating cleaned before a booked event so it is ready by the date, with drying time included." },
      ],
    },
    {
      kind: "bullets",
      h2: "Common Hotel Upholstery Problems",
      items: [
        "Dust and marks on lobby and lounge sofas",
        "Body oils and hair product on headboards and armchair headrests",
        "Spills on room-service seating",
        "Stale odor in closed rooms",
        "Uneven wear between frequently used and quiet areas",
      ],
    },
    {
      kind: "steps",
      h2: "How Hotel Cleaning Is Planned",
      items: [
        { title: "List the areas", text: "Tell us the lobby, lounge, room and event areas, with seat counts and photos." },
        { title: "Plan around occupancy", text: "Share vacancy periods, quiet hours and any dates the furniture must be ready." },
        { title: "Clean by area", text: "Work proceeds area by area, with drying time planned before guests or events." },
        { title: "Check and pay", text: "You inspect the work and pay once you are satisfied." },
      ],
    },
  ],
  local: {
    lahore:
      "Lahore's hotels and guest houses are spread across areas such as Gulberg, DHA and Cantt, with many serving business and family travellers. List your property's location and the number of areas, and we will confirm how the team can schedule the work around occupancy.",
    islamabad:
      "Islamabad has hotels, guest houses and serviced apartments across its sectors, including around F-6, F-7 and F-8. Mention your sector and any access or security procedures so the team can plan arrival and parking.",
    gujranwala:
      "In Gujranwala, guest houses, banquet venues and wedding lounges often need seating cleaned ahead of specific bookings. Tell us your date and location, such as DC Colony or Model Town, and we will confirm what timing is realistic.",
  },
  costFactors: [
    "Number of rooms, lobby areas and seats involved",
    "Material and condition of the upholstery",
    "Whether work is done in vacant rooms or around guests",
    "Required completion date, for example before an event",
    "Access, floors and lift availability",
    "Your location in the city",
  ],
  costNote:
    "Hospitality jobs are quoted from the scope and schedule, so there is no standard rate. The service partner confirms the quote before scheduling.",
  prep: [
    "List every area and the seats or rooms in each.",
    "Take photos of each type of furniture and any marks.",
    "Share vacancy windows or the event date.",
    "Arrange access, parking and lift use for the team.",
    "Remove cushions, bedding and personal items from the furniture.",
  ],
  faqs: (c) => [
    {
      question: `Do you clean hotel upholstery in ${c}?`,
      answer: "Yes. Send the list of areas and seat counts, and FixKar connects the request with a cleaning team who confirms the plan and quote.",
    },
    {
      question: "Can rooms be cleaned between guest stays?",
      answer: "You can ask for that. The service partner confirms what is possible and builds drying time into the schedule.",
    },
    {
      question: "Can you prepare seating before an event?",
      answer: "Yes. Tell us the event date and the number of chairs or sofas, and the service partner confirms the timeline.",
    },
    {
      question: "Do you clean headboards and room furniture?",
      answer: "Upholstered headboards and armchairs can be included in the same request, using methods suited to each fabric.",
    },
    {
      question: "How do hotels and guest houses get a quote?",
      answer: "Send your areas, counts, photos and timing on WhatsApp or through the form. The quote is confirmed before work starts.",
    },
  ],
  related: ["restaurant-upholstery-cleaning", "office-sofa-cleaning", "sofa-cleaning"],
};
