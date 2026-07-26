import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, cities, getCategory, getCity } from "@/lib/services";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { LeadForm } from "@/components/LeadForm";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export async function generateStaticParams() {
  return cities.flatMap((city) =>
    categories.map((cat) => ({ city: city.slug, service: cat.slug }))
  );
}

type Props = {
  params: Promise<{ city: string; service: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const category = getCategory(serviceSlug);
  if (!city || !category) return {};

  return {
    title: category.metaTitleTemplate(city.name),
    description: category.metaDescriptionTemplate(city.name),
    alternates: {
      canonical: `/${city.slug}/${category.slug}`,
    },
  };
}

export default async function ServiceCityPage({ params }: Props) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const category = getCategory(serviceSlug);

  if (!city || !category) notFound();

  const whatsappMessage = `Hi, I need ${category.shortName} in ${city.name}.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: category.name,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    description: category.metaDescriptionTemplate(city.name),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
        {category.h1Template(city.name)}
      </h1>
      <p className="mt-4 text-neutral-600">{category.intro(city.name)}</p>

      <div className="mt-6">
        <WhatsAppCTA message={whatsappMessage} />
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-neutral-900">
          Hum yeh masle solve karte hain
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {category.commonIssues.map((issue) => (
            <li
              key={issue}
              className="rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-neutral-700"
            >
              {issue}
            </li>
          ))}
        </ul>
      </section>

      {category.priceRanges && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900">
            Approximate Pricing
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-black/10">
            <table className="w-full text-sm">
              <tbody>
                {category.priceRanges.map((p, i) => (
                  <tr
                    key={p.item}
                    className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}
                  >
                    <td className="px-4 py-3 text-neutral-700">{p.item}</td>
                    <td className="px-4 py-3 text-right font-semibold text-neutral-900">
                      {p.range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {category.pricingNote && (
            <p className="mt-2 text-xs text-neutral-400">
              {category.pricingNote}
            </p>
          )}
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-bold text-neutral-900">
          Areas we cover in {city.name}
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          {city.areas.join(", ")}, aur qareebi areas.
        </p>
      </section>

      <section className="mt-10">
        <LeadForm city={city} service={category.slug} />
      </section>
    </div>
  );
}
