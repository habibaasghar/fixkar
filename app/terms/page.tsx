import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms of Service & 7-Day Guarantee Rules | ${BRAND_NAME}`,
  description: `Terms and conditions governing home service bookings, payment rules, and the 7-day workmanship warranty on ${BRAND_NAME}.`,
};

export default function TermsPage() {
  return (
    <div>
      <PageHeader
        title="Terms of Service"
        subtitle={`Platform terms, cancellation guidelines, and 7-day warranty rules for ${BRAND_NAME}.`}
      />

      <Section background="white">
        <Container>
          <div className="max-w-3xl mx-auto prose sm:prose-lg text-gray-700 leading-relaxed space-y-6 text-sm sm:text-base">
            <h2 className="text-xl font-bold text-gray-900">1. Platform Service Nature</h2>
            <p>
              {BRAND_NAME} operates as an online marketplace connecting independent verified service providers (&quot;Fixers&quot;) with residential and commercial customers. Customers pay service providers directly post-completion via Cash, JazzCash, or EasyPaisa.
            </p>

            <h2 className="text-xl font-bold text-gray-900">2. The 7-Day FixKar Guarantee Rules</h2>
            <p>
              Every completed booking logged through {BRAND_NAME} includes a 7-Day Workmanship Warranty. If the exact technical issue recurs within 7 days, {BRAND_NAME} will dispatch a re-inspection at zero additional platform labor fee. The warranty applies strictly to on-platform logged bookings.
            </p>

            <h2 className="text-xl font-bold text-gray-900">3. Off-Platform Bypass Policy</h2>
            <p>
              To maintain warranty protection and safety guarantees, all work and payments must remain recorded on-platform. Any off-platform private arrangements between clients and technicians void the 7-Day Guarantee and property damage coverage.
            </p>

            <h2 className="text-xl font-bold text-gray-900">4. Cancellations & Conduct</h2>
            <p>
              Customers and service partners are expected to treat each other with mutual respect. Late cancellations (&gt;30 minutes after confirmed dispatch) may incur penalty fees logged against user accounts.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
