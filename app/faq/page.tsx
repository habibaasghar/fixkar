import type { Metadata } from "next";
import { Container, Section, PageHeader } from "@/components/layout/Container";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${BRAND_NAME}`,
  description:
    "Find answers to common questions about booking home services, CNIC verification, 7-day guarantee, rates, and cash payment on FixKar.pk.",
};

const faqs = [
  {
    question: "How does FixKar.pk verify technicians?",
    answer:
      "Every service provider on FixKar.pk passes a multi-step check including NADRA CNIC document verification, mobile identity confirmation, local character references, and for Master Fixers, a Police Character Certificate + physical shop/home audit.",
  },
  {
    question: "Do I have to pay anything upfront?",
    answer:
      "No. FixKar.pk operates on a strict pay-after-service model. You inspect the completed job first and then pay cash, JazzCash, or EasyPaisa directly to the technician.",
  },
  {
    question: "What is the 7-Day FixKar Guarantee?",
    answer:
      "If the exact technical fault recurs within 7 days of an on-platform booking, we will re-dispatch a technician to inspect and fix the issue at no additional service cost.",
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
      "Yes. You can message us on WhatsApp anytime for fast dispatch within 15 minutes across our active Lahore service zones.",
  },
];

export default function FAQPage() {
  return (
    <div>
      <FAQSchema faqs={faqs} />

      <PageHeader
        title="Frequently Asked Questions"
        subtitle={`Everything you need to know about booking, payments, verification, and guarantees on ${BRAND_NAME}.`}
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
