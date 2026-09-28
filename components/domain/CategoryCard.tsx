import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { TaxonomyGroup, IconName } from "@/lib/serviceTaxonomy";
import { isTaxonomyGroupLive } from "@/lib/serviceTaxonomy";
import {
  IconSnow,
  IconBolt,
  IconDroplet,
  IconSparkle,
  IconPaint,
  IconLeaf,
  IconWrench,
  IconHome,
  IconShield,
} from "@/components/icons";

/**
 * Icon lookup keyed by TaxonomyGroup.icon. This indirection is the "asset
 * abstraction" layer called for in the Phase 2 brief: when real category
 * illustrations exist, swap the render here (or add an `imageUrl` branch)
 * without touching any card usage elsewhere.
 */
const iconMap: Record<IconName, React.ComponentType<{ className?: string; size?: number }>> = {
  snow: IconSnow,
  bolt: IconBolt,
  droplet: IconDroplet,
  sparkle: IconSparkle,
  paint: IconPaint,
  leaf: IconLeaf,
  wrench: IconWrench,
  home: IconHome,
  shield: IconShield,
};

export function CategoryCard({
  group,
  citySlug = "lahore",
}: {
  group: TaxonomyGroup;
  citySlug?: string;
}) {
  const Icon = iconMap[group.icon];
  const live = isTaxonomyGroupLive(group);
  const primaryHref = live ? `/${citySlug}/${group.liveCategorySlugs[0]}` : undefined;

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm", group.accent.iconBg)}>
          <Icon size={24} />
        </div>
        {!live && (
          <Badge variant="neutral" className="shrink-0">
            Coming Soon
          </Badge>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
        <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{group.description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
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
        <div className={cn("mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-bold", group.accent.text)}>
          <span>View Services</span>
          <span aria-hidden="true">→</span>
        </div>
      )}
    </>
  );

  if (live && primaryHref) {
    return (
      <Link
        href={primaryHref}
        className={cn(
          "group block h-full rounded-2xl border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
          group.accent.border
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-gray-50/50 p-6 opacity-90">
      {content}
    </div>
  );
}
