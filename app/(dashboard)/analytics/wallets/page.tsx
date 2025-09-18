"use client";

import React from "react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageHeader } from "@/components/shared/page-header";
import { WalletStats } from "@/components/analytics/wallet-stats";
import { useAnalytics } from "@/lib/hooks/use-analytics";
import { Spinner } from "@/components/ui/spinner";

export default function WalletsAnalyticsPage() {
  const { walletMetricsQuery } = useAnalytics();
  
  if (walletMetricsQuery.isLoading) {
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
          { label: "Wallets", href: "/analytics/wallets" },
        ]}
      />
      
      <PageHeader 
        title="Wallet Analytics" 
        subtitle="Metrics about wallet creation and usage"
      />
      
      <WalletStats data={walletMetricsQuery.data} />
    </div>
  );
}