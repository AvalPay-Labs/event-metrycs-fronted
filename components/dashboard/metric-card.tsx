import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  color?: "primary" | "secondary" | "accent" | "success" | "error" | "warning";
}

export function MetricCard({
  title,
  value,
  icon,
  description,
  change,
  className,
  color = "primary",
}: MetricCardProps) {
  const colors = {
    primary: "text-blue-400 bg-blue-600/20",
    secondary: "text-purple-400 bg-purple-600/20",
    accent: "text-emerald-400 bg-emerald-600/20",
    success: "text-green-400 bg-green-600/20",
    error: "text-red-400 bg-red-600/20",
    warning: "text-yellow-400 bg-yellow-600/20",
  };

  return (
    <Card className={cn("overflow-hidden bg-slate-900 border-slate-800 hover:bg-slate-800 transition-colors", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold text-white">{value}</div>
            {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
            {change && (
              <div
                className={cn(
                  "flex items-center mt-2 text-xs font-medium",
                  change.isPositive ? "text-green-400" : "text-red-400"
                )}
              >
                <span className={change.isPositive ? "text-green-400" : "text-red-400"}>
                  {change.isPositive ? "↑" : "↓"} {Math.abs(change.value)}%
                </span>
                <span className="ml-1 text-slate-500">from the last period</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-lg", colors[color])}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}