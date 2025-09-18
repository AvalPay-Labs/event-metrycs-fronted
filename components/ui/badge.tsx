import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "accent" | "outline" | "success" | "error" | "warning" | "info";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-primary text-text",
      secondary: "bg-secondary text-text",
      accent: "bg-accent text-text",
      outline: "border border-element text-textSecondary",
      success: "bg-success text-text",
      error: "bg-error text-text",
      warning: "bg-warning text-text",
      info: "bg-info text-text",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";