
import React, { useState } from 'react';
import { useInView } from '@/utils/animations';
import { ExternalLink, Github } from 'lucide-react';

// Sample project data
const projects = [
  {
    title: 'Minimalist Dashboard',
    description: 'A clean, intuitive dashboard interface for data visualization with a focus on user experience.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    category: 'UI/UX',
    link: '#',
    github: '#'
  },
  {
    title: 'E-commerce Redesign',
    description: 'A complete redesign of an e-commerce platform focused on simplicity and conversion optimization.',
    image: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=2674&auto=format&fit=crop',
    category: 'Web Design',
    link: '#',
    github: '#'
  },
  {
    title: 'Mobile Banking App',
    description: 'A mobile banking application with intuitive navigation and secure transaction features.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop',
    category: 'Mobile',
    link: '#',
    github: '#'
  },
  {
    title: 'Smart Home Control',
    description: 'An intuitive interface for managing smart home devices with voice commands and automation.',
    image: 'https://images.unsplash.com/photo-1558002038-bb0837aad643?q=80&w=2670&auto=format&fit=crop',
    category: 'UI/UX',
    link: '#',
    github: '#'
  },
  {
    title: 'Travel Booking Platform',
    description: 'A modern travel booking platform with personalized recommendations and streamlined booking.',
    image: 'https://images.unsplash.com/photo-1499363536502-87642509e31b?q=80&w=2674&auto=format&fit=crop',
    category: 'Web Design',
    link: '#',
    github: '#'
  },
  {
    title: 'Health Tracking Wearable',
    description: 'A health monitoring application for wearable devices with data visualization and insights.',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2670&auto=format&fit=crop',
    category: 'Mobile',
    link: '#',
    github: '#'
  }
];

const categories = ['All', 'UI/UX', 'Web Design', 'Mobile'];

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, isInView } = useInView(0.1);
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  return (
    <section id="projects" className="section">
      <div ref={ref} className={`transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Showcasing my best work and designs</p>
        </div>
        
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-secondary/70 text-secondary-foreground hover:bg-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              className={`glass-card overflow-hidden group transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Project links */}
                <div className="absolute bottom-4 right-4 flex space-x-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <a 
                    href={project.github} 
                    className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors duration-300"
                    aria-label="View GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href={project.link} 
                    className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors duration-300"
                    aria-label="View Live Project"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-secondary/50 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
