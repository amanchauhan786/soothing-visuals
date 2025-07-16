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
  const { displayText: title } = useTypewriter(' AMAN CHAUHAN', 100, 500);
  const [activeSkill, setActiveSkill] = useState(0);
  
  // Rotate through skills automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % techSkills.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Enhanced background with animated gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-secondary/20 dark:from-primary/10 dark:to-secondary/5"></div>
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className="absolute animate-float"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              background: `hsl(${Math.random() * 360}, 70%, 60%)`,
              opacity: 0.1,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>
      
      {/* Floating code particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {['{}', '</>', '[]', '()', ';;', '==', '++', '--'].map((symbol, i) => (
          <div 
            key={i}
            className="absolute text-primary/20 font-mono font-bold animate-float"
            style={{
              fontSize: `${Math.random() * 30 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 15 + 20}s`,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 stagger-animation">
          <div className="mb-4 inline-block animate-slide-in-left">
            <span className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full border border-primary/20">
              🚀 PawanCoder786
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 relative animate-fade-in">
            <span className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {title}
            </span>
            <span className="inline-block w-1 h-8 md:h-12 bg-primary animate-pulse ml-1"></span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-fade-in leading-relaxed" style={{ animationDelay: '0.8s' }}>
            Computer Science Engineering Student | FPGA-Based TinyML Researcher | AI/ML Innovator | Co-Founder at CropSky
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <a href="#projects" className="btn-primary hover-scale group relative overflow-hidden">
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="#contact" className="btn-secondary hover-scale group">
              <span className="group-hover:scale-110 transition-transform duration-300">Get in Touch</span>
            </a>
          </div>
        </div>
        
        {/* Interactive Tech Skills Display */}
        <div className="w-full lg:w-1/2 mt-16 lg:mt-0">
          <div className="relative h-80 md:h-96 w-full max-w-md mx-auto">
            {/* Central hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <Code className="w-12 h-12 text-white" />
              </div>
            </div>
            
            {/* Orbiting skill icons */}
            {techSkills.map((skill, index) => {
              const angle = (index / techSkills.length) * 360;
              const radius = 120;
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              const IconComponent = skill.icon;
              
              return (
                <div
                  key={index}
                  className={`absolute w-16 h-16 rounded-full border-2 border-primary/20 flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-125 ${
                    activeSkill === index 
                      ? 'bg-primary text-white shadow-lg shadow-primary/50 scale-110' 
                      : 'bg-background/80 backdrop-blur-sm hover:bg-primary/10'
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    animation: `orbit 20s linear infinite`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                  onClick={() => setActiveSkill(index)}
                >
                  <IconComponent className={`w-8 h-8 ${activeSkill === index ? 'text-white' : skill.color}`} />
                </div>
              );
            })}
            
            {/* Skill name display */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/20 min-w-32">
                <span className="text-sm font-medium text-primary">
                  {techSkills[activeSkill].name}
                </span>
              </div>
            </div>
            
            {/* Connecting lines */}
            <div className="absolute inset-0 pointer-events-none">
              {techSkills.map((_, index) => {
                const angle = (index / techSkills.length) * 360;
                const radius = 120;
                const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
                
                return (
                  <div
                    key={index}
                    className={`absolute w-0.5 bg-gradient-to-r from-primary/20 to-transparent transition-all duration-500 ${
                      activeSkill === index ? 'opacity-100' : 'opacity-30'
                    }`}
                    style={{
                      height: `${radius}px`,
                      transform: `translate(${x + 192}px, ${y + 192}px) rotate(${angle + 90}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;