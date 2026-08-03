import React from "react";
import { JsonLd } from "./JsonLd";
import { BRAND_NAME, BRAND_URL } from "@/lib/constants";
import type { City } from "@/lib/types";

export function LocalBusinessSchema({ city }: { city: City }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${BRAND_NAME} ${city.name}`,
    image: `${BRAND_URL}/icon.png`,
    "@id": `${BRAND_URL}/${city.slug}`,
    url: `${BRAND_URL}/${city.slug}`,
    telephone: "+92-300-0000000",
    priceRange: "PKR",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressCountry: "PK",
    },
    areaServed: city.areas.map(area => ({
      "@type": "City",
      name: area
    })),
  };

  return <JsonLd data={schemaData} />;
}
