
import React from 'react';
import { useInView } from '@/utils/animations';
import { Briefcase, Calendar, ArrowRight } from 'lucide-react';

// Experience data
const experiences = [
  {
    title: 'Research Intern',
    company: 'Indian Institute of Technology, Roorkee',
    period: 'May 2025 - July 2025',
    description: 'FPGA-Based TinyML Research: Created and deployed TinyML models for real-time inference on ESP32/Arduino, including a 90%+ accuracy OCR model. RISC-V Simulation & Verification: Utilized simulation-driven development tools to implement and verify programs on RISC-V core, reducing verification time by 30%. Hardware-Software Co-Design: Optimized RGB-to-Grayscale algorithm achieving 4x speedup on simulated FPGA platform.',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2486&auto=format&fit=crop'
  },
  {
    title: 'Co-founder',
    company: 'CropSky, VITTBI-Preincubated Startup',
    period: 'Aug 2024 - Present',
    description: 'AI-Powered AgriTech System: Led development of AI drone system for crop health monitoring using NDVI technology, boosting farm productivity by 40%. Full-Stack Product Development: Built real-time farm monitoring mobile app and dashboard utilizing NDVI analysis to increase crop yields by 15% and reduce water/fertilizer use by 30%. Algorithm Optimization: Developed path planning algorithms reducing operational costs by 20%.',
    logo: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=3498&auto=format&fit=crop'
  }
];

export const Experience: React.FC = () => {
  const { ref, isInView } = useInView(0.1);
  
  return (
    <section id="experience" className="section bg-secondary/30">
      <div ref={ref} className={`transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Professional journey and expertise</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:transform md:-translate-x-px"></div>
          
          {/* Timeline items */}
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`mb-12 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Content */}
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div 
                  className={`glass-card p-6 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} ${
                    isInView ? `animate-${index % 2 === 0 ? 'slide-left' : 'slide-right'}` : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <img 
                        src={exp.logo} 
                        alt={exp.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{exp.period}</span>
                  </div>
                  
                  <p className="mb-4">{exp.description}</p>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2" style={{ top: `${index * 12 + 2}rem` }}>
                <div className={`w-5 h-5 rounded-full border-4 border-background bg-primary transition-transform duration-500 ${isInView ? 'scale-100' : 'scale-0'}`}></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a href="https://coral-camala-8.tiiny.site/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-medium hover:underline">
            View Full Resume
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
