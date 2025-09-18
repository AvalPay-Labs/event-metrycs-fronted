"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Shield, 
  Activity, 
  PieChart, 
  BarChart3,
  Brain,
  AlertTriangle,
  RefreshCw,
  Eye,
  Target,
  DollarSign,
  Calendar,
  Award,
  ExternalLink,
  Copy
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WalletInfo } from '@/types/wallet';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/lib/hooks/use-toast';

interface WalletIntelligenceProps {
  wallet: WalletInfo;
  onRefresh?: () => void;
}

export function WalletIntelligence({ wallet, onRefresh }: WalletIntelligenceProps) {
  const [isRefreshing, ] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const toast = useToast();

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    toast.success('Dirección copiada al portapapeles');
  };

  return (
    <div className="space-y-6">
      {/* Header con información clave */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl mb-2 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-primary" />
                Inteligencia de Wallet
              </CardTitle>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">
                  {wallet.metrics.totalTransactions > 100 ? 'Usuario Activo' : 'Usuario Casual'}
                </Badge>
                <Badge variant="outline">
                  Score: {wallet.metrics.activityScore}/100
                </Badge>
                <Badge variant="outline">
                  {wallet.metrics.walletAge} días de antigüedad
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-mono break-all">
                {wallet.address}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyAddress}>
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onRefresh?.()}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs principales */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Resumen</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-1">
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">Transacciones</span>
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-1">
            <PieChart className="w-4 h-4" />
            <span className="hidden sm:inline">Portfolio</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Análisis</span>
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Riesgo</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Eventos</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-1">
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <WalletOverview wallet={wallet} />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <TransactionAnalysis wallet={wallet} />
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <PortfolioAnalysis wallet={wallet} />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <BehaviorAnalysis wallet={wallet} />
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <RiskAnalysis wallet={wallet} />
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <EventsAnalysis wallet={wallet} />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <AIInsights wallet={wallet} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Componente de Resumen
function WalletOverview({ wallet }: { wallet: WalletInfo }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Balance */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <DollarSign className="w-8 h-8 text-primary mb-2" />
            <div className="text-2xl font-bold text-text">
              {wallet.balance.native.avax.toFixed(4)} AVAX
            </div>
            <p className="text-sm text-muted-foreground">
              ≈ ${wallet.balance.native.usd.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Transacciones */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Activity className="w-8 h-8 text-green-500 mb-2" />
            <div className="text-2xl font-bold text-text">
              {wallet.metrics.totalTransactions}
            </div>
            <p className="text-sm text-muted-foreground">Transacciones</p>
          </div>
        </CardContent>
      </Card>

      {/* Valor Total Transferido */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
            <div className="text-2xl font-bold text-text">
              {wallet.metrics.totalValueTransferred.toFixed(2)} AVAX
            </div>
            <p className="text-sm text-muted-foreground">Volumen Total</p>
          </div>
        </CardContent>
      </Card>

      {/* Score de Actividad */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Target className="w-8 h-8 text-purple-500 mb-2" />
            <div className="text-2xl font-bold text-text">
              {wallet.metrics.activityScore}/100
            </div>
            <p className="text-sm text-muted-foreground">Score de Actividad</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente de Análisis de Transacciones
function TransactionAnalysis({ wallet }: { wallet: WalletInfo }) {
  const openInExplorer = (hash: string, network: 'avalanche' | 'fuji') => {
    const explorerUrl = network === 'avalanche' 
      ? 'https://snowtrace.io'
      : 'https://testnet.snowtrace.io';
    window.open(`${explorerUrl}/tx/${hash}`, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Análisis de Transacciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {wallet.metrics.totalTransactions}
            </div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {wallet.metrics.averageTransactionValue.toFixed(4)} AVAX
            </div>
            <div className="text-sm text-muted-foreground">Promedio</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {wallet.metrics.walletAge}
            </div>
            <div className="text-sm text-muted-foreground">Días activos</div>
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          <h4 className="font-semibold">Transacciones Recientes</h4>
          {wallet.transactions.slice(0, 10).map((tx) => (
            <div key={tx.hash} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <Badge variant={tx.network === 'avalanche' ? 'default' : 'secondary'}>
                    {tx.network === 'avalanche' ? 'Mainnet' : 'Fuji'}
                  </Badge>
                  <p className="text-sm font-mono truncate">
                    {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
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
      </CardContent>
    </Card>
  );
}

// Componente de Análisis de Portfolio
function PortfolioAnalysis({ wallet }: { wallet: WalletInfo }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Distribución de Assets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
              <div>
                <p className="font-medium">AVAX</p>
                <p className="text-sm text-muted-foreground">Token Nativo</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{wallet.balance.native.avax.toFixed(4)} AVAX</p>
                <p className="text-sm text-muted-foreground">${wallet.balance.native.usd.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Métricas de Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Valor Total:</span>
              <span className="font-medium">${wallet.balance.native.usd.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Diversificación:</span>
              <span className="font-medium">Básica (Solo AVAX)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Riesgo:</span>
              <Badge variant="outline" className="text-yellow-600">Medio</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente de Análisis de Comportamiento
function BehaviorAnalysis({ wallet }: { wallet: WalletInfo }) {
  const getUserType = () => {
    if (wallet.metrics.totalTransactions > 500) return 'Trader Activo';
    if (wallet.metrics.totalTransactions > 100) return 'Usuario Frecuente';
    if (wallet.metrics.totalTransactions > 20) return 'Usuario Regular';
    return 'Usuario Casual';
  };

  const getExperienceLevel = () => {
    if (wallet.metrics.walletAge > 365 && wallet.metrics.totalTransactions > 1000) return 'Experto';
    if (wallet.metrics.walletAge > 180 && wallet.metrics.totalTransactions > 100) return 'Avanzado';
    if (wallet.metrics.walletAge > 30 && wallet.metrics.totalTransactions > 10) return 'Intermedio';
    return 'Principiante';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Perfil de Usuario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Tipo de Usuario</p>
              <Badge className="mt-1">{getUserType()}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nivel de Experiencia</p>
              <Badge variant="outline" className="mt-1">{getExperienceLevel()}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Frecuencia de Transacciones</p>
              <p className="font-medium">
                {wallet.metrics.totalTransactions > 0 ? 
                  (wallet.metrics.totalTransactions / Math.max(wallet.metrics.walletAge, 1)).toFixed(2) : 0} tx/día
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patrones de Actividad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Consistencia</p>
              <div className="w-full bg-muted rounded-full h-2 mt-1">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${Math.min(wallet.metrics.activityScore, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {wallet.metrics.activityScore}/100
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Volumen Promedio</p>
              <p className="font-medium">{wallet.metrics.averageTransactionValue.toFixed(4)} AVAX</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente de Análisis de Riesgo
function RiskAnalysis({ wallet }: { wallet: WalletInfo }) {
  const calculateRiskScore = () => {
    let risk = 0;
    if (wallet.metrics.averageTransactionValue > 10) risk += 20;
    if (wallet.balance.native.usd > 10000) risk += 30;
    if (wallet.metrics.totalTransactions > 1000) risk += 25;
    return Math.min(risk, 100);
  };

  const riskScore = calculateRiskScore();
  const riskLevel = riskScore > 70 ? 'Alto' : riskScore > 40 ? 'Medio' : 'Bajo';
  const riskColor = riskScore > 70 ? 'text-red-600' : riskScore > 40 ? 'text-yellow-600' : 'text-green-600';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Análisis de Riesgo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className={`text-2xl font-bold ${riskColor}`}>
              {riskScore}/100
            </div>
            <div className="text-sm text-muted-foreground">Score de Riesgo</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className={`text-xl font-bold ${riskColor}`}>
              {riskLevel}
            </div>
            <div className="text-sm text-muted-foreground">Nivel de Riesgo</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">
              Básico
            </div>
            <div className="text-sm text-muted-foreground">Perfil</div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h4 className="font-semibold">Factores de Riesgo</h4>
          <div className="space-y-2">
            {wallet.balance.native.usd > 10000 && (
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                  <span className="text-sm">Alto valor en wallet</span>
                </div>
                <Badge variant="outline" className="text-yellow-600">Medio</Badge>
              </div>
            )}
            {wallet.metrics.averageTransactionValue > 10 && (
              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mr-2" />
                  <span className="text-sm">Transacciones de alto valor</span>
                </div>
                <Badge variant="outline" className="text-orange-600">Alto</Badge>
              </div>
            )}
            {wallet.metrics.totalTransactions < 10 && (
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm">Poca actividad histórica</span>
                </div>
                <Badge variant="outline" className="text-blue-600">Bajo</Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente de Análisis de Eventos
function EventsAnalysis({ wallet }: { wallet: WalletInfo }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Participación en Eventos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {wallet.events.length}
            </div>
            <div className="text-sm text-muted-foreground">Eventos Participados</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {wallet.metrics.transactionsDuringEvents}
            </div>
            <div className="text-sm text-muted-foreground">TX Durante Eventos</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {wallet.metrics.transactionsAfterEvents}
            </div>
            <div className="text-sm text-muted-foreground">TX Post-Eventos</div>
          </div>
        </div>

        {wallet.events.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-semibold">Historial de Eventos</h4>
            {wallet.events.map((event) => (
              <div key={event.eventId} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">{event.eventName}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event.eventDate)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={event.attended ? 'default' : 'secondary'}>
                    {event.attended ? 'Asistió' : 'Registrado'}
                  </Badge>
                  {event.walletCreatedDuringEvent && (
                    <Badge variant="outline">Nueva wallet</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Esta wallet no ha participado en eventos registrados</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Componente de AI Insights
function AIInsights({ wallet }: { wallet: WalletInfo }) {
  const generateInsights = () => {
    const insights = [];
    
    if (wallet.metrics.activityScore > 80) {
      insights.push({
        type: 'positive',
        title: 'Usuario Altamente Activo',
        description: 'Esta wallet muestra un patrón de uso consistente y frecuente.',
        icon: TrendingUp
      });
    }
    
    if (wallet.metrics.averageTransactionValue > 5) {
      insights.push({
        type: 'warning',
        title: 'Transacciones de Alto Valor',
        description: 'El valor promedio de transacciones es significativamente alto.',
        icon: AlertTriangle
      });
    }
    
    if (wallet.events.length > 0) {
      insights.push({
        type: 'info',
        title: 'Participante de Eventos',
        description: `Ha participado en ${wallet.events.length} evento(s) registrado(s).`,
        icon: Award
      });
    }
    
    if (wallet.metrics.walletAge < 30) {
      insights.push({
        type: 'info',
        title: 'Wallet Reciente',
        description: 'Esta es una wallet relativamente nueva en el ecosistema.',
        icon: Calendar
      });
    }

    return insights;
  };

  const insights = generateInsights();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Insights de IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const colorClass = {
              positive: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
              warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
              info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
            }[insight.type];

            const iconColorClass = {
              positive: 'text-green-600',
              warning: 'text-yellow-600',
              info: 'text-blue-600'
            }[insight.type];

            return (
              <div key={index} className={`p-4 rounded-lg border ${colorClass}`}>
                <div className="flex items-start space-x-3">
                  <Icon className={`w-5 h-5 ${iconColorClass} mt-0.5`} />
                  <div>
                    <h4 className="font-semibold">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
          
          {insights.length === 0 && (
            <div className="text-center py-8">
              <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Analizando patrones para generar insights...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 