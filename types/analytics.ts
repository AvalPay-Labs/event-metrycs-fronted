export interface OverallMetrics {
    totalEvents: number;
    eventByType: {
      _id: string;
      count: number;
    }[];
    totalAttendees: number;
    totalNewWallets: number;
    totalCosts: number;
}
  
export interface UserMetrics {
    _id: string;
    userName: string;
    eventCount: number;
    totalAttendees: number;
    totalNewWallets: number;
    totalCost: number;
    efficiency: number;
}
  
export interface TimelineMetric {
    _id: string;
    date: string;
    totalCost: number;
    confirmedAttendees: number;
    newWallets: number;
}
  
export interface RegionMetrics {
    _id: string;
    region: string;
    eventCount: number;
    totalAttendees: number;
    totalNewWallets: number;
    totalCost: number;
}
  
export interface WalletMetrics {
    totalNewWallets: number;
    transactionsByType: {
      _id: string;
      wallet: string;
      totalCount: number;
    }[];
    costPerWallet: number;
}