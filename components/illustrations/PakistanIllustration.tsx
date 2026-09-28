import React from "react";

/**
 * Abstract "many cities, one platform" visual for the location section —
 * a loose vertical scatter of location pins connected by dotted lines,
 * deliberately abstract/geometric rather than a literal map or flag (avoids
 * both copyright/stock-map issues and overclaiming exact coverage — see
 * the brief's own instruction not to claim precise city coverage in this
 * visual). Uses only FixKar's own brand colors.
 */
export function PakistanIllustration({ className = "" }: { className?: string }) {
  const pins = [
    { x: 80, y: 20, r: 7, color: "var(--color-primary)" },
    { x: 150, y: 55, r: 10, color: "var(--color-secondary)" },
    { x: 60, y: 90, r: 6, color: "var(--color-accent)" },
    { x: 170, y: 110, r: 7, color: "var(--color-primary)" },
    { x: 100, y: 140, r: 9, color: "var(--color-secondary)" },
    { x: 40, y: 170, r: 6, color: "var(--color-accent)" },
    { x: 130, y: 190, r: 7, color: "var(--color-primary)" },
    { x: 90, y: 220, r: 8, color: "var(--color-secondary)" },
  ];

  return (
    <svg viewBox="0 0 220 260" className={className} role="img" aria-label="An abstract pattern of connected location markers representing cities across Pakistan">
      <g stroke="var(--color-border-strong)" strokeWidth="1.25" strokeDasharray="3 5" opacity="0.7">
        {pins.slice(1).map((p, i) => (
          <line key={i} x1={pins[i].x} y1={pins[i].y} x2={p.x} y2={p.y} />
        ))}
      </g>
      {pins.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={p.r + 6} fill={p.color} opacity="0.12" />
          <circle cx={p.x} cy={p.y} r={p.r} fill={p.color} />
        </g>
      ))}
    </svg>
  );
}
