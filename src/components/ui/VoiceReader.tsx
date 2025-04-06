
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

interface VoiceReaderProps {
  className?: string;
}

const VoiceReader: React.FC<VoiceReaderProps> = ({ className }) => {
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const contentElementsRef = useRef<HTMLElement[]>([]);

  // Setup speech synthesis on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthRef.current = new SpeechSynthesisUtterance();
      
      // Configure speech properties
      if (speechSynthRef.current) {
        speechSynthRef.current.rate = 1;
        speechSynthRef.current.pitch = 1;
        speechSynthRef.current.volume = 1;
        speechSynthRef.current.lang = 'en-US';
      }

      // Handle speech end event
      speechSynthRef.current.onend = () => {
        setIsReading(false);
        setIsPaused(false);
      };
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Function to gather all content from the page
  const gatherPageContent = () => {
    const sections = [
      document.getElementById('home'),
      document.getElementById('experience'),
      document.getElementById('projects'),
      document.getElementById('achievements'),
      document.getElementById('gallery'),
      document.getElementById('contact')
    ].filter(Boolean) as HTMLElement[];

    contentElementsRef.current = sections;
    
    const introText = "Welcome to Aman Chauhan's personal website. I'll guide you through the different sections of this site.";
    let allText = introText;

    sections.forEach(section => {
      if (section) {
        // Get heading
        const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          allText += " Section: " + heading.textContent + ". ";
        }

        // Get all paragraphs and list items
        const textElements = section.querySelectorAll('p, li, .description, .text');
        textElements.forEach(element => {
          if (element.textContent && element.textContent.trim().length > 0) {
            allText += " " + element.textContent.trim();
          }
        });
      }
    });

    return allText;
  };

  // Function to scroll to the element containing the text currently being read
  const scrollToCurrentSection = (text: string) => {
    const sections = contentElementsRef.current;
    
    for (const section of sections) {
      if (section.textContent && section.textContent.includes(text.substring(0, 50))) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
    }
  };

  // Toggle reading state
  const toggleReading = () => {
    if (!window.speechSynthesis) {
      toast.error("Speech synthesis is not supported in your browser");
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      setIsPaused(false);
    } else {
      const pageContent = gatherPageContent();
      
      if (speechSynthRef.current) {
        speechSynthRef.current.text = pageContent;
        
        // Add event to handle scrolling
        speechSynthRef.current.onboundary = (e) => {
          if (e.name === 'sentence') {
            const currentText = pageContent.substring(0, e.charIndex + 50);
            scrollToCurrentSection(currentText);
          }
        };
        
        window.speechSynthesis.speak(speechSynthRef.current);
        setIsReading(true);
        toast.success("Website reading started");
      }
    }
  };

  // Toggle pause/resume
  const togglePause = () => {
    if (!window.speechSynthesis) return;
    
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        onClick={toggleReading}
        variant="outline"
        size="icon"
        className="h-9 w-9"
        aria-label={isReading ? "Stop reading" : "Read website"}
        title={isReading ? "Stop reading" : "Read website"}
      >
        {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
      
      {isReading && (
        <Button
          onClick={togglePause}
          variant="outline"
          size="icon"
          className="h-9 w-9"
          aria-label={isPaused ? "Resume reading" : "Pause reading"}
          title={isPaused ? "Resume reading" : "Pause reading"}
        >
          {isPaused ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </Button>
      )}
    </div>
  );
};

export default VoiceReader;
