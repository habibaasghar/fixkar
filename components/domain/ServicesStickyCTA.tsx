"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IconWhatsApp } from "@/components/icons";
import { whatsappUrl } from "@/lib/utils";

/**
 * Mobile-only quick actions for the services hub. Sits just above the global
 * bottom nav (which is h-16), so the layout's existing `pb-16` still applies.
 * Appears only after the hero (which has its own CTAs) has scrolled away, so
 * the two never duplicate each other on screen.
 */
export function ServicesStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-16 z-30 flex transition-transform duration-200 ${show ? "translate-y-0" : "pointer-events-none translate-y-[200%]"} gap-2 border-t border-gray-200 bg-white/95 px-3 py-2 backdrop-blur md:hidden`}>
      <Link
        href="/request"
        tabIndex={show ? 0 : -1}
        className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Get a Service Quote
      </Link>
      <a
        href={whatsappUrl("Hi FixKar, I need help finding the right service.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with FixKar on WhatsApp"
        tabIndex={show ? 0 : -1}
        className="flex min-h-12 min-w-12 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-4 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]"
      >
        <IconWhatsApp size={20} /> WhatsApp
      </a>
    </div>
  );
}
