import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
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
      asChild = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: "bg-purple-600 hover:bg-purple-700 text-white",
      accent: "bg-emerald-600 hover:bg-emerald-700 text-white",
      outline: "border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white",
      ghost: "bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white",
      link: "bg-transparent underline text-blue-400 hover:text-blue-300",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-5 py-2.5 text-lg",
      icon: "p-2",
    };

    const Comp = asChild ? "span" : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer",
          variants[variant],
          sizes[size],
          isLoading && "opacity-70 cursor-not-allowed",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={!asChild && (isLoading || disabled)}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : leftIcon ? (
          <span>{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && <span>{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = "Button";