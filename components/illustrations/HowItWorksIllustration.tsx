import React from "react";
import { PersonShape } from "./primitives";

type Variant = "request" | "match" | "pay";

/**
 * Small coded-SVG scene for each "How FixKar Works" step. Compact
 * (80x80) since these sit inside an already-dense 3-card row.
 */
export function HowItWorksIllustration({ variant, className = "" }: { variant: Variant; className?: string }) {
  if (variant === "request") {
    return (
      <svg viewBox="0 0 80 80" className={className} role="img" aria-label="Submitting a service request">
        <rect x="18" y="14" width="44" height="52" rx="6" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="2" />
        <rect x="26" y="26" width="28" height="4" rx="2" fill="var(--color-primary)" opacity="0.6" />
        <rect x="26" y="36" width="20" height="4" rx="2" fill="var(--color-primary)" opacity="0.4" />
        <circle cx="56" cy="56" r="14" fill="var(--color-accent)" />
        <path d="M50 56l4 4 8-8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (variant === "match") {
    return (
      <svg viewBox="0 0 80 80" className={className} role="img" aria-label="FixKar connecting a customer with a vendor partner">
        <circle cx="20" cy="45" r="16" fill="var(--color-secondary-light)" />
        <circle cx="60" cy="45" r="16" fill="var(--color-primary-light)" />
        <path d="M32 40h16" stroke="var(--color-accent)" strokeWidth="2.5" strokeDasharray="2 4" strokeLinecap="round" />
        <PersonShape x="8" y="18" color="var(--color-secondary)" />
        <PersonShape x="48" y="18" color="var(--color-primary)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label="Paying directly after the job is completed">
      <rect x="14" y="30" width="52" height="34" rx="6" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="2" />
      <rect x="14" y="30" width="52" height="12" rx="6" fill="var(--color-primary)" />
      <circle cx="52" cy="50" r="8" fill="var(--color-accent)" />
      <circle cx="16" cy="18" r="12" fill="white" stroke="var(--color-secondary)" strokeWidth="2" />
      <path d="M11 18l3.5 3.5L21 14" stroke="var(--color-secondary)" strokeWidth="2.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
