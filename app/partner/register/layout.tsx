import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Register as a Service Partner | ${BRAND_NAME}`,
  description:
    "Sign up as a FixKar.pk service partner in Lahore — submit your CNIC, category, and experience to start receiving customer leads.",
  alternates: {
    canonical: "/partner/register",
  },
};

export default function PartnerRegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
