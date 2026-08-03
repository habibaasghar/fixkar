import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { ServiceCategoryCard } from "@/components/domain/ServiceCategoryCard";
import { categories, cities } from "@/lib/services";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `All Home Services | ${BRAND_NAME}`,
  description:
    "Explore electrician, plumber, AC repair, cleaning, and painting services in Lahore. Verified technicians, transparent rates, pay after service.",
};

export default function ServicesPage() {
  const activeCity = cities[0];

  return (
    <div>
      <PageHeader
        title="All Home Services"
        subtitle={`Browse our 5 core launch categories in ${activeCity.name}. Every handyman is identity verified with CNIC checks.`}
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
