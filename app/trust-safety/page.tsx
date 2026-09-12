import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { TrustPoint } from "@/components/domain/TrustPoint";
import { Badge } from "@/components/ui/Badge";
import { BRAND_NAME } from "@/lib/constants";
import { IconShield, IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: `Trust, Safety & Guarantee | ${BRAND_NAME}`,
  description:
    "Discover how FixKar.pk verifies service providers with CNIC checks, NADRA verification, police background certificates, and 7-day workmanship guarantees.",
  alternates: {
    canonical: "/trust-safety",
  },
};

export default function TrustSafetyPage() {
  return (
    <div>
      <PageHeader
        title="Trust, Safety & 7-Day Guarantee"
        subtitle={`Your safety and satisfaction are the non-negotiable core of ${BRAND_NAME}. Here is how we protect every homeowner.`}
      />

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* The 7-Day FixKar Guarantee */}
            <div className="rounded-3xl border border-blue-200 bg-blue-50/60 p-8 sm:p-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                  <IconShield size={28} />
                </div>
                <div>
                  <Badge variant="brand">Platform Policy</Badge>
                  <h2 className="text-2xl font-extrabold text-gray-900">The 7-Day FixKar Guarantee</h2>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                If the technical issue recurs within <strong>7 days</strong> of an on-platform completed booking, {BRAND_NAME} will re-dispatch a technician to inspect and resolve the problem at <strong>zero additional service cost</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-gray-800">
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-blue-100">
                  <IconCheck className="text-green-600" size={18} />
                  <span>Free Re-Inspection Guarantee</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-blue-100">
                  <IconCheck className="text-green-600" size={18} />
                  <span>Property Damage Protection Cover</span>
                </div>
              </div>
            </div>

            {/* Verification Tiers Breakdown */}
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-gray-900 text-center">
                Our Two-Tier Fixer Verification Process
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tier 1 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="brand">Tier 1</Badge>
                    <span className="text-xs font-bold text-gray-500">Entry Level</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900">CNIC Verified</h3>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span> NADRA CNIC document check (Front/Back)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span> Active mobile number registered under same CNIC
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600 font-bold">✓</span> Two physical community character references verified
                    </li>
                  </ul>
                </div>

                {/* Tier 2 */}
                <div className="rounded-2xl border border-blue-200 bg-blue-50/30 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="success">Tier 2</Badge>
                    <span className="text-xs font-bold text-green-700">Premium Pro</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900">Master Fixer</h3>
                  <ul className="space-y-2 text-xs text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span> All Tier 1 verification requirements
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span> Police Character Certificate (Pak Identity verified)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span> Physical shop/residential audit by FixKar team
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span> Minimum 20 clean completed jobs with &ge; 4.8 rating
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Zero Upfront Risk */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TrustPoint
                icon="phone"
                title="Pay After Service"
                text="Never pay in advance. Pay cash or JazzCash/EasyPaisa only after inspecting the work."
              />
              <TrustPoint
                icon="clock"
                title="Direct Escalations"
                text="Unsatisfied with a technician? Contact support immediately for instant resolution."
              />
              <TrustPoint
                icon="check"
                title="Blacklisting Policy"
                text="Strict strike system: any misconduct or bypass attempt results in permanent CNIC blacklisting."
              />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
