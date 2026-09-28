import React from "react";
import { BlobBackground } from "./primitives";
import type { IconName } from "@/lib/serviceTaxonomy";
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

/**
 * Larger category visual for CategoryCard — a soft accent-colored blob with
 * the category's icon centered over it, at a scale meant to occupy real
 * visual space (not a tiny badge). Consistent across all 11 categories:
 * same blob shape, same icon-centering rule, only the accent color and
 * icon change.
 */
export function CategoryIllustration({
  icon,
  iconColorClass,
  blobColor,
}: {
  icon: IconName;
  iconColorClass: string;
  blobColor: string;
}) {
  const Icon = iconMap[icon];
  return (
    <div className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-t-2xl">
      <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <BlobBackground color={blobColor} />
      </svg>
      <span className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-200 group-hover:scale-110 ${iconColorClass}`}>
        <Icon size={26} />
      </span>
    </div>
  );
}
