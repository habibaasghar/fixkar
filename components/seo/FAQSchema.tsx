import React from "react";
import { JsonLd } from "./JsonLd";

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={schemaData} />;
}
