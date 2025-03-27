
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import MetricsCard from './MetricsCard';
import PerformanceChart from './PerformanceChart';
import OptimizationSection from './OptimizationSection';
import BusinessImpactSection from './BusinessImpact';
import DeviceBreakdown from './DeviceBreakdown';
import TimeComparison from './TimeComparison';
import FilterBar from './FilterBar';
import { 
  performanceMetrics, 
  historicalData, 
  optimizationRecommendations,
  businessImpacts,
  deviceData,
  timeComparisonData
} from '@/lib/data';
import { useInViewAnimation, useStaggeredAnimation } from '@/lib/animations';

interface DashboardProps {
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInViewAnimation(titleRef);
  const { containerRef, visibleItems } = useStaggeredAnimation(performanceMetrics.length, 150);
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
      
      <FilterBar 
        className="mb-8 animate-fade-in" 
        onFilterChange={handleFilterChange} 
      />
      
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {performanceMetrics.map((metric, index) => (
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
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TimeComparison
          title="Performance Comparison"
          description="Current period vs. previous period"
          data={timeComparisonData}
        />
        <DeviceBreakdown data={deviceData} />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <PerformanceChart
          title="Performance Metrics Over Time"
          description="Track your progress on core web vitals over the past 6 months"
          data={historicalData}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <OptimizationSection recommendations={optimizationRecommendations} />
        <BusinessImpactSection impacts={businessImpacts} />
      </div>
    </div>
  );
};

export default Dashboard;
