import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/constants";
import { categories, cities } from "@/lib/services";
import { Container, Section } from "@/components/layout/Container";
import { ServiceCategoryCard } from "@/components/domain/ServiceCategoryCard";
import { CityCard } from "@/components/domain/CityCard";
import { TrustPoint } from "@/components/domain/TrustPoint";
import { HowItWorksStep } from "@/components/domain/HowItWorksStep";
import { LeadForm } from "@/components/domain/LeadForm";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const activeCity = cities[0]; // Lahore

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-blue-50/60 via-white to-white py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-700">
              <span>📍 Currently Active in Lahore</span>
              <span>•</span>
              <span>Expanding to Islamabad & Karachi</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-tight">
              Pakistan&apos;s Trusted Home Service Marketplace
            </h1>

            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
              Reliable home repairs by CNIC-verified professionals in Lahore. No advance payments—pay only when the job is done.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <WhatsAppCTA
                message="Hi FixKar, I need a verified home service in Lahore."
                label="Book via WhatsApp"
                size="lg"
              />
              <Link href="/request">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Find a Fixer
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <Section background="white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Our Core Services in Lahore
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Select a category to view instant market rates and verified technicians.
              </p>
            </div>
            <Link href="/services" className="text-sm font-bold text-blue-600 hover:underline">
              View All Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <ServiceCategoryCard key={cat.slug} category={cat} citySlug={activeCity.slug} />
            ))}
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section background="subtle">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              How {BRAND_NAME} Works
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Three simple steps to get your home repairs solved safely and hassle-free.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <HowItWorksStep
              stepNumber={1}
              title="Tell Us What You Need"
              description="Book instantly via WhatsApp or fill our 1-minute request form with your address and issue."
            />
            <HowItWorksStep
              stepNumber={2}
              title="Matched With Verified Fixer"
              description="We dispatch a background-checked, CNIC-verified professional in your area within 15 mins."
            />
            <HowItWorksStep
              stepNumber={3}
              title="Pay Directly After Service"
              description="Inspect the completed work and pay cash, EasyPaisa, or JazzCash directly to the technician."
            />
          </div>
        </Container>
      </Section>

      {/* Trust Signals */}
      <Section background="white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Why Homeowners Trust {BRAND_NAME}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Built specifically to solve Pakistan&apos;s handyman reliability and security challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <TrustPoint
              icon="shield"
              title="CNIC Verified Fixers"
              text="Every technician undergoes NADRA CNIC document check and local community reference verification."
            />
            <TrustPoint
              icon="check"
              title="7-Day Fixer Warranty"
              text="Free re-work if the same technical issue recurs within 7 days of on-platform service."
            />
            <TrustPoint
              icon="phone"
              title="Pay After Service"
              text="Zero upfront payment required. You only pay after you inspect and approve the completed job."
            />
            <TrustPoint
              icon="clock"
              title="15-Minute Dispatch"
              text="Emergency electrician or plumbing issue? Get paired with an active fixer in your neighborhood fast."
            />
          </div>
        </Container>
      </Section>

      {/* Cities Overview */}
      <Section background="subtle">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Nationwide Expansion Plan
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Starting in Lahore, expanding city-by-city across Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto">
            {cities.map((city) => (
              <CityCard key={city.slug} city={city} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Quick Lead Form Section */}
      <Section background="white">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Need a Fixer Right Now?
            </h2>
            <p className="text-sm text-gray-600">
              Leave your details below and a verified professional will contact you shortly.
            </p>
          </div>
          <LeadForm city={activeCity} service="home-service" />
        </Container>
      </Section>
    </div>
  );
}
