import React from "react";
import { HouseShape, ToolBadge } from "./primitives";

/**
 * /services/ hero visual: a hub-and-spoke composition (home at center,
 * service nodes radiating out on connecting lines) — related to the
 * homepage hero (same house/badge primitives) but a distinct arrangement
 * that reads as "one hub, many services" rather than the homepage's looser
 * orbiting-badges framing.
 */
export function ServicesHeroIllustration({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 20, y: 60, color: "var(--color-secondary)", path: "M9 0v18M2 4.5l14 9M16 4.5L2 13.5M0 9h18" }, // AC
    { x: 340, y: 40, color: "var(--color-accent)", path: "M11 0 2 10.5h7l-1 7.5 9-10.5h-7l1-7.5z" }, // bolt
    { x: 355, y: 150, color: "var(--color-primary)", path: "M9 1.5S1.5 10.5 1.5 15.75a7.5 7.5 0 0 0 15 0C16.5 10.5 9 1.5 9 1.5z" }, // droplet
    { x: 15, y: 165, color: "var(--color-secondary)", path: "M9 2v5M9 12v5M2 9h5M12 9h5M4.5 4.5l3 3M11.5 11.5l3 3M13.5 4.5l-3 3M6.5 11.5l-3 3" }, // sparkle
    { x: 100, y: 220, color: "var(--color-accent)", children: <><rect x="1" y="2" width="16" height="8" rx="2" /><path d="M9 10v6M5 16h8" /></> }, // paint
    { x: 260, y: 225, color: "var(--color-primary)", children: <><path d="M2 9h14M2 9l3-6M16 9l-3-6M4 9v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9" /></> }, // tools/carpentry
  ];

  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      role="img"
      aria-label="A central FixKar home hub connected to icons for AC, electrical, plumbing, cleaning, painting and carpentry services"
    >
      <g stroke="var(--color-border-strong)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6">
        {nodes.map((n, i) => (
          <line key={i} x1="200" y1="130" x2={n.x + 18} y2={n.y + 18} />
        ))}
      </g>

      <g transform="translate(100 40)">
        <HouseShape />
      </g>

      {nodes.map((n, i) => (
        <ToolBadge key={i} x={n.x} y={n.y} color={n.color}>
          {n.path ? <path d={n.path} /> : n.children}
        </ToolBadge>
      ))}
    </svg>
  );
}
