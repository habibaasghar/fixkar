import React from "react";
import { IconCheck } from "@/components/icons";
import { Button } from "./Button";
import Link from "next/link";

export function SuccessState({
  title = "Request Received!",
  description = "Our team will call or WhatsApp you to confirm details.",
  referenceCode,
  homeHref = "/",
}: {
  title?: string;
  description?: string;
  referenceCode?: string;
  homeHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-green-200 bg-green-50/60 text-green-900">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white mb-4 shadow-sm">
        <IconCheck size={28} />
      </div>
      <h3 className="text-xl font-extrabold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 max-w-md">{description}</p>
      {referenceCode && (
        <div className="mt-4 rounded-lg bg-white px-4 py-2 text-xs font-mono text-gray-700 border border-green-200">
          Ref Code: <span className="font-bold text-gray-900">{referenceCode}</span>
        </div>
      )}
      <div className="mt-6">
        <Link href={homeHref}>
          <Button variant="primary" size="md">
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
