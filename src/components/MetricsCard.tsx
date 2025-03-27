
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { PerformanceMetric } from '@/lib/data';
import { useInViewAnimation } from '@/lib/animations';

interface MetricsCardProps {
  metric: PerformanceMetric;
  index: number;
  className?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ metric, index, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewAnimation(cardRef, index * 100);
  
  const getStatusColor = (status: PerformanceMetric['status']) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'needs-improvement':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'poor':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getValueColor = (status: PerformanceMetric['status']) => {
    switch (status) {
      case 'good':
        return 'text-green-600 dark:text-green-400';
      case 'needs-improvement':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'poor':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        'rounded-lg border bg-card p-6 shadow-sm transition-all duration-500',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', getStatusColor(metric.status))}>
            {metric.status === 'good' ? 'Good' : metric.status === 'needs-improvement' ? 'Needs Improvement' : 'Poor'}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-medium tracking-tight">{metric.name}</h3>
        <p className="text-sm text-muted-foreground">{metric.description}</p>
      </div>
      
      <div className="mt-6 flex items-baseline">
        <span className={cn('text-3xl font-semibold', getValueColor(metric.status))}>
          {metric.value}{metric.unit}
        </span>
        <span className="ml-2 text-sm text-muted-foreground">
          / Target: {metric.target}{metric.unit}
        </span>
      </div>
    </div>
  );
};

export default MetricsCard;
