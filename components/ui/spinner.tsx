import React from "react";
import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerVariant = "default" | "primary" | "secondary" | "accent";

interface SpinnerProps extends React.SVGAttributes<SVGElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => {
    const sizes = {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-12 w-12",
    };

    const variants = {
      default: "text-text",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
    };

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "animate-spin",
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
        ref={ref}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
    );
  }
);

Spinner.displayName = "Spinner";