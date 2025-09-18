import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function truncateText(text: string, length = 100): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export function calculateEfficiency(newWallets: number, cost: number): number {
  if (cost === 0) return 0;
  return parseFloat((newWallets / cost).toFixed(2));
}

export function getEventTypeLabel(type: string): string {
  const types = {
    "in-person": "Presencial",
    virtual: "Virtual",
    hybrid: "Híbrido",
  };
  return types[type as keyof typeof types] || type;
}

export function generateEventTypeColor(type: string): string {
  const colors = {
    "in-person": "bg-primary-500",
    virtual: "bg-secondary-500",
    hybrid: "bg-accent-500",
  };
  return colors[type as keyof typeof colors] || "bg-gray-500";
}