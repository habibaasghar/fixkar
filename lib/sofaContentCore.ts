import type { SofaIntent } from "./sofaCluster";

/**
 * Core `/[city]/sofa-cleaning` page. Wording avoids guarantees, exact prices,
 * same-day promises, named chemicals/certifications and stain-removal
 * promises: the work is carried out by an independent vetted partner who
 * confirms method and quote after seeing the sofa.
 */
export const coreIntent: SofaIntent = {
  slug: "sofa-cleaning",
  shortName: "Sofa Cleaning",
  name: "Sofa Cleaning Services",
  whatsappLabel: "Request Sofa Cleaning",
  h1: (c) => `Sofa Cleaning Services in ${c}`,
  title: (c) => `Sofa Cleaning Services in ${c} for Homes & Offices`,
  description: (c) =>
    `Fabric, suede, velvet, L-shaped and sectional sofa cleaning in ${c}. Share photos, get a quote from a vetted local team, pay after the job.`,
  opening: (c, areas) => [
    `FixKar.pk provides sofa and upholstery cleaning in ${c} by connecting you with a vetted local cleaning team. You describe the sofa, share a few photos, and the team confirms the cleaning method and the quote before any work starts.`,
    `The service covers fabric, suede and velvet sofas, L-shaped and sectional sets, recliners, and office or lounge seating, for homes as well as businesses such as offices, cafés and guest houses.`,
    `Listed service areas in ${c} include ${areas}. If your area is not listed, message us and we will tell you whether we can arrange it.`,
    `To request service, send the details on WhatsApp or use the form below. There is no advance payment; you pay once you are satisfied with the work.`,
  ],
  quick: (c) => [
    {
      question: "What is professional sofa cleaning?",
      answer:
        "It is cleaning of the sofa's fabric and cushions by a trained team using shampoo or steam methods chosen for the material, rather than a quick surface vacuum.",
    },
    {
      question: `How do I book sofa cleaning in ${c}?`,
      answer: `Message FixKar on WhatsApp or fill in the request form on this page with your area and a few photos of the sofa. The team confirms the method and quote before starting.`,
    },
    {
      question: "How often should a sofa be professionally cleaned?",
      answer:
        "There is no single rule. A sofa in daily family use, or one used by children and pets, usually benefits from cleaning more often than a rarely used guest sofa. Many households clean once or twice a year.",
    },
  ],
  blocks: (c) => [
    {
      kind: "cards",
      h2: "Sofa Cleaning Services We Offer",
      intro: `These are the sofa cleaning requests customers in ${c} most often send us. The team confirms what suits your sofa after seeing it.`,
      items: [
        { title: "Deep Sofa Cleaning", text: "Cleaning of seats, backs, arms and cushions to lift built-up dust and dirt, usually done with shampoo or steam." },
        { title: "Steam Cleaning", text: "Hot steam cleaning where the fabric allows it. The team decides after checking the material and care label." },
        { title: "Fabric Sofa Cleaning", text: "Everyday woven and printed fabrics, from patterned family sofas to plain cotton-blend sets." },
        { title: "Leather Sofa Cleaning", text: "Leather and leatherette need different care from fabric. See our dedicated leather sofa page for details." },
        { title: "Upholstery Cleaning", text: "Armchairs, dining chairs, ottomans and headboards, cleaned in the same visit as your sofa if you wish." },
        { title: "Recliner Cleaning", text: "Recliners and lounge chairs, including the folds and seams where dust collects." },
        { title: "Sectional & L-Shaped Sofas", text: "Corner and multi-piece sofas with several seats and cushions, priced and planned as one set." },
        { title: "Stain & Odor Treatment", text: "Food, drink and general marks, plus odor from everyday use. Results depend on the stain and the fabric." },
      ],
    },
    {
      kind: "h3",
      h2: "Sofa Types We Clean",
      intro: "Tell us which of these matches your sofa. The material decides how it is cleaned.",
      items: [
        { title: "Fabric Sofas", text: "The most common type in homes. Fabric holds dust and food marks, and usually responds well to shampoo or steam cleaning when the care label allows it." },
        { title: "Suede and Velvet Sofas", text: "Delicate surfaces that can mark or change texture. The cleaning method is adjusted to avoid damaging the pile." },
        { title: "Leather Sofas", text: "Leather and leatherette are wiped and cared for rather than soaked. Share a photo so the team can check the finish first." },
        { title: "L-Shaped Sofas", text: "Corner sets with a long seating run. Quoted as one set based on the number of seats and cushions." },
        { title: "Sectional Sofas", text: "Modular sets made of several pieces. Each module and its cushions are counted when the team prepares the quote." },
        { title: "Recliners", text: "Powered or manual recliners. Mention any electrical parts so the team can avoid moisture around them." },
        { title: "Office and Lounge Sofas", text: "Reception, waiting-area and lounge seating that sees heavy use. See our office sofa cleaning page for commercial requests." },
      ],
    },
    {
      kind: "steps",
      h2: "How Our Sofa Cleaning Service Works",
      items: [
        { title: "Request a service", text: "Send your request on WhatsApp or through the form with your area and what needs cleaning." },
        { title: "Share sofa details and photos", text: "Tell us the number of seats, the material, and any stains or smells. Photos make the quote more accurate." },
        { title: "Service assessment", text: "The team reviews your details and, where needed, looks at the sofa on site before confirming the plan." },
        { title: "Cleaning method selection", text: "The method is chosen to suit the material, such as shampoo, steam or a gentler approach for delicate fabrics." },
        { title: "Cleaning", text: "The team cleans the seats, backs, arms and cushions and treats visible marks as far as the fabric allows." },
        { title: "Drying and aftercare", text: "Wet cleaning needs drying time. The team explains how long to leave the sofa unused and how to help it dry." },
        { title: "Completion", text: "You inspect the finished work and pay once you are satisfied." },
      ],
    },
    {
      kind: "cards",
      h2: "Sofa Cleaning for Homes and Businesses",
      items: [
        { title: "Residential", text: "Living rooms, drawing rooms and TV lounges, from a single sofa to a full set with armchairs. Easy to combine with carpet cleaning in the same visit." },
        { title: "Commercial", text: "Offices, cafés, restaurants, guest houses and waiting areas. Commercial requests are scoped around opening hours and how many seats are involved." },
      ],
    },
    {
      kind: "bullets",
      h2: "Common Sofa Problems We Help With",
      items: [
        "Dust and dirt that settles into seats and cushions over time",
        "Food and drink stains, including spills on light fabrics",
        "General marks and darker patches on arms and headrests",
        "Odor from everyday use, spills or damp",
        "Build-up on sofas in busy lounges and waiting areas",
        "Pet hair and pet-related mess, depending on the fabric",
      ],
    },
    {
      kind: "table",
      h2: "Which Sofa Cleaning Method Is Right for You?",
      intro: "A rough guide only. The team confirms the method after checking your sofa.",
      head: ["Method", "Often suits", "Worth knowing"],
      rows: [
        ["Shampoo cleaning", "Everyday fabric sofas with general dirt and light stains", "Needs drying time; keep the sofa unused until the team says it is ready"],
        ["Steam cleaning", "Fabrics that tolerate heat and moisture", "Not suitable for every material; check the care label or send a photo"],
        ["Spot / stain treatment", "A few marks on an otherwise clean sofa", "Results depend on the stain, how old it is and the fabric"],
        ["Dry or low-moisture approach", "Delicate fabrics such as some suede and velvet", "The team decides on site; gentler methods may take more than one pass"],
        ["Leather care", "Leather and leatherette sofas", "Cleaned and cared for rather than soaked; see the leather sofa page"],
        ["Not sure?", "Any sofa", "Send photos and the care label if you have it, and we will point you to the right method"],
      ],
    },
  ],
  local: {
    lahore:
      "Lahore homes range from apartments in DHA and Bahria Town to larger family houses in Gulberg, Johar Town and Model Town, and L-shaped and sectional sets are common in newer houses. Summer dust and the humidity of the monsoon both affect how often sofas need cleaning and how long they take to dry, so tell the team the season and room when you book.",
    islamabad:
      "Islamabad's sector-based layout means many customers are in F-6, F-7, F-8, F-10 and G-11 homes, plus Bahria Town and DHA Phase 2. Drying can take longer in cooler months, so ask the team for the expected drying time when they confirm your quote, and mention if the sofa will be used again the same evening.",
    gujranwala:
      "In Gujranwala we list service in areas such as DC Colony, Wapda Town, Model Town and Garden Town. Many family homes here have large living rooms with full sofa sets, so it often makes sense to clean the sofas and any carpets together in one visit.",
  },
  costFactors: [
    "Number of seats and cushions",
    "Size of the set, such as 3-seater, 5-seater, L-shaped or sectional",
    "Material and finish of the sofa",
    "Current condition and how deep the stains are",
    "Cleaning method chosen",
    "Your location in the city",
  ],
  costNote:
    "We do not publish fixed sofa cleaning prices because they depend on the sofa and the job. Send the number of seats, the material and a few photos, and you receive a quote from the service partner before anything starts.",
  prep: [
    "Clear cushions, throws and small items off the sofa and from the area around it.",
    "Check pockets and gaps in the seats for coins, remotes and keys.",
    "Look for a care label under a cushion and send a photo of it if you can.",
    "Point out any stains, and say what spilled and how long ago, if you know.",
    "Plan where the sofa can stay while it dries, and keep children and pets away from it.",
    "Mention any electrical parts such as powered recliners.",
  ],
  faqs: (c) => [
    {
      question: `How do I book sofa cleaning in ${c}?`,
      answer: `Send your area, the number of seats and a few photos on WhatsApp, or use the request form on this page. FixKar connects you with a cleaning team in ${c} who confirms the method and quote before work starts.`,
    },
    {
      question: "Can fabric sofas be deep cleaned?",
      answer:
        "Yes, most fabric sofas can be deep cleaned with shampoo or steam. The team checks the fabric and care label first, because some materials need a gentler method.",
    },
    {
      question: "Can leather sofas be cleaned?",
      answer:
        "Yes, but leather and leatherette are treated differently from fabric. Send a photo so the team can check the finish before confirming the approach.",
    },
    {
      question: "Can old sofa stains be removed?",
      answer:
        "Many stains improve noticeably, but results depend on what caused the stain, how long it has been there and the fabric. The team will tell you what is realistic when they see the sofa, and nothing is guaranteed in advance.",
    },
    {
      question: "How long does sofa cleaning take?",
      answer:
        "It depends on the number of seats and how soiled the sofa is. The team gives you a time estimate when confirming your booking.",
    },
    {
      question: "How should a sofa dry after cleaning?",
      answer:
        "Leave it unused until it is dry to the touch, keep the room ventilated, and avoid putting covers or cushions back while damp. The team will tell you the expected drying time for your fabric and the weather.",
    },
    {
      question: "How much does sofa cleaning cost?",
      answer: `The price depends on the number of seats, the material, the condition of the sofa and the cleaning method. Share these details and you get a quote before any work begins in ${c}.`,
    },
    {
      question: "Do you clean office sofas?",
      answer:
        "Yes. Office, reception and waiting-area sofas can be requested through the same process, and the team can plan around your working hours.",
    },
    {
      question: "Do you clean restaurant seating?",
      answer:
        "Restaurant and café seating, including upholstered chairs and booths, can be requested as a commercial enquiry. Send the number of seats and the type of upholstery so the team can scope it.",
    },
    {
      question: "Can you clean the sofa and the carpet in one visit?",
      answer:
        "Yes. Ask for sofa and carpet cleaning together when you book so both are planned for the same visit.",
    },
  ],
  related: ["leather-sofa-cleaning", "upholstery-cleaning", "office-sofa-cleaning", "restaurant-upholstery-cleaning", "hotel-upholstery-cleaning"],
};
