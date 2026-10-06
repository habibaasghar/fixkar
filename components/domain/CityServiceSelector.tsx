"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { ServiceGlyph } from "@/components/illustrations/ServiceGlyph";
import { hubCities, hubServices, liveServiceHref, enquiryMessage } from "@/lib/servicesHub";

/**
 * Choose a city → choose a service → get the right next step. If a real
 * `/[city]/[category]` page is live for the pair we link to it; otherwise the
 * result is a pre-filled WhatsApp enquiry for exactly that city + service.
 * No page is implied that doesn't exist, and no availability is asserted.
 */
export function CityServiceSelector() {
  const [citySlug, setCitySlug] = useState(hubCities[0].slug);
  const [serviceSlug, setServiceSlug] = useState(hubServices[0].slug);
  const city = hubCities.find((c) => c.slug === citySlug) ?? hubCities[0];
  const service = hubServices.find((s) => s.slug === serviceSlug) ?? hubServices[0];
  const liveHref = liveServiceHref(service, city);

  const chip = (active: boolean) =>
    `min-h-11 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
      active ? "border-primary bg-primary text-white" : "border-gray-200 bg-white text-gray-700 hover:border-primary-hover"
    }`;

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
      <p id="sel-city" className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">1 · Choose a city</p>
      <div role="group" aria-labelledby="sel-city" className="mb-6 flex flex-wrap gap-2">
        {hubCities.map((c) => (
          <button key={c.slug} type="button" aria-pressed={c.slug === citySlug} onClick={() => setCitySlug(c.slug)} className={chip(c.slug === citySlug)}>
            {c.name}
          </button>
        ))}
      </div>

      <p id="sel-service" className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">2 · Choose a service</p>
      <div role="group" aria-labelledby="sel-service" className="mb-6 flex flex-wrap gap-2">
        {hubServices.map((s) => (
          <button key={s.slug} type="button" aria-pressed={s.slug === serviceSlug} onClick={() => setServiceSlug(s.slug)} className={chip(s.slug === serviceSlug)}>
            {s.short}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="flex flex-col gap-4 rounded-2xl bg-surface-subtle p-4 sm:flex-row sm:items-center">
        <span className="w-24 shrink-0 text-gray-800">
          <ServiceGlyph name={service.glyph} accent="#0e6e8c" className="h-16 w-full" />
        </span>
        <div className="flex-1">
          <p className="text-base font-extrabold text-gray-900">
            {service.name} in {city.name}
          </p>
          <p className="mt-0.5 text-sm text-gray-600">
            {liveHref
              ? `See the ${service.short.toLowerCase()} page for ${city.name}, or send us your requirement.`
              : `Tell us your ${service.kind === "project" ? "project" : "requirement"} and we'll help connect it with a suitable local service partner.`}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          {liveHref && (
            <Link
              href={liveHref}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary px-4 text-sm font-bold text-primary hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View {service.short} in {city.name}
            </Link>
          )}
          <WhatsAppCTA message={enquiryMessage(service, city.name)} label="Send enquiry on WhatsApp" size="md" />
        </div>
      </div>
    </div>
  );
}
