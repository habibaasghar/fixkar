import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { TrustPoint } from "@/components/domain/TrustPoint";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About Us | ${BRAND_NAME}`,
  description:
    "Learn how FixKar.pk is building Pakistan's most trusted home service marketplace with zero-trust CNIC background verification.",
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
                <strong>{BRAND_NAME}</strong> was built to solve this trust deficit. We connect Pakistani households directly with CNIC-verified, skill-assessed service professionals while providing transparent market rates and a 7-day workmanship guarantee.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h2 className="text-2xl font-extrabold text-gray-900">The Zero-Trust Verification Framework</h2>
              <p>
                Unlike basic classifieds or unstructured directories, every professional on {BRAND_NAME} passes a multi-step background check before receiving their first booking:
              </p>
              <ul className="list-disc pl-5 space-y-2 font-medium">
                <li>NADRA CNIC document verification & SIM card identity match</li>
                <li>Physical community character references check</li>
                <li>Technical trade skill and pricing assessment</li>
                <li>Police character certificate (for Tier 2 Master Fixer badge)</li>
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
                title="7-Day Guarantee"
                text="Free re-inspection if the same technical fault occurs within 7 days."
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
