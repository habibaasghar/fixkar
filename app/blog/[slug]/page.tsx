import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { BRAND_NAME } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} | ${BRAND_NAME} Blog`,
    description: `Read expert advice and repair cost tips about ${title} on ${BRAND_NAME}.`,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div>
      <Container className="pt-6">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: title, href: `/blog/${slug}` },
          ]}
        />
      </Container>

      <PageHeader title={title} subtitle="Home maintenance guide & expert advice from FixKar.pk" />

      <Section background="white">
        <Container>
          <article className="max-w-3xl mx-auto prose sm:prose-lg text-gray-700 leading-relaxed space-y-6">
            <p>
              When managing home repairs in Pakistan, unexpected technical faults can happen at the worst times — whether it is an AC gas leak during peak July heat or a sudden short circuit during heavy rainfall.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-6">Key Things to Check Before Hiring a Handyman</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
              <li>Always verify the technician&apos;s NADRA CNIC identity card.</li>
              <li>Demand a upfront estimate before any parts are replaced.</li>
              <li>Ensure the technician provides a minimum 7-day workmanship warranty.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-6">Why Use FixKar.pk in Lahore?</h2>
            <p>
              FixKar.pk pre-screens every electrician, plumber, and technician in Lahore before listing them. You get transparent market pricing and pay cash only after inspecting the job.
            </p>

            <div className="my-8 rounded-2xl bg-blue-50 border border-blue-100 p-6 text-center space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Need Immediate Help with Your Repair?</h3>
              <p className="text-xs text-gray-600">Connect with a CNIC-verified handyman in Lahore on WhatsApp.</p>
              <div className="flex justify-center pt-1">
                <WhatsAppCTA message={`Hi FixKar, I read your article "${title}" and need help.`} />
              </div>
            </div>
          </article>
        </Container>
      </Section>
    </div>
  );
}
