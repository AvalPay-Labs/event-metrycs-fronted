"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { TimelineChart } from "@/components/analytics/timeline-chart";
import { useTimelineMetrics } from "@/lib/hooks/use-analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TimelineAnalyticsPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const { data, isLoading } = useTimelineMetrics(startDate, endDate);
  
  const handleFilter = () => {
    // El hook ya reaccionará al cambio de estados
  };
  
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Analytics", href: "/analytics" },
          { label: "Timeline", href: "/analytics/timeline" },
        ]}
      />
      
      <PageHeader 
        title="Timeline Analytics" 
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Filter by Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-textSecondary mb-1">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleFilter} className="cursor-pointer">
                Apply Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <TimelineChart data={data} isLoading={isLoading} />
    </div>
  );
}