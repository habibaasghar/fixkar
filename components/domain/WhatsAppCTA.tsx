import React from "react";
import { IconWhatsApp } from "@/components/icons";
import { whatsappUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function WhatsAppCTA({
  message,
  label = "Book via WhatsApp",
  size = "md",
  className = "",
}: {
  message: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      <Button
        variant="whatsapp"
        size={size}
        leftIcon={<IconWhatsApp size={size === "lg" ? 22 : 18} />}
        className={className}
      >
        {label}
      </Button>
    </a>
  );
}
