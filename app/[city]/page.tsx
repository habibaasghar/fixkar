import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCity, categories } from "@/lib/services";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { ServiceCategoryCard } from "@/components/domain/ServiceCategoryCard";
import { AreaCoverageList } from "@/components/domain/AreaCoverageList";
import { ComingSoonState } from "@/components/ui/ComingSoonState";
import { LeadForm } from "@/components/domain/LeadForm";

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return {};

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);

  if (!city) notFound();

  if (city.status === "coming_soon") {
    return (
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ label: city.name, href: `/${city.slug}` }]} />
        <ComingSoonState cityName={city.name} />
      </Container>
    );
  }

  return (
    <div>
      <LocalBusinessSchema city={city} />
      <Container className="pt-6">
        <Breadcrumbs items={[{ label: city.name, href: `/${city.slug}` }]} />
      </Container>

      <PageHeader
        title={`Verified Home Service Professionals in ${city.name}`}
        subtitle={`Book electrician, plumber, AC repair, cleaning, and painter services in ${city.name}. Background-checked fixers, pay after job completion.`}
      />

      <Section background="white">
        <Container>
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-gray-900">
              Service Categories Available in {city.name}
            </h2>
            <p className="text-xs text-gray-600">
              Select a service below to view market rates and book over WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <ServiceCategoryCard key={cat.slug} category={cat} citySlug={city.slug} />
            ))}
          </div>
        </Container>
      </Section>

      <Section background="subtle">
        <Container>
          <AreaCoverageList cityName={city.name} areas={city.areas} />
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-xl font-extrabold text-gray-900">
              Request a Fixer in {city.name}
            </h2>
            <p className="text-xs text-gray-600">
              Fill the quick form below to receive a response within 15 minutes.
            </p>
          </div>
          <LeadForm city={city} service="home-service" />
        </Container>
      </Section>
    </div>
  );
}
