import React from "react";
import Link from "next/link";
import { IconChevron } from "@/components/icons";
import { JsonLd } from "./JsonLd";
import { BRAND_URL } from "@/lib/constants";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = [
    { label: "Home", href: "/" },
    ...items,
  ].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: `${BRAND_URL}${item.href}`,
  }));

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: schemaItems,
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <nav aria-label="Breadcrumb" className="my-4">
        <ol className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
          <li>
            <Link href="/" className="hover:text-blue-600 font-medium py-1.5 -my-1.5 inline-block">
              Home
            </Link>
          </li>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                <IconChevron size={12} direction="right" className="text-gray-400" />
                {isLast ? (
                  <span className="font-bold text-gray-900">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-blue-600 font-medium py-1.5 -my-1.5 inline-block">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

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
