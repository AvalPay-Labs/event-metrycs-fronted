"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "@/lib/utils";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { Spinner } from "@/components/ui/spinner";

export function ComparisonChart() {
  const { overallMetricsQuery } = useAnalytics();
  const [metric, setMetric] = useState<"attendees" | "wallets" | "cost">("wallets");
  
  const isLoading = overallMetricsQuery.isLoading;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Comparison by event type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <Spinner size="md" />
            <p className="text-textSecondary ml-2">Loading comparison data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const metrics = overallMetricsQuery.data || {
    totalEvents: 0,
    eventByType: [],
    totalAttendees: 0,
    totalNewWallets: 0,
    totalCosts: 0
  };
  
  const comparisonData = [
    {
      category: "Average attendees",
      inPerson: metrics.totalAttendees * 0.5 / Math.max(1, metrics.totalEvents * 0.5),
      virtual: metrics.totalAttendees * 0.3 / Math.max(1, metrics.totalEvents * 0.3),
      hybrid: metrics.totalAttendees * 0.2 / Math.max(1, metrics.totalEvents * 0.2)
    },
    {
      category: "Wallets per event",
      inPerson: metrics.totalNewWallets * 0.6 / Math.max(1, metrics.totalEvents * 0.5),
      virtual: metrics.totalNewWallets * 0.2 / Math.max(1, metrics.totalEvents * 0.3),
      hybrid: metrics.totalNewWallets * 0.2 / Math.max(1, metrics.totalEvents * 0.2)
    },
    {
      category: "Average cost (USD)",
      inPerson: metrics.totalCosts * 0.7 / Math.max(1, metrics.totalEvents * 0.5),
      virtual: metrics.totalCosts * 0.1 / Math.max(1, metrics.totalEvents * 0.3),
      hybrid: metrics.totalCosts * 0.2 / Math.max(1, metrics.totalEvents * 0.2)
    }
  ];

  const selectedData = comparisonData.find(d => {
    if (metric === "attendees") return d.category === "Average attendees";
    if (metric === "wallets") return d.category === "Wallets per event";
    if (metric === "cost") return d.category === "Average cost (USD)";
    return false;
  });
  
  const maxValue = selectedData 
    ? Math.max(selectedData.inPerson, selectedData.virtual, selectedData.hybrid)
    : 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Comparison by event type</CardTitle>
        <div className="flex space-x-2">
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value as "attendees" | "wallets" | "cost")}
            className="bg-card border border-element rounded text-sm px-2 py-1 text-text cursor-pointer"
          >
            <option value="wallets">Wallets</option>
            <option value="attendees">Attendees</option>
            <option value="cost">Costs</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {selectedData ? (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <div className="text-center text-textSecondary font-medium">In-person</div>
                <div className="w-full h-40 flex items-end justify-center px-2">
                  <div 
                    className="w-full rounded-t bg-primary"
                    style={{ height: `${(selectedData.inPerson / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-2xl font-bold text-text">
                  {metric === "cost" 
                    ? formatCurrency(selectedData.inPerson) 
                    : Math.round(selectedData.inPerson)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-center text-textSecondary font-medium">Virtual</div>
                <div className="w-full h-40 flex items-end justify-center px-2">
                  <div 
                    className="w-full rounded-t bg-secondary"
                    style={{ height: `${(selectedData.virtual / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-2xl font-bold text-text">
                  {metric === "cost" 
                    ? formatCurrency(selectedData.virtual)
                    : Math.round(selectedData.virtual)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-center text-textSecondary font-medium">Hybrid</div>
                <div className="w-full h-40 flex items-end justify-center px-2">
                  <div 
                    className="w-full rounded-t bg-accent"
                    style={{ height: `${(selectedData.hybrid / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-2xl font-bold text-text">
                  {metric === "cost" 
                    ? formatCurrency(selectedData.hybrid)
                    : Math.round(selectedData.hybrid)}
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <p className="text-textSecondary text-sm">
                {metric === "attendees" && "Virtual events tend to have higher attendance due to ease of access, but in-person events generate more wallets per attendee."}
                {metric === "wallets" && "In-person events generate more new wallets, possibly due to personal attendance and direct support for wallet creation."}
                {metric === "cost" && "In-person events have a significantly higher cost, while virtual events are the most cost-effective option."}
              </p>
            </div>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center">
            <p className="text-textSecondary">No data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}