"use client";

import React from "react";
import { IconMapPin } from "@/components/icons";
import { Input } from "./Input";
import { Button } from "./Button";

export function ComingSoonState({ cityName }: { cityName: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4">
        <IconMapPin size={28} />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
        Expanding Soon
      </span>
      <h2 className="text-2xl font-extrabold text-gray-900">
        FixKar.pk is coming to {cityName}!
      </h2>
      <p className="mt-2 text-sm text-gray-600 max-w-md">
        We are carefully screening and onboarding trusted electricians, plumbers, and technicians in {cityName}.
        Leave your mobile number to join the waitlist and get Rs. 500 off your very first service booking.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Thank you! We will notify you when FixKar launches in ${cityName}.`);
        }}
        className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md"
      >
        <Input
          placeholder="03XX-XXXXXXX"
          type="tel"
          required
          className="flex-1"
        />
        <Button type="submit" variant="primary" className="shrink-0">
          Join Waitlist
        </Button>
      </form>
    </div>
  );
}
