import React from "react";
import Link from "next/link";
import { ServiceGlyph } from "@/components/illustrations/ServiceGlyph";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { Button } from "@/components/ui/Button";
import type { GlyphName } from "@/lib/servicesHub";

export type FeaturedProject = {
  slug: string;
  title: string;
  description: string;
  ctaLabel: string;
  glyph: GlyphName;
  /** Raw CSS colour used for the illustration accent and tinted panel. */
  accent: string;
  /** Trades typically involved — shown as the project's "pathway". */
  trades: string[];
  /** Only set when a real, bookable page exists today — otherwise this stays an enquiry. */
  href?: string;
  /** Pre-filled WhatsApp message used when there's no live page, so the enquiry still goes somewhere real. */
  whatsappMessage?: string;
};

/**
 * "Planning a Bigger Home Project?" — project pathways rather than service
 * cards: illustration panel, the trades involved, and one strong CTA.
 * Projects without a live `/[city]/[category]` page open a WhatsApp enquiry
 * with project context instead of pointing at a fabricated landing page.
 */
export function FeaturedProjectServices({ projects }: { projects: FeaturedProject[] }) {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li
          key={project.slug}
          className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="relative px-6 pt-6 pb-4" style={{ background: `${project.accent}12`, color: "#1f2937" }}>
            <ServiceGlyph name={project.glyph} accent={project.accent} className="mx-auto h-24 w-full max-w-[11rem]" />
            <span className="absolute left-4 top-4 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-600">
              Project
            </span>
          </div>
          <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
            <h3 className="text-lg font-extrabold text-gray-900">{project.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{project.description}</p>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">Trades usually involved</p>
            <ul className="mt-1.5 flex flex-1 flex-wrap content-start gap-1.5">
              {project.trades.map((t) => (
                <li key={t} className="rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-700">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              {project.href ? (
                <Link href={project.href} className="block">
                  <Button variant="secondary" size="md" className="w-full">
                    {project.ctaLabel}
                  </Button>
                </Link>
              ) : (
                <WhatsAppCTA message={project.whatsappMessage ?? ""} label={project.ctaLabel} size="md" className="w-full" />
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
