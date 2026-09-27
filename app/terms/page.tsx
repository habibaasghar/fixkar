import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms of Service | ${BRAND_NAME}`,
  description: `Terms and conditions governing how ${BRAND_NAME} connects customers with independent vendor partners.`,
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div>
      <PageHeader
        title="Terms of Service"
        subtitle={`Platform terms and how ${BRAND_NAME} connects you with vendor partners.`}
      />

      <Section background="white">
        <Container>
          <div className="max-w-3xl mx-auto prose sm:prose-lg text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base">
            <h2 className="text-xl font-bold text-gray-900">1. Platform Service Nature</h2>
            <p>
              {BRAND_NAME} operates as an online service that connects customers with independent vendor partners (&quot;vendors&quot;) for home services. {BRAND_NAME} does not employ vendors and is not the party performing the work. Customers pay vendors directly for completed work via Cash, JazzCash, or EasyPaisa — {BRAND_NAME} does not collect or hold customer payments.
            </p>

            <h2 className="text-xl font-bold text-gray-900">2. Workmanship Warranty</h2>
            <p>
              Any workmanship warranty on completed work is provided directly by the vendor who performed the job. Warranty terms vary by vendor and service category — ask the vendor about their specific terms before the job begins. {BRAND_NAME} does not itself provide an independent guarantee on work performed by vendors.
            </p>

            <h2 className="text-xl font-bold text-gray-900">3. Quotes & Confirmation</h2>
            <p>
              {BRAND_NAME} relays a quotation from a vendor partner for your specific job. Pricing is confirmed with the vendor before you commit. Once you confirm, {BRAND_NAME} connects you with the vendor to finalize scheduling and any remaining details directly.
            </p>

            <h2 className="text-xl font-bold text-gray-900">4. Cancellations & Conduct</h2>
            <p>
              Customers and vendor partners are expected to treat each other with mutual respect. If you need to cancel or reschedule a confirmed job, please let us know as early as possible so we can inform the vendor.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
