"use client";

import React, { useState } from 'react';
import { Search, Wallet, Zap, ArrowRight, Activity, PieChart, Shield, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WalletSearchProps {
  onWalletSelect: (address: string) => void;
}

export function WalletSearch({ onWalletSelect }: WalletSearchProps) {
  const [searchAddress, setSearchAddress] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSearch = async () => {
    if (searchAddress.trim() && isValidAddress) {
      setIsValidating(true);
      // Pequeña pausa para UX
      setTimeout(() => {
        onWalletSelect(searchAddress.trim());
        setIsValidating(false);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const isValidAddress = searchAddress.startsWith('0x') && searchAddress.length === 42;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center text-xl">
            <Zap className="w-6 h-6 mr-2 text-primary" />
            Buscar Wallet para Análisis
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Ingresa cualquier dirección de wallet de Avalanche para obtener un análisis completo
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="0x742d35cc60c12c4ab0c6e8cfb73b8b78f8b8c123..."
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 text-sm font-mono"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={!isValidAddress || isValidating}
              className="px-6"
            >
              {isValidating ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Analizando...
                </div>
              ) : (
                <div className="flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Analizar
                </div>
              )}
            </Button>
          </div>

          {/* Validación en tiempo real */}
          <div className="text-sm">
            {searchAddress.length > 0 && (
              <div className="flex items-center space-x-2">
                {isValidAddress ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600">Dirección válida</span>
                    <ArrowRight className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Lista para analizar</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-600">
                      {searchAddress.startsWith('0x') 
                        ? `Faltan ${42 - searchAddress.length} caracteres` 
                        : 'Debe empezar con 0x'
                      }
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Ejemplos de uso */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">Ejemplo de dirección válida:</p>
            <p className="font-mono text-xs text-muted-foreground break-all">
              0x742d35Cc60C12C4aB0c6e8CFB73b8B78f8B8c123
            </p>
          </div>

          {/* Features preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-xs font-medium">Transacciones</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <PieChart className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <p className="text-xs font-medium">Portfolio</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <p className="text-xs font-medium">Riesgo</p>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Brain className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <p className="text-xs font-medium">IA Insights</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 