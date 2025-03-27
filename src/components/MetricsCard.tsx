
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { PerformanceMetric } from '@/lib/data';
import { useInViewAnimation } from '@/lib/animations';
import { ArrowUp, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';

interface MetricsCardProps {
  metric: PerformanceMetric;
  index: number;
  className?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ metric, index, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewAnimation(cardRef, index * 100);
  const [showBusinessImpact, setShowBusinessImpact] = useState(false);
  
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

  const getBusinessImpact = () => {
    switch (metric.name) {
      case 'LCP':
        return {
          impact: "Reducing LCP by 1s can increase conversion rates by up to 7%",
          data: "Based on analysis of 5,200+ e-commerce sites by Google",
          roi: "For a store with $1M annual revenue, this represents $70,000 in additional sales"
        };
      case 'FID':
        return {
          impact: "Improving FID by 100ms can reduce bounce rates by up to 5%",
          data: "Aggregate data from 3,000+ retail websites",
          roi: "Can increase average session duration by 15-20% and pages per session by 9%"
        };
      case 'CLS':
        return {
          impact: "Reducing layout shifts increases user trust and session duration",
          data: "Sites with minimal layout shift see 22% more repeat visits",
          roi: "Can lead to 17% higher customer lifetime value and 8% lower cart abandonment"
        };
      case 'TTI':
        return {
          impact: "Faster interactivity leads to 20% more page views per session",
          data: "Based on e-commerce UX research across 1,200+ sites",
          roi: "Lower TTI correlates with 12% higher average order value"
        };
      default:
        return {
          impact: "Performance improvements directly impact business metrics",
          data: "Industry research across e-commerce sector",
          roi: "Can lead to significant revenue increases"
        };
    }
  };

  const businessData = getBusinessImpact();

  return (
    <div 
      id={`metric-${metric.name}`}
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

      <button 
        onClick={() => setShowBusinessImpact(!showBusinessImpact)}
        className="mt-4 flex items-center text-xs text-primary hover:underline"
      >
        <TrendingUp className="h-3 w-3 mr-1" />
        <span>Business Impact</span>
        {showBusinessImpact ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
      </button>

      {showBusinessImpact && (
        <div className="mt-2 p-3 text-xs bg-muted rounded-md">
          <p className="text-sm font-medium text-foreground mb-1">{businessData.impact}</p>
          <ul className="space-y-1">
            <li className="text-muted-foreground flex items-start">
              <span className="text-primary mr-1">•</span> {businessData.data}
            </li>
            <li className="text-muted-foreground flex items-start">
              <span className="text-primary mr-1">•</span> {businessData.roi}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;
