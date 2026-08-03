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
      className="fixed bottom-20 right-5 md:bottom-6 md:right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105 hover:bg-[#1ebe57]"
    >
      <IconWhatsApp size={28} />
    </a>
  );
}
