"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { cities, categories, isCategoryActiveInCity } from "@/lib/services";

/**
 * "Choose a city, then see what's live there" — built entirely from real
 * `lib/services.ts` data (isCategoryActiveInCity), so it can never show a
 * city/category combination as available when it isn't. Cities with
 * nothing live yet get an honest WhatsApp fallback instead of an empty grid.
 */
export function CityServiceSelector() {
  const [selectedSlug, setSelectedSlug] = useState(cities[0].slug);
  const selectedCity = cities.find((c) => c.slug === selectedSlug) ?? cities[0];
  const liveCategories = categories.filter((cat) => isCategoryActiveInCity(selectedCity, cat.slug));

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Choose a City</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {cities.map((city) => (
          <button
            key={city.slug}
            type="button"
            aria-pressed={selectedSlug === city.slug}
            onClick={() => setSelectedSlug(city.slug)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              selectedSlug === city.slug
                ? "border-primary bg-primary-light text-primary-hover"
                : "border-gray-200 text-gray-600 hover:border-primary-hover"
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>

      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
        Available in {selectedCity.name}
      </p>

      {liveCategories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {liveCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${selectedCity.slug}/${cat.slug}`}
              className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-primary-hover hover:text-primary transition"
            >
              {cat.shortName}
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-secondary-subtle bg-secondary-light p-4 space-y-2">
          <p className="text-sm text-gray-700">
            Nothing live in {selectedCity.name} yet — tell us what you need and we&apos;ll see what we can arrange.
          </p>
          <WhatsAppCTA
            message={`Hi FixKar, I need a home service in ${selectedCity.name}.`}
            label="WhatsApp FixKar"
            size="sm"
          />
        </div>
      )}
    </div>
  );
}
