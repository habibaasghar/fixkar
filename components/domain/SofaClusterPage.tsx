import React from "react";
import Link from "next/link";
import { Container, Section } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { SofaClusterSchema } from "@/components/seo/SofaClusterSchema";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { AreaCoverageList } from "@/components/domain/HowItWorksStep";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { LeadForm } from "@/components/domain/LeadForm";
import { BRAND_NAME } from "@/lib/constants";
import { areaList, isSofaPageLive } from "@/lib/sofaCluster";
import type { SofaBlock, SofaIntent } from "@/lib/sofaCluster";
import { getSofaIntent } from "@/lib/sofaContent";
import { isCategoryActiveInCity } from "@/lib/services";
import type { City } from "@/lib/types";

const h2 = "text-xl font-extrabold text-gray-900 sm:text-2xl";
const p = "text-sm leading-relaxed text-gray-700 sm:text-base";

function Block({ block }: { block: SofaBlock }) {
  const head = (
    <>
      <h2 className={h2}>{block.h2}</h2>
      {"intro" in block && block.intro && <p className={`${p} mt-2`}>{block.intro}</p>}
    </>
  );

  switch (block.kind) {
    case "cards":
      return (
        <section>
          {head}
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {block.items.map((i) => (
              <li key={i.title} className="rounded-2xl border border-gray-200 bg-white p-4">
                <h3 className="text-sm font-bold text-gray-900">{i.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{i.text}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    case "h3":
      return (
        <section>
          {head}
          <div className="mt-4 space-y-4">
            {block.items.map((i) => (
              <div key={i.title}>
                <h3 className="text-base font-bold text-gray-900">{i.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:text-base">{i.text}</p>
              </div>
            ))}
          </div>
        </section>
      );
    case "steps":
      return (
        <section>
          {head}
          <ol className="mt-4 space-y-3">
            {block.items.map((i, n) => (
              <li key={i.title} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-extrabold text-primary" aria-hidden="true">
                  {n + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 sm:text-base">{i.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{i.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );
    case "bullets":
      return (
        <section>
          {head}
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {block.items.map((i) => (
              <li key={i} className="flex items-start gap-2 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-800">
                <span aria-hidden="true" className="font-bold text-primary">✓</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </section>
      );
    case "table":
      return (
        <section>
          {head}
          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-gray-700">
                <tr>
                  {block.head.map((h, i) => (
                    <th key={i} scope="col" className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {block.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-4 py-3 text-left font-semibold text-gray-900">{c}</th>
                      ) : (
                        <td key={i} className="px-4 py-3 text-gray-600">{c}</td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    case "text":
      return (
        <section>
          {head}
          <div className="mt-3 space-y-3">
            {block.paragraphs.map((t) => (
              <p key={t} className={p}>{t}</p>
            ))}
          </div>
        </section>
      );
  }
}

export function SofaClusterPage({ city, intent }: { city: City; intent: SofaIntent }) {
  const isCore = intent.slug === "sofa-cleaning";
  const waMessage = `Hi ${BRAND_NAME}, I need ${intent.shortName.toLowerCase()} in ${city.name}. Here's what I need: `;
  const blocks = intent.blocks(city.name);
  const faqs = intent.faqs(city.name);

  const crumbs = [
    { label: city.name, href: `/${city.slug}` },
    { label: "Sofa Cleaning", href: `/${city.slug}/sofa-cleaning` },
    ...(isCore ? [] : [{ label: intent.shortName, href: `/${city.slug}/${intent.slug}` }]),
  ];

  const relatedIntents = intent.related
    .filter((s) => isSofaPageLive(city.slug, s))
    .map((s) => getSofaIntent(s))
    .filter((i): i is SofaIntent => Boolean(i));

  const carpetLive = isCategoryActiveInCity(city, "carpet-cleaning");

  return (
    <div>
      <SofaClusterSchema city={city} intent={intent} />
      <FAQSchema faqs={faqs} />

      <Container className="pt-6">
        <Breadcrumbs items={crumbs} />
      </Container>

      {/* Hero + opening answer */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-primary-light/50 to-white py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{intent.h1(city.name)}</h1>
            {intent.opening(city.name, areaList(city)).map((t) => (
              <p key={t} className={p}>{t}</p>
            ))}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <WhatsAppCTA message={waMessage} label={intent.whatsappLabel} size="lg" className="w-full sm:w-auto" />
              <a
                href="#request"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-primary px-5 text-sm font-bold text-primary hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Section background="white">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            {/* Quick answers (AIO) */}
            <section aria-label="Quick answers">
              <dl className="grid grid-cols-1 gap-3">
                {intent.quick(city.name).map((q) => (
                  <div key={q.question} className="rounded-2xl border border-primary-subtle bg-primary-light/40 p-4">
                    <dt className="text-sm font-bold text-gray-900">{q.question}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-700">{q.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {blocks.slice(0, 2).map((b) => (
              <Block key={b.h2} block={b} />
            ))}

            {/* Mid-page CTA */}
            <div className="flex flex-col items-start gap-3 rounded-2xl bg-surface-subtle p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-gray-800">Send the number of seats and a few photos for a quote before anything starts.</p>
              <WhatsAppCTA message={waMessage} label="Get a Quote on WhatsApp" size="md" />
            </div>

            {blocks.slice(2).map((b) => (
              <Block key={b.h2} block={b} />
            ))}

            {/* Local context: unique per city and per page */}
            <section>
              <h2 className={h2}>{intent.shortName} in {city.name}: Local Notes</h2>
              <p className={`${p} mt-3`}>{intent.local[city.slug]}</p>
            </section>

            <AreaCoverageList cityName={city.name} areas={city.areas} />

            {/* Cost, with no invented prices */}
            <section>
              <h2 className={h2}>How Much Does {isCore ? "Sofa" : intent.shortName.replace(/ Cleaning$/, "")} Cleaning Cost?</h2>
              <p className={`${p} mt-2`}>{intent.costNote}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700 sm:text-base">
                {intent.costFactors.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className={h2}>Before Your Cleaning Appointment</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700 sm:text-base">
                {intent.prep.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>

            {/* Related cluster pages */}
            <nav aria-label="Related cleaning services" className="rounded-2xl border border-gray-200 p-5">
              <h2 className="text-base font-extrabold text-gray-900">Related Cleaning Services in {city.name}</h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {relatedIntents.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/${city.slug}/${r.slug}`} className="text-sm font-semibold text-primary hover:underline">
                      {r.name} in {city.name}
                    </Link>
                  </li>
                ))}
                {carpetLive && (
                  <li>
                    <Link href={`/${city.slug}/carpet-cleaning`} className="text-sm font-semibold text-primary hover:underline">
                      Carpet cleaning in {city.name}
                    </Link>
                  </li>
                )}
                {carpetLive && !isCore && (
                  <li>
                    <Link href={`/${city.slug}/sofa-carpet-cleaning`} className="text-sm font-semibold text-primary hover:underline">
                      Sofa and carpet cleaning together
                    </Link>
                  </li>
                )}
                {isCore && (
                  <li>
                    <Link href="/sofa-cleaning" className="text-sm font-semibold text-primary hover:underline">
                      Sofa cleaning across Pakistan
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </Container>
      </Section>

      <Section background="subtle">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className={`${h2} mb-2`}>{intent.shortName} FAQs for {city.name}</h2>
            <div className="divide-y divide-gray-200">
              {faqs.map((f, i) => (
                <AccordionItem key={f.question} title={f.question} defaultOpen={i === 0}>
                  <p>{f.answer}</p>
                </AccordionItem>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white" id="request" className="scroll-mt-20">
        <Container>
          <div className="mx-auto mb-6 max-w-xl text-center">
            <h2 className="text-xl font-extrabold text-gray-900">Request {intent.shortName} in {city.name}</h2>
            <p className="mt-1 text-sm text-gray-600">Leave your details and we will follow up. You can also message us on WhatsApp.</p>
          </div>
          <div className="mx-auto max-w-xl space-y-5">
            <LeadForm city={city} service={intent.slug} />
            <div className="flex justify-center">
              <WhatsAppCTA message={waMessage} label={intent.whatsappLabel} size="lg" />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
