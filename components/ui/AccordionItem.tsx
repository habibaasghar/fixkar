"use client";

import React from "react";
import { IconChevron } from "@/components/icons";

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const panelId = React.useId();

  return (
    <div className="border-b border-gray-200 py-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between text-left font-semibold text-gray-900 py-3 min-h-11 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="text-base">{title}</span>
        <IconChevron size={18} direction={isOpen ? "up" : "down"} className="text-gray-500 shrink-0 ml-4" />
      </button>
      {isOpen && <div id={panelId} role="region" className="mt-3 text-sm leading-relaxed text-gray-600">{children}</div>}
    </div>
  );
}
