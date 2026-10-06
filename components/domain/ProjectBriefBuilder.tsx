"use client";

import React, { useMemo, useState } from "react";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { hubServices } from "@/lib/servicesHub";
import { allLocations } from "@/lib/allCities";

const jobTypes = [
  "Repair",
  "Installation",
  "Replacement",
  "Renovation",
  "New Construction / Improvement",
  "Maintenance",
  "Not Sure",
];

const serviceOptions = [
  { value: "", label: "Select a service..." },
  ...hubServices.map((s) => ({ value: s.name, label: s.name })),
  { value: "Something else", label: "Something else / Not sure" },
];

const cityOptions = [
  { value: "", label: "Select your city..." },
  ...allLocations.map((loc) => ({ value: loc.name, label: loc.name })),
];

/**
 * Lightweight "tell us what you need" panel — a handful of quick fields
 * that build a clean WhatsApp message, rather than a long multi-page form.
 * No submission to the lead API here: this only composes a WhatsApp link,
 * so there's nothing to validate server-side and no internal contractor
 * detail is ever exposed.
 */
export function ProjectBriefBuilder() {
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [jobType, setJobType] = useState("");
  const [details, setDetails] = useState("");

  const message = useMemo(() => {
    let msg = `Hi FixKar, I need help with ${service || "a home service"}`;
    msg += city ? ` in ${city}.` : ".";
    msg += jobType ? ` My requirement is ${jobType.toLowerCase()}.` : "";
    msg += details.trim() ? ` Details: ${details.trim()}` : "";
    return msg;
  }, [service, city, jobType, details]);

  const canSend = service.trim().length > 0 && city.trim().length > 0;

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
      <Select
        label="What type of work do you need?"
        options={serviceOptions}
        value={service}
        onChange={(e) => setService(e.target.value)}
      />

      <Select
        label="Which city?"
        options={cityOptions}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-800">What best describes the job?</label>
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              type="button"
              aria-pressed={jobType === type}
              onClick={() => setJobType((current) => (current === type ? "" : type))}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                jobType === type
                  ? "border-primary bg-primary-light text-primary-hover"
                  : "border-gray-200 text-gray-600 hover:border-primary-hover"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <Textarea
        label="Tell us more"
        placeholder="Describe what you need done..."
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        rows={3}
      />

      <div>
        {canSend ? (
          <WhatsAppCTA message={message} label="WhatsApp FixKar" size="lg" className="w-full sm:w-auto" />
        ) : (
          <p className="text-xs text-gray-500">
            Select a service and city to continue — we&apos;ll put together your WhatsApp message automatically.
          </p>
        )}
      </div>
    </div>
  );
}
