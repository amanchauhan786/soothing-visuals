
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Experience from '@/components/home/Experience';
import Projects from '@/components/home/Projects';
import Gallery from '@/components/home/Gallery';
import Contact from '@/components/home/Contact';
import { useTheme } from '@/utils/animations';
import BackgroundAnimation from '@/components/layout/BackgroundAnimation';

const Index = () => {
  const { theme } = useTheme();
  
  // Apply theme class to document on initial load
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen relative">
      <BackgroundAnimation />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <Gallery />
        <Contact />
      </main>
      
      <footer className="py-12 px-4 bg-secondary/50 relative z-10">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground mb-4">
            Designed and built with attention to detail
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Minimal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
