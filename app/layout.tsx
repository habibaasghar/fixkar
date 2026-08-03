import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { FloatingWhatsApp } from "@/components/domain/FloatingWhatsApp";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { BRAND_NAME, BRAND_TAGLINE, BRAND_URL, DEFAULT_OG_IMAGE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BRAND_URL),
  title: {
    template: `%s | ${BRAND_NAME}`,
    default: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
  },
  description:
    "Book background-checked electricians, plumbers, AC technicians, deep cleaning teams, and house painters in Lahore. Transparent pricing, pay after service.",
  keywords: [
    "home services Pakistan",
    "electrician Lahore",
    "plumber Lahore",
    "AC repair Lahore",
    "cleaning service Lahore",
    "painter Lahore",
    "handyman Lahore",
    "FixKar",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: BRAND_URL,
    title: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
    description: "Reliable home repairs by CNIC-verified professionals in Lahore. No advance payments—pay only when the job is done.",
    siteName: BRAND_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} Open Graph Image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
    description: "Reliable home repairs by CNIC-verified professionals in Lahore. No advance payments—pay only when the job is done.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans pb-16 md:pb-0">
        <OrganizationSchema />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
