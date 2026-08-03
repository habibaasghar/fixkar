"use client";

import React, { useState } from "react";
import type { City } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { SuccessState } from "@/components/ui/SuccessState";
import { Card } from "@/components/ui/Card";

export function LeadForm({
  city,
  service,
}: {
  city: City;
  service: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState(city.areas[0] ?? "");
  const [refCode, setRefCode] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, city: city.slug, service, area }),
      });
      if (!res.ok) throw new Error("failed");

      const generatedRef = `FK-${Math.floor(1000 + Math.random() * 9000)}`;
      setRefCode(generatedRef);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <SuccessState
        title={`Thank You, ${name}!`}
        description="We've successfully received your request. A verified team member will call or WhatsApp you within 15 minutes to confirm details."
        referenceCode={refCode}
      />
    );
  }

  const areaOptions = city.areas.map((a) => ({
    value: a,
    label: `${a}, ${city.name}`,
  }));

  return (
    <Card className="max-w-md mx-auto">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-gray-900">Request a Verified Pro</h3>
        <p className="text-xs text-gray-500">
          Leave your details below. We&apos;ll only call to coordinate your service, and you pay nothing upfront.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <Input
          label="Your Full Name"
          placeholder="e.g., Usman Ali"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Mobile / WhatsApp Number"
          placeholder="03XX-XXXXXXX"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {areaOptions.length > 0 && (
          <Select
            label="Your Area / Neighborhood"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            options={areaOptions}
          />
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={status === "loading"}
        >
          Find a Fixer Now
        </Button>

        {status === "error" && (
          <p className="text-xs font-semibold text-center text-red-600">
            Failed to send. Please try again or chat via WhatsApp.
          </p>
        )}
      </form>
    </Card>
  );
}
