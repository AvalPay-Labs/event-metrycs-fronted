import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm", className)}>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-slate-500" />
          )}
          <Link
            href={item.href}
            className={cn(
              "transition-colors",
              index === items.length - 1
                ? "text-white font-medium"
                : "text-slate-400 hover:text-white"
            )}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}