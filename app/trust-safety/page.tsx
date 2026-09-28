import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { TrustPoint } from "@/components/domain/TrustPoint";
import { Badge } from "@/components/ui/Badge";
import { BRAND_NAME } from "@/lib/constants";
import { IconShield, IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: `Trust & Safety | ${BRAND_NAME}`,
  description:
    "Learn how FixKar.pk vets vendor partners and what to expect on pricing, payment, and warranty.",
  alternates: {
    canonical: "/trust-safety",
  },
};

export default function TrustSafetyPage() {
  return (
    <div>
      <PageHeader
        title="Trust & Safety"
        subtitle={`Your safety and satisfaction matter to us. Here's exactly how ${BRAND_NAME} works.`}
      />

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Quality issues */}
            <div className="rounded-3xl border border-primary-subtle bg-primary-light/60 p-8 sm:p-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                  <IconShield size={28} />
                </div>
                <div>
                  <Badge variant="brand">Platform Policy</Badge>
                  <h2 className="text-2xl font-extrabold text-gray-900">If Something Goes Wrong</h2>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Contact us if you&apos;re not satisfied with a completed job. We&apos;ll follow up directly with the vendor partner who did the work. Any workmanship warranty is provided by that vendor — terms vary by vendor and service, so ask about them when you get your quote.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-gray-800">
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-primary-subtle">
                  <IconCheck className="text-green-600" size={18} />
                  <span>We Follow Up on Complaints</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-primary-subtle">
                  <IconCheck className="text-green-600" size={18} />
                  <span>Vendor-Provided Workmanship Warranty</span>
                </div>
              </div>
            </div>

            {/* How we vet vendor partners */}
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-gray-900 text-center">
                How We Vet Vendor Partners
              </h2>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4 max-w-2xl mx-auto">
                <div className="flex items-center justify-between">
                  <Badge variant="brand">Vetted Partner</Badge>
                  <span className="text-xs font-bold text-gray-500">Every vendor we connect you with</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Personally introduced to and spoken with by our team
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Confirmed trade, service area, and pricing before the first job
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Followed up with customers after jobs to check on quality
                  </li>
                </ul>
              </div>
            </div>

            {/* Zero Upfront Risk */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TrustPoint
                icon="phone"
                title="Pay After Service"
                text="Never pay in advance. Pay cash or JazzCash/EasyPaisa directly to the vendor only after inspecting the work."
              />
              <TrustPoint
                icon="clock"
                title="Direct Escalations"
                text="Unsatisfied with a job? Contact us and we'll follow up with the vendor partner on your behalf."
              />
              <TrustPoint
                icon="check"
                title="Standards Matter"
                text="Vendors who don't meet our standards or treat customers poorly stop getting connected with new customers."
              />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
