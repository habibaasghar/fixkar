import React from "react";
import { HouseShape, PersonShape } from "./primitives";

type Variant = "home" | "business" | "projects";

/**
 * Medium coded-SVG scenes for the Home / Business / Projects pathway
 * cards — three distinct compositions so each journey reads as visually
 * different, not the same card with swapped text.
 */
export function PathwayIllustration({ variant, className = "" }: { variant: Variant; className?: string }) {
  if (variant === "home") {
    return (
      <svg viewBox="0 0 200 140" className={className} role="img" aria-label="A technician working at a home">
        <g transform="translate(30 10) scale(0.85)">
          <HouseShape primary="var(--color-secondary)" fill="var(--color-secondary-light)" />
        </g>
        <PersonShape x="150" y="90" color="var(--color-secondary)" />
      </svg>
    );
  }

  if (variant === "business") {
    return (
      <svg viewBox="0 0 200 140" className={className} role="img" aria-label="A commercial office building with a maintenance professional">
        <rect x="55" y="20" width="90" height="110" rx="4" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="2.5" />
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={68 + col * 24}
              y={32 + row * 22}
              width="14"
              height="14"
              rx="2"
              fill="white"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
            />
          ))
        )}
        <rect x="90" y="112" width="20" height="18" fill="var(--color-primary)" />
        <PersonShape x="10" y="90" color="var(--color-primary)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 140" className={className} role="img" aria-label="A property renovation scene with painting, flooring and construction tools">
      <rect x="20" y="30" width="70" height="90" rx="4" fill="var(--color-accent-light)" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="4 3" />
      <rect x="35" y="50" width="16" height="50" fill="var(--color-accent)" opacity="0.5" />
      {/* ladder */}
      <g stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round">
        <line x1="120" y1="120" x2="135" y2="20" />
        <line x1="150" y1="120" x2="165" y2="20" />
        <line x1="122" y1="100" x2="148" y2="94" />
        <line x1="126" y1="70" x2="152" y2="64" />
        <line x1="130" y1="40" x2="156" y2="34" />
      </g>
      {/* paint roller */}
      <g transform="translate(155 95) rotate(20)">
        <rect x="0" y="0" width="26" height="12" rx="3" fill="var(--color-secondary)" />
        <path d="M13 12v14" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
