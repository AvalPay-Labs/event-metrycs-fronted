"use client";

import React from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { UserMetricsTable } from "@/components/analytics/user-metrics";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { Spinner } from "@/components/ui/spinner";

export default function UsersAnalyticsPage() {
  const { userMetricsQuery } = useAnalytics();
  
  if (userMetricsQuery.isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Analytics", href: "/analytics" },
          { label: "Users", href: "/analytics/users" },
        ]}
      />
      
      <PageHeader 
        title="User Performance" 
        subtitle="Analytics by user performance and metrics"
      />
      
      <UserMetricsTable metrics={userMetricsQuery.data} />
    </div>
  );
}