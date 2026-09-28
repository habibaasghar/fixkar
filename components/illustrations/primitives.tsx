import React from "react";

/**
 * Shared coded-SVG building blocks for the FixKar illustration system.
 * No raster images/dependencies — pure inline SVG, so these cost nothing
 * extra over the page's own HTML (no network request, no CLS, trivially
 * small). Built to read as a stylized Pakistani home/technician scene: a
 * flat-roofed house with a boundary wall and rooftop water tank (a
 * recognizable residential cue), plus simple rounded person silhouettes.
 *
 * Kept deliberately abstract/geometric rather than photo-real — consistent
 * with the "no generic AI stock-figure style" rule, and it's the only
 * approach available without an image-generation tool (see
 * docs/UI_DESIGN_SYSTEM.md §6).
 */

export function HouseShape({
  primary = "var(--color-primary)",
  fill = "var(--color-primary-light)",
}: {
  primary?: string;
  fill?: string;
}) {
  return (
    <g>
      {/* boundary wall */}
      <rect x="10" y="150" width="180" height="8" rx="2" fill={primary} opacity="0.25" />
      {/* house body */}
      <rect x="40" y="90" width="120" height="64" rx="6" fill={fill} stroke={primary} strokeWidth="2.5" />
      {/* roof slab */}
      <rect x="32" y="78" width="136" height="14" rx="4" fill={primary} />
      {/* rooftop water tank — distinctive Pakistani residential cue */}
      <rect x="128" y="58" width="20" height="22" rx="3" fill={primary} opacity="0.85" />
      <rect x="124" y="54" width="28" height="6" rx="2" fill={primary} />
      {/* door */}
      <rect x="90" y="118" width="20" height="36" rx="2" fill={primary} />
      {/* windows with grille pattern */}
      <rect x="54" y="104" width="22" height="18" rx="2" fill="white" stroke={primary} strokeWidth="2" />
      <path d="M65 104v18M54 113h22" stroke={primary} strokeWidth="1.5" />
      <rect x="124" y="104" width="22" height="18" rx="2" fill="white" stroke={primary} strokeWidth="2" />
      <path d="M135 104v18M124 113h22" stroke={primary} strokeWidth="1.5" />
    </g>
  );
}

export function PersonShape({
  x = 0,
  y = 0,
  color = "var(--color-primary)",
  skin = "#e8b894",
}: {
  x?: number | string;
  y?: number | string;
  color?: string;
  skin?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="12" cy="8" r="7" fill={skin} />
      <path d="M0 42c0-11 5.5-18 12-18s12 7 12 18" fill={color} />
    </g>
  );
}

export function ToolBadge({
  x = 0,
  y = 0,
  color = "var(--color-accent)",
  children,
}: {
  x?: number | string;
  y?: number | string;
  color?: string;
  children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="18" cy="18" r="18" fill="white" stroke={color} strokeWidth="2" />
      <g transform="translate(9 9)" stroke={color} fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </g>
  );
}

/** Decorative soft blob background used behind category/pathway illustrations. */
export function BlobBackground({ color = "var(--color-secondary-light)" }: { color?: string }) {
  return (
    <path
      d="M100 20c33 0 62 15 74 45s2 68-28 84-70 8-92-14-28-58-10-86 23-29 56-29z"
      fill={color}
    />
  );
}
