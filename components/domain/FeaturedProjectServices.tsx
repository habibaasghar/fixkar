import React from "react";
import Link from "next/link";
import { CategoryIllustration } from "@/components/illustrations/CategoryIllustration";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { Button } from "@/components/ui/Button";
import type { IconName } from "@/lib/serviceTaxonomy";

export type FeaturedProject = {
  slug: string;
  title: string;
  description: string;
  ctaLabel: string;
  icon: IconName;
  accent: { text: string; blob: string };
  /** Only set when a real, bookable page exists today — otherwise this stays an enquiry. */
  href?: string;
  /** Pre-filled WhatsApp message used when there's no live page yet, so the enquiry still goes somewhere real. */
  whatsappMessage?: string;
};

/**
 * "Planning a Bigger Home Project?" cards. Deliberately not styled like the
 * plain CategoryCard grid above — bigger content area, one strong CTA per
 * card — since these read as project pathways, not a service directory.
 * Projects without a live `/[city]/[category]` page route to WhatsApp with
 * project-specific context instead of a fabricated landing page.
 */
export function FeaturedProjectServices({ projects }: { projects: FeaturedProject[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project.slug}
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        >
          <CategoryIllustration icon={project.icon} iconColorClass={project.accent.text} blobColor={project.accent.blob} />
          <div className="flex flex-1 flex-col px-6 pt-4 pb-6">
            <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
            <p className="mt-1.5 flex-1 text-sm text-gray-600 leading-relaxed">{project.description}</p>
            <div className="mt-4">
              {project.href ? (
                <Link href={project.href} className="block">
                  <Button variant="secondary" size="sm" className="w-full">
                    {project.ctaLabel}
                  </Button>
                </Link>
              ) : (
                <WhatsAppCTA message={project.whatsappMessage ?? ""} label={project.ctaLabel} size="sm" className="w-full" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
