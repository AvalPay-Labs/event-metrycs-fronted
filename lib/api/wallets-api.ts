import apiClient from './axios-config';
import { WalletInfo, WalletSearchResult, AnalyzedTransaction, ContractInteraction, DeFiActivity, NFTActivity } from '@/types/wallet';
import { ApiResponse } from '@/types/api';

export const walletsApi = {
  searchWallet: async (address: string): Promise<WalletSearchResult> => {
    const response = await apiClient.get<ApiResponse<WalletSearchResult>>(
      `/wallets/search?address=${encodeURIComponent(address)}`
    );
    return response.data.data;
  },

  getWalletInfo: async (address: string): Promise<WalletInfo> => {
    const response = await apiClient.get<ApiResponse<WalletInfo>>(
      `/wallets/${encodeURIComponent(address)}`
    );
    return response.data.data;
  },

  // Nuevas APIs para funcionalidad expandida
  getWalletTransactions: async (
    address: string, 
    options?: {
      page?: number;
      limit?: number;
      category?: string;
      type?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<{ transactions: AnalyzedTransaction[], total: number, hasMore: boolean }> => {
    const params = new URLSearchParams();
    if (options?.page) params.append('page', options.page.toString());
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.category) params.append('category', options.category);
    if (options?.type) params.append('type', options.type);
    if (options?.startDate) params.append('startDate', options.startDate);
    if (options?.endDate) params.append('endDate', options.endDate);

    const response = await apiClient.get<ApiResponse<{ transactions: AnalyzedTransaction[], total: number, hasMore: boolean }>>(
      `/wallets/${encodeURIComponent(address)}/transactions?${params.toString()}`
    );
    return response.data.data;
  },

  getContractInteractions: async (address: string): Promise<ContractInteraction[]> => {
    const response = await apiClient.get<ApiResponse<ContractInteraction[]>>(
      `/wallets/${encodeURIComponent(address)}/contracts`
    );
    return response.data.data;
  },

  getDeFiActivity: async (address: string): Promise<DeFiActivity> => {
    const response = await apiClient.get<ApiResponse<DeFiActivity>>(
      `/wallets/${encodeURIComponent(address)}/defi`
    );
    return response.data.data;
  },

  getNFTActivity: async (address: string): Promise<NFTActivity> => {
    const response = await apiClient.get<ApiResponse<NFTActivity>>(
      `/wallets/${encodeURIComponent(address)}/nft`
    );
    return response.data.data;
  },

  getPortfolioAnalysis: async (address: string): Promise<unknown> => {
    const response = await apiClient.get<ApiResponse<unknown>>(
      `/wallets/${encodeURIComponent(address)}/portfolio`
    );
    return response.data.data;
  },

  getRiskAnalysis: async (address: string): Promise<unknown> => {
    const response = await apiClient.get<ApiResponse<unknown>>(
      `/wallets/${encodeURIComponent(address)}/risk`
    );
    return response.data.data;
  },

  getBehaviorAnalysis: async (address: string): Promise<unknown> => {
    const response = await apiClient.get<ApiResponse<unknown>>(
      `/wallets/${encodeURIComponent(address)}/behavior`
    );
    return response.data.data;
  },

  refreshWalletData: async (address: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post<ApiResponse<{ success: boolean }>>(
      `/wallets/${encodeURIComponent(address)}/refresh`
    );
    return response.data.data;
  },

  compareWallets: async (addresses: string[]): Promise<unknown> => {
    const response = await apiClient.post<ApiResponse<unknown>>(
      `/wallets/compare`,
      { addresses }
    );
    return response.data.data;
  },

  getSimilarWallets: async (address: string, limit = 10): Promise<unknown> => {
    const response = await apiClient.get<ApiResponse<unknown>>(
      `/wallets/${encodeURIComponent(address)}/similar?limit=${limit}`
    );
    return response.data.data;
  },

  getWalletInsights: async (address: string): Promise<unknown> => {
    const response = await apiClient.get<ApiResponse<unknown>>(
      `/wallets/${encodeURIComponent(address)}/insights`
    );
    return response.data.data;
  },

  exportWalletReport: async (address: string, format: 'pdf' | 'csv' | 'json'): Promise<Blob> => {
    const response = await apiClient.get(
      `/wallets/${encodeURIComponent(address)}/export?format=${format}`,
      { responseType: 'blob' }
    );
    return response.data;
  }
}; 