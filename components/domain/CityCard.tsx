import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { City } from "@/lib/types";

export function CityCard({ city }: { city: City }) {
  const isActive = city.status === "active";
  const isPartiallyActive = !isActive && (city.activeCategories?.length ?? 0) > 0;

  const badgeLabel = isActive
    ? "🟢 Active Now"
    : isPartiallyActive
      ? "🟡 Some Services Available"
      : "🔵 Message Us";

  const subLabel = isActive
    ? `${city.areas.length}+ Local Areas Active`
    : isPartiallyActive
      ? `${city.activeCategories!.length} service${city.activeCategories!.length > 1 ? "s" : ""} available now`
      : "Tell us what you need — we'll see what we can arrange";

  return (
    <Link href={`/${city.slug}`} className="block">
      <Card hoverable className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-gray-900">{city.name}</h4>
          <p className="text-xs text-gray-500">{subLabel}</p>
        </div>
        <Badge variant={isActive || isPartiallyActive ? "success" : "brand"}>{badgeLabel}</Badge>
      </Card>
    </Link>
  );
}
