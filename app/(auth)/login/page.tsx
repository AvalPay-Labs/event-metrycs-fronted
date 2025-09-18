"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/lib/hooks/use-auth";
import { BarChart3 } from "lucide-react";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-blue-600">
            EventMetrics
          </h1>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Access your event metrics and analytics
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg shadow-2xl border border-slate-800">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}