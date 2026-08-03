import type { MetadataRoute } from "next";
import { BRAND_URL } from "@/lib/constants";

/**
 * Phase 18 fix (was missing). Allows crawlers on the public marketing/SEO
 * pages, but disallows API routes and any authenticated surface (admin,
 * account, vendor/customer dashboards) — none of which should ever be
 * indexed. Points crawlers at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/account", "/vendor/dashboard", "/auth/"],
    },
    sitemap: `${BRAND_URL}/sitemap.xml`,
    host: BRAND_URL,
  };
}
