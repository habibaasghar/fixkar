import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${BRAND_NAME}`,
  description:
    "Find answers to common questions about booking home services, how we vet vendor partners, rates, and cash payment on FixKar.pk.",
  alternates: {
    canonical: "/faq",
  },
};

const faqs = [
  {
    question: "How does FixKar.pk vet its vendor partners?",
    answer:
      "We don't list anonymous strangers. Every vendor partner is someone our team has personally spoken to and confirmed — their trade, service area, and pricing — before we connect them with a customer.",
  },
  {
    question: "Do I have to pay anything upfront?",
    answer:
      "No. FixKar.pk operates on a pay-after-service model. You inspect the completed job first and then pay cash, JazzCash, or EasyPaisa directly to the vendor partner.",
  },
  {
    question: "Is there a warranty on the work?",
    answer:
      "Any workmanship warranty is provided directly by the vendor partner who did the job — the terms vary by service and vendor, so ask about it when you get your quote.",
  },
  {
    question: "Which cities and areas do you cover?",
    answer:
      "We are currently active in Lahore (DHA, Gulberg, Johar Town, Model Town, Bahria Town, Cantt, Iqbal Town, Valencia, and nearby areas). Expansion to Islamabad and Karachi is launching soon.",
  },
  {
    question: "How are prices calculated?",
    answer:
      "Standard services (like AC cleaning or socket installation) have transparent base rates listed on our category pages. For complex tasks, the technician inspects the job and provides a quote before commencing work.",
  },
  {
    question: "Can I book emergency electrical or plumbing repairs?",
    answer:
      "Yes. Message us on WhatsApp anytime and we'll get back to you with a confirmed vendor partner and quote, typically within the hour during business hours, across our active Lahore service zones.",
  },
];

export default function FAQPage() {
  return (
    <div>
      <FAQSchema faqs={faqs} />

      <PageHeader
        title="Frequently Asked Questions"
        subtitle={`Everything you need to know about booking, payments, and vendor partners on ${BRAND_NAME}.`}
      />

      <Section background="white">
        <Container>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} title={faq.question} defaultOpen={i === 0}>
                <p>{faq.answer}</p>
              </AccordionItem>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
