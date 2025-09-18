"use client";

import { useQuery } from 'react-query';
import { 
  getOverallMetrics, 
  getUserMetrics, 
  getTimelineMetrics, 
  getRegionMetrics, 
  getWalletMetrics 
} from '../api/analytics-api';

export function useAnalytics() {
  const overallMetricsQuery = useQuery('overallMetrics', getOverallMetrics);
  const userMetricsQuery = useQuery('userMetrics', getUserMetrics);
  const regionMetricsQuery = useQuery('regionMetrics', getRegionMetrics);
  const walletMetricsQuery = useQuery('walletMetrics', getWalletMetrics);

  return {
    overallMetricsQuery,
    userMetricsQuery,
    regionMetricsQuery,
    walletMetricsQuery,
  };
}

export function useTimelineMetrics(startDate?: string, endDate?: string) {
  return useQuery(
    ['timelineMetrics', startDate, endDate], 
    () => getTimelineMetrics(startDate, endDate),
    {
      enabled: !!startDate && !!endDate
    }
  );
}