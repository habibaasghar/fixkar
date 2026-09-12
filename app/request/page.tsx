import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { LeadForm } from "@/components/domain/LeadForm";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { BRAND_NAME } from "@/lib/constants";
import { cities } from "@/lib/services";

export const metadata: Metadata = {
  title: `Request a Service | ${BRAND_NAME}`,
  description:
    "Request an electrician, plumber, AC repair, cleaning, sofa & carpet cleaning, or painter in Lahore. Fast response via phone or WhatsApp within 15 minutes.",
  alternates: {
    canonical: "/request",
  },
};

export default function RequestServicePage() {
  const activeCity = cities[0];

  return (
    <div>
      <PageHeader
        title="Request a Home Service"
        subtitle="Fill out the form below or message us directly on WhatsApp to get connected with a background-verified handyman in Lahore."
      />

      <Section background="white">
        <Container>
          <div className="max-w-xl mx-auto space-y-8">
            <LeadForm city={activeCity} service="general-request" />

            <div className="text-center pt-4 border-t border-gray-100 space-y-3">
              <p className="text-xs text-gray-500 font-medium">Prefer instant messaging over WhatsApp?</p>
              <div className="flex justify-center">
                <WhatsAppCTA message="Hi FixKar, I need a service request booked." />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
