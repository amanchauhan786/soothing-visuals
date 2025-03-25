
import React, { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
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

  // Function to open Calendly
  const openCalendly = () => {
    window.open('https://calendly.com/aman-chauhan2022', '_blank');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 glass shadow-sm' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a 
          href="#home" 
          className="text-xl font-bold tracking-tight relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          Aman Chauhan
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
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
          >
            <CalendarClock className="h-5 w-5" />
          </Button>
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
        className={`md:hidden glass shadow-lg absolute left-0 right-0 top-full px-4 py-4 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 rounded-md hover:bg-secondary transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
