"use client";

import React from 'react';
import { 
  Wallet, 
  DollarSign, 
  TrendingUp, 
  Award,
  ExternalLink,
  Copy
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WalletInfo } from '@/types/wallet';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/lib/hooks/use-toast';

interface WalletDetailsProps {
  wallet: WalletInfo;
}

export function WalletDetails({ wallet }: WalletDetailsProps) {
  const { success } = useToast();

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    success('Dirección copiada al portapapeles');
  };

  const openInExplorer = (hash: string, network: 'avalanche' | 'fuji') => {
    const explorerUrl = network === 'avalanche' 
      ? 'https://snowtrace.io'
      : 'https://testnet.snowtrace.io';
    window.open(`${explorerUrl}/tx/${hash}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header con información básica */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-text">
              <Wallet className="w-5 h-5 mr-2" />
              Información de Wallet
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={copyAddress}>
                <Copy className="w-4 h-4 mr-1" />
                Copiar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-textSecondary">Dirección</p>
              <p className="font-mono text-sm bg-element p-2 rounded break-all">
                {wallet.address}
              </p>
            </div>

            {wallet.userInfo && (
              <div className="flex items-center space-x-2 p-3 bg-primary/5 rounded-lg">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{wallet.userInfo.name}</p>
                  <p className="text-sm text-textSecondary">{wallet.userInfo.email}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <DollarSign className="w-8 h-8 text-primary mb-2" />
              <div className="text-xl font-bold text-text">
                {wallet.balance.native.avax.toFixed(4)} AVAX
              </div>
              <p className="text-sm text-textSecondary">
                ≈ ${wallet.balance.native.usd.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Wallet className="w-8 h-8 text-secondary mb-2" />
              <div className="text-xl font-bold text-text">
                {wallet.metrics.totalTransactions}
              </div>
              <p className="text-sm text-textSecondary">Transacciones</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participación en eventos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-text">
            <Award className="w-5 h-5 mr-2" />
            Participación en Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {wallet.events.length > 0 ? (
            <div className="space-y-3">
              {wallet.events.map((event) => (
                <div key={event.eventId} className="flex items-center justify-between p-3 bg-element rounded-lg">
                  <div>
                    <p className="font-medium">{event.eventName}</p>
                    <p className="text-sm text-textSecondary">
                      {formatDate(event.eventDate)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant={event.attended ? 'success' : 'secondary'}>
                      {event.attended ? 'Asistió' : 'Registrado'}
                    </Badge>
                    {event.walletCreatedDuringEvent && (
                      <Badge variant="accent">Nueva wallet</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-textSecondary text-center py-4">
              Esta wallet no ha participado en eventos registrados
            </p>
          )}
        </CardContent>
      </Card>

      {/* Transacciones recientes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-text">
            <TrendingUp className="w-5 h-5 mr-2" />
            Transacciones Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {wallet.transactions.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {wallet.transactions.slice(0, 10).map((tx) => (
                <div key={tx.hash} className="flex items-center justify-between p-3 bg-element rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Badge variant={tx.network === 'avalanche' ? 'default' : 'secondary'}>
                        {tx.network === 'avalanche' ? 'Mainnet' : 'Fuji'}
                      </Badge>
                      <p className="text-sm font-mono truncate">
                        {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                      </p>
                    </div>
                    <p className="text-xs text-textSecondary mt-1">
                      {new Date(tx.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {(parseFloat(tx.value) / 1e18).toFixed(6)} AVAX
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openInExplorer(tx.hash, tx.network)}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-textSecondary text-center py-4">
              No se encontraron transacciones recientes
            </p>
          )}
        </CardContent>
      </Card>

      {/* Métricas detalladas */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas Detalladas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-textSecondary">Valor total transferido:</span>
                <span className="font-medium">
                  {wallet.metrics.totalValueTransferred.toFixed(4)} AVAX
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Valor promedio por tx:</span>
                <span className="font-medium">
                  {wallet.metrics.averageTransactionValue.toFixed(6)} AVAX
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Edad de la wallet:</span>
                <span className="font-medium">{wallet.metrics.walletAge} días</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-textSecondary">Tx durante eventos:</span>
                <span className="font-medium">{wallet.metrics.transactionsDuringEvents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Tx después de eventos:</span>
                <span className="font-medium">{wallet.metrics.transactionsAfterEvents}</span>
              </div>
              {wallet.metrics.mostActiveEvent && (
                <div className="flex justify-between">
                  <span className="text-textSecondary">Evento más activo:</span>
                  <span className="font-medium text-sm">{wallet.metrics.mostActiveEvent}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 