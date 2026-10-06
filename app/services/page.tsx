import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FeaturedProjectServices, type FeaturedProject } from "@/components/domain/FeaturedProjectServices";
import { ServiceCategoryExplorer } from "@/components/domain/ServiceCategoryExplorer";
import { ServiceScaleVisual } from "@/components/domain/ServiceScaleVisual";
import { HowItWorksStep } from "@/components/domain/HowItWorksStep";
import { ProjectBriefBuilder } from "@/components/domain/ProjectBriefBuilder";
import { CityMarkets } from "@/components/domain/CityMarkets";
import { CityServiceSelector } from "@/components/domain/CityServiceSelector";
import { ServiceNetworkMap } from "@/components/domain/ServiceNetworkMap";
import { ServicesStickyCTA } from "@/components/domain/ServicesStickyCTA";
import { TrustPoint } from "@/components/domain/TrustPoint";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { RevealOnScroll } from "@/components/domain/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { BRAND_URL } from "@/lib/constants";
import { hubServices, hubCities, liveServiceHref } from "@/lib/servicesHub";
import { HomeServiceIllustration } from "@/components/illustrations/HomeServiceIllustration";
import { PathwayIllustration } from "@/components/illustrations/PathwayIllustration";
import { LocationSelector } from "@/components/domain/LocationSelector";

const PAGE_TITLE = "Home Services & Renovation Services in Pakistan | FixKar";
const PAGE_DESCRIPTION =
  "Home repairs, installations and renovation projects in Pakistan. Tell FixKar what you need in Lahore, Islamabad, Karachi and more, and we'll connect you with a local service partner.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "FixKar.pk",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BRAND_URL}/services`,
  },
  twitter: { card: "summary_large_image", title: PAGE_TITLE, description: PAGE_DESCRIPTION },
};

const lahore = hubCities[0];

// Painting is live in Lahore, so it links to the real page; other projects open a
// project-specific WhatsApp enquiry rather than a page that doesn't exist.
const featuredProjects: FeaturedProject[] = [
  {
    slug: "home-renovation", title: "Complete Home Renovation", glyph: "renovation", accent: "#57534e",
    description: "For customers planning a major renovation or remodelling project.",
    trades: ["Electrical", "Plumbing", "Painting", "Flooring", "False ceiling", "Carpentry"],
    ctaLabel: "Discuss My Renovation",
    whatsappMessage: "Hi FixKar, I'm planning a complete home renovation. Here's what I need: ",
  },
  {
    slug: "solar", title: "Solar Installation", glyph: "solar", accent: "#ea580c",
    description: "For homeowners considering residential solar installation.",
    trades: ["Solar panels", "Inverter", "Electrical", "Roof"],
    ctaLabel: "Request Solar Quote",
    whatsappMessage: "Hi FixKar, I'd like a quote for solar panel installation. Here's what I need: ",
  },
  {
    slug: "kitchen-renovation", title: "Kitchen Renovation", glyph: "kitchen", accent: "#b45309",
    description: "For complete or partial kitchen upgrades.",
    trades: ["Cabinets", "Countertop", "Plumbing", "Electrical", "Tiling"],
    ctaLabel: "Plan My Kitchen",
    whatsappMessage: "Hi FixKar, I'm planning a kitchen renovation. Here's what I need: ",
  },
  {
    slug: "bathroom-renovation", title: "Bathroom Renovation", glyph: "bathroom", accent: "#0e7490",
    description: "For bathroom remodelling and improvement.",
    trades: ["Plumbing", "Tiling", "Fixtures", "Waterproofing"],
    ctaLabel: "Plan My Bathroom",
    whatsappMessage: "Hi FixKar, I'm planning a bathroom renovation. Here's what I need: ",
  },
  {
    slug: "painter", title: "House Painting", glyph: "painting", accent: "#e11d48",
    description: "For complete residential painting projects.",
    trades: ["Interior", "Exterior", "Wall finishing", "Repainting"],
    ctaLabel: "Get Painting Estimate",
    href: liveServiceHref(hubServices.find((s) => s.slug === "painting")!, lahore),
    whatsappMessage: "Hi FixKar, I need a house painting estimate. Here's what I need: ",
  },
  {
    slug: "waterproofing", title: "Waterproofing", glyph: "waterproofing", accent: "#4f46e5",
    description: "For roofs, terraces and moisture-related work.",
    trades: ["Roof", "Terrace", "Seepage", "Damp walls"],
    ctaLabel: "Discuss Waterproofing",
    whatsappMessage: "Hi FixKar, I need help with waterproofing. Here's what I need: ",
  },
];

const guideTopics = [
  {
    title: "Repair or replace?",
    body: "A repair usually makes sense when the fault is isolated, such as a leaking tap, a tripping switch or an AC that needs a gas refill. Replacement is worth discussing when the same fault keeps coming back, the part is old, or repair costs approach the cost of new. Describe the problem and its history, and add photos if you can, so the service partner can advise before quoting.",
  },
  {
    title: "Planning a larger renovation",
    body: "House renovation rarely involves one trade. Kitchens bring together cabinets, plumbing, electrical points and tiling; bathrooms combine plumbing, tiling and waterproofing. Share the whole scope, your city and area, the rooms involved and your preferred timing, and the relevant trades can be identified together instead of being chased one by one.",
  },
  {
    title: "How the connection works",
    body: "FixKar is a Pakistan-focused home service enquiry platform. We coordinate with independent local service partners and contractors rather than performing every job ourselves. When your enquiry arrives we review it and, where a suitable partner is available, connect you so scope, price and timing are discussed with that partner before you confirm anything.",
  },
  {
    title: "Information that helps a quote",
    body: "The more specific the enquiry, the more useful the quote. Mention the service, city and area, the size of the space or the number of units (for example AC units or rooms), whether it is a repair, installation, replacement or renovation, any deadline, and attach photos where useful.",
  },
];

const hubFaqs = [
  {
    question: "What home services does FixKar provide?",
    answer:
      "FixKar takes enquiries across AC and cooling, electrical, plumbing, home renovation, solar, painting, kitchen and bathroom renovation, roofing and waterproofing, flooring and tiling, carpentry, false ceiling and gypsum, doors and windows, CCTV and home security, appliance services, cleaning and maintenance, moving and home shifting, and general handyman work. FixKar coordinates with independent local service partners and does not directly employ every technician.",
  },
  {
    question: "Which cities does FixKar currently serve?",
    answer:
      "FixKar takes enquiries for Lahore, Islamabad, Rawalpindi, Karachi, Gujranwala and Gujrat. Which services can be arranged depends on the local service partners available for your requirement, so the best step is to send your city and requirement and we will review it.",
  },
  {
    question: "Can I request a complete home renovation?",
    answer:
      "Yes. Describe the scope, your city and area, and your timing. FixKar reviews the requirement and, where a suitable service partner or contractor is available, connects you so the project can be discussed. A specific contractor is not promised before that review.",
  },
  {
    question: "Can I request solar installation?",
    answer:
      "Yes. Send your city, the type of property, roughly how much power you use or want to cover, and photos of the roof if possible. FixKar reviews the enquiry and connects it with a relevant service partner where available, who can discuss the solution and quotation with you.",
  },
  {
    question: "Can I request multiple services for one house?",
    answer:
      "Yes. Describe the complete project, for example a kitchen renovation that also needs plumbing, electrical work and carpentry, and the relevant trades can be identified from your description.",
  },
  {
    question: "Can I send photos of the work?",
    answer:
      "Yes. Photos help the service partner understand the condition and scope before discussing the work. You can share them once the WhatsApp conversation starts.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Send your requirement through the quote form or WhatsApp. FixKar reviews it, connects it with a suitable local service partner where available, and you then discuss scope, price and timing with them before deciding to go ahead.",
  },
  {
    question: "Does FixKar perform the work directly?",
    answer:
      "Not necessarily. FixKar works with independent local service partners and contractors. We help you describe the requirement and connect it with the right partner; the work itself is carried out by that partner. Any workmanship warranty is provided by the partner for that job, so ask about it when you receive your quote.",
  },
  {
    question: "Can I request a contractor for a large renovation?",
    answer:
      "Yes, you can submit a large renovation as an enquiry. FixKar reviews the scope and, where a suitable contractor is available, connects you. Availability is confirmed only after that matching step.",
  },
  {
    question: "Can I contact FixKar through WhatsApp?",
    answer:
      "Yes. WhatsApp is the main way to reach FixKar. Use the Chat on WhatsApp button or the project brief on this page to open a message that is already filled in with your service and city.",
  },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BRAND_URL}/services#webpage`,
  url: `${BRAND_URL}/services`,
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  inLanguage: "en-PK",
  isPartOf: { "@type": "WebSite", name: "FixKar.pk", url: BRAND_URL },
  about: { "@type": "Thing", name: "Home services, repairs, installations and renovation in Pakistan" },
};

// Items are only the service categories visibly listed on this page, linked to
// their in-page section. Service schema belongs on individual service pages.
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "FixKar home service categories",
  url: `${BRAND_URL}/services`,
  numberOfItems: hubServices.length,
  itemListElement: hubServices.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    url: `${BRAND_URL}/services#${s.slug}`,
  })),
};

const h2 = "text-2xl font-extrabold text-gray-900 sm:text-3xl";
const lede = "mt-2 text-sm text-gray-600 sm:text-base";

export default function ServicesPage() {
  return (
    <div>
      <JsonLd data={webPageSchema} />
      <JsonLd data={itemListSchema} />
      <FAQSchema faqs={hubFaqs} />

      <Container className="pt-6">
        <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
      </Container>

      {/* Hero */}
      <section className="overflow-hidden border-b border-gray-200 bg-gradient-to-b from-primary-light/60 via-white to-white py-10 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-5 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-hover">FixKar Services</span>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-tight">
                Home Services &amp; Renovation Solutions in Pakistan
              </h1>

              <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg lg:mx-0">
                From everyday repairs to complete home improvement projects, tell us what you need and we&apos;ll help connect you with the right local service partner.
              </p>

              <div className="flex flex-col justify-center gap-3 pt-1 sm:flex-row lg:justify-start">
                <Link href="/request">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Get a Service Quote
                  </Button>
                </Link>
                <WhatsAppCTA message="Hi FixKar, I need help finding the right service." label="Chat on WhatsApp" size="lg" className="w-full sm:w-auto" />
              </div>

              <div className="flex flex-col items-center gap-2 pt-1 sm:flex-row lg:justify-start">
                <span className="text-xs font-semibold text-gray-500">Select Your City</span>
                <LocationSelector placeholder="Choose your city" />
              </div>
            </div>

            {/* Reserved aspect box → no layout shift; shown on every viewport */}
            <div className="mx-auto w-full max-w-xs sm:max-w-md lg:max-w-md">
              <HomeServiceIllustration className="aspect-[4/3] h-auto w-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* Service discovery */}
      <Section background="subtle" id="browse" className="scroll-mt-20">
        <Container>
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className={h2}>What Do You Need Help With?</h2>
            <p className={lede}>
              Pick your city, then choose a service. If you don&apos;t see it, describe it. FixKar takes enquiries for repairs, installations, maintenance and larger home improvement work.
            </p>
          </div>
          <ServiceCategoryExplorer />
        </Container>
      </Section>

      {/* Featured high-value projects */}
      <Section background="white" id="projects" className="scroll-mt-20">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className={h2}>Planning a Bigger Home Project?</h2>
            <p className={lede}>
              These are project pathways rather than single jobs. Describe the scope and we&apos;ll help identify the trades involved and connect your enquiry with a suitable service partner where available.
            </p>
          </div>
          <FeaturedProjectServices projects={featuredProjects} />
        </Container>
      </Section>

      {/* Spectrum */}
      <Section background="subtle">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className={h2}>From One Repair to a Complete Project</h2>
            <p className={lede}>Wherever your job sits, from a single repair to work across several trades, you can start with the same enquiry.</p>
          </div>
          <ServiceScaleVisual />
        </Container>
      </Section>

      {/* How it works */}
      <Section background="white" id="how-it-works" className="scroll-mt-20">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className={h2}>How FixKar Works</h2>
            <p className={lede}>Requirement → Matching → Conversation → Project.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <HowItWorksStep stepNumber={1} title="Tell Us What You Need" description="Select a service or explain the requirement in your own words." />
            <HowItWorksStep stepNumber={2} title="Share Your Location & Details" description="Your city, area, project details, preferred timing, and photos where useful." />
            <HowItWorksStep stepNumber={3} title="We Connect the Requirement" description="FixKar reviews the enquiry and identifies an appropriate local service partner or contractor where available." />
            <HowItWorksStep stepNumber={4} title="Discuss the Work & Quote" description="Talk through scope, pricing and execution with the service partner before you decide." />
          </div>
        </Container>
      </Section>

      {/* Project brief builder */}
      <Section background="subtle" id="brief" className="scroll-mt-20">
        <Container>
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className={h2}>Tell Us What You Need</h2>
            <p className={lede}>Four quick answers and we&apos;ll write the WhatsApp message for you. No long forms.</p>
          </div>
          <div className="mx-auto max-w-xl">
            <ProjectBriefBuilder />
          </div>
        </Container>
      </Section>

      {/* Cities */}
      <Section background="white" id="cities" className="scroll-mt-20">
        <Container>
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className={h2}>Home Services Across Major Pakistan Cities</h2>
            <p className={lede}>
              FixKar takes home service enquiries for Lahore, Islamabad, Rawalpindi, Karachi, Gujranwala and Gujrat.
            </p>
          </div>
          <CityMarkets />

          <div className="mx-auto mt-12 max-w-3xl">
            <h3 className="mb-4 text-center text-xl font-extrabold text-gray-900">Choose a City, Then a Service</h3>
            <CityServiceSelector />
          </div>
        </Container>
      </Section>

      {/* Trust: operating model only */}
      <Section background="subtle">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className={h2}>A Simple, Honest Way to Find Help</h2>
            <p className={lede}>How FixKar works today, without the marketing gloss.</p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <TrustPoint icon="shield" title="Local Service Network" text="Your requirement is connected with relevant local service partners where available." />
            <TrustPoint icon="check" title="Clear Requirement First" text="Describe the work up front, then discuss scope, price and execution with the partner." />
            <TrustPoint icon="phone" title="WhatsApp-Friendly" text="Simple, familiar communication: send details and photos in one conversation." />
            <TrustPoint icon="clock" title="Project-Friendly" text="Supports smaller jobs as well as larger home improvement enquiries." />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-gray-500">
            No upfront platform payment. Any workmanship warranty is provided by the service partner for that job, so ask about it when you receive your quote.
          </p>
        </Container>
      </Section>

      {/* Useful guidance */}
      <Section background="white" id="guide" className="scroll-mt-20">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className={h2}>Choosing the Right Service for Your Home</h2>
            <p className={lede}>A few practical points before you send an enquiry.</p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
            {guideTopics.map((t) => (
              <article key={t.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-base font-bold text-gray-900">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Service network map */}
      <Section background="subtle" id="project-map" className="scroll-mt-20">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className={h2}>Build Your Project From the Right Services</h2>
            <p className={lede}>Larger projects often involve several trades. Here is how a home renovation typically connects them.</p>
          </div>
          <ServiceNetworkMap />
        </Container>
      </Section>

      {/* Business pathway */}
      <Section background="white">
        <Container>
          <RevealOnScroll className="mx-auto max-w-xl">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
              <div className="flex h-28 items-center justify-center bg-primary-light">
                <PathwayIllustration variant="business" className="h-24" />
              </div>
              <div className="space-y-4 p-8 text-center">
                <span className="inline-flex items-center rounded-full bg-primary-subtle px-3 py-1 text-xs font-bold text-primary-hover">For Businesses</span>
                <h3 className="text-xl font-extrabold text-gray-900">Business &amp; Commercial Requirements</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Office or facility maintenance and commercial electrical, AC or plumbing work? Send the requirement and we&apos;ll review it.
                </p>
                <Link href="/request">
                  <Button variant="secondary" className="mt-2">Send a Business Enquiry</Button>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* FAQ */}
      <Section background="subtle" id="faq" className="scroll-mt-20">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className={h2}>Frequently Asked Questions</h2>
          </div>
          <div className="mx-auto max-w-3xl divide-y divide-gray-200">
            {hubFaqs.map((faq, i) => (
              <AccordionItem key={faq.question} title={faq.question} defaultOpen={i === 0}>
                <p>{faq.answer}</p>
              </AccordionItem>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA: mirrored composition vs hero (text left, illustration right on desktop) */}
      <Section background="brand" className="mb-16 md:mb-0">
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-5">
            <div className="space-y-5 text-center md:col-span-3 md:text-left">
              <h2 className="text-2xl font-extrabold sm:text-4xl">Tell Us What You Need Fixed, Installed or Improved</h2>
              <p className="text-sm text-primary-subtle sm:text-base">
                From a small repair to a complete home improvement project, share your requirement and let FixKar help you find the right service path.
              </p>
              <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row md:justify-start">
                <Link href="/request">
                  <Button variant="secondary" size="lg" className="w-full border-none bg-white text-primary hover:bg-gray-100 sm:w-auto">
                    Get a Service Quote
                  </Button>
                </Link>
                <WhatsAppCTA message="Hi FixKar, I need help finding the right service." label="Chat on WhatsApp" size="lg" className="w-full sm:w-auto" />
              </div>
            </div>
            <div className="mx-auto hidden w-full max-w-xs rounded-3xl bg-white/95 p-3 md:col-span-2 md:block">
              <HomeServiceIllustration className="aspect-[4/3] h-auto w-full" />
            </div>
          </div>
        </Container>
      </Section>

      <ServicesStickyCTA />
    </div>
  );
}
