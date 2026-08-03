import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SuccessState } from "@/components/ui/SuccessState";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Thank You | ${BRAND_NAME}`,
  description: "Thank you for requesting a home service with FixKar.pk.",
};

export default function ThankYouPage() {
  return (
    <Container className="py-16 sm:py-24">
      <SuccessState
        title="Thank You for Choosing FixKar.pk!"
        description="Your service inquiry has been logged. Our dispatch coordinator in Lahore will contact you via WhatsApp or phone call within 15 minutes."
        homeHref="/"
      />
    </Container>
  );
}
