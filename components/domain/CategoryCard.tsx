import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { TaxonomyGroup } from "@/lib/serviceTaxonomy";
import { isTaxonomyGroupLive } from "@/lib/serviceTaxonomy";
import { CategoryIllustration } from "@/components/illustrations/CategoryIllustration";

export function CategoryCard({
  group,
  citySlug = "lahore",
}: {
  group: TaxonomyGroup;
  citySlug?: string;
}) {
  const live = isTaxonomyGroupLive(group);
  const primaryHref = live ? `/${citySlug}/${group.liveCategorySlugs[0]}` : undefined;

  const content = (
    <>
      <div className={cn("relative", !live && "grayscale opacity-80")}>
        <CategoryIllustration icon={group.icon} iconColorClass={group.accent.text} blobColor={group.accent.blob} />
        {!live && (
          <Badge variant="neutral" className="absolute top-2 right-2 shadow-sm">
            Coming Soon
          </Badge>
        )}
      </div>

      <div className="mt-4 px-6">
        <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
        <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{group.description}</p>
      </div>

      <div className="mt-4 px-6 flex flex-wrap gap-1.5">
        {group.representativeServices.map((service) => (
          <span
            key={service}
            className="rounded-full bg-gray-50 border border-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600"
          >
            {service}
          </span>
        ))}
      </div>

      {live && (
        <div className={cn("mx-6 mt-5 flex items-center justify-between border-t border-gray-100 pt-4 pb-6 text-xs font-bold", group.accent.text)}>
          <span>View Services</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      )}
      {!live && <div className="pb-6" />}
    </>
  );

  if (live && primaryHref) {
    return (
      <Link
        href={primaryHref}
        className={cn(
          "group block h-full overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
          group.accent.border
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/50">
      {content}
    </div>
  );
}
