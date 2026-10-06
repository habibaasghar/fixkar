import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { BRAND_NAME, BRAND_URL } from "@/lib/constants";
import { sofaCities } from "@/lib/sofaCluster";
import { sofaIntents } from "@/lib/sofaContent";
import { getCity } from "@/lib/services";

const TITLE = "Sofa & Upholstery Cleaning in Lahore, Islamabad and Gujranwala";
const DESCRIPTION =
  "Fabric, leather and office sofa cleaning, plus upholstery cleaning for restaurants and hotels. Choose your city and request a quote from FixKar.pk.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/sofa-cleaning" },
  openGraph: { title: `${TITLE} | ${BRAND_NAME}`, description: DESCRIPTION, url: `${BRAND_URL}/sofa-cleaning` },
};

const faqs = [
  {
    question: "Which cities does FixKar provide sofa cleaning in?",
    answer: "FixKar currently lists sofa and upholstery cleaning in Lahore, Islamabad and Gujranwala. Choose your city on this page to see the services and listed areas.",
  },
  {
    question: "What types of sofas can be cleaned?",
    answer: "Fabric, suede and velvet sofas, L-shaped and sectional sets, recliners, and leather or leatherette sofas. The cleaning method is chosen to suit the material.",
  },
  {
    question: "Can businesses request sofa and upholstery cleaning?",
    answer: "Yes. Offices, restaurants, cafés, hotels and guest houses can send a commercial enquiry. The service partner plans the work around your hours and confirms the quote first.",
  },
  {
    question: "How do I get a quote?",
    answer: "Send your city, the number of seats, the material and a few photos on WhatsApp or through the request form on your city's page. The quote is confirmed before work starts.",
  },
  {
    question: "Does FixKar clean the sofas itself?",
    answer: "FixKar connects you with a vetted local cleaning team. The cleaning is carried out by that partner, who confirms the method and the quote with you.",
  },
];

const segments = [
  { title: "Homes", text: "Fabric, suede, velvet, L-shaped and sectional sofas, recliners and dining chairs.", slug: "sofa-cleaning" },
  { title: "Leather furniture", text: "Leather and leatherette sofas that need gentler care than fabric.", slug: "leather-sofa-cleaning" },
  { title: "Offices and reception areas", text: "Waiting-area and reception seating planned around working hours.", slug: "office-sofa-cleaning" },
  { title: "Restaurants and cafés", text: "Booths, café sofas and chairs cleaned outside service hours.", slug: "restaurant-upholstery-cleaning" },
  { title: "Hotels and guest houses", text: "Lobby, lounge and room upholstery planned around occupancy.", slug: "hotel-upholstery-cleaning" },
  { title: "Chairs, headboards and more", text: "Armchairs, dining chairs, ottomans and headboards.", slug: "upholstery-cleaning" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BRAND_URL}/sofa-cleaning#webpage`,
  url: `${BRAND_URL}/sofa-cleaning`,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "en-PK",
  isPartOf: { "@type": "WebSite", name: BRAND_NAME, url: BRAND_URL },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: sofaCities.map((slug, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Sofa cleaning in ${getCity(slug)!.name}`,
      url: `${BRAND_URL}/${slug}/sofa-cleaning`,
    })),
  },
};

export default function SofaCleaningHubPage() {
  const cities = sofaCities.map((s) => getCity(s)!);
  const wa = "Hi FixKar, I need sofa cleaning. Here's what I need: ";

  return (
    <div>
      <JsonLd data={schema} />
      <FAQSchema faqs={faqs} />

      <Container className="pt-6">
        <Breadcrumbs items={[{ label: "Sofa Cleaning", href: "/sofa-cleaning" }]} />
      </Container>

      <section className="border-b border-gray-200 bg-gradient-to-b from-primary-light/50 to-white py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Sofa and Upholstery Cleaning Services</h1>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              FixKar.pk is a Pakistan-focused home service platform. For sofa and upholstery cleaning we connect homes and businesses with vetted local cleaning teams, who confirm the method and quote after seeing your sofa.
            </p>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              Sofa cleaning is currently listed in Lahore, Islamabad and Gujranwala. Choose your city below for the services, areas and request form.
            </p>
            <WhatsAppCTA message={wa} label="Request Sofa Cleaning" size="lg" className="w-full sm:w-auto" />
          </div>
        </Container>
      </section>

      <Section background="white">
        <Container>
          <div className="mx-auto max-w-4xl space-y-12">
            <section>
              <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">Choose Your City</h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {cities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}/sofa-cleaning`}
                      className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-primary-hover hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <span className="text-base font-extrabold text-gray-900">Sofa cleaning in {c.name}</span>
                      <span className="mt-1 text-xs text-gray-600">Areas include {c.areas.slice(0, 4).join(", ")}</span>
                      <span className="mt-3 text-xs font-bold text-primary">View {c.name} services →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">Sofa Cleaning for Homes and Businesses</h2>
              <p className="mt-2 text-sm text-gray-700 sm:text-base">
                Sofa cleaning is not only residential. The same process works for living rooms, offices, restaurants and hotels, and each has its own page in the cities listed above.
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {segments.map((s) => (
                  <li key={s.slug} className="rounded-2xl border border-gray-200 p-4">
                    <h3 className="text-sm font-bold text-gray-900">{s.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{s.text}</p>
                    <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold">
                      {cities.map((c) => (
                        <Link key={c.slug} href={`/${c.slug}/${s.slug}`} className="text-primary hover:underline">
                          {c.name}
                        </Link>
                      ))}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">How Sofa Cleaning Works with FixKar</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-700 sm:text-base">
                <li>Send your city, the number of seats, the material and a few photos.</li>
                <li>FixKar reviews the request and connects it with a local cleaning team.</li>
                <li>The team confirms the cleaning method and the quote.</li>
                <li>The sofa is cleaned, and you are told how long it needs to dry.</li>
                <li>You inspect the work and pay once you are satisfied.</li>
              </ol>
              <p className="mt-3 text-sm text-gray-600">
                {sofaIntents.length} service pages are available per city, covering fabric and leather sofas, upholstery, and office, restaurant and hotel seating.
              </p>
            </section>
          </div>
        </Container>
      </Section>

      <Section background="subtle">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-2 text-xl font-extrabold text-gray-900 sm:text-2xl">Sofa Cleaning FAQs</h2>
            <div className="divide-y divide-gray-200">
              {faqs.map((f, i) => (
                <AccordionItem key={f.question} title={f.question} defaultOpen={i === 0}>
                  <p>{f.answer}</p>
                </AccordionItem>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
