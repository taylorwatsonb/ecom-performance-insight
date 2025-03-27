
import { useEffect, useState } from 'react';

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
