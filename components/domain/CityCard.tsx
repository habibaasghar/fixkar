import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { City } from "@/lib/types";

export function CityCard({ city }: { city: City }) {
  const isActive = city.status === "active";

  return (
    <Link href={`/${city.slug}`} className="block">
      <Card hoverable className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-gray-900">{city.name}</h4>
          <p className="text-xs text-gray-500">
            {isActive
              ? `${city.areas.length}+ Local Areas Active`
              : "Waitlist open for early launch"}
          </p>
        </div>
        <Badge variant={isActive ? "success" : "brand"}>
          {isActive ? "🟢 Active Now" : "🔵 Coming Soon"}
        </Badge>
      </Card>
    </Link>
  );
}
