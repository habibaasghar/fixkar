import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helpText, id, required, rows = 4, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-semibold text-gray-800">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          required={required}
          className={cn(
            "w-full px-4 py-3 text-sm rounded-xl border bg-white text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-400 disabled:bg-gray-100",
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs font-medium text-red-600">{error}</p>
        ) : helpText ? (
          <p className="text-xs text-gray-500">{helpText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
