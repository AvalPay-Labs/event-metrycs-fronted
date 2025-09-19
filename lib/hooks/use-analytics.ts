"use client";

import { useQuery } from '@tanstack/react-query';
import { 
  getOverallMetrics, 
  getUserMetrics, 
  getTimelineMetrics, 
  getRegionMetrics, 
  getWalletMetrics 
} from '../api/analytics-api';

export function useAnalytics() {
  const overallMetricsQuery = useQuery({ queryKey: ['overallMetrics'], queryFn: getOverallMetrics });
  const userMetricsQuery = useQuery({ queryKey: ['userMetrics'], queryFn: getUserMetrics });
  const regionMetricsQuery = useQuery({ queryKey: ['regionMetrics'], queryFn: getRegionMetrics });
  const walletMetricsQuery = useQuery({ queryKey: ['walletMetrics'], queryFn: getWalletMetrics });

  return {
    overallMetricsQuery,
    userMetricsQuery,
    regionMetricsQuery,
    walletMetricsQuery,
  };
}

export function useTimelineMetrics(startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: ['timelineMetrics', startDate, endDate],
    queryFn: () => getTimelineMetrics(startDate, endDate),
    enabled: !!startDate && !!endDate
  });
}