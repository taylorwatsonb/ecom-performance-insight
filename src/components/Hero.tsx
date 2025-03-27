
import React, { useRef } from 'react';
import { useInViewAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { ArrowUpRight, TrendingUp, Zap } from 'lucide-react';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const isHeadingInView = useInViewAnimation(headingRef);
  const isTextInView = useInViewAnimation(textRef, 200);
  const isBtnInView = useInViewAnimation(btnRef, 400);
  const isStatsInView = useInViewAnimation(statsRef, 600);

  return (
    <section className={cn('flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center', className)}>
      <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-fade-in-up">
        <Zap className="h-4 w-4 mr-1" /> Powered by Core Web Vitals Analysis
      </div>
      
      <h1 
        ref={headingRef}
        className={cn(
          'max-w-3xl mb-6 transition-all duration-700',
          isHeadingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        Optimize Your Store's <span className="text-primary">Performance</span>
      </h1>
      
      <p 
        ref={textRef}
        className={cn(
          'max-w-2xl text-lg text-muted-foreground mb-8 transition-all duration-700',
          isTextInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        Analyze and improve your e-commerce site's performance metrics to 
        <span className="text-primary font-medium"> directly boost conversion rates</span>,
        reduce bounce rates, and enhance the overall user experience.
        <span className="block mt-2 text-sm">
          Our research shows that a 1-second improvement in page load time can lead to a <span className="font-semibold">7% increase in conversions</span>.
        </span>
      </p>
      
      <div 
        ref={btnRef}
        className={cn(
          'transition-all duration-700',
          isBtnInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        <button className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          View Dashboard
        </button>
      </div>

      <div
        ref={statsRef}
        className={cn(
          'grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-3xl transition-all duration-700',
          isStatsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        <div className="flex flex-col items-center bg-card p-4 rounded-lg border">
          <TrendingUp className="h-8 w-8 text-primary mb-2" />
          <span className="text-2xl font-bold">+31%</span>
          <span className="text-sm text-muted-foreground">Avg. Conversion Lift</span>
          <span className="text-xs text-muted-foreground mt-1">For sites with 'Good' Core Web Vitals</span>
        </div>
        <div className="flex flex-col items-center bg-card p-4 rounded-lg border">
          <TrendingUp className="h-8 w-8 text-primary mb-2" />
          <span className="text-2xl font-bold">-24%</span>
          <span className="text-sm text-muted-foreground">Bounce Rate Reduction</span>
          <span className="text-xs text-muted-foreground mt-1">Average across 500+ e-commerce sites</span>
        </div>
        <div className="flex flex-col items-center bg-card p-4 rounded-lg border">
          <TrendingUp className="h-8 w-8 text-primary mb-2" />
          <span className="text-2xl font-bold">+15%</span>
          <span className="text-sm text-muted-foreground">Revenue Increase</span>
          <span className="text-xs text-muted-foreground mt-1">Based on $1M annual revenue baseline</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
