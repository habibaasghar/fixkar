import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ className, hoverable = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200",
        hoverable && "hover:border-primary-subtle hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
