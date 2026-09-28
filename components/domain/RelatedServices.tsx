import React from "react";
import Link from "next/link";
import { getCategory } from "@/lib/services";

export function RelatedServices({
  citySlug,
  categorySlugs,
}: {
  citySlug: string;
  categorySlugs: string[];
}) {
  const related = categorySlugs
    .map((slug) => getCategory(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  if (related.length === 0) return null;

  return (
    <p className="text-sm text-gray-600">
      <span className="font-semibold text-gray-900">You might also need: </span>
      {related.map((cat, i) => (
        <React.Fragment key={cat.slug}>
          {i > 0 && ", "}
          <Link href={`/${citySlug}/${cat.slug}`} className="text-primary font-semibold hover:underline">
            {cat.shortName}
          </Link>
        </React.Fragment>
      ))}
    </p>
  );
}
