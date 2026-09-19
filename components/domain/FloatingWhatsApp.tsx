import React from "react";
import { IconWhatsApp } from "@/components/icons";
import { whatsappUrl } from "@/lib/utils";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl("Hi, I need a home service booked in Lahore.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with FixKar on WhatsApp"
      // Mobile already has a WhatsApp/emergency shortcut in the bottom nav
      // (MobileNav's "Emergency" tab) — showing this floating button too
      // overlapped both that nav and page content on small screens. Desktop
      // has no equivalent, so it stays there.
      className="fixed hidden md:flex md:bottom-6 md:right-6 z-40 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105 hover:bg-[#1ebe57]"
    >
      <IconWhatsApp size={28} />
    </a>
  );
}
