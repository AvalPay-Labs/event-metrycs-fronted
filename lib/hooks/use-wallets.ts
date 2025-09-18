import { useQuery } from 'react-query';
import { walletsApi } from '@/lib/api/wallets-api';

export function useWalletSearch(address: string) {
  return useQuery(
    ['wallet-search', address],
    () => walletsApi.searchWallet(address),
    {
      enabled: !!address && address.length === 42,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    }
  );
}

export function useWalletInfo(address: string) {
  return useQuery(
    ['wallet-info', address],
    () => walletsApi.getWalletInfo(address),
    {
      enabled: !!address && address.length === 42,
      retry: 1,
      staleTime: 2 * 60 * 1000,
    }
  );
}

// Hook principal que combina ambos si necesitas ambos en el mismo componente
export function useWallets() {
  return {
    useWalletSearch,
    useWalletInfo
  };
} 