
import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTheme } from "@/utils/animations";

interface Section {
  id: string;
  title: string;
  element: HTMLElement;
}

const VoiceReader: React.FC = () => {
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1);
  const sections = useRef<Section[]>([]);
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const { theme } = useTheme();

  // Initialize sections once when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynthesis.current = window.speechSynthesis;
      
      // Find all sections to read
      const sectionsArray: Section[] = [];
      
      // Introduction section
      const introSection = document.getElementById("home");
      if (introSection) {
        sectionsArray.push({
          id: "intro",
          title: "Introduction",
          element: introSection
        });
      }
      
      // Find all section elements with IDs
      const sectionElements = document.querySelectorAll('[id]');
      sectionElements.forEach(element => {
        if (element.id && element.id !== "home" && element.tagName !== "BUTTON") {
          const sectionTitle = element.querySelector('h2, h3')?.textContent || element.id;
          sectionsArray.push({
            id: element.id,
            title: sectionTitle,
            element: element as HTMLElement
          });
        }
      });
      
      sections.current = sectionsArray;
    }
  }, []);

  // Function to start reading the website content
  const startReading = () => {
    if (!speechSynthesis.current) return;
    
    // Cancel any ongoing speech
    speechSynthesis.current.cancel();
    
    // Start from intro
    setCurrentSectionIndex(0);
    setIsReading(true);
    setIsPaused(false);
    
    toast("Voice reader activated. Reading website content...");
  };

  // Function to stop reading
  const stopReading = () => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
    }
    setIsReading(false);
    setIsPaused(false);
    setCurrentSectionIndex(-1);
    toast("Voice reader stopped");
  };

  // Function to pause/resume reading
  const togglePause = () => {
    if (!speechSynthesis.current) return;
    
    if (isPaused) {
      speechSynthesis.current.resume();
      setIsPaused(false);
      toast("Voice reader resumed");
    } else {
      speechSynthesis.current.pause();
      setIsPaused(true);
      toast("Voice reader paused");
    }
  };

  // Read current section and move to next when done
  useEffect(() => {
    if (!isReading || currentSectionIndex < 0 || currentSectionIndex >= sections.current.length || !speechSynthesis.current) return;
    
    const currentSection = sections.current[currentSectionIndex];
    
    // Scroll to the current section
    currentSection.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Prepare the text to read
    let textToRead = "";
    
    if (currentSectionIndex === 0) {
      // Introduction text
      textToRead = "Welcome to Aman Chauhan's portfolio website. I will guide you through each section. Let's start with a brief introduction.";
    } else {
      textToRead = `Now viewing the ${currentSection.title} section. ${extractTextContent(currentSection.element)}`;
    }
    
    // Create and configure the utterance
    utterance.current = new SpeechSynthesisUtterance(textToRead);
    utterance.current.rate = 0.9; // Slightly slower for better clarity
    utterance.current.pitch = 1;
    
    // Choose a natural-sounding voice if available
    const voices = speechSynthesis.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes("Google") || 
      voice.name.includes("Natural") || 
      voice.name.includes("Samantha")
    );
    
    if (preferredVoice) {
      utterance.current.voice = preferredVoice;
    }
    
    // Move to next section when current one finishes
    utterance.current.onend = () => {
      if (currentSectionIndex < sections.current.length - 1) {
        setCurrentSectionIndex(prev => prev + 1);
      } else {
        // We've reached the end
        setIsReading(false);
        toast("Finished reading all content");
      }
    };
    
    // Start speaking
    speechSynthesis.current.speak(utterance.current);
    
  }, [currentSectionIndex, isReading]);

  // Helper function to extract readable text from a section
  const extractTextContent = (element: HTMLElement): string => {
    // Get visible text while skipping hidden elements
    let text = "";
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent + " ";
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (
          el.offsetParent !== null && // Check if visible
          !["SCRIPT", "STYLE", "NAV", "BUTTON"].includes(el.tagName) &&
          !el.classList.contains("sr-only")
        ) {
          text += extractTextContent(el) + " ";
        }
      }
    });
    
    return text.replace(/\s+/g, " ").trim();
  };

  return (
    <div className="flex items-center gap-1">
      {isReading ? (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={togglePause}
            className="relative h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-300"
            aria-label={isPaused ? "Resume reading" : "Pause reading"}
          >
            {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
          </Button>
          <Button
            variant="outline"
            size="icon" 
            onClick={stopReading}
            className="relative h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-300"
            aria-label="Stop reading"
          >
            <VolumeX className="h-5 w-5" />
          </Button>
        </>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={startReading}
          className="relative h-10 w-10 rounded-full bg-secondary/50 hover:bg-secondary transition-colors duration-300"
          aria-label="Start reading website content"
        >
          <Volume2 className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default VoiceReader;
