
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Experience from '@/components/home/Experience';
import Projects from '@/components/home/Projects';
import Gallery from '@/components/home/Gallery';
import Calendly from '@/components/home/Calendly';
import Contact from '@/components/home/Contact';
import Achievements from '@/components/home/Achievements';
import { useTheme } from '@/utils/animations';

const Index = () => {
  const { theme } = useTheme();
  
  // Apply theme class to document on initial load
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="w-full overflow-x-hidden">
        <section id="home">
          <Hero />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="achievements">
          <Achievements />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section id="calendly">
          <Calendly />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <footer className="py-12 px-4 bg-secondary/50 w-full">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground mb-4">
            Designed and built with attention to detail
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Aman Chauhan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
