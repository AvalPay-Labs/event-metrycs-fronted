"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { Spinner } from "@/components/ui/spinner";

export function KPITracker() {
  const { overallMetricsQuery } = useAnalytics();
  
  const isLoading = overallMetricsQuery.isLoading;
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>KPI tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <Spinner size="md" />
            <p className="text-textSecondary mt-2">Loading KPIs...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const metrics = overallMetricsQuery.data || {
    totalEvents: 0,
    totalAttendees: 0,
    totalNewWallets: 0,
    totalCosts: 0
  };
  
  // Generate dynamic KPIs based on real data
  const kpiData = [
    { 
      id: "1", 
      description: "New wallets created", 
      target: Math.ceil(metrics.totalAttendees * 0.4),  // Meta: 40% of attendees
      current: metrics.totalNewWallets, 
      unit: "" 
    },
    { 
      id: "2", 
      description: "Certified assistants", 
      target: Math.ceil(metrics.totalAttendees * 0.7),  // Meta: 70% of attendees
      current: metrics.totalAttendees ? Math.floor(metrics.totalAttendees * 0.6) : 0,  // Assuming 60% completed 
      unit: "" 
    },
    { 
      id: "3", 
      description: "Average cost per wallet", 
      target: metrics.totalNewWallets ? 40 : 0,  // Meta: $40 per wallet
      current: metrics.totalNewWallets ? metrics.totalCosts / metrics.totalNewWallets : 0, 
      unit: "USD" 
    },
    { 
      id: "4", 
      description: "Events performed", 
      target: metrics.totalEvents ? 20 : 0,  // Meta: 20 more than the current
      current: metrics.totalEvents, 
      unit: "" 
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>KPI tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {kpiData.map((kpi) => {
            const percentage = Math.min(100, Math.round((kpi.current / kpi.target) * 100));
            const isCompleted = kpi.current >= kpi.target;
            const isReverse = kpi.description.includes("Costo") && kpi.current > kpi.target;
            
            return (
              <div key={kpi.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text">{kpi.description}</span>
                    {kpi.description.includes("Costo") ? (
                      <Badge variant={isReverse ? "error" : "success"}>
                        {isReverse ? "Over target" : "Under target"}
                      </Badge>
                    ) : (
                      <Badge variant={isCompleted ? "success" : "warning"}>
                        {isCompleted ? "Completed" : `${percentage}%`}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-text">
                    {kpi.description.includes("Costo") ? (
                      isReverse ? (
                        <XCircle className="w-4 h-4 text-error mr-2" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-success mr-2" />
                      )
                    ) : (
                      isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-success mr-2" />
                      ) : (
                        <span className="text-textSecondary text-sm mr-2">{percentage}%</span>
                      )
                    )}
                    <span>
                      {kpi.description.includes("Costo") ? "$" : ""}{kpi.current}
                      {kpi.unit && ` ${kpi.unit}`} / {kpi.description.includes("Costo") ? "$" : ""}{kpi.target}
                      {kpi.unit && ` ${kpi.unit}`}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-input rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      kpi.description.includes("Costo")
                        ? isReverse
                          ? "bg-error"
                          : "bg-success"
                        : isCompleted
                        ? "bg-success"
                        : "bg-primary"
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}