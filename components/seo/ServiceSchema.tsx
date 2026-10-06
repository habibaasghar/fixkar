import React from "react";
import { JsonLd } from "./JsonLd";
import { BRAND_NAME, BRAND_URL } from "@/lib/constants";
import type { City, ServiceCategory } from "@/lib/types";

export function ServiceSchema({ city, category }: { city: City; category: ServiceCategory }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.name,
    serviceType: category.shortName,
    provider: {
      "@type": "LocalBusiness",
      name: `${BRAND_NAME} ${city.name}`,
      url: `${BRAND_URL}/${city.slug}`,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    description: category.metaDescriptionTemplate ? category.metaDescriptionTemplate(city.name) : "",
    url: `${BRAND_URL}/${city.slug}/${category.slug}`,
    // Only describe an offer when the category actually publishes price ranges.
    ...(category.priceRanges?.length && {
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "PKR",
        lowPrice: "500",
        offerCount: category.priceRanges.length,
      },
    }),
  };

  return <JsonLd data={schemaData} />;
}
