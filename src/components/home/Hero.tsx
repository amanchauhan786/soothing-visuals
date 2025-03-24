
import React, { useEffect, useRef } from 'react';
import { useTypewriter } from '@/utils/animations';
import { ArrowRight } from 'lucide-react';

// Sample profile images (using Unsplash images only)
const profileImages = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2584&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2712&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop'
];

export const Hero: React.FC = () => {
  const { displayText: title } = useTypewriter(' AMAN CHAUHAN', 100, 500);
  
  // Refs for image elements
  const imageRefs = [useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null), useRef<HTMLImageElement>(null)];
  
  // Carousel animation
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      // Hide current image
      if (imageRefs[currentIndex].current) {
        imageRefs[currentIndex].current!.classList.remove('opacity-100');
        imageRefs[currentIndex].current!.classList.add('opacity-0');
      }
      
      // Update index
      currentIndex = (currentIndex + 1) % imageRefs.length;
      
      // Show next image
      if (imageRefs[currentIndex].current) {
        imageRefs[currentIndex].current!.classList.remove('opacity-0');
        imageRefs[currentIndex].current!.classList.add('opacity-100');
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent to-secondary/40 dark:to-secondary/10"></div>
      
      {/* Floating particles background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/10 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 stagger-animation">
          <div className="mb-2 inline-block">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-accent/20 text-accent-foreground rounded-full">
              PawanCoder786
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 relative">
            <span className="inline-block">{title}</span>
            <span className="inline-block w-1 h-8 md:h-12 bg-primary animate-blink ml-1"></span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Creating elegant user experiences with a focus on minimalism, function, and attention to detail.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowRight className="inline-block ml-2 w-4 h-4" />
            </a>
            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 mt-16 lg:mt-0">
          <div className="relative h-80 md:h-96 w-full max-w-md mx-auto">
            {profileImages.map((src, index) => (
              <img
                key={index}
                ref={imageRefs[index]}
                src={src}
                alt={`Profile ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover rounded-3xl shadow-xl transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            
            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
