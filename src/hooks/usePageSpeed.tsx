
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { 
  runPageSpeedAnalysis, 
  mapPageSpeedToMetrics, 
  generateHistoricalData,
  generateBusinessImpacts,
  PageSpeedResponse 
} from '@/services/pagespeedService';
import { PerformanceMetric } from '@/lib/data';

interface PageSpeedResults {
  metrics: PerformanceMetric[];
  historicalData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
  businessImpacts: {
    metric: string;
    current: number;
    projected: number;
    unit: string;
    improvement: number;
  }[];
  isLoading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
  deviceType: 'mobile' | 'desktop';
  setDeviceType: (type: 'mobile' | 'desktop') => void;
  refetch: () => void;
}

export function usePageSpeed(url: string): PageSpeedResults {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>('mobile');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const { 
    data, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['pagespeed', url, deviceType],
    queryFn: async () => {
      try {
        const response = await runPageSpeedAnalysis(url, deviceType);
        setLastUpdated(new Date());
        return response;
      } catch (error) {
        toast({
          title: "Error fetching performance data",
          description: error instanceof Error ? error.message : "An unknown error occurred",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
  
  const metrics = data ? mapPageSpeedToMetrics(data) : [];
  const historicalData = data ? generateHistoricalData(data) : { labels: [], datasets: [] };
  const businessImpacts = data ? generateBusinessImpacts(metrics) : [];
  
  return {
    metrics,
    historicalData,
    businessImpacts,
    isLoading,
    error: error as Error | null,
    lastUpdated,
    deviceType,
    setDeviceType,
    refetch,
  };
}
