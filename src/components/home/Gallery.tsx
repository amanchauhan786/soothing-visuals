
import React, { useState, useRef, useEffect } from 'react';
import { useInView } from '@/utils/animations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample gallery images
const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2558&auto=format&fit=crop',
    alt: 'Clean workspace with computer',
  },
  {
    url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2670&auto=format&fit=crop',
    alt: 'Designer tools and materials',
  },
  {
    url: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=2574&auto=format&fit=crop',
    alt: 'Sketching design concepts',
  },
  {
    url: 'https://images.unsplash.com/photo-1518291344630-4857135fb581?q=80&w=2669&auto=format&fit=crop',
    alt: 'Computer with design software',
  },
  {
    url: 'https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?q=80&w=2574&auto=format&fit=crop',
    alt: 'Design thinking workshop',
  },
  {
    url: 'https://images.unsplash.com/photo-1688800606330-15275c1de978?q=80&w=2669&auto=format&fit=crop',
    alt: 'Prototype testing session',
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
      <div ref={ref} className={`transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">Visual showcase of design work and process</p>
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
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {galleryImages.map((image, index) => (
                <div key={index} className="min-w-full">
                  <div className="relative h-[50vh] overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
                      style={{ 
                        transform: `scale(${isInView ? '1.05' : '1'})`,
                        animation: isInView ? 'kenBurns 20s alternate infinite ease-in-out' : 'none',
                        animationDelay: `${index * 2}s`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
                    
                    {/* Image caption */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-white text-lg font-medium drop-shadow-md">{image.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gallery indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsScrolling(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsScrolling(false), 1000);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'w-8 bg-primary' 
                    : 'bg-muted-foreground/40 hover:bg-muted-foreground'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
