import React from "react";
import { Button } from "./Button";
import { IconWrench } from "@/components/icons";

export function EmptyState({
  title = "No items found",
  description = "There are no records to display at this time.",
  actionLabel,
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-4">
        <IconWrench size={24} />
      </div>
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
