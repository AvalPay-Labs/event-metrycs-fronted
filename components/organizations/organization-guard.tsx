"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { useOrganizations } from "@/lib/hooks/use-organization";
import { Spinner } from "@/components/ui/spinner";

interface OrganizationGuardProps {
  children: React.ReactNode;
}

export function OrganizationGuard({ children }: OrganizationGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { organizations, isLoadingOrganizations } = useOrganizations();

  useEffect(() => {
    if (isLoading || isLoadingOrganizations) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (organizations.length === 0) {
      router.push('/organization');
      return;
    }

    if (!user.currentOrganizationId && !user.currentOrganization) {
      router.push('/organization');
      return;
    }
  }, [user, organizations, isLoading, isLoadingOrganizations, router]);

  const isReady = !isLoading && !isLoadingOrganizations && user && (user.currentOrganizationId || user.currentOrganization);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4 text-blue-500" />
          <p className="text-white">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}