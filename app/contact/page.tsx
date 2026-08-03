import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { WhatsAppCTA } from "@/components/domain/WhatsAppCTA";
import { LeadForm } from "@/components/domain/LeadForm";
import { BRAND_NAME, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { cities } from "@/lib/services";
import { IconPhone, IconMapPin, IconWhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: `Contact Support | ${BRAND_NAME}`,
  description:
    "Need help or have questions about home services in Lahore? Contact FixKar.pk via WhatsApp or request a callback.",
};

export default function ContactPage() {
  const activeCity = cities[0];

  return (
    <div>
      <PageHeader
        title="Contact FixKar.pk Support"
        subtitle="Our team is available 7 days a week to help with your home service bookings, feedback, or partner inquiries."
      />

      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Channels */}
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-gray-900">Get in Touch</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                For fastest response, reach out via WhatsApp. You can also fill out the callback form and our operations team will contact you shortly.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                    <IconWhatsApp size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">WhatsApp Hotline</h3>
                    <p className="text-xs text-gray-500">Fastest response for instant bookings & support</p>
                    <div className="mt-2">
                      <WhatsAppCTA
                        message="Hi FixKar support, I need assistance."
                        label="Chat on WhatsApp"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <IconPhone size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Phone Support</h3>
                    <p className="text-xs text-gray-500">9:00 AM – 9:00 PM, 7 days a week</p>
                    <a
                      href={`tel:+${DEFAULT_WHATSAPP_NUMBER}`}
                      className="mt-1 inline-block text-sm font-bold text-blue-600 hover:underline"
                    >
                      +{DEFAULT_WHATSAPP_NUMBER}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-200 text-gray-700">
                    <IconMapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Operating Region</h3>
                    <p className="text-xs text-gray-500">
                      Lahore, Punjab, Pakistan (DHA, Gulberg, Johar Town, Model Town, Bahria Town & nearby areas)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Callback Lead Form */}
            <div>
              <LeadForm city={activeCity} service="contact-inquiry" />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
