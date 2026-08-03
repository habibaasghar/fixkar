import React from "react";
import { cn } from "@/lib/utils";

export function SkeletonLine({ className }: { className?: string }) {
  return <div className={cn("h-4 rounded-md animate-shimmer", className)} />;
}

export function SkeletonCircle({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("rounded-full animate-shimmer shrink-0", className)}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-gray-200 bg-white p-6 space-y-4", className)}>
      <SkeletonLine className="w-1/3 h-5" />
      <SkeletonLine className="w-3/4 h-4" />
      <SkeletonLine className="w-1/2 h-4" />
    </div>
  );
}
