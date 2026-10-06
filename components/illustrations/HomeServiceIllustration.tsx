import React from "react";
import { HouseShape, ToolBadge } from "./primitives";

type ServiceNode = {
  x: number;
  y: number;
  color: string;
  path?: string;
  children?: React.ReactNode;
};

const nodes: ServiceNode[] = [
  { x: 15, y: 55, color: "#0284c7", path: "M9 0v18M2 4.5l14 9M16 4.5L2 13.5M0 9h18" }, // AC & cooling
  { x: 340, y: 35, color: "#f59e0b", path: "M11 0 2 10.5h7l-1 7.5 9-10.5h-7l1-7.5z" }, // electrical
  { x: 358, y: 140, color: "#0891b2", path: "M9 1.5S1.5 10.5 1.5 15.75a7.5 7.5 0 0 0 15 0C16.5 10.5 9 1.5 9 1.5z" }, // plumbing
  {
    x: 330,
    y: 245,
    color: "#7c3aed",
    children: <path d="M9 0 2 3v5c0 5.5 3.5 8.5 7 10 3.5-1.5 7-4.5 7-10V3L9 0Z" />,
  }, // security
  {
    x: 205,
    y: 256,
    color: "#57534e",
    children: <path d="M1 8 9 1l8 7M4 8v8h3v-5h4v5h3V8" />,
  }, // renovation
  {
    x: 75,
    y: 250,
    color: "#f97316",
    children: (
      <>
        <rect x="2" y="9" width="14" height="7" rx="1" />
        <path d="M2 12.5h14M6 9v7M12 9v7M9 1v2M4 3.5l1.4 1.4M14 3.5l-1.4 1.4" />
      </>
    ),
  }, // solar
  {
    x: 12,
    y: 155,
    color: "#e11d48",
    children: (
      <>
        <rect x="1" y="2" width="16" height="8" rx="2" />
        <path d="M9 10v6M5 16h8" />
      </>
    ),
  }, // painting
  {
    x: 140,
    y: 4,
    color: "#b45309",
    children: (
      <>
        <rect x="2" y="3" width="14" height="5" rx="1" />
        <rect x="2" y="10" width="14" height="6" rx="1" />
        <path d="M9 3v5" />
      </>
    ),
  }, // kitchen
  {
    x: 265,
    y: 6,
    color: "#4f46e5",
    children: (
      <>
        <path d="M1 8c2-2 4 2 6 0s4 2 6 0 3 1 4 0" />
        <path d="M9 11v1M5 12v1M13 12v1" />
      </>
    ),
  }, // waterproofing
  {
    x: 268,
    y: 254,
    color: "#0e7490",
    children: (
      <>
        <path d="M3 16V5a3 3 0 0 1 6 0M9 5h3" />
        <path d="M2 10h14v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" />
      </>
    ),
  }, // bathroom
];

/**
 * /services/ hero visual: one home at the center, connecting lines fanning
 * out to badges for the main service categories — "one home, many possible
 * needs, one FixKar enquiry." Pure SVG + CSS, no animation library. Motion
 * (floating badges, flowing connector dashes) is applied only via
 * `motion-safe:` so it's automatically skipped under prefers-reduced-motion.
 */
export function HomeServiceIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label="A FixKar home connected to icons for AC, electrical, plumbing, security, renovation, solar, painting, kitchen, bathroom and waterproofing services"
    >
      <g stroke="var(--color-border-strong)" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.6">
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="200"
            y1="130"
            x2={n.x + 18}
            y2={n.y + 18}
            className="motion-safe:animate-[dash-flow_3s_linear_infinite]"
          />
        ))}
      </g>

      <g transform="translate(100 40)">
        <HouseShape />
      </g>

      {nodes.map((n, i) => (
        <g
          key={i}
          className="motion-safe:animate-[float-badge_4s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.3}s` }}
        >
          <ToolBadge x={n.x} y={n.y} color={n.color}>
            {n.path ? <path d={n.path} /> : n.children}
          </ToolBadge>
        </g>
      ))}
    </svg>
  );
}
