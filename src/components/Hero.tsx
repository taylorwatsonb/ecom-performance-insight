
import React, { useRef } from 'react';
import { useInViewAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  
  const isHeadingInView = useInViewAnimation(headingRef);
  const isTextInView = useInViewAnimation(textRef, 200);
  const isBtnInView = useInViewAnimation(btnRef, 400);

  return (
    <section className={cn('flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center', className)}>
      <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-fade-in-up">
        Ecommerce Performance Dashboard
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
        Analyze and improve your e-commerce site's performance metrics to boost conversion rates,
        reduce bounce rates, and enhance the overall user experience.
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
    </section>
  );
};

export default Hero;
