import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { ServiceCategory } from "@/lib/types";

export function ServiceCategoryCard({
  category,
  citySlug = "lahore",
}: {
  category: ServiceCategory;
  citySlug?: string;
}) {
  const categoryIcons: Record<string, string> = {
    "ac-repair": "❄️",
    electrician: "⚡",
    plumbing: "🪠",
    cleaning: "🧹",
    painter: "🎨",
  };

  const emoji = categoryIcons[category.slug] || "🔧";

  return (
    <Link href={`/${citySlug}/${category.slug}`} className="block h-full">
      <Card hoverable className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-2xl bg-gray-50 border border-gray-100">{emoji}</span>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                {category.name}
              </h3>
              <p className="text-xs text-gray-500 font-medium">Verified Professionals</p>
            </div>
          </div>

          <ul className="mt-4 space-y-1.5 text-xs text-gray-600">
            {category.commonIssues.slice(0, 3).map((issue) => (
              <li key={issue} className="flex items-center gap-1.5">
                <span className="text-blue-500 font-bold">•</span>
                <span className="truncate">{issue}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-bold text-blue-600">
          <span>View Rates & Details</span>
          <span>→</span>
        </div>
      </Card>
    </Link>
  );
}
