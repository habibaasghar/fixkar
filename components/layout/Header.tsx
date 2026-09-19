"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/constants";
import { cities } from "@/lib/services";
import { IconMapPin, IconChevron, IconMenu, IconPhone } from "@/components/icons";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        {/* Brand & City Dropdown */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center gap-1.5 text-xl sm:text-2xl font-extrabold tracking-tight text-blue-600">
            {BRAND_NAME}
          </Link>

          {/* City Selector */}
          <div className="relative hidden sm:block">
            <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-blue-300 transition cursor-pointer">
              <IconMapPin size={14} className="text-blue-600" />
              <span>{selectedCity.name}</span>
              <IconChevron size={12} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
          <Link href="/services" className="hover:text-blue-600 transition">
            Services
          </Link>
          <Link href="/how-it-works" className="hover:text-blue-600 transition">
            How It Works
          </Link>
          <Link href="/trust-safety" className="hover:text-blue-600 transition">
            Trust & Safety
          </Link>
          <Link href="/partner" className="hover:text-blue-600 transition">
            Become a Partner
          </Link>
          <Link href="/faq" className="hover:text-blue-600 transition">
            FAQ
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link href="/request">
            <Button variant="primary" size="sm" className="hidden sm:inline-flex">
              Book Service
            </Button>
          </Link>
          <a href="tel:+923064222367" className="inline-flex items-center gap-1.5 px-2 py-2.5 -mr-2 text-xs font-bold text-gray-700 sm:hidden">
            <IconPhone size={14} className="text-blue-600" />
            <span>Call</span>
          </a>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 md:hidden rounded-lg hover:bg-gray-100"
            aria-label="Toggle navigation menu"
          >
            <IconMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Menu">
        <div className="flex flex-col space-y-4">
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs font-bold text-blue-700">Selected City</p>
            <div className="mt-1 flex items-center justify-between text-sm font-semibold text-gray-900">
              <span className="flex items-center gap-2">
                <IconMapPin size={16} className="text-blue-600" /> {selectedCity.name}
              </span>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-3 pt-2 text-base font-semibold text-gray-800">
            <Link href="/" onClick={() => setIsDrawerOpen(false)} className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/services" onClick={() => setIsDrawerOpen(false)} className="hover:text-blue-600">
              All Services
            </Link>
            <Link href="/how-it-works" onClick={() => setIsDrawerOpen(false)} className="hover:text-blue-600">
              How It Works
            </Link>
            <Link href="/trust-safety" onClick={() => setIsDrawerOpen(false)} className="hover:text-blue-600">
              Trust & Guarantee
            </Link>
            <Link href="/partner" onClick={() => setIsDrawerOpen(false)} className="hover:text-blue-600">
              Become a Partner
            </Link>
            <Link href="/about" onClick={() => setIsDrawerOpen(false)} className="hover:text-blue-600">
              About FixKar.pk
            </Link>
            <Link href="/faq" onClick={() => setIsDrawerOpen(false)} className="hover:text-blue-600">
              FAQ
            </Link>
            <Link href="/contact" onClick={() => setIsDrawerOpen(false)} className="hover:text-blue-600">
              Contact Us
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Link href="/request" onClick={() => setIsDrawerOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Book a Service Now
              </Button>
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
