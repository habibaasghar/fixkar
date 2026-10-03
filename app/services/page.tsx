import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CategoryDiscovery } from "@/components/domain/CategoryDiscovery";
import { FeaturedProjectServices, type FeaturedProject } from "@/components/domain/FeaturedProjectServices";
import { ServiceScaleVisual } from "@/components/domain/ServiceScaleVisual";
import { HowItWorksStep } from "@/components/domain/HowItWorksStep";
import { ProjectBriefBuilder } from "@/components/domain/ProjectBriefBuilder";
import { CityCard } from "@/components/domain/CityCard";
import { CityServiceSelector } from "@/components/domain/CityServiceSelector";
import { ServiceNetworkMap } from "@/components/domain/ServiceNetworkMap";
import { TrustPoint } from "@/components/domain/TrustPoint";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { RevealOnScroll } from "@/components/domain/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { taxonomyGroups } from "@/lib/serviceTaxonomy";
import { categories, cities } from "@/lib/services";
import { BRAND_NAME, BRAND_URL } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";
import { HomeServiceIllustration } from "@/components/illustrations/HomeServiceIllustration";
import { PathwayIllustration } from "@/components/illustrations/PathwayIllustration";
import { LocationSelector } from "@/components/domain/LocationSelector";
import { IconWrench, IconSparkle, IconPaint, IconHome as IconHomeGlyph, IconShield } from "@/components/icons";

export const metadata: Metadata = {
  title: "Home Services & Renovation Services in Pakistan",
  description:
    "From AC, electrical, plumbing, and painting repairs to full home renovation and solar enquiries — tell FixKar.pk what you need and we'll connect you with the right local service partner across Pakistan.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Home Services & Renovation Services in Pakistan | ${BRAND_NAME}`,
    description:
      "From AC, electrical, plumbing, and painting repairs to full home renovation and solar enquiries — tell FixKar.pk what you need and we'll connect you with the right local service partner across Pakistan.",
    url: `${BRAND_URL}/services`,
  },
};

const commonlyRequested = categories.filter((c) =>
  ["ac-repair", "electrician", "plumbing", "cleaning", "painter", "sofa-carpet-cleaning"].includes(c.slug)
);

const problemPathways = [
  {
    question: "Something isn't working",
    groupSlugs: ["ac-cooling", "electrical", "plumbing", "appliance-repair"],
    icon: IconWrench,
    color: "text-primary bg-primary-light",
  },
  {
    question: "Need your home cleaned",
    groupSlugs: ["cleaning"],
    icon: IconSparkle,
    color: "text-secondary bg-secondary-light",
  },
  {
    question: "Want to improve your property",
    groupSlugs: ["painting", "gardening", "carpentry", "renovation"],
    icon: IconPaint,
    color: "text-accent-hover bg-accent-light",
  },
  {
    question: "Planning a larger project",
    groupSlugs: ["renovation", "solar"],
    note: "See “Planning a Bigger Home Project?” above",
    icon: IconHomeGlyph,
    color: "text-primary bg-primary-light",
  },
  {
    question: "Need business or facility maintenance",
    groupSlugs: [],
    note: "See Business Services below",
    icon: IconShield,
    color: "text-secondary bg-secondary-light",
  },
];

export default function ServicesPage() {
  const activeCity = cities[0]; // Lahore — see lib/services.ts for full city status

  // "Painting" is a real, live category today — link straight to its real page.
  // The rest aren't bookable yet, so their CTA opens WhatsApp with project context
  // instead of a fabricated landing page (see docs/SERVICES_HUB_PAGE_SPEC.md §0).
  const featuredProjects: FeaturedProject[] = [
    {
      slug: "home-renovation",
      title: "Complete Home Renovation",
      description:
        "Planning a full renovation or remodel? Tell us the scope and we'll help connect you with a suitable local partner.",
      ctaLabel: "Discuss My Renovation",
      icon: "home",
      accent: { text: "text-stone-700", blob: "#fafaf9" },
      whatsappMessage: "Hi FixKar, I'm planning a complete home renovation. Here's what I need: ",
    },
    {
      slug: "solar",
      title: "Solar Installation",
      description: "Considering residential solar? Share your home size and requirement for a quote.",
      ctaLabel: "Request Solar Quote",
      icon: "sun",
      accent: { text: "text-orange-700", blob: "#fff7ed" },
      whatsappMessage: "Hi FixKar, I'd like a quote for solar panel installation. Here's what I need: ",
    },
    {
      slug: "kitchen-renovation",
      title: "Kitchen Renovation",
      description: "Upgrading cabinets, counters, or your whole kitchen layout? Tell us what you're planning.",
      ctaLabel: "Plan My Kitchen",
      icon: "wrench",
      accent: { text: "text-amber-700", blob: "#fffbeb" },
      whatsappMessage: "Hi FixKar, I'm planning a kitchen renovation. Here's what I need: ",
    },
    {
      slug: "bathroom-renovation",
      title: "Bathroom Renovation",
      description: "Fixtures, tiling, or a full bathroom remodel — describe the project and we'll take it from there.",
      ctaLabel: "Plan My Bathroom",
      icon: "droplet",
      accent: { text: "text-cyan-700", blob: "#ecfeff" },
      whatsappMessage: "Hi FixKar, I'm planning a bathroom renovation. Here's what I need: ",
    },
    {
      slug: "painter",
      title: "House Painting",
      description: "Full interior or exterior repaint for your home — get a quote from a vetted painter.",
      ctaLabel: "Get Painting Estimate",
      icon: "paint",
      accent: { text: "text-rose-700", blob: "#fff1f2" },
      href: `/${activeCity.slug}/painter`,
    },
    {
      slug: "waterproofing",
      title: "Waterproofing",
      description: "Roof, terrace, or wall seepage issues? Tell us where the moisture problem is.",
      ctaLabel: "Discuss Waterproofing",
      icon: "shield",
      accent: { text: "text-indigo-700", blob: "#eef2ff" },
      whatsappMessage: "Hi FixKar, I need help with waterproofing. Here's what I need: ",
    },
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FixKar.pk Services",
    url: `${BRAND_URL}/services`,
    itemListElement: taxonomyGroups
      .filter((g) => g.liveCategorySlugs.length > 0)
      .map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: g.name,
          url: `${BRAND_URL}/${activeCity.slug}/${g.liveCategorySlugs[0]}`,
        },
      })),
  };

  const hubFaqs = [
    {
      question: "What home services does FixKar offer?",
      answer:
        "Everything from everyday repairs — AC, electrical, plumbing, cleaning, painting — to larger home improvement projects like renovation and solar installation. FixKar doesn't directly employ every technician; we connect your requirement with a local service partner.",
    },
    {
      question: "Which cities does FixKar currently serve?",
      answer:
        "FixKar is fully active in Lahore today. Islamabad and Gujranwala currently have sofa & carpet cleaning available, with other services expanding soon. We're adding cities one at a time rather than claiming coverage we haven't confirmed yet.",
    },
    {
      question: "Can I request a complete home renovation?",
      answer:
        "Yes — describe the scope on this page or via WhatsApp and we'll review it and connect you with a suitable local partner where available. We can't guarantee a specific contractor until that matching happens.",
    },
    {
      question: "Can I request solar installation?",
      answer:
        "Yes, you can send us your solar requirement and home details and we'll follow up with next steps — this works as an enquiry today rather than an instant booking.",
    },
    {
      question: "Can I request multiple services for one project?",
      answer:
        "Yes. Describe the whole project — for example a kitchen renovation involving plumbing, electrical, and carpentry — and we'll help identify the relevant trades involved.",
    },
    {
      question: "Can I send photos of the work?",
      answer:
        "Yes, photos help us and the service partner understand the job before any visit, especially for renovation or repair work.",
    },
    {
      question: "How do I get a quote?",
      answer:
        "Tell us what you need here or on WhatsApp. We review the requirement, connect you with a partner where available, and you discuss scope and pricing directly before confirming — no upfront platform payment.",
    },
    {
      question: "Does FixKar perform the work directly?",
      answer:
        "Not always — FixKar coordinates with independent local service partners and contractors rather than directly performing every job. You pay the partner directly once you're satisfied with the work.",
    },
  ];

  return (
    <div>
      <JsonLd data={itemListSchema} />
      <FAQSchema faqs={hubFaqs} />

      <Container className="pt-6">
        <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
      </Container>

      {/* Hero */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-primary-light/60 via-white to-white py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-hover">
                FixKar Services
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-tight">
                Home Services &amp; Renovation Solutions in Pakistan
              </h1>

              <p className="mx-auto lg:mx-0 max-w-2xl text-base text-gray-600 sm:text-lg">
                From everyday repairs to complete home improvement projects, tell us what you need and we&apos;ll help connect you with the right local service partner.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
                <Link href="/request">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Get a Service Quote
                  </Button>
                </Link>
                <WhatsAppCTA
                  message="Hi FixKar, I need help finding the right service."
                  label="Chat on WhatsApp"
                  size="lg"
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 justify-center lg:justify-start">
                <span className="text-xs font-semibold text-gray-500">Select Your City</span>
                <LocationSelector placeholder="Choose your city" />
              </div>
            </div>

            <div className="hidden lg:block">
              <HomeServiceIllustration className="w-full h-auto max-w-md mx-auto" />
            </div>
          </div>
        </Container>
      </section>

      {/* Commonly requested — quick links to real, live category pages */}
      <Section background="white" className="!py-10">
        <Container>
          <p className="text-center text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
            Commonly Requested Services
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {commonlyRequested.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${activeCity.slug}/${cat.slug}`}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:border-primary-hover hover:text-primary transition"
              >
                {cat.shortName}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Category discovery */}
      <Section background="subtle" id="browse" className="scroll-mt-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Browse by Category
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Search for what you need, or browse the full FixKar service ecosystem below.
            </p>
          </div>
          <CategoryDiscovery groups={taxonomyGroups} citySlug={activeCity.slug} />
        </Container>
      </Section>

      {/* Featured high-value projects */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Planning a Bigger Home Project?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              From full renovations to solar installation, tell us about the project and we&apos;ll help you find the right path forward.
            </p>
          </div>
          <FeaturedProjectServices projects={featuredProjects} />
        </Container>
      </Section>

      {/* Small job to complete project spectrum */}
      <Section background="subtle">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              From One Repair to a Complete Project
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Whatever the size of the job, FixKar can take the enquiry — there&apos;s no project too small or too big to ask about.
            </p>
          </div>
          <ServiceScaleVisual />
        </Container>
      </Section>

      {/* Problem-based discovery */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Not Sure What You Need?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Start from the problem, and we&apos;ll point you to the right category.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
            {problemPathways.map((pathway) => {
              const groups = pathway.groupSlugs
                .map((slug) => taxonomyGroups.find((g) => g.slug === slug))
                .filter((g): g is NonNullable<typeof g> => Boolean(g));

              const Icon = pathway.icon;

              return (
                <div key={pathway.question} className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${pathway.color}`}>
                      <Icon size={18} />
                    </span>
                    <p className="text-sm font-bold text-gray-900">{pathway.question}</p>
                  </div>
                  {groups.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {groups.map((group) => {
                        const live = group.liveCategorySlugs.length > 0;
                        return live ? (
                          <Link
                            key={group.slug}
                            href={`/${activeCity.slug}/${group.liveCategorySlugs[0]}`}
                            className="rounded-full bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-primary hover:border-primary-hover transition"
                          >
                            {group.name}
                          </Link>
                        ) : (
                          <span
                            key={group.slug}
                            className="rounded-full bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-400"
                          >
                            {group.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  {pathway.note && (
                    <p className="text-xs text-gray-500 mt-1">{pathway.note}</p>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Business services pathway */}
      <Section background="subtle">
        <Container>
          <RevealOnScroll className="max-w-xl mx-auto">
            <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden">
              <div className="h-28 bg-primary-light flex items-center justify-center">
                <PathwayIllustration variant="business" className="h-24" />
              </div>
              <div className="p-8 space-y-4 text-center">
                <span className="inline-flex items-center rounded-full bg-primary-subtle px-3 py-1 text-xs font-bold text-primary-hover">
                  For Businesses
                </span>
                <h3 className="text-xl font-extrabold text-gray-900">Business &amp; Commercial Services</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Office cleaning, facility maintenance, commercial electrical/AC/plumbing, and maintenance contracts for businesses and property managers.
                </p>
                <Link href="/request">
                  <Button variant="secondary" className="mt-2">
                    Explore Business Services
                  </Button>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* How FixKar works */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              How FixKar Works
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              From your first message to a confirmed quote.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <HowItWorksStep
              stepNumber={1}
              title="Tell Us What You Need"
              description="Select a service, or just explain the requirement in your own words."
            />
            <HowItWorksStep
              stepNumber={2}
              title="Share Your Location & Details"
              description="Your city, area, project details, and preferred timing — photos help too, where useful."
            />
            <HowItWorksStep
              stepNumber={3}
              title="We Connect the Requirement"
              description="We review your enquiry and identify an appropriate local service partner where available."
            />
            <HowItWorksStep
              stepNumber={4}
              title="Discuss the Work & Quote"
              description="Talk through scope, pricing, and timing directly, then confirm the job."
            />
          </div>
        </Container>
      </Section>

      {/* Project brief builder */}
      <Section background="subtle">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Tell Us What You Need
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Answer a few quick questions and we&apos;ll put together a WhatsApp message for you — no long forms.
            </p>
          </div>
          <div className="max-w-xl mx-auto">
            <ProjectBriefBuilder />
          </div>
        </Container>
      </Section>

      {/* City availability */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Home Services Across Major Pakistan Cities
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              FixKar is live in Lahore today and expanding city by city. Select your city to see what&apos;s available now.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {cities.map((city) => (
              <CityCard key={city.slug} city={city} />
            ))}
            <a
              href={whatsappUrl("Hi FixKar, I need a home service in Gujrat.")}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card hoverable className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-gray-900">Gujrat</h4>
                  <p className="text-xs text-gray-500">Tell us what you need — we&apos;ll see what we can arrange</p>
                </div>
                <Badge variant="brand">🔵 Message Us</Badge>
              </Card>
            </a>
          </div>
        </Container>
      </Section>

      {/* City × service selector */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Find Services in Your City
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Pick your city to see exactly what&apos;s bookable there today.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <CityServiceSelector />
          </div>
        </Container>
      </Section>

      {/* Trust */}
      <Section background="subtle">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            <TrustPoint
              icon="shield"
              title="Vetted Vendor Partners"
              text="We personally know and check the vendor partners we connect you with."
            />
            <TrustPoint
              icon="phone"
              title="Pay After Service"
              text="Zero upfront payment. Pay directly once you're satisfied with the work."
            />
            <TrustPoint
              icon="check"
              title="Vendor-Backed Warranty"
              text="Any workmanship warranty is provided by the vendor partner — ask about their terms with your quote."
            />
          </div>
        </Container>
      </Section>

      {/* Service network map */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Build Your Project From the Right Services
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Bigger projects usually involve more than one trade — here&apos;s how a home renovation typically breaks down.
            </p>
          </div>
          <ServiceNetworkMap />
        </Container>
      </Section>

      {/* FAQ */}
      <Section background="subtle">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {hubFaqs.map((faq, i) => (
              <AccordionItem key={faq.question} title={faq.question} defaultOpen={i === 0}>
                <p>{faq.answer}</p>
              </AccordionItem>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section background="brand">
        <Container>
          <div className="text-center max-w-xl mx-auto space-y-5">
            <HomeServiceIllustration className="w-full h-auto max-w-xs mx-auto opacity-90" />
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Tell Us What You Need Fixed, Installed or Improved
            </h2>
            <p className="text-sm text-primary-subtle">
              From a small repair to a complete home improvement project, share your requirement and let FixKar help you find the right service path.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link href="/request">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 border-none">
                  Get a Service Quote
                </Button>
              </Link>
              <WhatsAppCTA message="Hi FixKar, I need help finding the right service." label="Chat on WhatsApp" size="lg" />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
