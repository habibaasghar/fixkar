import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { ServiceCategoryCard } from "@/components/domain/ServiceCategoryCard";
import { categories, cities } from "@/lib/services";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `All Home Services | ${BRAND_NAME}`,
  description:
    "Explore electrician, plumber, AC repair, cleaning, sofa & carpet cleaning, and painting services in Lahore. Vetted vendor partners, transparent rates, pay after service.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  const activeCity = cities[0];

  return (
    <div>
      <PageHeader
        title="All Home Services"
        subtitle={`Browse our core launch categories in ${activeCity.name}. Every vendor partner is personally vetted by our team.`}
      />

      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <ServiceCategoryCard key={cat.slug} category={cat} citySlug={activeCity.slug} />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
