"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IconMapPin, IconSearch, IconChevron, IconWhatsApp } from "@/components/icons";
import { allLocations } from "@/lib/allCities";
import { whatsappUrl } from "@/lib/utils";

export function LocationSelector({
  variant = "desktop",
  className = "",
}: {
  variant?: "desktop" | "mobile";
  className?: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return allLocations;
    return allLocations.filter((loc) => loc.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  function handleSelect(name: string, citySlug?: string) {
    setSelectedName(name);
    if (citySlug) {
      setIsOpen(false);
      router.push(`/${citySlug}`);
    }
    // Cities without a real page stay open, showing the WhatsApp fallback below.
  }

  const selectedIsReal = selectedName ? allLocations.find((l) => l.name === selectedName)?.citySlug : undefined;

  const trigger =
    variant === "desktop" ? (
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-primary-hover transition ${className}`}
      >
        <IconMapPin size={14} className="text-primary" />
        <span>{selectedName ?? "Select Location"}</span>
        <IconChevron size={12} className="text-gray-400" />
      </button>
    ) : (
      <button
        onClick={() => setIsOpen(true)}
        className={`flex w-full items-center justify-between rounded-xl bg-primary-light border border-primary-subtle p-3 text-left ${className}`}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <IconMapPin size={16} className="text-primary" />
          {selectedName ?? "Select Your Location"}
        </span>
        <IconChevron size={14} className="text-primary-hover" />
      </button>
    );

  return (
    <>
      {trigger}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Select Your Location">
        <div className="space-y-4">
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <IconSearch size={16} />
            </span>
            <Input
              aria-label="Search cities"
              placeholder="Search your city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="max-h-72 overflow-y-auto -mx-2 px-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filtered.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => handleSelect(loc.name, loc.citySlug)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition ${
                    selectedName === loc.name
                      ? "border-primary bg-primary-light text-primary-hover"
                      : "border-gray-200 text-gray-700 hover:border-primary-hover hover:bg-primary-light"
                  }`}
                >
                  {loc.name}
                </button>
              ))}
            </div>
          </div>

          {selectedName && !selectedIsReal && (
            <div className="rounded-xl border border-secondary-subtle bg-secondary-light p-4 space-y-2">
              <p className="text-sm font-semibold text-gray-900">
                Tell us what you need in {selectedName}
              </p>
              <p className="text-xs text-gray-600">
                Message us on WhatsApp with your city and requirement — we&apos;ll see what we can arrange.
              </p>
              <a
                href={whatsappUrl(`Hi FixKar, I need a home service in ${selectedName}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="whatsapp" size="sm" leftIcon={<IconWhatsApp size={16} />}>
                  WhatsApp FixKar
                </Button>
              </a>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
