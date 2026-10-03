import React, { Fragment } from "react";
import { IconChevron } from "@/components/icons";
import { RevealOnScroll } from "./RevealOnScroll";

type Stage = {
  label: string;
  examples: string[];
  accent: string;
};

const stages: Stage[] = [
  { label: "Small Job", examples: ["AC Repair"], accent: "bg-sky-50 border-sky-200 text-sky-700" },
  { label: "Home Improvement", examples: ["Painting", "Flooring", "Electrical"], accent: "bg-rose-50 border-rose-200 text-rose-700" },
  { label: "Major Upgrade", examples: ["Kitchen", "Bathroom", "Waterproofing"], accent: "bg-amber-50 border-amber-200 text-amber-700" },
  { label: "Complete Project", examples: ["Home Renovation", "Solar Installation", "Multiple Trades"], accent: "bg-stone-50 border-stone-200 text-stone-700" },
];

/**
 * Visual spectrum communicating that FixKar takes enquiries across the
 * whole range from a single repair to a multi-trade project — no claim
 * about size limits either way, just a map of "where does my job fit."
 */
export function ServiceScaleVisual() {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-stretch sm:gap-3">
      {stages.map((stage, i) => (
        <Fragment key={stage.label}>
          <RevealOnScroll delayMs={i * 100} className="flex-1">
            <div className={`h-full rounded-2xl border p-5 text-center ${stage.accent}`}>
              <p className="text-sm font-extrabold">{stage.label}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {stage.examples.map((example) => (
                  <span key={example} className="rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold">
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
          {i < stages.length - 1 && (
            <div className="flex items-center justify-center" aria-hidden="true">
              <IconChevron direction="down" size={18} className="text-gray-300 sm:hidden" />
              <IconChevron direction="right" size={18} className="hidden text-gray-300 sm:block" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
