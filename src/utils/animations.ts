
import { useEffect, useState, useRef } from 'react';

// Hook to detect when an element is in viewport
export function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [threshold]);

  return { ref, isInView };
}

// Hook for typewriter effect
export function useTypewriter(text: string, speed = 50, delay = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (delay > 0) {
      timer = setTimeout(() => {
        startTyping();
      }, delay);
      return () => clearTimeout(timer);
    } else {
      startTyping();
    }
    
    function startTyping() {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText((prev) => prev + text.charAt(index));
          index++;
        } else {
          setIsTyping(false);
          setIsDone(true);
          clearInterval(interval);
        }
      }, speed);
      
      return () => clearInterval(interval);
    }
  }, [text, speed, delay]);

  return { displayText, isTyping, isDone };
}

// Hook for image carousel
export function useImageCarousel(images: string[], interval = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return {
    currentImage: images[currentIndex],
    currentIndex,
    setCurrentIndex,
    next: () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length),
    prev: () => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length),
  };
}

// Hook for theme toggle
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
