import type { MetadataRoute } from "next";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";

/**
 * Phase 18 fix (was missing) — V1 was specified as a "Web PWA" (Phase 1), but
 * without a manifest the site isn't installable. This makes it installable.
 *
 * NOTE: the two icon PNGs referenced below do NOT exist in public/ yet (only
 * the default Next.js SVGs are there). They are a design deliverable, not
 * code — a 192×192 and a 512×512 (ideally maskable) PNG must be dropped into
 * public/ as icon-192.png and icon-512.png before install actually works.
 * Until then the manifest is valid but the install prompt won't have icons.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_NAME,
    short_name: "FixKar",
    description: BRAND_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f766e",
    orientation: "portrait",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
