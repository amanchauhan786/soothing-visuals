
import React from 'react';
import { useInView } from '@/utils/animations';
import { Briefcase, Calendar, ArrowRight } from 'lucide-react';

// Sample experience data
const experiences = [
  {
    title: 'Senior Product Designer',
    company: 'Tech Innovations Inc.',
    period: '2020 - Present',
    description: 'Led the design system for a flagship product, improving design consistency and development speed by 40%.',
    logo: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=2476&auto=format&fit=crop',
    color: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    title: 'UX/UI Designer',
    company: 'Creative Solutions',
    period: '2017 - 2020',
    description: 'Redesigned the mobile app experience resulting in a 28% increase in user engagement and a 15% decrease in bounce rate.',
    logo: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop',
    color: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Visual Designer',
    company: 'Digital Craft',
    period: '2015 - 2017',
    description: 'Created visual identity systems for 15+ brands across various industries, focusing on scalable design components.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2673&auto=format&fit=crop',
    color: 'bg-amber-100 dark:bg-amber-900/30'
  }
];

export const Experience: React.FC = () => {
  const { ref, isInView } = useInView(0.1);
  
  return (
    <section id="experience" className="section bg-gradient-to-b from-secondary/30 to-background">
      <div 
        ref={ref} 
        className="transition-opacity duration-1000 ease-in-out"
        style={{ opacity: isInView ? 1 : 0 }}
      >
        <div className="text-center mb-16 stagger-animation">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Professional journey and expertise</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-primary/30 md:transform md:-translate-x-px"></div>
          
          {/* Timeline items */}
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`mb-16 md:mb-24 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Content */}
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div 
                  className={`glass-card p-6 ${exp.color} ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                  style={{ 
                    opacity: isInView ? 1 : 0,
                    transform: isInView 
                      ? 'translateY(0)' 
                      : `translateY(${20}px)`,
                    transition: `opacity 0.5s ease-out ${index * 0.2}s, transform 0.5s ease-out ${index * 0.2}s`
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 ring-2 ring-primary/20 shadow-lg transition-all duration-300 hover:ring-primary">
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
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4 bg-background/50 rounded-full px-3 py-1 w-fit">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span>{exp.period}</span>
                  </div>
                  
                  <p className="mb-4 leading-relaxed">{exp.description}</p>
                </div>
              </div>
              
              {/* Timeline dot and line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2" style={{ top: `${index * 24 + 2}rem` }}>
                <div 
                  className={`w-6 h-6 rounded-full border-4 border-background bg-primary shadow-lg transition-all duration-700`}
                  style={{ 
                    transform: isInView ? 'scale(1)' : 'scale(0)',
                    opacity: isInView ? 1 : 0,
                    transitionDelay: `${index * 0.3}s`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div 
          className="text-center mt-12"
          style={{ 
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease-out 0.6s, transform 0.5s ease-out 0.6s'
          }}
        >
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-2.5 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-all duration-300"
          >
            View Full Resume
            <ArrowRight className="ml-2 w-4 h-4 animate-pulse-slow" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
