import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { AvailabilitySlot } from "@shared/schema";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const sampleAvailability: AvailabilitySlot[] = [
  { id: "1", dayOfWeek: "Monday", startTime: "09:00", endTime: "12:00", isActive: "true", createdAt: new Date() },
  { id: "2", dayOfWeek: "Monday", startTime: "14:00", endTime: "17:00", isActive: "true", createdAt: new Date() },
  { id: "3", dayOfWeek: "Tuesday", startTime: "10:00", endTime: "15:00", isActive: "true", createdAt: new Date() },
  { id: "4", dayOfWeek: "Wednesday", startTime: "09:00", endTime: "12:00", isActive: "true", createdAt: new Date() },
  { id: "5", dayOfWeek: "Thursday", startTime: "13:00", endTime: "18:00", isActive: "true", createdAt: new Date() },
  { id: "6", dayOfWeek: "Friday", startTime: "09:00", endTime: "14:00", isActive: "true", createdAt: new Date() },
];

export default function SchedulePage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data: availability, isLoading } = useQuery<AvailabilitySlot[]>({
    queryKey: ["/api/availability"],
  });

  const displayAvailability = availability && availability.length > 0 ? availability : sampleAvailability;

  const bookingMutation = useMutation({
    mutationFn: async (data: { scheduledDate: Date; notes?: string }) => {
      return apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed",
        description: "Your consultation has been scheduled. Check your dashboard for details.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/my-bookings"] });
      setSelectedSlot(null);
      setSelectedDate(null);
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error scheduling your consultation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const groupedAvailability = displayAvailability.reduce((acc, slot) => {
    if (!acc[slot.dayOfWeek]) {
      acc[slot.dayOfWeek] = [];
    }
    acc[slot.dayOfWeek].push(slot);
    return acc;
  }, {} as Record<string, AvailabilitySlot[]>);

  const scrollToSection = (sectionId: string) => {
    window.location.href = `/#${sectionId}`;
  };

  const getNextDate = (dayOfWeek: string): Date => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const targetDay = days.indexOf(dayOfWeek);
    const currentDay = today.getDay();
    let daysUntil = targetDay - currentDay;
    if (daysUntil <= 0) daysUntil += 7;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntil);
    return nextDate;
  };

  const handleBooking = () => {
    if (!selectedSlot || !selectedDate) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to book a consultation.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }

    bookingMutation.mutate({ scheduledDate: selectedDate });
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-schedule">
      <Navigation onNavigate={scrollToSection} />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2" data-testid="link-back-home">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4" data-testid="text-schedule-title">
              Schedule a Consultation
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-schedule-description">
              Book a one-on-one strategy session to discuss your case. All consultations are 
              confidential and trauma-informed.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gold" />
                    Available Times
                  </CardTitle>
                  <CardDescription>
                    Select a time slot that works for you. All times shown in your local timezone.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Skeleton key={i} className="h-20 w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {dayOrder.map(day => {
                        const slots = groupedAvailability[day] || [];
                        if (slots.length === 0) return null;
                        
                        const nextDate = getNextDate(day);
                        const formattedDate = nextDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });

                        return (
                          <div key={day} className="border-b border-border pb-4 last:border-0">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="font-medium text-foreground">{day}</h3>
                              <Badge variant="outline" className="text-xs">
                                {formattedDate}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {slots.map(slot => {
                                const slotDate = new Date(nextDate);
                                const [hours, minutes] = slot.startTime.split(":");
                                slotDate.setHours(parseInt(hours), parseInt(minutes));
                                
                                const isSelected = selectedSlot === slot.id;
                                
                                return (
                                  <Button
                                    key={slot.id}
                                    variant={isSelected ? "default" : "outline"}
                                    className={isSelected ? "bg-gold text-background hover:bg-gold/90" : ""}
                                    onClick={() => {
                                      setSelectedSlot(slot.id);
                                      setSelectedDate(slotDate);
                                    }}
                                    data-testid={`button-slot-${slot.id}`}
                                  >
                                    <Clock className="h-4 w-4 mr-2" />
                                    {slot.startTime} - {slot.endTime}
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-card border-border sticky top-24">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gold/10 border border-gold/30">
                        <div className="flex items-center gap-2 text-gold mb-2">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Selected Time</span>
                        </div>
                        <p className="text-foreground font-medium">
                          {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-muted-foreground">
                          {selectedDate.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration</span>
                          <span className="text-foreground">60 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type</span>
                          <span className="text-foreground">Strategy Session</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Format</span>
                          <span className="text-foreground">Video Call</span>
                        </div>
                      </div>

                      {!isAuthenticated && !authLoading && (
                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-sm text-foreground/90">
                              You'll need to log in to complete your booking.
                            </p>
                          </div>
                        </div>
                      )}

                      <Button 
                        className="w-full bg-gold hover:bg-gold/90 text-background"
                        onClick={handleBooking}
                        disabled={bookingMutation.isPending}
                        data-testid="button-confirm-booking"
                      >
                        {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Select a time slot to continue
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border-border mt-6">
                <CardHeader>
                  <CardTitle className="text-sm">What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-3">
                  <p>
                    During your consultation, we'll discuss your situation and determine 
                    how Civil CI can help with your case.
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Review your case details</li>
                    <li>Identify patterns of misconduct</li>
                    <li>Discuss documentation strategy</li>
                    <li>Outline potential next steps</li>
                  </ul>
                  <p>
                    Come prepared with any relevant documents or a summary of your situation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
