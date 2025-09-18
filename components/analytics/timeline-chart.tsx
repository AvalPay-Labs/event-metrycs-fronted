"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TimelineMetric } from "@/types/analytics";
import { formatDate } from "@/lib/utils";

interface TimelineChartProps {
  data?: TimelineMetric[];
  isLoading?: boolean;
}

export function TimelineChart({ data, isLoading = false }: TimelineChartProps) {
  const placeholderData: TimelineMetric[] = [
    { _id: "1", date: "2023-01-15", totalCost: 2000, confirmedAttendees: 120, newWallets: 45 },
    { _id: "2", date: "2023-02-20", totalCost: 2500, confirmedAttendees: 150, newWallets: 60 },
    { _id: "3", date: "2023-03-10", totalCost: 1800, confirmedAttendees: 100, newWallets: 40 },
    { _id: "4", date: "2023-04-05", totalCost: 3000, confirmedAttendees: 200, newWallets: 75 },
    { _id: "5", date: "2023-05-18", totalCost: 2800, confirmedAttendees: 180, newWallets: 65 },
    { _id: "6", date: "2023-06-22", totalCost: 3200, confirmedAttendees: 220, newWallets: 90 }
  ];

  const chartData = data || placeholderData;
  const [metric, setMetric] = React.useState<"confirmedAttendees" | "newWallets" | "totalCost">("newWallets");

  const maxValue = Math.max(...chartData.map(d => (d as TimelineMetric)[metric] || 0));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Timeline evolution</CardTitle>
        <div className="flex space-x-2">
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value as "confirmedAttendees" | "newWallets" | "totalCost")}
            className="bg-card border border-element rounded text-sm px-2 py-1 text-text cursor-pointer"
          >
            <option value="newWallets">Wallets</option>
            <option value="confirmedAttendees">Attendees</option>
            <option value="totalCost">Costs</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-textSecondary">Loading data...</p>
            </div>
          ) : (
            <div className="h-full flex items-end space-x-2">
              {chartData.map((item) => {
                const value = (item as TimelineMetric)[metric] || 0;
                const height = `${maxValue > 0 ? (value / maxValue) * 100 : 0}%`;
                
                const getColor = () => {
                  switch(metric) {
                    case "newWallets":
                      return "bg-accent";
                    case "confirmedAttendees":
                      return "bg-secondary";
                    case "totalCost":
                      return "bg-primary";
                    default:
                      return "bg-primary";
                  }
                };
                
                return (
                  <div 
                    key={item._id} 
                    className="flex-1 flex flex-col items-center justify-end"
                  >
                    <div className="group relative w-full">
                      <div 
                        className={`w-full rounded-t ${getColor()}`} 
                        style={{ height }}
                      ></div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-card p-2 rounded text-sm whitespace-nowrap">
                        <div className="text-text">{formatDate(item.date)}</div>
                        <div className="text-text">
                          {metric === "totalCost" 
                            ? `$${(value || 0).toLocaleString()}`
                            : (value || 0).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-textSecondary mt-1 truncate w-full text-center">
                      {formatDate(item.date).split(" ")[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}