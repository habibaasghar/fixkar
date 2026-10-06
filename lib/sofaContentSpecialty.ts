import type { SofaIntent } from "./sofaCluster";

export const leatherIntent: SofaIntent = {
  slug: "leather-sofa-cleaning",
  shortName: "Leather Sofa Cleaning",
  name: "Leather Sofa Cleaning",
  whatsappLabel: "Request Leather Sofa Cleaning",
  h1: (c) => `Leather Sofa Cleaning in ${c}`,
  title: (c) => `Leather & Leatherette Sofa Cleaning in ${c}`,
  description: (c) =>
    `Cleaning and care for leather and leatherette sofas in ${c}. Send a photo of the finish and get a quote from a vetted local team before work starts.`,
  opening: (c) => [
    `FixKar.pk connects homes and businesses in ${c} with a vetted cleaning team for leather and leatherette sofas. Leather is not cleaned like fabric: it is wiped and cared for rather than soaked, so the team looks at your photos or the sofa itself before agreeing a method.`,
    `Tell us whether the sofa is genuine leather, bonded leather or leatherette, what colour it is, and what the problem is: dust, body oils on the arms and headrests, spills, marks or odor. If you are not sure of the type, a photo is enough to start.`,
    `Request service on WhatsApp or through the form below. The quote is confirmed before work begins and there is no advance payment.`,
  ],
  quick: (c) => [
    {
      question: "Can leather sofas be cleaned professionally?",
      answer: "Yes. The usual approach is gentle cleaning followed by care suited to the finish, not heavy soaking, and the exact method depends on the type of leather.",
    },
    {
      question: `Who cleans leather sofas in ${c} through FixKar?`,
      answer: `FixKar connects you with a vetted local cleaning team in ${c}. The team confirms they can handle your sofa's finish before agreeing the job.`,
    },
  ],
  blocks: () => [
    {
      kind: "h3",
      h2: "Leather Sofa Types and What They Need",
      items: [
        { title: "Genuine leather", text: "Natural leather can dry out or darken with the wrong products. Cleaning is gentle, and conditioning is usually discussed as part of aftercare." },
        { title: "Bonded leather and leatherette", text: "Coated surfaces that can peel or crack if scrubbed hard. These are cleaned lightly and the team will tell you if existing wear limits what is possible." },
        { title: "Aniline or light-coloured leather", text: "Light and uncoated leather marks easily and can stain permanently. Send a close-up photo so the team can judge it before cleaning." },
      ],
    },
    {
      kind: "bullets",
      h2: "Common Leather Sofa Problems",
      items: [
        "Dust and grime settled into seams and stitching",
        "Body oils and darker patches on arms and headrests",
        "Spills and marks on lighter leather",
        "Dull, dry-looking surface",
        "Odor from everyday use",
        "Existing cracks or peeling, which cleaning will not repair",
      ],
    },
    {
      kind: "steps",
      h2: "How Leather Sofa Cleaning Works",
      items: [
        { title: "Send photos", text: "Share clear photos of the whole sofa and any problem areas, with the leather type if you know it." },
        { title: "Finish check", text: "The team checks the finish and condition before choosing a method, and tells you if anything limits the result." },
        { title: "Gentle cleaning", text: "The surface is cleaned with methods suited to leather, working through seats, arms, backs and seams." },
        { title: "Aftercare", text: "You get advice on drying, conditioning and how to keep the sofa looking good between cleans." },
      ],
    },
    {
      kind: "table",
      h2: "Leather or Fabric: What Changes?",
      head: ["", "Leather and leatherette", "Fabric"],
      rows: [
        ["Moisture", "Kept low; the surface is wiped and cared for", "Shampoo or steam is common"],
        ["Main risk", "Drying out, colour loss, peeling", "Water marks, shrinkage, colour bleed"],
        ["Aftercare", "Conditioning is often discussed", "Drying time and ventilation"],
        ["Best starting point", "A close-up photo of the finish", "A photo and the care label"],
      ],
    },
  ],
  local: {
    lahore:
      "Leather sofas are common in Lahore's offices and in drawing rooms in areas like DHA, Gulberg and Cantt. Lahore's heat makes body oils and sweat marks on arms and headrests more noticeable, so mention how often the sofa is used when you write to us.",
    islamabad:
      "In Islamabad, leather sofas turn up in both homes and offices around sectors such as F-6, F-7 and F-8. Dry air and winter heating can dry leather out, so ask the team about conditioning as part of aftercare.",
    gujranwala:
      "In Gujranwala, leather and leatherette sofas are found in family drawing rooms and in business waiting areas. Tell us your area, such as DC Colony or Wapda Town, with a photo, and we will confirm whether we can arrange the visit.",
  },
  costFactors: [
    "Number of seats and pieces in the set",
    "Whether the sofa is genuine leather, bonded leather or leatherette",
    "Colour and finish, since light leather is more delicate",
    "Condition, including existing cracks, peeling or deep marks",
    "Whether conditioning or extra aftercare is included",
    "Your location in the city",
  ],
  costNote:
    "Leather pricing depends on the finish and condition as much as on size, so we do not list fixed rates. Send photos and the number of seats, and the service partner quotes before starting.",
  prep: [
    "Take a clear photo of the full sofa and close-ups of any marks or worn areas.",
    "Note the colour and, if you know it, the leather type.",
    "Do not use household cleaners on the leather before the visit.",
    "Clear the area around the sofa so the team can reach all sides.",
    "Tell us about any earlier treatments or coatings you know of.",
  ],
  faqs: (c) => [
    {
      question: `Can you clean leather sofas in ${c}?`,
      answer: `Yes. FixKar connects you with a cleaning team in ${c} who checks your sofa's finish from photos or on site before agreeing the method and quote.`,
    },
    {
      question: "Is cleaning the same for leather and leatherette?",
      answer: "No. Leatherette and bonded leather have a coated surface that can peel with hard scrubbing, while genuine leather can dry out. The method is adjusted to the type.",
    },
    {
      question: "Will cleaning fix cracks or peeling?",
      answer: "No. Cleaning can improve how a surface looks, but it does not repair cracked or peeling leather. The team will tell you if the damage limits the result.",
    },
    {
      question: "Does leather need to dry after cleaning?",
      answer: "Moisture is kept low, so drying is usually quicker than for fabric, but you should avoid using the sofa until the team says it is ready.",
    },
    {
      question: "How much does leather sofa cleaning cost?",
      answer: "It depends on the size of the set, the leather type, its condition and the aftercare involved. You receive a quote before work starts.",
    },
    {
      question: "I have fabric and leather furniture. Can both be cleaned together?",
      answer: "Yes. Mention both when you book so the team plans separate methods for each in one visit. See our sofa cleaning page for fabric sofas.",
    },
  ],
  related: ["sofa-cleaning", "upholstery-cleaning", "office-sofa-cleaning"],
};

export const upholsteryIntent: SofaIntent = {
  slug: "upholstery-cleaning",
  shortName: "Upholstery Cleaning",
  name: "Upholstery Cleaning",
  whatsappLabel: "Request Upholstery Cleaning",
  h1: (c) => `Upholstery Cleaning in ${c}`,
  title: (c) => `Upholstery Cleaning in ${c}: Chairs, Armchairs & More`,
  description: (c) =>
    `Cleaning for armchairs, dining chairs, ottomans, headboards and other upholstered furniture in ${c}. Share photos and get a quote before work starts.`,
  opening: (c) => [
    `Upholstery cleaning covers the fabric on furniture beyond the main sofa: armchairs, dining chairs, ottomans, benches, headboards and cushioned seating. FixKar.pk connects you with a vetted cleaning team in ${c} for these items, in the same visit as a sofa or on their own.`,
    `Dining chairs and headboards collect food marks, body oils and dust in places that are easy to miss. Cleaning them with the sofa often gives a more even result across the room.`,
    `Send the type and number of pieces with a few photos on WhatsApp or through the form. The team confirms the method and quote first, and you do not pay in advance.`,
  ],
  quick: (c) => [
    {
      question: "What counts as upholstery cleaning?",
      answer: "It is cleaning of fabric-covered furniture such as armchairs, dining chairs, ottomans, bench seats and headboards, not only the main sofa.",
    },
    {
      question: `Can I add dining chairs to a sofa cleaning booking in ${c}?`,
      answer: "Yes. Mention them when you request service so the team plans for every piece in one visit.",
    },
  ],
  blocks: (c) => [
    {
      kind: "cards",
      h2: "Furniture We Can Clean",
      items: [
        { title: "Dining chairs", text: "Seat pads and backs where food and drink marks collect. Quoted per chair or per set." },
        { title: "Armchairs and accent chairs", text: "Single chairs in drawing rooms and bedrooms, including wing-back and tufted styles." },
        { title: "Ottomans and benches", text: "Footstools and bench seating, including those in entryways and at the foot of beds." },
        { title: "Headboards", text: "Upholstered bed headboards, where hair oils and dust build up." },
        { title: "Cushions and bolsters", text: "Loose cushions that can be cleaned alongside a sofa set or on their own." },
        { title: "Stools and lounge seating", text: "Café-style and lounge seating. For larger commercial jobs see our restaurant and office pages." },
      ],
    },
    {
      kind: "bullets",
      h2: "Upholstery Problems We Help With",
      items: [
        "Food and drink marks on dining chairs",
        "Body oils on headboards and armchair headrests",
        "Dust trapped in seams and tufting",
        "Faded or dull-looking fabric",
        "Odor from everyday use or damp",
        "Marks from children or pets, depending on the fabric",
      ],
    },
    {
      kind: "table",
      h2: "Choosing a Method for Upholstered Furniture",
      head: ["Item", "Often suits", "Worth knowing"],
      rows: [
        ["Dining chairs", "Shampoo or steam, depending on the fabric", "Seat pads may need extra drying time"],
        ["Armchairs", "Same method as the matching sofa", "Clean them with the sofa so the fabric looks consistent"],
        ["Headboards", "Light, low-moisture cleaning", "Bed should stay unused until dry"],
        ["Tufted or buttoned pieces", "Careful hand cleaning", "Folds and buttons take longer to dry"],
      ],
    },
    {
      kind: "text",
      h2: "How to Request Upholstery Cleaning",
      paragraphs: [
        `List each piece you want cleaned, such as six dining chairs, two armchairs and a headboard, and attach a photo of each type. The team in ${c} uses that list to confirm the method and quote, and tells you how long the work will take and how long to allow for drying.`,
      ],
    },
  ],
  local: {
    lahore:
      "In Lahore, upholstered dining sets and headboards are common in larger houses in areas like DHA, Gulberg and Model Town, and café seating is common along busy commercial streets. Send us the pieces and your area, and we will confirm how we can arrange the visit.",
    islamabad:
      "Islamabad homes in sectors like F-7, F-8 and F-10 often pair a living-room sofa with dining sets and armchairs, which makes a single-visit upholstery clean convenient. Mention if the furniture is in an apartment so the team can plan access.",
    gujranwala:
      "In Gujranwala we hear most from families with large dining sets and drawing-room furniture around areas such as Model Town and Garden Town. List your pieces with a photo and we will confirm whether we can serve your area.",
  },
  costFactors: [
    "Number and type of pieces, for example dining chairs versus a headboard",
    "Fabric and how delicate it is",
    "Condition and amount of staining",
    "Whether items are cleaned together with a sofa",
    "Cleaning method chosen",
    "Your location in the city",
  ],
  costNote:
    "Upholstery is quoted by the piece or the set, not at a fixed rate. Tell us what you have and send photos, and the service partner confirms the quote before work begins.",
  prep: [
    "Remove cushions, covers and anything stored on or under the furniture.",
    "Count the pieces and take a photo of each type.",
    "Check for a care label, usually under the seat.",
    "Note any known stains and what caused them.",
    "Decide where the furniture can dry before it is used again.",
  ],
  faqs: (c) => [
    {
      question: `Do you clean dining chairs in ${c}?`,
      answer: "Yes. Dining chairs can be requested alone or added to a sofa cleaning booking, and are usually quoted per chair or per set.",
    },
    {
      question: "Can headboards be cleaned?",
      answer: "Upholstered headboards can be cleaned with a light, low-moisture approach, depending on the fabric. Send a photo so the team can check it.",
    },
    {
      question: "How is upholstery cleaning different from sofa cleaning?",
      answer: "The methods are similar, but upholstered chairs and headboards are smaller, have more seams and folds, and are often quoted by the piece rather than by the seat.",
    },
    {
      question: "Can I clean all my furniture in one visit?",
      answer: "Yes. List every piece when you request service and the team plans them together.",
    },
    {
      question: "How long should I wait before using cleaned chairs?",
      answer: "Allow them to dry fully. The team will give you an estimate for your fabric and the weather in the city.",
    },
  ],
  related: ["sofa-cleaning", "leather-sofa-cleaning", "restaurant-upholstery-cleaning"],
};
