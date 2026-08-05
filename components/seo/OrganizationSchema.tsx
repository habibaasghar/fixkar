import React from "react";
import { JsonLd } from "./JsonLd";
import { BRAND_NAME, BRAND_URL } from "@/lib/constants";

export function OrganizationSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: BRAND_URL,
    logo: `${BRAND_URL}/icon.png`,
    description: "Pakistan's trusted home service marketplace connecting customers with verified professionals.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-306-4222367",
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
    sameAs: [
      "https://www.facebook.com/fixkarpk",
      "https://www.instagram.com/fixkarpk",
    ],
  };

  return <JsonLd data={schemaData} />;
}
