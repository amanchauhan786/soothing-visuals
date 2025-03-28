
import React, { useState, useRef } from 'react';
import { useInView } from '@/utils/animations';
import { Calendar as CalendarIcon, Clock, ArrowRight, Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

export const Calendly: React.FC = () => {
  const { ref, isInView } = useInView(0.1);
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to open calendly
  const openCalendly = () => {
    // Using the actual Calendly link provided
    window.open('https://calendly.com/amssre-16267/30min', '_blank');
  };

  // Function to open calendar dialog
  const openCalendar = () => {
    setIsCalendarOpen(true);
  };

  // Function to handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    
    // Generate some mock time slots for the selected date
    if (selectedDate) {
      const mockTimeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
      ];
      setTimeSlots(mockTimeSlots);
    } else {
      setTimeSlots([]);
    }
  };

  // Function to handle time slot selection
  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  // Function to handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Function to confirm booking
  const confirmBooking = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please provide your email address so I can contact you.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Using EmailJS to send notification to my email
    const templateParams = {
      meeting_date: format(date!, 'PPPP'),
      meeting_time: selectedTimeSlot,
      user_email: email,
    };

    emailjs.send(
      'service_uaih10o', // Service ID
      'template_a5bfd8i', // Template ID
      templateParams,
      '4nu3LbtqfkCc3zUgL' // Public key
    )
    .then(() => {
      setIsCalendarOpen(false);
      setConfirmationOpen(true);
      setIsSubmitting(false);
      
      // Reset selections
      setTimeout(() => {
        setConfirmationOpen(false);
        setDate(undefined);
        setSelectedTimeSlot(null);
        setTimeSlots([]);
        setEmail('');
      }, 3000);
    }, (error) => {
      setIsSubmitting(false);
      toast({
        title: "Error booking meeting",
        description: "Please try again or use the Calendly link instead.",
        variant: "destructive",
      });
      console.error('EmailJS error:', error);
    });
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
                  <CalendarIcon className="w-6 h-6 text-primary" />
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
              
              <div className="flex flex-wrap gap-4">
                <Button onClick={openCalendly} className="btn-primary flex items-center">
                  Schedule via Calendly
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                
                <Button onClick={openCalendar} variant="outline" className="flex items-center">
                  Quick Book
                  <CalendarIcon className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className={`transition-all duration-500 delay-300 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="aspect-video bg-background rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
                    <CalendarIcon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">My Calendar</h3>
                  <p className="text-muted-foreground mb-6">
                    Choose a date and time that works for you, and I'll make myself available.
                  </p>
                  <Button onClick={openCalendar} className="btn-primary flex items-center gap-2">
                    Select Date & Time
                    <CalendarIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Dialog */}
      <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule a Meeting</DialogTitle>
            <DialogDescription>
              Select a date and time that works for you.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
              disabled={(date) => {
                // Disable weekends and past dates
                const day = date.getDay();
                return day === 0 || day === 6 || date < new Date();
              }}
            />
          </div>
          
          {date && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Available time slots for {format(date, 'PPP')}</h4>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTimeSlot === slot ? "default" : "outline"}
                    className="justify-center"
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
              
              {selectedTimeSlot && (
                <>
                  <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email Address
                    </label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Required for meeting confirmation
                    </p>
                  </div>
                  
                  <Button 
                    onClick={confirmBooking} 
                    className="w-full mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Confirm ${format(date, 'MMM d')} at ${selectedTimeSlot}`
                    )}
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="text-center py-6">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="mb-2">Meeting Scheduled!</DialogTitle>
            <DialogDescription>
              {date && selectedTimeSlot 
                ? `Your meeting is confirmed for ${format(date, 'PPPP')} at ${selectedTimeSlot}.`
                : 'Your meeting has been confirmed.'
              }
            </DialogDescription>
            <p className="mt-4 text-sm text-muted-foreground">
              A confirmation email has been sent. I look forward to our meeting!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Calendly;
