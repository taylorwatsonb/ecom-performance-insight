
import { useEffect, useState, useRef } from 'react';

export function useInViewAnimation(ref: React.RefObject<HTMLElement>, delay: number = 0) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add a small delay for staggered animations
        setTimeout(() => {
          setIsInView(entry.isIntersecting);
        }, delay);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px', // Trigger animation slightly before element is in view
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, delay]);

  return isInView;
}

export function getAnimationClass(isInView: boolean, baseAnimation: string) {
  return isInView 
    ? `animate-${baseAnimation} opacity-100` 
    : 'opacity-0 transform translate-y-4';
}

export function useStaggeredAnimation(count: number, staggerDelay: number = 100) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewAnimation(containerRef);
  
  useEffect(() => {
    if (isInView) {
      const items = Array(count).fill(false);
      const timers: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < count; i++) {
        const timer = setTimeout(() => {
          setVisibleItems(prev => {
            const newArray = [...prev];
            newArray[i] = true;
            return newArray;
          });
        }, i * staggerDelay);
        
        timers.push(timer);
      }
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    } else {
      setVisibleItems(Array(count).fill(false));
    }
  }, [count, staggerDelay, isInView]);
  
  return { containerRef, visibleItems };
}

export function usePulseAnimation() {
  const [isPulsing, setIsPulsing] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true);
      
      const timeout = setTimeout(() => {
        setIsPulsing(false);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return isPulsing;
}

export function useHoverAnimation() {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
