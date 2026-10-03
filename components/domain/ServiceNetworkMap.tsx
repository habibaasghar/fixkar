import React from "react";
import Link from "next/link";
import { whatsappUrl } from "@/lib/utils";

type Spoke = { label: string; href?: string };

const spokes: Spoke[] = [
  { label: "Electrical", href: "/lahore/electrician" },
  { label: "Plumbing", href: "/lahore/plumbing" },
  { label: "Painting", href: "/lahore/painter" },
  { label: "Flooring & Tiling" },
  { label: "Kitchen" },
  { label: "Bathroom" },
  { label: "Carpentry" },
  { label: "False Ceiling" },
];

/**
 * "A renovation touches many trades" — live spokes link to the real
 * `/[city]/[category]` page; the rest (not live yet) open WhatsApp with
 * context instead of a fabricated landing page, same pattern as
 * CategoryCard and FeaturedProjectServices.
 */
export function ServiceNetworkMap() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="rounded-2xl bg-primary px-6 py-4 text-center shadow-md">
        <p className="text-sm font-extrabold uppercase tracking-wide text-white">Home Renovation</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl">
        {spokes.map((spoke) =>
          spoke.href ? (
            <Link
              key={spoke.label}
              href={spoke.href}
              className="rounded-full border border-primary-subtle bg-primary-light px-4 py-2 text-sm font-semibold text-primary-hover hover:border-primary-hover transition"
            >
              → {spoke.label}
            </Link>
          ) : (
            <a
              key={spoke.label}
              href={whatsappUrl(`Hi FixKar, my project involves ${spoke.label}. Here's what I need: `)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-primary-hover hover:text-primary transition"
            >
              → {spoke.label}
            </a>
          )
        )}
      </div>
    </div>
  );
}
