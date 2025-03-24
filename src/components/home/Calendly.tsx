
import React, { useState } from 'react';
import { useInView } from '@/utils/animations';
import { Calendar as CalendarIcon, Clock, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';

export const Calendly: React.FC = () => {
  const { ref, isInView } = useInView(0.1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // Function to open calendly
  const openCalendly = () => {
    // Replace this URL with your actual Calendly link
    window.open('https://calendly.com/your-username', '_blank');
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

  // Function to confirm booking
  const confirmBooking = () => {
    setIsCalendarOpen(false);
    setConfirmationOpen(true);
    
    // Reset selections
    setTimeout(() => {
      setConfirmationOpen(false);
      setDate(undefined);
      setSelectedTimeSlot(null);
      setTimeSlots([]);
    }, 3000);
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
                <Button 
                  onClick={confirmBooking} 
                  className="w-full mt-4"
                >
                  Confirm {format(date, 'MMM d')} at {selectedTimeSlot}
                </Button>
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
              A confirmation email has been sent to your inbox with all the details.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Calendly;
