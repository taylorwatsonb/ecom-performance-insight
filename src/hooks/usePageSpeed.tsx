
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { 
  runPageSpeedAnalysis, 
  mapPageSpeedToMetrics, 
  generateHistoricalData,
  generateBusinessImpacts,
  PageSpeedResponse,
  getApiKey,
  setApiKey
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
  hasApiKey: boolean;
}

export function usePageSpeed(url: string): PageSpeedResults {
  const [deviceType, setDeviceType] = useState<'mobile' | 'desktop'>('mobile');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  
  // Set the provided API key on first render
  useEffect(() => {
    const currentKey = getApiKey();
    if (!currentKey || currentKey === 'yourAPIKey') {
      // Set the new API key
      setApiKey('AIzaSyDJkFmwwQKjHgS-Lk28NnwAJ06NWEBSiKU');
      setHasApiKey(true);
    } else {
      setHasApiKey(Boolean(currentKey) && currentKey !== 'yourAPIKey');
    }
  }, []);
  
  const { 
    data, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['pagespeed', url, deviceType, hasApiKey],
    queryFn: async () => {
      try {
        // Force a recheck of the API key before making the request
        const key = getApiKey();
        if (key === 'yourAPIKey') {
          setHasApiKey(false);
          throw new Error('API_KEY_INVALID');
        }
        
        const response = await runPageSpeedAnalysis(url, deviceType);
        setLastUpdated(new Date());
        return response;
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'API_KEY_MISSING') {
            // Don't show toast for missing API key as we'll handle this case in the UI
            setHasApiKey(false);
          } else if (error.message === 'API_KEY_INVALID') {
            toast({
              title: "Invalid API Key",
              description: "The API key provided is invalid or is the example placeholder.",
              variant: "destructive",
            });
            setHasApiKey(false);
          } else {
            toast({
              title: "Error fetching performance data",
              description: error.message || "An unknown error occurred",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Error fetching performance data",
            description: "An unknown error occurred",
            variant: "destructive",
          });
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    enabled: Boolean(url) && (hasApiKey || !hasApiKey), // Run even without API key to get mock data
  });
  
  const metrics = data ? mapPageSpeedToMetrics(data) : [];
  const historicalData = data ? generateHistoricalData(data) : { labels: [], datasets: [] };
  const businessImpacts = data ? generateBusinessImpacts(metrics) : [];
  
  // Update the API key status when the user sets a new key
  const handleApiKeyChange = () => {
    const key = getApiKey();
    const isValidKey = Boolean(key) && key !== 'yourAPIKey';
    setHasApiKey(isValidKey);
    return isValidKey;
  };
  
  // Add an API key check to refetch
  const refetchWithKeyCheck = () => {
    if (handleApiKeyChange()) {
      refetch();
    }
  };
  
  return {
    metrics,
    historicalData,
    businessImpacts,
    isLoading,
    error: error as Error | null,
    lastUpdated,
    deviceType,
    setDeviceType,
    refetch: refetchWithKeyCheck,
    hasApiKey,
  };
}
