
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { OptimizationRecommendation } from '@/lib/data';
import { useInViewAnimation } from '@/lib/animations';

interface OptimizationSectionProps {
  recommendations: OptimizationRecommendation[];
  className?: string;
}

const OptimizationSection: React.FC<OptimizationSectionProps> = ({ recommendations, className }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewAnimation(sectionRef);

  const getImpactColor = (impact: OptimizationRecommendation['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'medium':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getEffortColor = (effort: OptimizationRecommendation['effort']) => {
    switch (effort) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div 
      ref={sectionRef}
      className={cn(
        'rounded-lg border bg-card p-6 shadow-sm transition-all duration-700',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      <h3 className="text-xl font-medium tracking-tight mb-4">Optimization Recommendations</h3>
      
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div 
            key={recommendation.id}
            className="rounded-lg border p-4 transition-all hover:bg-muted/50"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: isInView ? 'fade-in 0.5s ease-out forwards' : 'none',
              opacity: isInView ? 1 : 0
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <h4 className="text-lg font-medium">{recommendation.title}</h4>
              <div className="flex flex-wrap gap-2">
                <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', getImpactColor(recommendation.impact))}>
                  Impact: {recommendation.impact}
                </span>
                <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', getEffortColor(recommendation.effort))}>
                  Effort: {recommendation.effort}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {recommendation.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {recommendation.metrics.map(metric => (
                <span 
                  key={metric}
                  className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptimizationSection;
