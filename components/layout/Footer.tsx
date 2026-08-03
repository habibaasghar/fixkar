import React from "react";
import Link from "next/link";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";
import { categories, cities } from "@/lib/services";

export function Footer() {
  const activeCity = cities[0];

  return (
    <footer className="border-t border-gray-200 bg-gray-50 text-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-blue-600">
              {BRAND_NAME}
            </Link>
            <p className="text-xs leading-relaxed text-gray-500 max-w-xs">
              {BRAND_TAGLINE}. Connecting households with background-verified electricians, plumbers, AC repairmen, cleaners, and painters.
            </p>
            <div className="text-xs text-gray-500">
              <span className="font-bold text-gray-700">Operating City:</span> Lahore (Expanding to Islamabad & Karachi)
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Our Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm font-medium">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${activeCity.slug}/${cat.slug}`}
                    className="hover:text-blue-600 transition"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Areas in Lahore */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Lahore Service Areas
            </h3>
            <ul className="mt-4 space-y-2 text-sm font-medium">
              {activeCity.areas.slice(0, 6).map((area) => (
                <li key={area}>
                  <Link
                    href={`/lahore/ac-repair`}
                    className="hover:text-blue-600 transition"
                  >
                    {area} Lahore
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Company & Legal
            </h3>
            <ul className="mt-4 space-y-2 text-sm font-medium">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/trust-safety" className="hover:text-blue-600 transition">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-blue-600 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-blue-600 transition">
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-600 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <p>Built for Pakistan with zero-trust background verification.</p>
        </div>
      </div>
    </footer>
  );
}
