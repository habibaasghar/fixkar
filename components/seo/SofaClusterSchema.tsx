import React from "react";
import { JsonLd } from "./JsonLd";
import { BRAND_NAME, BRAND_URL } from "@/lib/constants";
import type { City } from "@/lib/types";
import type { SofaIntent } from "@/lib/sofaCluster";

/**
 * Schema for sofa-cluster pages: WebPage + Service. Deliberately omits
 * Offer/price data, ratings, reviews and LocalBusiness (none are backed by
 * real data), and does not repeat the sitewide Organization. BreadcrumbList
 * comes from <Breadcrumbs>, FAQPage from <FAQSchema> (both mirror visible content).
 */
export function SofaClusterSchema({ city, intent }: { city: City; intent: SofaIntent }) {
  const url = `${BRAND_URL}/${city.slug}/${intent.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: intent.title(city.name),
        description: intent.description(city.name),
        inLanguage: "en-PK",
        isPartOf: { "@type": "WebSite", name: BRAND_NAME, url: BRAND_URL },
        about: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: intent.h1(city.name),
        serviceType: intent.name,
        provider: { "@type": "Organization", name: BRAND_NAME, url: BRAND_URL },
        areaServed: { "@type": "City", name: city.name },
        url,
      },
    ],
  };
  return <JsonLd data={data} />;
}
