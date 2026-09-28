import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_NAME, BRAND_URL } from "@/lib/constants";
import { cities } from "@/lib/services";
import { taxonomyGroups } from "@/lib/serviceTaxonomy";
import { Container, Section } from "@/components/layout/Container";
import { CategoryCard } from "@/components/domain/CategoryCard";
import { CityCard } from "@/components/domain/CityCard";
import { TrustPoint } from "@/components/domain/TrustPoint";
import { HowItWorksStep } from "@/components/domain/HowItWorksStep";
import { HeroServiceSearch } from "@/components/domain/HeroServiceSearch";
import { LeadForm } from "@/components/domain/LeadForm";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { RevealOnScroll } from "@/components/domain/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { HowItWorksIllustration } from "@/components/illustrations/HowItWorksIllustration";
import { PathwayIllustration } from "@/components/illustrations/PathwayIllustration";
import { PakistanIllustration } from "@/components/illustrations/PakistanIllustration";
import { CTAIllustration } from "@/components/illustrations/CTAIllustration";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const activeCity = cities[0]; // Lahore — see lib/services.ts for full city status
  const liveGroups = taxonomyGroups.filter((g) => g.liveCategorySlugs.length > 0);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: BRAND_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BRAND_URL}/services?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div>
      <JsonLd data={websiteSchema} />

      {/* Hero */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-primary-light/60 via-white to-white py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-subtle px-3.5 py-1 text-xs font-bold text-primary-hover">
                <span>📍 Home &amp; property services across Pakistan</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-tight">
                Reliable Services for Your Home &amp; Property
              </h1>

              <p className="mx-auto lg:mx-0 max-w-2xl text-base text-gray-600 sm:text-lg">
                FixKar connects you with vetted vendor partners for repairs, maintenance, cleaning, home improvement, and larger property projects.
              </p>

              <div className="pt-2">
                <HeroServiceSearch citySlug={activeCity.slug} />
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
                <Link href="/request">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Get a Quote
                  </Button>
                </Link>
                <WhatsAppCTA message="Hi FixKar, I need help finding a service." label="WhatsApp FixKar" size="lg" />
              </div>
            </div>

            <div className="hidden lg:block">
              <HeroIllustration className="w-full h-auto max-w-md mx-auto" />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust strip — compact, factual only */}
      <div className="border-b border-gray-100 bg-white py-5">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-gray-600">
            <span className="flex items-center gap-1.5">✅ Vetted Vendor Partners</span>
            <span className="flex items-center gap-1.5">💳 Pay After Service</span>
            <span className="flex items-center gap-1.5">📋 Clear Quotes Before You Commit</span>
            <span className="flex items-center gap-1.5">💬 Real Support, Not a Directory</span>
          </div>
        </Container>
      </div>

      {/* Service discovery */}
      <Section background="white">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  What Do You Need Help With?
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Browse our service categories, or search above for something specific.
                </p>
              </div>
              <Link href="/services" className="text-sm font-bold text-primary hover:underline shrink-0">
                View All Services →
              </Link>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {liveGroups.map((group, i) => (
              <RevealOnScroll key={group.slug} delayMs={i * 60}>
                <CategoryCard group={group} citySlug={activeCity.slug} />
              </RevealOnScroll>
            ))}
            <RevealOnScroll delayMs={liveGroups.length * 60}>
              <Link
                href="/services"
                className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center hover:border-primary hover:bg-primary-light transition"
              >
                <span className="text-2xl mb-2">🧰</span>
                <span className="text-sm font-bold text-gray-900">View All 11 Categories</span>
                <span className="mt-1 text-xs text-gray-500">Including Painting, Gardening, Renovation &amp; more</span>
              </Link>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section background="subtle">
        <Container>
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                How {BRAND_NAME} Works
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Three simple steps to get your home repairs solved safely and hassle-free.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <RevealOnScroll delayMs={0}>
              <HowItWorksStep
                stepNumber={1}
                title="Tell Us What You Need"
                description="Search a service or message us on WhatsApp with your address and issue."
                illustration={<HowItWorksIllustration variant="request" />}
              />
            </RevealOnScroll>
            <RevealOnScroll delayMs={100}>
              <HowItWorksStep
                stepNumber={2}
                title="We Confirm With a Vendor Partner"
                description="We get a real quote from a vetted vendor partner in your area and follow up with you, typically within the hour."
                illustration={<HowItWorksIllustration variant="match" />}
              />
            </RevealOnScroll>
            <RevealOnScroll delayMs={200}>
              <HowItWorksStep
                stepNumber={3}
                title="Pay Directly After Service"
                description="Inspect the completed work and pay cash, EasyPaisa, or JazzCash directly to the vendor partner."
                illustration={<HowItWorksIllustration variant="pay" />}
              />
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* Why FixKar */}
      <Section background="white">
        <Container>
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Why FixKar Instead of Finding Someone Yourself?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Because a random contact from a neighbor or a signboard comes with no accountability. We personally know who we connect you with.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <TrustPoint
              icon="shield"
              title="Vetted Vendor Partners"
              text="We personally know and check the vendor partners we connect you with — no anonymous strangers."
            />
            <TrustPoint
              icon="check"
              title="Warranty From Your Vendor"
              text="Any workmanship warranty is provided directly by the vendor partner handling your job — ask about their terms when you get your quote."
            />
            <TrustPoint
              icon="phone"
              title="Pay After Service"
              text="Zero upfront payment required. You only pay after you inspect and approve the completed job."
            />
            <TrustPoint
              icon="clock"
              title="Fast Response"
              text="We personally follow up with a confirmed quote — typically within the hour during business hours."
            />
          </div>
        </Container>
      </Section>

      {/* Residential + Business split */}
      <Section background="subtle">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <RevealOnScroll>
              <div className="h-full rounded-3xl border border-gray-200 bg-white overflow-hidden">
                <div className="h-32 bg-secondary-light flex items-center justify-center">
                  <PathwayIllustration variant="home" className="h-28" />
                </div>
                <div className="p-8 space-y-4">
                  <span className="inline-flex items-center rounded-full bg-secondary-light px-3 py-1 text-xs font-bold text-secondary">
                    Home &amp; Property
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900">For Homeowners, Tenants &amp; Families</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Everyday repairs and maintenance for your home — AC, electrical, plumbing, cleaning, and painting.
                  </p>
                  <Link href="/request">
                    <Button variant="secondary" className="mt-2">
                      Get a Home Service
                    </Button>
                  </Link>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delayMs={100}>
              <div className="h-full rounded-3xl border border-gray-200 bg-white overflow-hidden">
                <div className="h-32 bg-primary-light flex items-center justify-center">
                  <PathwayIllustration variant="business" className="h-28" />
                </div>
                <div className="p-8 space-y-4">
                  <span className="inline-flex items-center rounded-full bg-primary-subtle px-3 py-1 text-xs font-bold text-primary-hover">
                    Business &amp; Commercial
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900">For Offices, Shops &amp; Property Managers</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Office cleaning, facility maintenance, and commercial AC/electrical/plumbing for businesses.
                  </p>
                  <Link href="/request">
                    <Button variant="secondary" className="mt-2">
                      Request a Business Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* Projects preview */}
      <Section background="brand">
        <Container>
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
              <div className="text-center md:text-left space-y-4">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                  Larger Scope
                </span>
                <h2 className="text-2xl font-extrabold sm:text-3xl">Planning a Bigger Project?</h2>
                <p className="text-sm text-primary-subtle max-w-xl">
                  Home renovation, false ceiling, flooring, full painting, or office renovation — larger in scope than a quick service booking.
                </p>
                <div className="pt-2">
                  <Link href="/request">
                    <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100 border-none">
                      Request a Project Quote
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <PathwayIllustration variant="projects" className="h-48 w-auto" />
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* Cities Overview */}
      <Section background="white">
        <Container>
          <RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
              <div className="hidden lg:flex justify-center">
                <PakistanIllustration className="h-64 w-auto" />
              </div>
              <div>
                <div className="text-center lg:text-left max-w-2xl mb-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    Home &amp; Property Services Across Pakistan
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Select your city above to get started. See what&apos;s currently active in each city below.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {cities.map((city) => (
                    <CityCard key={city.slug} city={city} />
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* Final CTA + Quick Lead Form */}
      <Section background="subtle">
        <Container>
          <RevealOnScroll>
            <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
              <CTAIllustration className="h-20 w-auto mx-auto mb-2" />
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Need Help With Your Home or Property?
              </h2>
              <p className="text-sm text-gray-600">
                Tell us what you need and we&apos;ll help you find the right vendor partner.
              </p>
              <div className="flex justify-center pt-1">
                <WhatsAppCTA message="Hi FixKar, I need a home service." label="Or WhatsApp Us Directly" />
              </div>
            </div>
            <LeadForm city={activeCity} service="home-service" />
          </RevealOnScroll>
        </Container>
      </Section>
    </div>
  );
}
