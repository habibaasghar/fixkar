import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Home Maintenance Blog & Guides | ${BRAND_NAME}`,
  description:
    "Expert tips, repair cost guides, and home maintenance advice for households in Lahore and Pakistan.",
};

const samplePosts = [
  {
    slug: "ac-gas-refill-cost-guide-lahore-2026",
    title: "AC Gas Refill Cost Guide in Lahore (2026 Price List)",
    excerpt: "Everything you need to know about AC gas refills in Lahore — R22 vs R410a gas prices, signs of low cooling, and how to avoid fake gas refilling scams.",
    category: "AC Maintenance",
    date: "July 2026",
    readTime: "4 min read",
  },
  {
    slug: "how-to-hire-verified-electrician-dha-lahore",
    title: "How to Hire a CNIC-Verified Electrician in DHA Lahore",
    excerpt: "Home electrical faults require extreme care. Learn why verifying your handyman's CNIC and local references protects your family and appliances.",
    category: "Safety & Wiring",
    date: "July 2026",
    readTime: "5 min read",
  },
  {
    slug: "monsoon-roof-leakage-waterproofing-tips-pakistan",
    title: "Monsoon Roof Leakage & Dampness Treatment in Pakistan",
    excerpt: "Protect your home walls and ceiling from monsoon water seepage. Effective plumbing and waterproofing solutions explained.",
    category: "Plumbing & Repairs",
    date: "July 2026",
    readTime: "6 min read",
  },
];

export default function BlogIndexPage() {
  return (
    <div>
      <PageHeader
        title="FixKar Home Maintenance Blog"
        subtitle="Practical guides, repair cost breakdowns, and safety tips for Pakistani homeowners."
      />

      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            {samplePosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block h-full">
                <Card hoverable className="h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-blue-600">
                      <span>{post.category}</span>
                      <span className="text-gray-400 font-normal">{post.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span className="font-bold text-blue-600">Read Article →</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
