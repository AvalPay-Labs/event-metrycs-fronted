import React from "react";
import { cn } from "@/lib/utils";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <div className="flex items-start gap-2">
        <input
          type="radio"
          ref={ref}
          className={cn(
            "h-4 w-4 border-element bg-input text-primary focus:ring-primary focus:ring-offset-background",
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="grid gap-1">
            {label && (
              <label
                htmlFor={props.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-text"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-textSecondary">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";