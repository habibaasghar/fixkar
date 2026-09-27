import type { BlogPost } from "./types";

export const posts: BlogPost[] = [
  {
    slug: "ac-gas-refill-cost-guide-lahore-2026",
    title: "AC Gas Refill Cost Guide in Lahore (2026 Price List)",
    excerpt:
      "Everything you need to know about AC gas refills in Lahore — R22 vs R410a gas prices, signs of low cooling, and how to avoid fake gas refilling scams.",
    category: "AC Maintenance",
    publishedAt: "July 2026",
    readTimeMinutes: 4,
  },
  {
    slug: "how-to-hire-verified-electrician-dha-lahore",
    title: "How to Hire a Trustworthy Electrician in DHA Lahore",
    excerpt:
      "Home electrical faults require extreme care. Learn why checking your handyman's identity and local references protects your family and appliances.",
    category: "Safety & Wiring",
    publishedAt: "July 2026",
    readTimeMinutes: 5,
  },
  {
    slug: "monsoon-roof-leakage-waterproofing-tips-pakistan",
    title: "Monsoon Roof Leakage & Dampness Treatment in Pakistan",
    excerpt:
      "Protect your home walls and ceiling from monsoon water seepage. Effective plumbing and waterproofing solutions explained.",
    category: "Plumbing & Repairs",
    publishedAt: "July 2026",
    readTimeMinutes: 6,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
