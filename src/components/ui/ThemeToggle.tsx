
import React from 'react';
import { useTheme } from '@/utils/animations';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full flex items-center justify-center bg-secondary/50 hover:bg-secondary transition-colors duration-300"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <div className="relative w-6 h-6 overflow-hidden">
        <Sun 
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${theme === 'dark' ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} 
        />
        <Moon 
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${theme === 'light' ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
