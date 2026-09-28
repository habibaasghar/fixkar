"use client";

import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { IconSearch } from "@/components/icons";
import { CategoryCard } from "./CategoryCard";
import type { TaxonomyGroup } from "@/lib/serviceTaxonomy";

function matchesQuery(group: TaxonomyGroup, query: string): boolean {
  const haystack = [group.name, group.description, ...group.representativeServices]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export function CategoryDiscovery({
  groups,
  citySlug,
}: {
  groups: TaxonomyGroup[];
  citySlug: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return groups;
    return groups.filter((group) => matchesQuery(group, query));
  }, [groups, query]);

  return (
    <div>
      <div className="relative max-w-xl mx-auto mb-10">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <IconSearch size={18} />
        </span>
        <Input
          aria-label="Search services"
          placeholder="Search AC repair, plumbing, cleaning..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-11 h-12 text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-gray-500 py-10">
          No services match &quot;{query}&quot;. Try a different word, or{" "}
          <a href="/request" className="text-blue-600 font-semibold hover:underline">
            tell us what you need
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((group) => (
            <CategoryCard key={group.slug} group={group} citySlug={citySlug} />
          ))}
        </div>
      )}
    </div>
  );
}
