import React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants: Record<ButtonVariant, string> = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600 shadow-sm",
      secondary: "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-blue-600 shadow-sm",
      ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400",
      whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe57] focus:ring-[#25D366] shadow-sm",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-sm",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "h-9 px-3.5 text-xs gap-1.5 min-h-[36px]",
      md: "h-11 px-5 text-sm gap-2 min-h-[44px]",
      lg: "h-13 px-7 text-base gap-2.5 min-h-[52px]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Spinner size="sm" className="mr-2" />
        ) : leftIcon ? (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
