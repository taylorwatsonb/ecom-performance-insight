
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import MetricsCard from './MetricsCard';
import PerformanceChart from './PerformanceChart';
import OptimizationSection from './OptimizationSection';
import BusinessImpactSection from './BusinessImpact';
import DeviceBreakdown from './DeviceBreakdown';
import TimeComparison from './TimeComparison';
import FilterBar from './FilterBar';
import UrlInput from './UrlInput';
import { usePageSpeed } from '@/hooks/usePageSpeed';
import { 
  optimizationRecommendations,
  deviceData,
  timeComparisonData
} from '@/lib/data';
import { useInViewAnimation, useStaggeredAnimation } from '@/lib/animations';
import { Laptop, Smartphone } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardProps {
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInViewAnimation(titleRef);
  const [url, setUrl] = useState('https://www.example.com');
  
  const {
    metrics,
    historicalData,
    businessImpacts,
    isLoading,
    lastUpdated,
    deviceType,
    setDeviceType,
    refetch
  } = usePageSpeed(url);
  
  const { containerRef, visibleItems } = useStaggeredAnimation(metrics.length || 4, 150);
  
  const [activeFilters, setActiveFilters] = useState({
    dateRange: '30d',
    device: 'all',
    page: 'all',
  });

  const handleFilterChange = (filters: {
    dateRange: string;
    device: string;
    page: string;
  }) => {
    setActiveFilters(filters);
    // In a real application, you would fetch new data based on these filters
    console.log('Filters changed:', filters);
  };

  const handleAnalyze = (newUrl: string) => {
    setUrl(newUrl);
  };

  return (
    <div className={cn('w-full max-w-7xl mx-auto px-4 py-8', className)}>
      <h2 
        ref={titleRef}
        className={cn(
          'text-3xl font-medium tracking-tight mb-8 transition-all duration-700',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        Performance Dashboard
      </h2>
      
      <UrlInput 
        onAnalyze={handleAnalyze} 
        isLoading={isLoading} 
        lastUpdated={lastUpdated}
        onRefresh={refetch}
      />
      
      <div className="flex justify-between items-center mb-6">
        <FilterBar 
          className="animate-fade-in" 
          onFilterChange={handleFilterChange} 
        />
        
        <ToggleGroup type="single" value={deviceType} onValueChange={(value) => value && setDeviceType(value as 'mobile' | 'desktop')}>
          <ToggleGroupItem value="mobile" aria-label="Mobile View">
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile
          </ToggleGroupItem>
          <ToggleGroupItem value="desktop" aria-label="Desktop View">
            <Laptop className="h-4 w-4 mr-2" />
            Desktop
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {isLoading ? (
          // Skeleton loaders for metrics cards
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="mt-6">
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))
        ) : metrics.length > 0 ? (
          metrics.map((metric, index) => (
            <MetricsCard 
              key={metric.name}
              metric={metric}
              index={index}
              className={cn(
                'transition-all duration-500 transform',
                visibleItems[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              )}
            />
          ))
        ) : (
          // Fallback when no metrics data is available
          <div className="col-span-full text-center p-6">
            <p className="text-muted-foreground">
              No performance data available. Click "Analyze Performance" to fetch data.
            </p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TimeComparison
          title="Performance Comparison"
          description="Current period vs. previous period"
          data={timeComparisonData}
        />
        <DeviceBreakdown data={deviceData} />
      </div>
      
      {!isLoading && historicalData.labels.length > 0 && (
        <div className="grid grid-cols-1 gap-6 mb-8">
          <PerformanceChart
            title="Performance Metrics Over Time"
            description="Track your progress on core web vitals over time"
            data={historicalData}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <OptimizationSection recommendations={optimizationRecommendations} />
        <BusinessImpactSection impacts={businessImpacts.length > 0 ? businessImpacts : []} />
      </div>
    </div>
  );
};

export default Dashboard;
