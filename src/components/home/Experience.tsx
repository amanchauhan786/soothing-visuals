
import React from 'react';
import { useInView } from '@/utils/animations';
import { Briefcase, Calendar, ArrowRight } from 'lucide-react';

// Experience data
const experiences = [
  {
    title: 'Chief AI Officer',
    company: 'Cropsky',
    period: 'Aug 2024 - Present',
    description: 'Developed AgriDrone, an AI-powered system optimizing broadcasting and crop health monitoring using NDVI technology. Built a mobile application for real-time farm monitoring, leveraging NDVI-based analysis to generate detailed crop health reports and dashboards, boosting productivity by 40 percent.',
    logo: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=2476&auto=format&fit=crop'
  },
  {
    title: 'Gen AI Intern',
    company: 'G5InfoTech',
    period: 'Apr 2024 - Oct 2024',
    description: 'Engineered an AI-driven content refinement pipeline using LangChain, BeautifulSoup, Scrapy, and ProxyCurl, improving content accuracy by 30 percent. Developed an automated LinkedIn profile suggestion system, enhancing content personalization and recommendation quality.',
    logo: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop'
  },
  {
    title: 'Marketing Intern',
    company: 'Stockz11',
    period: 'Dec 2023 - Jan 2024',
    description: 'Designed AI-driven ad campaigns for Facebook and Instagram, boosting audience engagement and reach. Optimized content strategy using data insights, enhancing brand visibility and targeted marketing effectiveness.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2673&auto=format&fit=crop'
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
