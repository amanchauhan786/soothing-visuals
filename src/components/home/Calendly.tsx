
import React from 'react';
import { useInView } from '@/utils/animations';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const Calendly: React.FC = () => {
  const { ref, isInView } = useInView(0.1);

  const openCalendly = () => {
    // Replace this URL with your actual Calendly link
    window.open('https://calendly.com/your-username', '_blank');
  };

  return (
    <section id="calendly" className="section bg-secondary/30">
      <div ref={ref} className={`transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="section-title">Schedule a Meeting</h2>
          <p className="section-subtitle">Book a time slot that works for you</p>
        </div>
        
        <div className="max-w-4xl mx-auto glass-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`transition-all duration-500 delay-200 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-primary/10 mr-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Easy Scheduling</h3>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Select a convenient time from my availability and receive an immediate confirmation. No back-and-forth emails required.
              </p>
              
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-full bg-primary/10 mr-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Flexible Options</h3>
              </div>
              
              <p className="text-muted-foreground mb-8">
                Choose from different meeting durations and formats based on your needs, from quick consultations to in-depth discussions.
              </p>
              
              <button onClick={openCalendly} className="btn-primary flex items-center">
                Schedule Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
            
            <div className={`transition-all duration-500 delay-300 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="aspect-video bg-background rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">My Calendar</h3>
                  <p className="text-muted-foreground mb-6">
                    Click the button below to view my availability and schedule a meeting.
                  </p>
                  <button onClick={openCalendly} className="btn-primary">
                    Open Calendly
                  </button>
                </div>
                
                {/* Alternative: You can embed the Calendly widget here if preferred */}
                {/* <iframe
                  src="https://calendly.com/your-username/30min"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule a meeting"
                ></iframe> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendly;
