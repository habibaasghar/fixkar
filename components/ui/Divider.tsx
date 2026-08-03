import React from "react";
import { cn } from "@/lib/utils";

export function Divider({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  if (orientation === "vertical") {
    return <div className={cn("w-px bg-gray-200 self-stretch", className)} />;
  }
  return <hr className={cn("w-full border-t border-gray-200 my-4", className)} />;
}
