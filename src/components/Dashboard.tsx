
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import MetricsCard from './MetricsCard';
import PerformanceChart from './PerformanceChart';
import OptimizationSection from './OptimizationSection';
import BusinessImpactSection from './BusinessImpact';
import { 
  performanceMetrics, 
  historicalData, 
  optimizationRecommendations,
  businessImpacts,
  deviceData
} from '@/lib/data';
import { useInViewAnimation } from '@/lib/animations';

interface DashboardProps {
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInViewAnimation(titleRef);

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((metric, index) => (
          <MetricsCard 
            key={metric.name}
            metric={metric}
            index={index}
          />
        ))}
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
