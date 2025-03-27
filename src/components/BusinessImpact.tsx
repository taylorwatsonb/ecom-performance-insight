
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { BusinessImpact } from '@/lib/data';
import { useInViewAnimation } from '@/lib/animations';
import { ArrowUp } from 'lucide-react';

interface BusinessImpactProps {
  impacts: BusinessImpact[];
  className?: string;
}

const BusinessImpactSection: React.FC<BusinessImpactProps> = ({ impacts, className }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewAnimation(sectionRef);

  return (
    <div 
      ref={sectionRef}
      className={cn(
        'rounded-lg border bg-card p-6 shadow-sm transition-all duration-700',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      <h3 className="text-xl font-medium tracking-tight mb-4">Business Impact Projections</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {impacts.map((impact, index) => (
          <div 
            key={impact.metric}
            className="rounded-lg border p-4 transition-all hover:bg-muted/50"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: isInView ? 'fade-in 0.5s ease-out forwards' : 'none',
              opacity: isInView ? 1 : 0
            }}
          >
            <h4 className="text-sm font-medium text-muted-foreground mb-1">{impact.metric}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{impact.projected}{impact.unit}</span>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span className="text-sm font-medium">{impact.improvement}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Current: {impact.current}{impact.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessImpactSection;
