import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { HowItWorksStep } from "@/components/domain/HowItWorksStep";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `How It Works | ${BRAND_NAME}`,
  description:
    "See how FixKar.pk connects homeowners with verified handymen in Lahore in 3 easy steps. Booking, dispatch, payment, and guarantee explained.",
};

export default function HowItWorksPage() {
  return (
    <div>
      <PageHeader
        title={`How ${BRAND_NAME} Works`}
        subtitle="Simple, fast, and secure home service booking for Pakistani households."
      />

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Customer Flow */}
            <div className="space-y-8">
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  For Customers
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Getting Your Home Fixed in 3 Steps
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <HowItWorksStep
                  stepNumber={1}
                  title="Request Service"
                  description="Choose your category (AC, Electrician, Plumber, Cleaner, Painter) and book over WhatsApp or via our web form."
                />
                <HowItWorksStep
                  stepNumber={2}
                  title="Technician Dispatched"
                  description="We match your booking with a nearby CNIC-verified fixer who confirms arrival time and estimated market rates."
                />
                <HowItWorksStep
                  stepNumber={3}
                  title="Inspect & Pay"
                  description="After work is completed, inspect the repair and pay directly via Cash, JazzCash, or EasyPaisa."
                />
              </div>

              <div className="flex justify-center pt-4">
                <WhatsAppCTA
                  message="Hi FixKar, I would like to book a service."
                  label="Book Your First Service Now"
                  size="lg"
                />
              </div>
            </div>

            {/* Vendor / Partner Flow */}
            <div className="pt-12 border-t border-gray-200 space-y-8">
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full">
                  For Technicians & Handymen
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900">
                  How Service Providers Earn on {BRAND_NAME}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <HowItWorksStep
                  stepNumber={1}
                  title="Submit Verification"
                  description="Submit your CNIC, selfie, mobile number, and local references through our partner registration portal."
                />
                <HowItWorksStep
                  stepNumber={2}
                  title="Receive Nearby Leads"
                  description="Once approved, receive instant alerts for job bookings in DHA, Gulberg, Johar Town, and nearby Lahore areas."
                />
                <HowItWorksStep
                  stepNumber={3}
                  title="Keep 100% Cash Earnings"
                  description="Collect payment directly from customers. Platform fees or flat lead fees are settled seamlessly via prepaid wallet."
                />
              </div>

              <div className="flex justify-center pt-4">
                <Link href="/partner">
                  <Button variant="secondary" size="lg">
                    Learn More About Joining as a Partner
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
