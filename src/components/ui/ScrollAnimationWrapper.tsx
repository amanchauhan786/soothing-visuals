import React, { useEffect, useRef } from 'react';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'bounce-in';
  delay?: number;
  duration?: number;
  className?: string;
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.transitionDelay = `${delay}ms`;
          element.style.transitionDuration = `${duration}ms`;
          element.classList.add('animate-visible');
          observer.unobserve(element);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, duration]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-up':
        return 'animate-scroll-fade-up';
      case 'fade-down':
        return 'animate-scroll-fade-down';
      case 'fade-left':
        return 'animate-scroll-fade-left';
      case 'fade-right':
        return 'animate-scroll-fade-right';
      case 'scale-up':
        return 'animate-scroll-scale-up';
      case 'bounce-in':
        return 'animate-scroll-bounce-in';
      default:
        return 'animate-scroll-fade-up';
    }
  };

  return (
    <div 
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;