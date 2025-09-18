"use client";

import React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Calendar, Users, Wallet, DollarSign, BarChart2, TrendingUp } from "lucide-react";
import { EventsTable } from "@/components/events/events-table";
import { KPITracker } from "@/components/analytics/kpi-tracker";
import { ComparisonChart } from "@/components/analytics/comparison-chart";
import { useEvents } from "@/lib/hooks/use-events";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardPage() {
  const { events, eventsQuery } = useEvents({
    page: 1, 
    limit: 5,
    sort: "-createdAt"
  });
  const { overallMetricsQuery } = useAnalytics();

  const isLoading = eventsQuery.isLoading || overallMetricsQuery.isLoading;

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (eventsQuery.isError) {
    return (
      <div className="p-4 border border-red-500 rounded-lg bg-red-500/10">
        <p className="text-red-400">Error loading events. Please try again.</p>
      </div>
    );
  }

  const metrics = overallMetricsQuery.data || {
    totalEvents: 0,
    totalAttendees: 0,
    totalNewWallets: 0,
    totalCosts: 0,
    eventByType: []
  };

  // Calculate efficiency rates
  const walletEfficiency = metrics.totalAttendees > 0 
    ? (metrics.totalNewWallets / metrics.totalAttendees * 100).toFixed(1) 
    : "0";

  const costPerWallet = metrics.totalNewWallets > 0 
    ? (metrics.totalCosts / metrics.totalNewWallets).toFixed(2) 
    : "0";

  const walletTrend = {
    value: metrics.totalAttendees > 0 ? parseFloat((metrics.totalNewWallets / metrics.totalAttendees * 10).toFixed(1)) : 0,
    isPositive: true
  };

  const costTrend = {
    value: metrics.totalCosts > 0 ? parseFloat((metrics.totalNewWallets / metrics.totalCosts * 10).toFixed(1)) : 0,
    isPositive: metrics.totalNewWallets > metrics.totalCosts
  };

  const attendeesTrend = {
    value: metrics.totalAttendees > 0 ? parseFloat((metrics.totalNewWallets / metrics.totalAttendees * 10).toFixed(1)) : 0,
    isPositive: true
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        subtitle="General performance view of your events"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Events" 
          value={metrics.totalEvents}
          icon={<Calendar className="w-5 h-5" />}
          color="primary"
        />
        <MetricCard 
          title="Total Attendees" 
          value={metrics.totalAttendees}
          icon={<Users className="w-5 h-5" />}
          color="secondary"
          change={attendeesTrend}
        />
        <MetricCard 
          title="Created Wallets" 
          value={metrics.totalNewWallets}
          icon={<Wallet className="w-5 h-5" />}
          color="accent"
          change={walletTrend}
        />
        <MetricCard 
          title="Cost per Wallet" 
          value={`$${costPerWallet}`}
          icon={<DollarSign className="w-5 h-5" />}
          color="success"
          change={costTrend}    
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsCard
          title="Wallet Efficiency"
          value={`${walletEfficiency}%`}
          description="Percentage of attendees who created wallets"
          icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
          trend={walletTrend}
        />
        <StatsCard
          title="Event Distribution"
          value={`${metrics.eventByType.length} types`}
          description="Types of events conducted"
          icon={<BarChart2 className="w-5 h-5 text-blue-400" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KPITracker />
        <ComparisonChart />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Events</h2>
        <EventsTable 
          events={events} 
          isLoading={eventsQuery.isLoading}
        />
      </div>
    </div>
  );
}