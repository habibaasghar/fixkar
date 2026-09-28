import React from "react";
import { PersonShape } from "./primitives";

/**
 * Final CTA supporting visual — a technician arriving with a toolbox.
 * Deliberately simple/small so it supports the CTA rather than competing
 * with it for attention.
 */
export function CTAIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" className={className} role="img" aria-label="A FixKar vendor partner arriving with tools">
      <rect x="20" y="70" width="100" height="6" rx="3" fill="var(--color-border-strong)" />
      <PersonShape x="50" y="20" color="var(--color-primary)" />
      {/* toolbox */}
      <g transform="translate(88 52)">
        <rect x="0" y="6" width="24" height="16" rx="2" fill="var(--color-accent)" />
        <path d="M6 6V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" stroke="var(--color-accent-hover)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="10" y="12" width="4" height="4" fill="white" opacity="0.8" />
      </g>
    </svg>
  );
}
