"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { IconSearch } from "@/components/icons";
import { ServiceGlyph } from "@/components/illustrations/ServiceGlyph";
import { hubCities, hubServices, liveServiceHref, enquiryMessage, type HubService, type GlyphName } from "@/lib/servicesHub";
import { whatsappUrl } from "@/lib/utils";

const accents: Record<GlyphName, string> = {
  ac: "#0284c7", electrical: "#d97706", plumbing: "#0891b2", solar: "#ea580c", renovation: "#57534e",
  kitchen: "#b45309", bathroom: "#0e7490", painting: "#e11d48", waterproofing: "#4f46e5", cctv: "#7c3aed",
  flooring: "#92400e", carpentry: "#c2410c", ceiling: "#475569", doors: "#0f766e", appliance: "#4338ca",
  cleaning: "#059669", moving: "#2563eb", handyman: "#dc2626",
};

function matches(s: HubService, q: string) {
  const hay = [s.name, s.description, ...s.terms].join(" ").toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => hay.includes(word));
}

/**
 * "What do you need help with?" — tiered discovery. Primary categories get
 * large tiles; secondary ones are compact (a horizontal snap-scroller on
 * mobile); the rest are list rows. A service links to a real
 * `/[city]/[category]` page only when one is live in the chosen city,
 * otherwise it opens a pre-filled WhatsApp enquiry for that city + service.
 */
export function ServiceCategoryExplorer() {
  const [citySlug, setCitySlug] = useState(hubCities[0].slug);
  const [query, setQuery] = useState("");
  const city = hubCities.find((c) => c.slug === citySlug) ?? hubCities[0];

  const visible = useMemo(() => (query.trim() ? hubServices.filter((s) => matches(s, query)) : hubServices), [query]);
  const primary = visible.filter((s) => s.tier === "primary");
  const secondary = visible.filter((s) => s.tier === "secondary");
  const more = visible.filter((s) => s.tier === "more");

  function target(s: HubService) {
    const live = liveServiceHref(s, city);
    return live
      ? { href: live, external: false, cta: `View in ${city.name}` }
      : {
          href: whatsappUrl(enquiryMessage(s, city.name)),
          external: true,
          cta: s.kind === "project" ? "Plan this project" : "Get a quote",
        };
  }

  function Anchor({ s, className, children }: { s: HubService; className: string; children: React.ReactNode }) {
    const t = target(s);
    return t.external ? (
      <a id={s.slug} href={t.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    ) : (
      <Link id={s.slug} href={t.href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <div>
      {/* City + search controls */}
      <div className="mx-auto mb-8 max-w-3xl space-y-4">
        <div role="group" aria-label="Choose your city" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [scrollbar-width:none]">
          {hubCities.map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={c.slug === citySlug}
              onClick={() => setCitySlug(c.slug)}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                c.slug === citySlug ? "border-primary bg-primary text-white" : "border-gray-200 bg-white text-gray-700 hover:border-primary-hover"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <IconSearch size={18} />
          </span>
          <input
            type="search"
            aria-label="Search services"
            placeholder="Search: AC repair, plumber, solar, waterproofing…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm focus-visible:outline-2 focus-visible:outline-primary"
          />
        </div>
      </div>

      {visible.length === 0 && (
        <p className="py-10 text-center text-sm text-gray-600">
          Nothing matches “{query}”.{" "}
          <a href={whatsappUrl(`Hi FixKar, I need help with: ${query} in ${city.name}.`)} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
            Tell us what you need on WhatsApp
          </a>{" "}
          and we&apos;ll point you to the right service path.
        </p>
      )}

      {/* Primary — large tiles */}
      {primary.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map((s, i) => {
            const t = target(s);
            return (
              <li key={s.slug} className={i === 0 ? "lg:col-span-2" : ""}>
                <Anchor
                  s={s}
                  className="group flex h-full items-center gap-4 overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-6"
                >
                  <div className="w-24 shrink-0 rounded-2xl p-2 sm:w-40 sm:p-3" style={{ background: `${accents[s.glyph]}14`, color: "#1f2937" }}>
                    <ServiceGlyph name={s.glyph} accent={accents[s.glyph]} className="h-14 w-full sm:h-20" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-extrabold text-gray-900">{s.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{s.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.terms.slice(0, 3).map((term) => (
                        <span key={term} className="rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600">
                          {term}
                        </span>
                      ))}
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold" style={{ color: accents[s.glyph] }}>
                      {t.cta} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Anchor>
              </li>
            );
          })}
        </ul>
      )}

      {/* Secondary — compact; horizontal snap-scroll on mobile */}
      {secondary.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">Renovation, finishing &amp; security</h3>
          <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4 [scrollbar-width:none]">
            {secondary.map((s) => {
              const t = target(s);
              return (
                <li key={s.slug} className="w-[68%] shrink-0 snap-start sm:w-auto">
                  <Anchor
                    s={s}
                    className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-primary-hover hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <div className="rounded-xl p-2" style={{ background: `${accents[s.glyph]}12`, color: "#1f2937" }}>
                      <ServiceGlyph name={s.glyph} accent={accents[s.glyph]} className="h-14 w-full" />
                    </div>
                    <h4 className="mt-3 text-sm font-bold text-gray-900">{s.name}</h4>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-gray-600">{s.description}</p>
                    <span className="mt-3 text-xs font-bold" style={{ color: accents[s.glyph] }}>{t.cta} →</span>
                  </Anchor>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* More — compact rows */}
      {more.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">More home services</h3>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {more.map((s) => (
              <li key={s.slug}>
                <Anchor
                  s={s}
                  className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 transition hover:border-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="w-14 shrink-0" style={{ color: "#1f2937" }}>
                    <ServiceGlyph name={s.glyph} accent={accents[s.glyph]} className="h-10 w-full" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-gray-900">{s.name}</span>
                    <span className="block text-xs text-gray-600">{s.description}</span>
                  </span>
                  <span aria-hidden="true" className="text-gray-400">→</span>
                </Anchor>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
