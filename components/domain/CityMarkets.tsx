import React from "react";
import Link from "next/link";
import { IconMapPin } from "@/components/icons";
import { hubCities, cityHubHref, enquiryMessage } from "@/lib/servicesHub";
import { whatsappUrl } from "@/lib/utils";

/**
 * City tiles for the hub. A tile links to the city hub page only where that
 * route exists and has live services; otherwise it opens a city-specific
 * enquiry. No availability labels, statuses or statistics are shown.
 */
export function CityMarkets() {
  return (
    <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {hubCities.map((c) => {
        const hub = cityHubHref(c);
        const className =
          "group flex h-full min-h-24 items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-hover hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
        const body = (
          <>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <IconMapPin size={20} />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-extrabold text-gray-900">{c.name}</span>
              <span className="block text-xs text-gray-600">{hub ? `${c.name} service hub →` : "Send your requirement →"}</span>
            </span>
          </>
        );
        return (
          <li key={c.slug}>
            {hub ? (
              <Link href={hub} className={className}>{body}</Link>
            ) : (
              <a href={whatsappUrl(enquiryMessage(null, c.name))} target="_blank" rel="noopener noreferrer" className={className}>
                {body}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
