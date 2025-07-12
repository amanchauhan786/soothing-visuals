
import React, { useState, useRef, useEffect } from 'react';
import { useInView } from '@/utils/animations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Gallery images related to your work and expertise
const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=5530&auto=format&fit=crop',
    alt: 'FPGA Circuit Board - Hardware Research at IIT Roorkee',
    category: 'Research'
  },
  {
    url: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=3498&auto=format&fit=crop',
    alt: 'AgriTech Drone - CropSky AI-Powered Monitoring System',
    category: 'Innovation'
  },
  {
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2676&auto=format&fit=crop',
    alt: 'Disaster Management - Nirakshit Fault Detection System',
    category: 'AI/ML'
  },
  {
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3543&auto=format&fit=crop',
    alt: 'Programming and Development Environment',
    category: 'Development'
  },
  {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2670&auto=format&fit=crop',
    alt: 'AI Security System - SafeNest Geofencing Technology',
    category: 'Security'
  },
  {
    url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=2670&auto=format&fit=crop',
    alt: 'Air Quality Monitoring - Airly Vision Data Analysis',
    category: 'Environment'
  },
  {
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
    alt: 'Travel Platform - Vihara Route Optimization',
    category: 'Full-Stack'
  },
  {
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2486&auto=format&fit=crop',
    alt: 'Academic Excellence - VIT University Campus',
    category: 'Education'
  },
];

export const Gallery: React.FC = () => {
  const { ref, isInView } = useInView(0.1);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Auto-scroll functionality
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isInView && !isScrolling) {
      intervalId = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
      }, 4000);
    }
    
    return () => clearInterval(intervalId);
  }, [isInView, isScrolling]);
  
  // Scroll to active image
  useEffect(() => {
    if (galleryRef.current) {
      const scrollAmount = activeIndex * (galleryRef.current.scrollWidth / galleryImages.length);
      galleryRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);
  
  const handleNext = () => {
    setIsScrolling(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    setTimeout(() => setIsScrolling(false), 1000);
  };
  
  const handlePrev = () => {
    setIsScrolling(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
    setTimeout(() => setIsScrolling(false), 1000);
  };
  
  return (
    <section id="gallery" className="section bg-secondary/30">
      <div ref={ref} className={`transition-all duration-1000 transform ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">Visual journey through my technical projects and innovations</p>
        </div>
        
        {/* Gallery carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background transition-colors duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background transition-colors duration-300"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Gallery container */}
          <div 
            ref={galleryRef}
            className="overflow-hidden rounded-xl shadow-lg"
          >
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {galleryImages.map((image, index) => (
                <div key={index} className="min-w-full relative group">
                  <div className="relative h-[50vh] overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                        activeIndex === index ? 'animate-pulse' : ''
                      }`}
                      style={{ 
                        transform: `scale(${isInView ? '1.02' : '1'})`,
                        filter: activeIndex === index ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9)',
                        animation: activeIndex === index && isInView ? 'float 6s ease-in-out infinite' : 'none'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20 group-hover:from-background/60 transition-all duration-500"></div>
                    
                    {/* Animated overlay effects */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-4 right-4">
                        <div className="w-3 h-3 bg-primary rounded-full animate-ping"></div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-100"></div>
                      </div>
                    </div>
                    
                    {/* Enhanced image caption with category */}
                    <div className="absolute bottom-8 left-8 right-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/80 text-primary-foreground rounded-full backdrop-blur-sm">
                          {image.category}
                        </span>
                      </div>
                      <p className="text-white text-lg font-medium drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced gallery indicators with hover effects */}
          <div className="flex justify-center mt-8 gap-3">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsScrolling(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsScrolling(false), 1000);
                }}
                className={`group relative transition-all duration-500 hover:scale-125 ${
                  activeIndex === index 
                    ? 'w-12 h-3 bg-primary shadow-lg shadow-primary/50' 
                    : 'w-3 h-3 bg-muted-foreground/40 hover:bg-muted-foreground/80'
                } rounded-full overflow-hidden`}
                aria-label={`Go to ${image.category}: ${image.alt}`}
              >
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/20 to-transparent animate-pulse"></div>
                )}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-background/90 backdrop-blur-sm text-xs px-2 py-1 rounded whitespace-nowrap">
                    {image.category}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
