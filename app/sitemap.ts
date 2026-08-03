import type { MetadataRoute } from "next";
import { BRAND_URL } from "@/lib/constants";
import { cities, categories } from "@/lib/services";

/**
 * Programmatic sitemap (Phase 18 fix — this was missing). Mirrors the exact
 * set of routes the app renders: the static marketing pages plus every
 * generated /[city] and /[city]/[category] page (same source as those pages'
 * generateStaticParams — lib/services.ts). Active cities rank higher than
 * coming-soon ones. Regenerated on each deploy; served at /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/services", priority: 0.8, changeFrequency: "weekly" },
    { path: "/how-it-works", priority: 0.6, changeFrequency: "monthly" },
    { path: "/trust-safety", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
    { path: "/partner", priority: 0.7, changeFrequency: "monthly" },
    { path: "/partner/register", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.4, changeFrequency: "monthly" },
    { path: "/request", priority: 0.7, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.5, changeFrequency: "weekly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${BRAND_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  for (const city of cities) {
    const isActive = city.status === "active";
    entries.push({
      url: `${BRAND_URL}/${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: isActive ? 0.9 : 0.4,
    });
    for (const category of categories) {
      entries.push({
        url: `${BRAND_URL}/${city.slug}/${category.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: isActive ? 0.8 : 0.3,
      });
    }
  }

  return entries;
}
