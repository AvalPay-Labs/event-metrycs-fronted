import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;  
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("flex items-start bg-slate-900 border-slate-800 hover:bg-slate-800 transition-colors", className)}>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
        {description && (
          <p className="text-xs text-slate-400 mt-1">{description}</p>
        )}
        {trend && (
          <div
            className={cn(
              "flex items-center mt-2 text-xs font-medium",
              trend.isPositive ? "text-green-400" : "text-red-400"
            )}
          >
            <span
              className={cn(
                "mr-1",
                trend.isPositive ? "rotate-0" : "rotate-180"
              )}
            >
              ↑
            </span>
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      <div
        className={cn(
          "p-3 rounded-lg",
          "bg-blue-600/20 text-blue-400",
        )}
      >
        {icon}
      </div>
    </Card>
  );
}