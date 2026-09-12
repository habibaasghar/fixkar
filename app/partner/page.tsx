import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { TrustPoint } from "@/components/domain/TrustPoint";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Join as a Service Partner | ${BRAND_NAME}`,
  description:
    "Grow your handyman business in Lahore. Join FixKar.pk as a verified electrician, plumber, AC technician, cleaner, or painter. Daily leads, full earnings.",
  alternates: {
    canonical: "/partner",
  },
};

export default function PartnerPage() {
  return (
    <div>
      <PageHeader
        title={`Join ${BRAND_NAME} as a Verified Service Partner`}
        subtitle="Get a steady stream of high-quality customer leads in DHA, Gulberg, Johar Town, and across Lahore."
      />

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Value Proposition Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <TrustPoint
                icon="phone"
                title="Steady Customer Leads"
                text="No more waiting at local markets. Get instant job alerts sent straight to your phone."
              />
              <TrustPoint
                icon="check"
                title="Keep 100% Cash"
                text="Collect payments directly from customers post-service via Cash, EasyPaisa, or JazzCash."
              />
              <TrustPoint
                icon="shield"
                title="Verified Badge Status"
                text="Build your digital reputation with verified badges and authentic customer ratings."
              />
            </div>

            {/* Who Can Join? */}
            <div className="rounded-3xl border border-gray-200 bg-gray-50/60 p-8 space-y-6">
              <h2 className="text-2xl font-extrabold text-gray-900 text-center">
                Who Can Apply?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-gray-800">
                <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">⚡</span> Electricians & UPS Specialists
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">❄️</span> AC Technicians & Gas Refillers
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">🪠</span> Plumbers & Geyser Experts
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">🧹</span> Deep Cleaning Teams
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">🎨</span> House & Commercial Painters
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-2">
                  <span className="text-blue-600 font-bold">🛠️</span> General Handymen
                </div>
              </div>
            </div>

            {/* Application CTA Box */}
            <div className="rounded-3xl bg-blue-600 p-8 sm:p-10 text-white text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Grow Your Earnings?</h2>
              <p className="text-sm text-blue-100 max-w-xl mx-auto">
                Registration takes only 2 minutes. Submit your CNIC and basic details to get screened by our verification team.
              </p>
              <div className="pt-2">
                <Link href="/partner/register">
                  <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-none">
                    Start Partner Registration
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
