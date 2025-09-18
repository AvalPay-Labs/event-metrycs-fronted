"use client";

import React from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { MetricsOverview } from "@/components/analytics/metrics-overview";
import { ComparisonChart } from "@/components/analytics/comparison-chart";
import { KPITracker } from "@/components/analytics/kpi-tracker";
import { UserMetricsTable } from "@/components/analytics/user-metrics";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { Spinner } from "@/components/ui/spinner";

export default function AnalyticsPage() {
  const {
    overallMetricsQuery,
    userMetricsQuery
  } = useAnalytics();

  const isLoading = overallMetricsQuery.isLoading || userMetricsQuery.isLoading;

  if (isLoading) {
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
        ]}
      />
      
      <PageHeader 
        title="Analytics" 
        subtitle="Comprehensive metrics for your blockchain events"
      />
      
      <MetricsOverview 
        metrics={overallMetricsQuery.data} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComparisonChart />
        <KPITracker />
      </div>
      
      <UserMetricsTable metrics={userMetricsQuery.data} />
    </div>
  );
}