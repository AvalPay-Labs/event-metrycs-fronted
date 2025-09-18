import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { WalletMetrics } from "@/types/analytics";
import { formatCurrency } from "@/lib/utils";
import { Wallet, ArrowRight } from "lucide-react";

interface WalletStatsProps {
  data?: WalletMetrics;
  isLoading?: boolean;
}

export function WalletStats({ data, isLoading = false }: WalletStatsProps) {
  const placeholderData: WalletMetrics = {
    totalNewWallets: 2184,
    transactionsByType: [
      { _id: "POAP", wallet: "POAP", totalCount: 1850 },
      { _id: "Staking", wallet: "Staking", totalCount: 650 },
      { _id: "NFT", wallet: "NFT", totalCount: 420 },
      { _id: "Swap", wallet: "Swap", totalCount: 320 }
    ],
    costPerWallet: 42.8
  };

  const walletData = data || placeholderData;
  
  const sortedTransactions = [...walletData.transactionsByType].sort((a, b) => b.totalCount - a.totalCount);
  
  const totalTransactions = sortedTransactions.reduce((sum, tx) => sum + tx.totalCount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">Total wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-text">
                {isLoading ? "..." : walletData.totalNewWallets.toLocaleString()}
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-textSecondary">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-text">
                {isLoading ? "..." : totalTransactions.toLocaleString()}
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <ArrowRight className="w-5 h-5 text-secondary" />
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
                {isLoading ? "..." : formatCurrency(walletData.costPerWallet)}
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <Wallet className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
                <div className="py-8 text-center text-textSecondary">Loading data...</div>
            ) : (
              sortedTransactions.map((tx) => {
                const percentage = ((tx.totalCount / totalTransactions) * 100).toFixed(1);
                
                return (
                  <div key={tx._id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-text">{tx.wallet}</span>
                      <span className="text-text">{tx.totalCount.toLocaleString()} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-input rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}