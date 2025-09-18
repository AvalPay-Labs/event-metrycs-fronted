"use client";

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { PageHeader } from '@/components/shared/page-header';
import { WalletSearch } from '@/components/wallets/wallet-search';
import { WalletIntelligence } from '@/components/wallets/wallet-intelligence';
import { useWalletInfo } from '@/lib/hooks/use-wallets';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap } from 'lucide-react';
import { WalletInfo } from '@/types/wallet';

export default function WalletsPage() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  
  // Usar el hook directamente
  const { data: walletData, isLoading, error, refetch } = useWalletInfo(selectedWallet || '');

  const handleWalletSelect = (address: string) => {
    setSelectedWallet(address);
  };

  const handleBack = () => {
    setSelectedWallet(null);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Wallets", href: "/wallets" },
        ]}
      />
      
      <PageHeader 
        title="Inteligencia de Wallets"
        subtitle="Análisis avanzado y comportamiento de wallets en la blockchain de Avalanche"
      />

      {!selectedWallet ? (
        <div className="space-y-6">
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Análisis Inteligente de Wallets</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Introduce cualquier dirección de wallet para obtener un análisis completo de:
              transacciones, comportamiento, riesgo, participación en eventos y más.
            </p>
          </div>
          <WalletSearch onWalletSelect={handleWalletSelect} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nueva Búsqueda
            </Button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Spinner size="lg" className="mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="font-medium">Analizando wallet...</p>
                  <p className="text-sm text-muted-foreground">
                    Recopilando transacciones, calculando métricas y generando insights
                  </p>
                </div>
              </div>
            </div>
          )}

          {!!error && (
            <div className="text-center py-12">
              <p className="text-error mb-4">
                Error al cargar la información de la wallet: {error instanceof Error ? error.message : String(error)}
              </p>
              <div className="space-x-2">
                <Button onClick={handleBack} variant="outline">
                  Intentar con otra wallet
                </Button>
                <Button onClick={handleRefresh}>
                  Reintentar
                </Button>
              </div>
            </div>
          )}

          {walletData && !isLoading && (
            <WalletIntelligence wallet={walletData as WalletInfo} onRefresh={handleRefresh} />
          )}
        </div>
      )}
    </div>
  );
} 