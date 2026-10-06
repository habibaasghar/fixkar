import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, cities, getCategory, getCity, isCategoryActiveInCity } from "@/lib/services";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { LeadForm } from "@/components/domain/LeadForm";
import { PricingTable, AreaCoverageList } from "@/components/domain/HowItWorksStep";
import { TrustPoint } from "@/components/domain/TrustPoint";
import { RelatedServices } from "@/components/domain/RelatedServices";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { ComingSoonState } from "@/components/ui/ComingSoonState";
import { BRAND_NAME } from "@/lib/constants";
import { SofaClusterPage } from "@/components/domain/SofaClusterPage";
import { getSofaIntent } from "@/lib/sofaContent";
import { isSofaPageLive, sofaIntentParams, sofaIntentSlugs } from "@/lib/sofaCluster";

export async function generateStaticParams() {
  return [
    ...cities.flatMap((city) => categories.map((cat) => ({ city: city.slug, category: cat.slug }))),
    // Extra sofa-cluster intent pages, only for the cities where they are live.
    ...sofaIntentParams(),
  ];
}

type Props = {
  params: Promise<{ city: string; category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, category: categorySlug } = await params;
  const city = getCity(citySlug);

  if (city && isSofaPageLive(citySlug, categorySlug)) {
    const intent = getSofaIntent(categorySlug);
    if (intent) {
      return {
        title: intent.title(city.name),
        description: intent.description(city.name),
        alternates: { canonical: `/${city.slug}/${intent.slug}` },
      };
    }
  }

  const category = getCategory(categorySlug);
  if (!city || !category) return {};

  const isActive = isCategoryActiveInCity(city, category.slug);

  return {
    title: category.metaTitleTemplate(city.name),
    description: category.metaDescriptionTemplate(city.name),
    alternates: {
      canonical: `/${city.slug}/${category.slug}`,
    },
    // Coming-soon combinations render the same generic ComingSoonState with
    // no unique content — keep them crawlable (follow) but out of the index
    // until a real vendor exists, instead of indexing 26 near-duplicate pages.
    ...(!isActive && { robots: { index: false, follow: true } }),
  };
}

export default async function ServiceCategoryCityPage({ params }: Props) {
  const { city: citySlug, category: categorySlug } = await params;
  const city = getCity(citySlug);

  // Sofa & upholstery cluster: rich data-driven template. Intent pages that are
  // not live in this city 404 rather than rendering a thin placeholder.
  if (city && isSofaPageLive(citySlug, categorySlug)) {
    const intent = getSofaIntent(categorySlug);
    if (intent) return <SofaClusterPage city={city} intent={intent} />;
  }
  if ((sofaIntentSlugs as readonly string[]).includes(categorySlug)) notFound();

  const category = getCategory(categorySlug);
  if (!city || !category) notFound();

  if (!isCategoryActiveInCity(city, category.slug)) {
    return (
      <Container className="py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { label: city.name, href: `/${city.slug}` },
            { label: category.shortName, href: `/${city.slug}/${category.slug}` },
          ]}
        />
        <ComingSoonState cityName={`${city.name} (${category.shortName})`} />
      </Container>
    );
  }

  const whatsappMessage = `Hi ${BRAND_NAME}, I need ${category.shortName} in ${city.name}.`;

  const relatedCategorySlugs = (category.relatedCategories ?? []).filter((slug) =>
    isCategoryActiveInCity(city, slug)
  );

  return (
    <div>
      <ServiceSchema city={city} category={category} />
      {category.faqs && <FAQSchema faqs={category.faqs} />}

      <Container className="pt-6">
        <Breadcrumbs
          items={[
            { label: city.name, href: `/${city.slug}` },
            { label: category.shortName, href: `/${city.slug}/${category.slug}` },
          ]}
        />
      </Container>

      <PageHeader
        title={category.h1Template(city.name)}
        subtitle={category.intro(city.name)}
      />

      <div className="flex justify-center -mt-4 mb-8">
        <WhatsAppCTA message={whatsappMessage} label={`Book ${category.shortName} via WhatsApp`} size="lg" />
      </div>

      <Section background="white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10">
            {relatedCategorySlugs.length > 0 && (
              <RelatedServices citySlug={city.slug} categorySlugs={relatedCategorySlugs} />
            )}

            {/* Common Issues Solved */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-gray-900">
                What to Expect: Common {category.shortName} Issues We Fix in {city.name}
              </h2>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {category.commonIssues.map((issue) => (
                  <div
                    key={issue}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-800"
                  >
                    <span className="text-primary font-bold">✓</span>
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Section */}
            {category.priceRanges && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-gray-900">
                  {category.shortName} Pricing Guide for {city.name}
                </h2>
                <PricingTable priceRanges={category.priceRanges} note={category.pricingNote} />
              </div>
            )}

            {/* Local Area Coverage */}
            <AreaCoverageList cityName={city.name} areas={city.areas} />

            {/* Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <TrustPoint
                icon="shield"
                title="Vetted Partner"
                text={`Every ${category.shortName.toLowerCase()} is personally checked by our team before we connect you.`}
              />
              <TrustPoint
                icon="phone"
                title="Pay After Job"
                text="Zero upfront payment. Pay when satisfied."
              />
              <TrustPoint
                icon="check"
                title="Vendor Warranty"
                text="Any workmanship warranty is provided by the vendor partner — ask about their terms with your quote."
              />
            </div>
          </div>
        </Container>
      </Section>

      {category.faqs && category.faqs.length > 0 && (
        <Section background="white">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-extrabold text-gray-900 mb-2">
                {category.shortName} FAQs in {city.name}
              </h2>
              <div className="divide-y divide-gray-200">
                {category.faqs.map((faq, i) => (
                  <AccordionItem key={faq.question} title={faq.question} defaultOpen={i === 0}>
                    <p>{faq.answer}</p>
                  </AccordionItem>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      <Section background="subtle">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-xl font-extrabold text-gray-900">
              Get a Fast Callback for {category.shortName}
            </h2>
            <p className="text-xs text-gray-600">
              Enter your details to connect with a technician in {city.name}.
            </p>
          </div>
          <LeadForm city={city} service={category.slug} />
        </Container>
      </Section>
    </div>
  );
}
