import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
  delay?: number;
}

export function Tooltip({
  content,
  children,
  position = "top",
  className,
  delay = 300,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const newTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimer(newTimer);
  };

  const hideTooltip = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setIsVisible(false);
  };

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 translate-x-2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 -translate-x-2 mr-2",
  };

  const arrows = {
    top: "bottom-[-6px] left-1/2 -translate-x-1/2 border-t-card border-x-transparent border-b-transparent",
    right: "left-[-6px] top-1/2 -translate-y-1/2 border-r-card border-y-transparent border-l-transparent",
    bottom: "top-[-6px] left-1/2 -translate-x-1/2 border-b-card border-x-transparent border-t-transparent",
    left: "right-[-6px] top-1/2 -translate-y-1/2 border-l-card border-y-transparent border-r-transparent",
  };

  return (
    <div className="relative inline-flex" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 w-max max-w-xs px-3 py-2 text-sm rounded-md shadow-md pointer-events-none bg-card text-text border border-element",
            positions[position],
            className
          )}
        >
          <div className={cn("absolute w-0 h-0 border-[6px]", arrows[position])} />
          {content}
        </div>
      )}
    </div>
  );
}