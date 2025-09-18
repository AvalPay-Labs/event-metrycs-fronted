"use client";

import React from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { RegionMap } from "@/components/analytics/region-map";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { Spinner } from "@/components/ui/spinner";

export default function RegionsAnalyticsPage() {
  const { regionMetricsQuery } = useAnalytics();
  
  if (regionMetricsQuery.isLoading) {
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
          { label: "Regions", href: "/analytics/regions" },
        ]}
      />
      
      <PageHeader 
        title="Region Analysis" 
        subtitle="Geographic distribution of events and metrics"
      />
      
      <RegionMap data={regionMetricsQuery.data} />
    </div>
  );
}