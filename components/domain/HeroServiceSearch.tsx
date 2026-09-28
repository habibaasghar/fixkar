"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { IconSearch, IconMapPin } from "@/components/icons";
import { taxonomyGroups } from "@/lib/serviceTaxonomy";

function matches(name: string, services: string[], query: string): boolean {
  const haystack = [name, ...services].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export function HeroServiceSearch({ citySlug = "lahore" }: { citySlug?: string }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const liveGroups = useMemo(() => taxonomyGroups.filter((g) => g.liveCategorySlugs.length > 0), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return liveGroups.filter((g) => matches(g.name, g.representativeServices, query)).slice(0, 5);
  }, [liveGroups, query]);

  const showDropdown = focused && query.trim().length > 0;

  return (
    <div className="mx-auto max-w-xl">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <IconSearch size={18} />
        </span>
        <Input
          aria-label="Search for a service"
          placeholder="Search AC repair, plumbing, cleaning..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          className="pl-11 h-13 text-sm rounded-2xl shadow-sm"
        />

        {showDropdown && (
          <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-gray-200 bg-white shadow-lg z-10 overflow-hidden text-left">
            {results.length > 0 ? (
              results.map((group) => (
                <Link
                  key={group.slug}
                  href={`/${citySlug}/${group.liveCategorySlugs[0]}`}
                  className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-primary-light transition"
                >
                  <span>{group.name}</span>
                  <span className="text-xs text-gray-400">in {citySlug === "lahore" ? "Lahore" : citySlug}</span>
                </Link>
              ))
            ) : (
              <Link
                href="/services"
                className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary-light transition"
              >
                No exact match — browse all services →
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-500">
        <IconMapPin size={14} className="text-secondary" />
        <span>Use the location selector above to set your city</span>
      </div>
    </div>
  );
}
