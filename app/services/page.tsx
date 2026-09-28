import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CategoryDiscovery } from "@/components/domain/CategoryDiscovery";
import { TrustPoint } from "@/components/domain/TrustPoint";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { Button } from "@/components/ui/Button";
import { taxonomyGroups } from "@/lib/serviceTaxonomy";
import { categories, cities } from "@/lib/services";
import { BRAND_NAME, BRAND_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Browse FixKar.pk's home, property, and business services — AC, electrical, plumbing, cleaning, painting and more — and get connected with a vetted vendor partner.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Services | ${BRAND_NAME}`,
    description:
      "Browse FixKar.pk's home, property, and business services and get connected with a vetted vendor partner.",
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
  },
  {
    question: "Need your home cleaned",
    groupSlugs: ["cleaning"],
  },
  {
    question: "Want to improve your property",
    groupSlugs: ["painting", "gardening", "carpentry", "renovation"],
  },
  {
    question: "Planning a larger project",
    groupSlugs: ["renovation"],
    note: "See Projects & Contracts below",
  },
  {
    question: "Need business or facility maintenance",
    groupSlugs: [],
    note: "See Business Services below",
  },
];

export default function ServicesPage() {
  const activeCity = cities[0]; // Lahore — see lib/services.ts for full city status

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FixKar.pk Services",
    url: `${BRAND_URL}/services`,
    hasPart: taxonomyGroups
      .filter((g) => g.liveCategorySlugs.length > 0)
      .map((g) => ({
        "@type": "Service",
        name: g.name,
        url: `${BRAND_URL}/${activeCity.slug}/${g.liveCategorySlugs[0]}`,
      })),
  };

  return (
    <div>
      <JsonLd data={itemListSchema} />

      <Container className="pt-6">
        <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
      </Container>

      {/* Hero */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-primary-light/60 via-white to-white py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-subtle px-3.5 py-1 text-xs font-bold text-primary-hover">
              <span>📍 Active in Lahore</span>
              <span>•</span>
              <span>Sofa &amp; Carpet Cleaning also in Islamabad &amp; Gujranwala</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-tight">
              Services for Your Home, Property &amp; Business
            </h1>

            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
              FixKar connects you with vetted vendor partners for repairs, maintenance, cleaning, home improvement, and larger property projects.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link href="/request">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Get a Quote
                </Button>
              </Link>
              <a href="#browse">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Explore Services
                </Button>
              </a>
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

              return (
                <div key={pathway.question} className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5">
                  <p className="text-sm font-bold text-gray-900 mb-3">{pathway.question}</p>
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

      {/* Business Services + Projects & Contracts pathways */}
      <Section background="subtle">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-3xl border border-gray-200 bg-white p-8 space-y-4">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                For Businesses
              </span>
              <h3 className="text-xl font-extrabold text-gray-900">Business &amp; Commercial Services</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Office cleaning, facility maintenance, commercial electrical/AC/plumbing, and maintenance contracts for businesses and property managers.
              </p>
              <Link href="/request">
                <Button variant="secondary" className="mt-2">
                  Request a Business Quote
                </Button>
              </Link>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 space-y-4">
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                For Larger Projects
              </span>
              <h3 className="text-xl font-extrabold text-gray-900">Projects &amp; Contracts</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Home renovation, false ceiling, flooring, and full painting or property maintenance projects — larger in scope than a quick service booking.
              </p>
              <Link href="/request">
                <Button variant="secondary" className="mt-2">
                  Request a Project Quote
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust */}
      <Section background="white">
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

      {/* Final CTA */}
      <Section background="brand">
        <Container>
          <div className="text-center max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to Get Started?</h2>
            <p className="text-sm text-primary-subtle">
              Tell us what you need and we&apos;ll follow up with a confirmed quote, typically within the hour.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link href="/request">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 border-none">
                  Get a Quote
                </Button>
              </Link>
              <WhatsAppCTA message="Hi FixKar, I need help finding the right service." label="WhatsApp Us" size="lg" />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
