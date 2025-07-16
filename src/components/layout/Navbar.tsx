
import React, { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import VoiceReader from '@/components/ui/VoiceReader';
import { Menu, X, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu on anchor click
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Function to open Calendly with the correct link
  const openCalendly = () => {
    window.open('https://calendly.com/amssre-16267/30min?month=2025-03', '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${isScrolled ? 'py-2 glass shadow-lg backdrop-blur-xl' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between w-full max-w-full">
        <a 
          href="#home" 
          className="text-xl font-bold tracking-tight relative cyber-text hover:scale-110 transition-all duration-300 group"
        >
          <span className="relative z-10">AC</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="nav-link hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.name}
            </a>
          ))}
          <Button 
            onClick={openCalendly} 
            variant="outline" 
            className="ml-2 flex items-center"
          >
            <CalendarClock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <div className="ml-2">
            <VoiceReader />
          </div>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile navigation toggle */}
        <div className="flex items-center md:hidden">
          <Button 
            onClick={openCalendly} 
            variant="outline" 
            className="mr-2 p-2 h-10 w-10 flex items-center justify-center"
            size="icon"
            aria-label="Schedule a call"
          >
            <CalendarClock className="h-5 w-5" />
          </Button>
          <VoiceReader />
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-4 p-2 rounded-md"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden glass shadow-lg absolute left-0 right-0 top-full w-full px-4 py-4 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-10 opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 rounded-md hover:bg-secondary transition-colors duration-200 text-center font-medium"
              onClick={handleLinkClick}
            >
              {link.name}
            </a>
          ))}
          <Button 
            onClick={() => {
              openCalendly();
              handleLinkClick();
            }}
            variant="outline" 
            className="mt-2 w-full flex items-center justify-center"
          >
            <CalendarClock className="mr-2 h-4 w-4" />
            Schedule a Call
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
