import React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  background = "white",
  children,
}: {
  className?: string;
  background?: "white" | "subtle" | "brand";
  children: React.ReactNode;
}) {
  const bgStyles = {
    white: "bg-white",
    subtle: "bg-gray-50/80 border-y border-gray-100",
    brand: "bg-blue-600 text-white",
  }[background];

  return (
    <section className={cn("py-12 sm:py-16 md:py-20", bgStyles, className)}>
      {children}
    </section>
  );
}

export function PageHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("py-8 sm:py-12 text-center max-w-3xl mx-auto space-y-3", className)}>
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h1>
      {subtitle && <p className="text-base text-gray-600 leading-relaxed">{subtitle}</p>}
    </div>
  );
}
