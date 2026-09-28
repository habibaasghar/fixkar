import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { BRAND_NAME } from "@/lib/constants";
import { posts as samplePosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: `Home Maintenance Blog & Guides | ${BRAND_NAME}`,
  description:
    "Expert tips, repair cost guides, and home maintenance advice for households in Lahore and Pakistan.",
  alternates: {
    canonical: "/blog",
  },
};

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
                    <div className="flex items-center justify-between text-xs font-bold text-primary">
                      <span>{post.category}</span>
                      <span className="text-gray-400 font-normal">{post.readTimeMinutes} min read</span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>{post.publishedAt}</span>
                    <span className="font-bold text-primary">Read Article →</span>
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
