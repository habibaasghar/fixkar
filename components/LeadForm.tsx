"use client";

import { useState } from "react";
import type { City } from "@/lib/services";

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
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
        <p className="font-semibold">Shukriya, {name}!</p>
        <p className="mt-1 text-sm">
          Aapki request mil gayi hai. Hamari team jald hi aapko call/WhatsApp
          karegi.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
    >
      <h3 className="text-lg font-bold text-neutral-900">Free Quote Mangwayein</h3>
      <p className="mt-1 text-sm text-neutral-500">
        Apna number chhodein, ham 15 minute mein contact karenge.
      </p>

      <div className="mt-4 space-y-3">
        <input
          required
          placeholder="Aapka naam"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none"
        />
        <input
          required
          type="tel"
          placeholder="03XX-XXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none"
        />
        {city.areas.length > 0 && (
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none"
          >
            {city.areas.map((a) => (
              <option key={a} value={a}>
                {a}, {city.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {status === "loading" ? "Bhej rahe hain..." : "Quote Mangwayein"}
      </button>

      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">
          Kuch masla hua, dobara try karein ya WhatsApp par contact karein.
        </p>
      )}
    </form>
  );
}
