
import React, { useState, useRef, useEffect } from 'react';
import { useInView } from '@/utils/animations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import the new tech workspace images
import techWorkspace1 from '@/assets/tech-workspace-1.jpg';
import techWorkspace2 from '@/assets/tech-workspace-2.jpg';
import techWorkspace3 from '@/assets/tech-workspace-3.jpg';
import techWorkspace4 from '@/assets/tech-workspace-4.jpg';
import techWorkspace5 from '@/assets/tech-workspace-5.jpg';

// Gallery images related to your work and expertise journey
const galleryImages = [
  {
    url: techWorkspace1,
    alt: 'Modern Tech Workspace - Multi-monitor Development Setup',
    category: 'Workspace'
  },
  {
    url: techWorkspace2,
    alt: 'RISC-V Assembly Development - ESP32 & Arduino Programming',
    category: 'Hardware'
  },
  {
    url: techWorkspace3,
    alt: 'FPGA Development Environment - Xilinx Vivado Workspace',
    category: 'Research'
  },
  {
    url: techWorkspace4,
    alt: 'AI/ML Development Setup - TensorFlow & PyTorch Environment',
    category: 'AI/ML'
  },
  {
    url: techWorkspace5,
    alt: 'Drone Development Lab - CropSky AgriTech Innovation',
    category: 'Innovation'
  },
  {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=5530&auto=format&fit=crop',
    alt: 'FPGA Circuit Board - Hardware Research at IIT Roorkee',
    category: 'Research'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop',
    alt: 'ESP32 Microcontroller - TinyML and IoT Development',
    category: 'Hardware'
  },
  {
    url: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=3498&auto=format&fit=crop',
    alt: 'AgriTech Drone - CropSky AI-Powered Monitoring System',
    category: 'Innovation'
  },
  {
    url: 'https://images.unsplash.com/photo-1574781330855-d0db2706b3d0?q=80&w=2670&auto=format&fit=crop',
    alt: 'TinyML Models - ESP32/Arduino Real-time Inference',
    category: 'AI/ML'
  },
  {
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2676&auto=format&fit=crop',
    alt: 'Disaster Management - Nirakshit Fault Detection System',
    category: 'AI/ML'
  },
  {
    url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=2670&auto=format&fit=crop',
    alt: 'Air Quality Monitoring - Airly Vision Data Analysis',
    category: 'Environment'
  },
  {
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3543&auto=format&fit=crop',
    alt: 'Programming Environment - Code Development Setup',
    category: 'Development'
  },
  {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2670&auto=format&fit=crop',
    alt: 'AI Security System - SafeNest Geofencing Technology',
    category: 'Security'
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
  {
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop',
    alt: 'Machine Learning Operations - MLOps for Generative AI',
    category: 'AI/ML'
  },
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2584&auto=format&fit=crop',
    alt: 'Technical Leadership - Full-Cycle Project Management',
    category: 'Leadership'
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
  
  // Fixed smooth transition animation
  useEffect(() => {
    // No need for scroll behavior since we're using transform
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
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {galleryImages.map((image, index) => (
                <div key={index} className="min-w-full relative group">
                  <div className="relative h-[50vh] overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      style={{ 
                        filter: activeIndex === index ? 'brightness(1)' : 'brightness(0.9)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                    
                    {/* Always visible image caption */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/90 text-primary-foreground rounded-full backdrop-blur-sm">
                          {image.category}
                        </span>
                      </div>
                      <p className="text-white text-lg font-medium drop-shadow-lg">
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
                className={`transition-all duration-300 hover:scale-110 ${
                  activeIndex === index 
                    ? 'w-12 h-3 bg-primary' 
                    : 'w-3 h-3 bg-muted-foreground/50 hover:bg-muted-foreground/80'
                } rounded-full`}
                aria-label={`Go to ${image.category}: ${image.alt}`}
              >
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
