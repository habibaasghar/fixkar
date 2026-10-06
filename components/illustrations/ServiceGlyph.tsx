import React from "react";
import type { GlyphName } from "@/lib/servicesHub";

/**
 * FixKar service illustration language: 120×90 scenes, 2px rounded strokes in
 * `currentColor`, a soft tinted base shape, and one accent colour for the
 * "active" part of each scene (airflow, current, water, sun…). Pure SVG, no
 * images, decorative by default (aria-hidden) — the card heading carries the
 * meaning.
 */
const scenes: Record<GlyphName, (a: string) => React.ReactNode> = {
  // Indoor split unit + airflow, outdoor condenser
  ac: (a) => (
    <>
      <rect x="10" y="14" width="64" height="24" rx="6" fill={a} fillOpacity=".14" />
      <path d="M18 31h48" />
      <path d="M22 46c4 4-4 8 0 12M38 46c4 4-4 8 0 12M54 46c4 4-4 8 0 12" stroke={a} />
      <rect x="84" y="40" width="26" height="30" rx="4" />
      <circle cx="97" cy="55" r="8" stroke={a} />
      <path d="M97 49v12M91 55h12" stroke={a} />
    </>
  ),
  // Distribution board + wiring + bulb
  electrical: (a) => (
    <>
      <rect x="12" y="12" width="40" height="52" rx="5" fill={a} fillOpacity=".14" />
      <path d="M20 24h24M20 34h24M20 44h14" />
      <path d="M52 30h20c8 0 8 22 16 22h6" stroke={a} />
      <path d="M96 38a10 10 0 1 1 8 17v5h-8v-5a10 10 0 0 1 0-17z" transform="translate(-4 -6)" />
      <path d="M96 60h8" />
    </>
  ),
  // Pipe network + tap + drop
  plumbing: (a) => (
    <>
      <path d="M8 24h40v22h28v18" strokeWidth="6" strokeOpacity=".18" stroke={a} />
      <path d="M8 24h40v22h28v18" />
      <path d="M76 64h-6M82 64h6" />
      <path d="M92 20h14a6 6 0 0 1 6 6v6" />
      <path d="M92 20v10M88 20h8" />
      <path d="M109 42c-4 6-6 8-6 11a6 6 0 0 0 12 0c0-3-2-5-6-11z" transform="translate(-3 4) scale(.9)" fill={a} fillOpacity=".25" stroke={a} />
    </>
  ),
  // Roof + panels + inverter + sun
  solar: (a) => (
    <>
      <circle cx="98" cy="20" r="8" stroke={a} fill={a} fillOpacity=".2" />
      <path d="M98 6v4M98 30v4M84 20h4M108 20h4M88 10l3 3M105 27l3 3M108 10l-3 3M91 27l-3 3" stroke={a} />
      <path d="M8 56L56 26l48 30" />
      <path d="M22 48l12-8 26 6-6 12z" fill={a} fillOpacity=".25" />
      <path d="M46 40l18-5 20 12-14 6z" fill={a} fillOpacity=".25" />
      <rect x="14" y="58" width="14" height="22" rx="3" />
      <path d="M18 66h6M18 72h6" stroke={a} />
    </>
  ),
  // House with before/after layers
  renovation: (a) => (
    <>
      <path d="M12 44L60 10l48 34" />
      <path d="M20 40v38h80V40" fill={a} fillOpacity=".12" />
      <path d="M60 42v36" strokeDasharray="3 4" />
      <rect x="28" y="52" width="14" height="14" rx="2" />
      <rect x="76" y="52" width="14" height="14" rx="2" stroke={a} fill={a} fillOpacity=".25" />
      <path d="M92 22l8 8M96 18l8 8" stroke={a} />
    </>
  ),
  // Cabinet + counter + sink
  kitchen: (a) => (
    <>
      <rect x="10" y="12" width="44" height="18" rx="3" />
      <path d="M32 12v18" />
      <rect x="10" y="44" width="100" height="30" rx="3" fill={a} fillOpacity=".12" />
      <path d="M10 44h100M36 44v30M62 44v30" />
      <path d="M80 44v-8a8 8 0 0 1 8-8h6" stroke={a} />
      <rect x="74" y="56" width="26" height="8" rx="3" stroke={a} />
    </>
  ),
  // Shower + basin + tiles
  bathroom: (a) => (
    <>
      <path d="M22 70V18a10 10 0 0 1 10-10h10" />
      <path d="M42 8h16a6 6 0 0 1 6 6v4" />
      <path d="M56 22l-6 10h12z" fill={a} fillOpacity=".25" stroke={a} />
      <path d="M52 40v6M58 42v6M64 40v6" stroke={a} />
      <path d="M72 52h32v8a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12z" fill={a} fillOpacity=".12" />
      <path d="M96 52v-8h6" />
      <path d="M8 76h104" strokeDasharray="8 4" />
    </>
  ),
  // Roller + wall + colour layers
  painting: (a) => (
    <>
      <rect x="10" y="14" width="100" height="62" rx="4" fill={a} fillOpacity=".1" />
      <rect x="10" y="14" width="46" height="62" rx="4" fill={a} fillOpacity=".22" />
      <rect x="62" y="22" width="40" height="14" rx="4" fill="#fff" />
      <path d="M102 29h6v14H78v8" />
      <rect x="74" y="50" width="8" height="18" rx="3" stroke={a} />
    </>
  ),
  // Roof cross-section + protective membrane + drops
  waterproofing: (a) => (
    <>
      <path d="M8 56h104v16H8z" fill={a} fillOpacity=".1" />
      <path d="M8 50c10-6 20 6 30 0s20 6 30 0 20 6 30 0 6 2 14-2" stroke={a} strokeWidth="3" />
      <path d="M8 56h104" />
      <path d="M30 14c-3 5-5 6-5 9a5 5 0 0 0 10 0c0-3-2-4-5-9zM66 8c-3 5-5 6-5 9a5 5 0 0 0 10 0c0-3-2-4-5-9zM94 18c-3 5-5 6-5 9a5 5 0 0 0 10 0c0-3-2-4-5-9z" stroke={a} fill={a} fillOpacity=".2" />
    </>
  ),
  // Camera + house perimeter
  cctv: (a) => (
    <>
      <path d="M20 78V50l30-22 30 22v28" fill={a} fillOpacity=".1" />
      <rect x="62" y="12" width="36" height="16" rx="4" transform="rotate(14 80 20)" />
      <path d="M72 30l-6 12" />
      <path d="M96 30l14 4M96 36l14 10M94 40l12 16" stroke={a} />
      <circle cx="36" cy="64" r="4" stroke={a} />
    </>
  ),
  // Floor tiles in perspective
  flooring: (a) => (
    <>
      <path d="M26 20h68l18 56H8z" fill={a} fillOpacity=".12" />
      <path d="M50 20L36 76M72 20l12 56M17 48h86M21 62h78" />
      <path d="M50 20h22l12 56H36z" fill={a} fillOpacity=".25" stroke={a} />
    </>
  ),
  // Door/cabinet + saw
  carpentry: (a) => (
    <>
      <rect x="12" y="10" width="44" height="66" rx="3" fill={a} fillOpacity=".12" />
      <rect x="20" y="18" width="28" height="22" rx="2" />
      <rect x="20" y="46" width="28" height="22" rx="2" />
      <circle cx="50" cy="44" r="2" />
      <path d="M70 62l32-32 6 6-32 32z" stroke={a} />
      <path d="M72 66l4 4M78 60l4 4M84 54l4 4" stroke={a} />
    </>
  ),
  // Ceiling layers with recessed lights
  ceiling: (a) => (
    <>
      <path d="M8 14h104v10H8z" />
      <path d="M16 24v10h88V24" fill={a} fillOpacity=".12" />
      <circle cx="36" cy="34" r="3" stroke={a} fill={a} fillOpacity=".4" />
      <circle cx="60" cy="34" r="3" stroke={a} fill={a} fillOpacity=".4" />
      <circle cx="84" cy="34" r="3" stroke={a} fill={a} fillOpacity=".4" />
      <path d="M36 38l-8 26M60 38v26M84 38l8 26" stroke={a} strokeOpacity=".5" strokeDasharray="2 4" />
      <path d="M10 78h100" />
    </>
  ),
  // Door + window
  doors: (a) => (
    <>
      <rect x="12" y="10" width="34" height="66" rx="3" fill={a} fillOpacity=".12" />
      <circle cx="39" cy="45" r="2" />
      <path d="M18 18h22M18 68h22" />
      <rect x="62" y="22" width="46" height="40" rx="3" />
      <path d="M85 22v40M62 42h46" stroke={a} />
    </>
  ),
  // Washing machine + fridge
  appliance: (a) => (
    <>
      <rect x="10" y="14" width="46" height="62" rx="5" fill={a} fillOpacity=".12" />
      <circle cx="33" cy="50" r="14" />
      <circle cx="33" cy="50" r="7" stroke={a} />
      <path d="M18 24h8M32 24h4" />
      <rect x="70" y="10" width="34" height="68" rx="5" />
      <path d="M70 36h34M78 20v8M78 46v12" stroke={a} />
    </>
  ),
  // Sparkles + sofa
  cleaning: (a) => (
    <>
      <path d="M14 64V46a8 8 0 0 1 8-8h58a8 8 0 0 1 8 8v18" fill={a} fillOpacity=".12" />
      <path d="M8 64h84v10H8zM14 52h-6v12M86 52h6v12" />
      <path d="M100 14l3 8 8 3-8 3-3 8-3-8-8-3 8-3zM92 44l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" stroke={a} fill={a} fillOpacity=".25" />
    </>
  ),
  // Truck + boxes
  moving: (a) => (
    <>
      <path d="M8 28h60v40H8z" fill={a} fillOpacity=".12" />
      <path d="M68 40h22l14 14v14H68z" />
      <circle cx="26" cy="72" r="7" fill="#fff" />
      <circle cx="88" cy="72" r="7" fill="#fff" />
      <rect x="16" y="36" width="16" height="14" rx="2" stroke={a} />
      <rect x="38" y="42" width="18" height="8" rx="2" stroke={a} />
    </>
  ),
  // Toolbox + wrench
  handyman: (a) => (
    <>
      <rect x="12" y="38" width="64" height="38" rx="5" fill={a} fillOpacity=".12" />
      <path d="M32 38v-8a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v8M12 54h64M40 50v8h8v-8" />
      <path d="M84 14a14 14 0 0 0 18 18l8 8-8 8-8-8a14 14 0 0 0-18-18l8 8 8-8z" stroke={a} transform="translate(0 4) scale(.85)" />
    </>
  ),
};

export function ServiceGlyph({
  name,
  accent = "#0e6e8c",
  className = "",
}: {
  name: GlyphName;
  accent?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {scenes[name](accent)}
    </svg>
  );
}
