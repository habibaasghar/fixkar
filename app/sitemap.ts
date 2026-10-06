import type { MetadataRoute } from "next";
import { BRAND_URL } from "@/lib/constants";
import { cities, categories, isCategoryActiveInCity, cityHasAnyActiveCategory } from "@/lib/services";
import { posts } from "@/lib/blog";
import { sofaIntentParams } from "@/lib/sofaCluster";

/**
 * Programmatic sitemap (Phase 18 fix — this was missing). Mirrors the exact
 * set of routes the app renders: the static marketing pages plus every
 * generated /[city] and /[city]/[category] page (same source as those pages'
 * generateStaticParams — lib/services.ts). Active cities rank higher than
 * coming-soon ones. Regenerated on each deploy; served at /sitemap.xml.
 *
 * Coming-soon city/category combinations are `noindex`ed on the page itself
 * (see their generateMetadata) — a sitemap should only list indexable URLs,
 * so those are excluded here entirely rather than listed at low priority.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/services", priority: 0.8, changeFrequency: "weekly" },
    { path: "/sofa-cleaning", priority: 0.8, changeFrequency: "weekly" },
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

  for (const post of posts) {
    entries.push({
      url: `${BRAND_URL}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  for (const city of cities) {
    // Cities with zero live categories are noindexed on the page itself — skip them here.
    if (!cityHasAnyActiveCategory(city)) continue;

    entries.push({
      url: `${BRAND_URL}/${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const category of categories) {
      // Coming-soon combinations are noindexed on the page itself — skip them here too.
      if (!isCategoryActiveInCity(city, category.slug)) continue;

      entries.push({
        url: `${BRAND_URL}/${city.slug}/${category.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Sofa-cluster intent pages (live only in the cities listed in lib/sofaCluster.ts).
  for (const { city, category } of sofaIntentParams()) {
    entries.push({
      url: `${BRAND_URL}/${city}/${category}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
