import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND_NAME}`,
  description: `Privacy policy and data protection guidelines for ${BRAND_NAME} users in Pakistan.`,
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader
        title="Privacy Policy"
        subtitle={`Last updated: July 2026. How ${BRAND_NAME} collects, stores, and protects customer and vendor data.`}
      />

      <Section background="white">
        <Container>
          <div className="max-w-3xl mx-auto prose sm:prose-lg text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base">
            <h2 className="text-xl font-bold text-gray-900">1. Information We Collect</h2>
            <p>
              When you submit a service request or register as a service partner on {BRAND_NAME}, we collect necessary contact information (name, phone number, physical area/locality, and requested service category). For service partners, we additionally collect CNIC document images and local references for verification.
            </p>

            <h2 className="text-xl font-bold text-gray-900">2. How We Use Your Data</h2>
            <p>
              Customer data is strictly used to connect you with a nearby vetted vendor partner and facilitate job execution. We do not sell customer databases or share personal contact information with unauthorized third-party advertisers.
            </p>

            <h2 className="text-xl font-bold text-gray-900">3. CNIC & Document Security</h2>
            <p>
              Vendor partner CNIC copies and reference details are stored securely and are only accessible to our team, used solely for confirming who we&apos;re connecting customers with.
            </p>

            <h2 className="text-xl font-bold text-gray-900">4. Contacting Privacy Support</h2>
            <p>
              If you have any questions regarding your data or wish to request data deletion, contact our support team at support@fixkar.pk or via our official WhatsApp hotline.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
