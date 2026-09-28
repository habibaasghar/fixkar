"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/constants";
import { IconMenu, IconPhone } from "@/components/icons";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { LocationSelector } from "@/components/domain/LocationSelector";

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        {/* Brand & City Selector */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center gap-1.5 text-xl sm:text-2xl font-extrabold tracking-tight text-primary">
            {BRAND_NAME}
          </Link>

          <div className="hidden sm:block">
            <LocationSelector variant="desktop" />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
          <Link href="/services" className="hover:text-primary transition">
            Services
          </Link>
          <Link href="/how-it-works" className="hover:text-primary transition">
            How It Works
          </Link>
          <Link href="/trust-safety" className="hover:text-primary transition">
            Trust & Safety
          </Link>
          <Link href="/partner" className="hover:text-primary transition">
            Become a Partner
          </Link>
          <Link href="/faq" className="hover:text-primary transition">
            FAQ
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link href="/request">
            <Button variant="primary" size="sm" className="hidden sm:inline-flex">
              Get a Quote
            </Button>
          </Link>
          <a href="tel:+923064222367" className="inline-flex items-center gap-1.5 px-2 py-2.5 -mr-2 text-xs font-bold text-gray-700 sm:hidden">
            <IconPhone size={14} className="text-primary" />
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
          <LocationSelector variant="mobile" />

          <div className="flex flex-col space-y-3 pt-2 text-base font-semibold text-gray-800">
            <Link href="/" onClick={() => setIsDrawerOpen(false)} className="hover:text-primary">
              Home
            </Link>
            <Link href="/services" onClick={() => setIsDrawerOpen(false)} className="hover:text-primary">
              All Services
            </Link>
            <Link href="/how-it-works" onClick={() => setIsDrawerOpen(false)} className="hover:text-primary">
              How It Works
            </Link>
            <Link href="/trust-safety" onClick={() => setIsDrawerOpen(false)} className="hover:text-primary">
              Trust & Safety
            </Link>
            <Link href="/partner" onClick={() => setIsDrawerOpen(false)} className="hover:text-primary">
              Become a Partner
            </Link>
            <Link href="/about" onClick={() => setIsDrawerOpen(false)} className="hover:text-primary">
              About FixKar.pk
            </Link>
            <Link href="/faq" onClick={() => setIsDrawerOpen(false)} className="hover:text-primary">
              FAQ
            </Link>
            <Link href="/contact" onClick={() => setIsDrawerOpen(false)} className="hover:text-primary">
              Contact Us
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Link href="/request" onClick={() => setIsDrawerOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
