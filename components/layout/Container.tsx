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
  ...props
}: {
  className?: string;
  background?: "white" | "subtle" | "brand" | "secondary";
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const bgStyles = {
    white: "bg-white",
    subtle: "bg-surface-subtle border-y border-gray-100",
    brand: "bg-primary text-white",
    secondary: "bg-secondary text-white",
  }[background];

  return (
    <section className={cn("py-12 sm:py-16 md:py-20", bgStyles, className)} {...props}>
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
