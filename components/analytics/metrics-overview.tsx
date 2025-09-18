import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Users, Wallet, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { OverallMetrics } from "@/types/analytics";

interface MetricsOverviewProps {
  metrics?: OverallMetrics;
  isLoading?: boolean;
}

export function MetricsOverview({ metrics, isLoading = false }: MetricsOverviewProps) {
  const placeholderMetrics: OverallMetrics = {
    totalEvents: 156,
    eventByType: [
      { _id: "in-person", count: 87 },
      { _id: "virtual", count: 42 },
      { _id: "hybrid", count: 27 }
    ],
    totalAttendees: 7245,
    totalNewWallets: 2184,
    totalCosts: 93650
  };

  const data = metrics || placeholderMetrics;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">Total events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-text">{isLoading ? "..." : data.totalEvents}</div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">Attendees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-text">
                {isLoading ? "..." : data.totalAttendees.toLocaleString()}
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Users className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">Created wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-text">
                {isLoading ? "..." : data.totalNewWallets.toLocaleString()}
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <Wallet className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">Cost per wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-text">
                {isLoading ? "..." : formatCurrency(data.totalCosts / data.totalNewWallets)}
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event type distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around">
            {data.eventByType.map((type) => (
              <div key={type._id} className="text-center">
                <div className="text-3xl font-bold text-text">{type.count}</div>
                <div className="text-sm text-textSecondary mt-1">
                  {type._id === "in-person"
                    ? "In-person"
                    : type._id === "virtual"
                    ? "Virtual"
                    : "Hybrid"}
                </div>
                <div className="mt-2 w-full bg-input rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      type._id === "in-person"
                        ? "bg-primary"
                        : type._id === "virtual"
                        ? "bg-secondary"
                        : "bg-accent"
                    }`}
                    style={{
                      width: `${(type.count / data.totalEvents) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}