import React from "react";
import Link from "next/link";
import { getHubService, hubCities, liveServiceHref, enquiryMessage, type HubServiceId } from "@/lib/servicesHub";
import { whatsappUrl } from "@/lib/utils";

/**
 * "A renovation touches many trades." Hub node + one spoke per related
 * trade (from `related` in lib/servicesHub.ts, so the relationships are
 * data, not decoration). Radial on md+; a connected vertical list on mobile.
 * Spokes link to a real city page when one is live (Lahore), else open a
 * pre-filled WhatsApp enquiry.
 */
export function ServiceNetworkMap({ center = "home-renovation" }: { center?: HubServiceId }) {
  const hub = getHubService(center);
  const spokes = hub.related.map(getHubService);
  const lahore = hubCities[0];

  const linkFor = (id: HubServiceId) => {
    const s = getHubService(id);
    const live = liveServiceHref(s, lahore);
    return live
      ? { href: live, external: false }
      : { href: whatsappUrl(enquiryMessage(s)), external: true };
  };

  const pill =
    "inline-flex min-h-11 items-center rounded-full border border-primary-subtle bg-white px-4 py-2 text-sm font-semibold text-primary-hover shadow-sm transition hover:border-primary-hover hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <div>
      {/* md+: radial map */}
      <div className="relative mx-auto hidden aspect-[16/9] max-w-3xl md:block">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {spokes.map((_, i) => {
            const a = (i / spokes.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={i}
                x1="50" y1="50"
                x2={50 + Math.cos(a) * 40} y2={50 + Math.sin(a) * 40}
                stroke="var(--color-primary-subtle, #cbd5e1)" strokeWidth="1.5" strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-primary px-6 py-4 text-center shadow-md">
          <p className="text-sm font-extrabold uppercase tracking-wide text-white">{hub.name}</p>
        </div>
        {spokes.map((s, i) => {
          const a = (i / spokes.length) * Math.PI * 2 - Math.PI / 2;
          const l = linkFor(s.slug);
          return (
            <div key={s.slug} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + Math.cos(a) * 40}%`, top: `${50 + Math.sin(a) * 40}%` }}>
              {l.external ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className={pill}>{s.short}</a>
              ) : (
                <Link href={l.href} className={pill}>{s.short}</Link>
              )}
            </div>
          );
        })}
      </div>

      {/* mobile: connected list */}
      <div className="md:hidden">
        <div className="mx-auto w-fit rounded-2xl bg-primary px-6 py-3 text-center shadow-md">
          <p className="text-sm font-extrabold uppercase tracking-wide text-white">{hub.name}</p>
        </div>
        <ul className="ml-[calc(50%-0.5px)] mt-0 border-l border-dashed border-primary-subtle pt-4">
          {spokes.map((s) => {
            const l = linkFor(s.slug);
            return (
              <li key={s.slug} className="relative pb-3 pl-6 before:absolute before:left-0 before:top-5 before:h-px before:w-5 before:border-t before:border-dashed before:border-primary-subtle">
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={pill}>{s.name}</a>
                ) : (
                  <Link href={l.href} className={pill}>{s.name}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
