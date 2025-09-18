"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Calendar, 
  BarChart2, 
  Users, 
  Settings, 
  LogOut, 
  Award,
  Wallet
} from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import { BarChart3 } from "lucide-react";
import { OrganizationSelector } from "../organizations/organization-selector";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "Events",
    href: "/events",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart2 className="w-5 h-5" />,
    submenu: [
      {
        title: "General",
        href: "/analytics/overall",
      },
      {
        title: "Users",
        href: "/analytics/users",
      },
      {
        title: "Timeline",
        href: "/analytics/timeline",
      },
      {
        title: "Regions",
        href: "/analytics/regions",
      },
      {
        title: "Wallets",
        href: "/analytics/wallets",
      },
    ],
  },
  {
    title: "Users",
    href: "/users",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Certifications",
    href: "/certificates",
    icon: <Award className="w-5 h-5" />,
  },
  {
    title: "Wallets",
    href: "/wallets",
    icon: <Wallet className="w-5 h-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);
  const { logout } = useAuth();

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 w-64">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold text-blue-600">
            EventMetrics
          </h1>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.title}>
              {item.submenu ? (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                    <svg
                      className={cn(
                        "ml-auto h-4 w-4 transition-transform",
                        openSubmenu === item.title ? "rotate-180" : ""
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  
                  {openSubmenu === item.title && (
                    <ul className="pl-8 space-y-1">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.title}>
                          <Link
                            href={subitem.href}
                            className={cn(
                              "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                              pathname === subitem.href
                                ? "bg-blue-600/20 text-blue-400"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            )}
                          >
                          {subitem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? "bg-blue-600/20 text-blue-400"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <OrganizationSelector/>
      </div>

      <div className="p-4 border-t border-slate-800">
        <Link
          href="/profile"
          className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
        >
          <Settings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </Link>
        <button
          onClick={() => logout()}
          className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}