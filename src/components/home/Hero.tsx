import React, { useEffect, useState } from 'react';
import { useTypewriter } from '@/utils/animations';
import { ArrowRight, Code, Cpu, Zap, Sparkles, Rocket, Brain } from 'lucide-react';

// Tech skills with icons for interactive display
const techSkills = [
  { name: 'FPGA Design', icon: Cpu, color: 'text-blue-500' },
  { name: 'AI/ML', icon: Brain, color: 'text-purple-500' },
  { name: 'Full-Stack', icon: Code, color: 'text-green-500' },
  { name: 'TinyML', icon: Zap, color: 'text-yellow-500' },
  { name: 'Innovation', icon: Rocket, color: 'text-red-500' },
  { name: 'Research', icon: Sparkles, color: 'text-cyan-500' },
];

export const Hero: React.FC = () => {
  const { displayText: title } = useTypewriter('AMAN CHAUHAN', 80, 300);
  const [activeSkill, setActiveSkill] = useState(0);
  
  // Rotate through skills automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % techSkills.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
      
      {/* Subtle floating elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="mb-6 inline-block animate-fade-in">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
              🚀 PawanCoder786
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-foreground">
              {title}
            </span>
            <span className="inline-block w-1 h-12 md:h-16 bg-primary animate-pulse ml-2"></span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl animate-fade-in leading-relaxed" style={{ animationDelay: '0.4s' }}>
            Computer Science Engineering Student | FPGA-Based TinyML Researcher | AI/ML Innovator | Co-Founder at CropSky
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <a href="#projects" className="btn-primary hover:scale-105 transition-transform duration-300 group">
              View Projects
              <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a href="#contact" className="btn-secondary hover:scale-105 transition-transform duration-300">
              Get in Touch
            </a>
          </div>
        </div>
        
        {/* Right side - Simple skill display */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-80 h-80 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Code className="w-10 h-10 text-white" />
              </div>
            </div>
            
            {/* Skill icons in a circle */}
            {techSkills.map((skill, index) => {
              const angle = (index / techSkills.length) * 360;
              const radius = 120;
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              const IconComponent = skill.icon;
              
              return (
                <div
                  key={index}
                  className={`absolute w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 ${
                    activeSkill === index 
                      ? 'bg-primary text-white shadow-lg scale-110' 
                      : 'bg-background border-2 border-primary/20 hover:border-primary/40'
                  }`}
                  style={{
                    transform: `translate(${x + 152}px, ${y + 152}px)`,
                  }}
                  onClick={() => setActiveSkill(index)}
                >
                  <IconComponent className={`w-8 h-8 ${activeSkill === index ? 'text-white' : skill.color}`} />
                </div>
              );
            })}
            
            {/* Current skill name */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-fade-in">
              <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/20 shadow-sm">
                <span className="text-lg font-semibold text-primary">
                  {techSkills[activeSkill].name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;