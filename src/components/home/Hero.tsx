import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTypewriter } from '@/utils/animations';
import { ArrowRight, Code, Cpu, Zap, Sparkles, Rocket, Brain, ChevronDown, Play } from 'lucide-react';

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
  const { displayText: title } = useTypewriter(' AMAN CHAUHAN', 80, 300);
  const [activeSkill, setActiveSkill] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  
  // Rotate through skills automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % techSkills.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center pt-20 relative overflow-hidden"
    >
      {/* Dynamic gradient background that follows mouse */}
      <div 
        className="absolute inset-0 -z-10 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            hsl(var(--primary) / 0.15), 
            transparent 40%), 
            linear-gradient(135deg, 
            hsl(var(--primary) / 0.05) 0%, 
            transparent 50%, 
            hsl(var(--accent) / 0.05) 100%)`
        }}
      />
      
      {/* Professional floating elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full border border-primary/10 animate-professional-float"
            style={{
              width: `${(i % 3 + 1) * 80}px`,
              height: `${(i % 3 + 1) * 80}px`,
              top: `${20 + (i * 8) % 60}%`,
              left: `${10 + (i * 15) % 80}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + (i % 3) * 10}s`,
              background: `linear-gradient(135deg, 
                hsl(var(--primary) / ${0.03 + (i % 3) * 0.02}), 
                hsl(var(--accent) / ${0.02 + (i % 2) * 0.01}))`,
            }}
          />
        ))}
      </div>
      
      {/* Subtle tech symbols */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {['</>', '{}', '[]', '()'].map((symbol, i) => (
          <div 
            key={i}
            className="absolute text-primary/10 font-mono font-bold animate-tech-drift select-none"
            style={{
              fontSize: `${24 + i * 8}px`,
              top: `${25 + i * 20}%`,
              left: `${85 - i * 5}%`,
              animationDelay: `${i * 4}s`,
              animationDuration: `${30 + i * 5}s`,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 stagger-animation">
          <div className="mb-6 inline-block animate-professional-slide-up">
            <span className="inline-flex items-center px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-primary/10 via-primary/20 to-accent/10 text-primary rounded-full border border-primary/20 backdrop-blur-sm shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              PawanCoder786
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 relative animate-professional-title">
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-size-200 animate-gradient-shift">
              {title}
            </span>
            <span className="absolute -right-2 top-0 w-1 h-12 md:h-16 lg:h-20 bg-primary animate-cursor-blink"></span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground/90 mb-10 max-w-2xl animate-professional-subtitle leading-relaxed">
            Computer Science Engineering Student | FPGA-Based TinyML Researcher | AI/ML Innovator | Co-Founder at CropSky
          </p>
          
          <div className="flex flex-wrap gap-6 animate-professional-buttons">
            <a href="#projects" className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
              <span className="relative z-10 font-medium">View Projects</span>
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </a>
            <Link to="/snake-game" className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
              <span className="relative z-10 font-medium">Play Snake Game</span>
              <Play className="inline-block ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-500 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </Link>
            <a href="#contact" className="group px-8 py-4 bg-background/50 backdrop-blur-sm text-foreground border-2 border-primary/20 rounded-xl shadow-lg hover:shadow-xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-500 hover:-translate-y-1">
              <span className="font-medium group-hover:text-primary transition-colors duration-300">Get in Touch</span>
            </a>
          </div>
        </div>
        
        {/* Professional Tech Skills Showcase */}
        <div className="w-full lg:w-1/2 mt-20 lg:mt-0">
          <div className="relative h-96 md:h-[28rem] w-full max-w-lg mx-auto">
            {/* Enhanced central hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30 animate-professional-glow border-4 border-background">
                  <Code className="w-14 h-14 text-white" />
                </div>
                {/* Pulsing rings */}
                <div className="absolute inset-0 w-28 h-28 rounded-full border-2 border-primary/30 animate-ping"></div>
                <div className="absolute -inset-4 w-36 h-36 rounded-full border border-primary/20 animate-spin-slow"></div>
              </div>
            </div>
            
            {/* Enhanced orbiting skill icons */}
            {techSkills.map((skill, index) => {
              const angle = (index / techSkills.length) * 360;
              const radius = 140;
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              const IconComponent = skill.icon;
              
              return (
                <div
                  key={index}
                  className={`absolute w-18 h-18 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all duration-700 hover:scale-125 group ${
                    activeSkill === index 
                      ? 'bg-gradient-to-br from-primary to-accent text-white shadow-2xl shadow-primary/40 scale-115 border-primary/30' 
                      : 'bg-background/90 backdrop-blur-sm border-primary/15 hover:bg-primary/10 hover:border-primary/30 shadow-lg'
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    animation: `professional-orbit 25s linear infinite`,
                    animationDelay: `${index * 1}s`,
                  }}
                  onClick={() => setActiveSkill(index)}
                >
                  <IconComponent className={`w-9 h-9 transition-all duration-500 ${
                    activeSkill === index ? 'text-white' : `${skill.color} group-hover:scale-110`
                  }`} />
                  {/* Skill indicator dot */}
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background transition-all duration-500 ${
                    activeSkill === index ? 'bg-accent' : 'bg-primary/50'
                  }`}></div>
                </div>
              );
            })}
            
            {/* Enhanced skill name display */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-gradient-to-r from-background/95 via-background/98 to-background/95 backdrop-blur-md px-6 py-3 rounded-2xl border border-primary/20 shadow-xl min-w-40 animate-skill-appear">
                <span className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {techSkills[activeSkill].name}
                </span>
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-1 opacity-60"></div>
              </div>
            </div>
            
            {/* Professional connecting lines */}
            <div className="absolute inset-0 pointer-events-none">
              {techSkills.map((_, index) => {
                const angle = (index / techSkills.length) * 360;
                const radius = 140;
                const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
                
                return (
                  <div
                    key={index}
                    className={`absolute w-0.5 bg-gradient-to-r transition-all duration-700 ${
                      activeSkill === index 
                        ? 'from-primary via-accent to-primary opacity-80 shadow-lg' 
                        : 'from-primary/15 to-transparent opacity-40'
                    }`}
                    style={{
                      height: `${radius - 20}px`,
                      transform: `translate(${x + 224}px, ${y + 224}px) rotate(${angle + 90}deg)`,
                      transformOrigin: 'bottom center',
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-professional-bounce">
        <div className="flex flex-col items-center text-muted-foreground/70 hover:text-primary transition-colors duration-300 cursor-pointer group">
          <span className="text-sm font-medium mb-2 group-hover:text-primary transition-colors duration-300">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;