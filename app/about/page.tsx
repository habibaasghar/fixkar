import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { TrustPoint } from "@/components/domain/TrustPoint";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About Us | ${BRAND_NAME}`,
  description:
    "Learn how FixKar.pk connects Pakistani households with vetted vendor partners for home repairs and maintenance.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title={`About ${BRAND_NAME}`}
        subtitle="Building Pakistan's most reliable and transparent home service platform."
      />

      <Section background="white">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-gray-900">Our Mission</h2>
              <p>
                In Pakistan, finding a trustworthy electrician, plumber, or technician for emergency home repairs has historically been a source of stress and safety risk. Unpredictable pricing, unverified strangers entering family homes, and recurring defects with zero accountability have plagued households for decades.
              </p>
              <p>
                <strong>{BRAND_NAME}</strong> was built to solve this trust deficit. We work with professional vendor partners in each city we operate in, get you a real quote for your job, and confirm it with a real local partner before you commit — with transparent market rates throughout.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl font-extrabold text-gray-900">How We Vet Our Vendor Partners</h2>
              <p>
                Unlike basic classifieds or unstructured directories, we don&apos;t list anonymous strangers. Every vendor partner is someone our team has personally spoken to and confirmed before we connect them with a customer:
              </p>
              <ul className="list-disc pl-5 space-y-2 font-medium">
                <li>Personal introduction and phone/WhatsApp contact verification</li>
                <li>Confirmed trade, service area, and pricing before the first job</li>
                <li>Ongoing follow-up with customers after each job to check quality</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <TrustPoint
                icon="shield"
                title="Zero Upfront Risk"
                text="Clients pay cash or digital mobile wallets only after job completion."
              />
              <TrustPoint
                icon="check"
                title="Vendor-Backed Warranty"
                text="Any workmanship warranty is provided directly by the vendor partner who did the job — ask about their terms when you get your quote."
              />
              <TrustPoint
                icon="phone"
                title="WhatsApp Native"
                text="Book seamlessly on WhatsApp without complex app downloads."
              />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
