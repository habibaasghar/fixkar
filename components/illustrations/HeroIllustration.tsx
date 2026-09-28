import React from "react";
import { HouseShape, ToolBadge } from "./primitives";

/**
 * Homepage hero visual: a stylized Pakistani home with service badges
 * orbiting it, communicating "one platform for your property needs."
 * Coded SVG — see primitives.tsx for the rationale.
 */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      role="img"
      aria-label="A home surrounded by FixKar service categories: AC, electrical, plumbing, cleaning, and painting"
    >
      <g transform="translate(100 40)">
        <HouseShape />
      </g>

      {/* AC — snowflake */}
      <ToolBadge x="20" y="10" color="var(--color-secondary)">
        <path d="M9 0v18M2 4.5l14 9M16 4.5L2 13.5M0 9h18" />
      </ToolBadge>

      {/* Electrical — bolt */}
      <ToolBadge x="330" y="30" color="var(--color-accent)">
        <path d="M11 0 2 10.5h7l-1 7.5 9-10.5h-7l1-7.5z" />
      </ToolBadge>

      {/* Plumbing — droplet */}
      <ToolBadge x="10" y="150" color="var(--color-primary)">
        <path d="M9 1.5S1.5 10.5 1.5 15.75a7.5 7.5 0 0 0 15 0C16.5 10.5 9 1.5 9 1.5z" />
      </ToolBadge>

      {/* Cleaning — sparkle */}
      <ToolBadge x="335" y="160" color="var(--color-secondary)">
        <path d="M9 2v5M9 12v5M2 9h5M12 9h5M4.5 4.5l3 3M11.5 11.5l3 3M13.5 4.5l-3 3M6.5 11.5l-3 3" />
      </ToolBadge>

      {/* Painting — roller */}
      <ToolBadge x="175" y="220" color="var(--color-accent)">
        <rect x="1" y="2" width="16" height="8" rx="2" />
        <path d="M9 10v6M5 16h8" />
      </ToolBadge>

      {/* connecting dotted lines, subtle */}
      <g stroke="var(--color-border-strong)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6">
        <path d="M56 46 110 95" />
        <path d="M348 66 260 100" />
        <path d="M46 168 105 140" />
        <path d="M353 178 270 150" />
        <path d="M211 220 200 175" />
      </g>
    </svg>
  );
}
