
import React, { useState } from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Clock, MapPin, Users, Calendar as CalendarIcon, Plus } from "lucide-react";
import { format, addMonths, subMonths, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useToast } from "@/hooks/use-toast";

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const { toast } = useToast();

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    const trainingOnDate = trainings.find(training => 
      isSameDay(new Date(training.date), selectedDate)
    );
    setSelectedTraining(trainingOnDate);
  };

  const handleAddTraining = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const date = formData.get('date');
    const time = formData.get('time');
    const location = formData.get('location');
    const attendees = formData.get('attendees');
    const description = formData.get('description');
    
    const newTraining = {
      id: Date.now(),
      title,
      date,
      time,
      location,
      attendees,
      description
    };
    
    setTrainings(prev => [...prev, newTraining]);
    setDialogOpen(false);
    toast({
      title: "Training Added",
      description: `${title} has been added to your schedule.`,
    });
  };

  // Generate calendar day contents with training indicators
  const getDayContents = (day) => {
    const trainingOnDay = trainings.find(training => 
      isSameDay(new Date(training.date), day)
    );
    
    if (trainingOnDay) {
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-vibrant-green rounded-full"></div>
              {format(day, "d")}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 z-50 bg-white">
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">{trainingOnDay.title}</h4>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{trainingOnDay.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{trainingOnDay.location}</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    }
    
    return <div>{format(day, "d")}</div>;
  };

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-white tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">
          Manage your training schedule
        </p>
      </div>
      
      <div className="flex justify-end mb-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Training Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Training Session</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTraining} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Training Title</Label>
                <Input id="title" name="title" placeholder="Enter training title" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" type="time" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="Enter location" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="attendees">Expected Attendees</Label>
                <Input id="attendees" name="attendees" type="number" min="1" placeholder="Number of attendees" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Enter training description" />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Add Training</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Calendar Section - First Half of the page */}
      <Card className="bg-white shadow-sm border-0 mb-6">
        <CardHeader className="border-b pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </CardTitle>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePreviousMonth}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            month={currentMonth}
            className="w-full"
            showOutsideDays={true}
            fixedWeeks={true}
            components={{
              Day: ({ day }) => getDayContents(day)
            }}
          />
        </CardContent>
      </Card>
      
      {/* Training Details Section - Second Half of the page */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-xl font-semibold">
            {selectedTraining ? 'Training Details' : 'No Training Selected'}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {selectedTraining ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{selectedTraining.title}</h3>
                {selectedTraining.description && (
                  <p className="text-gray-700 mb-6">{selectedTraining.description}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="text-success-green">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-gray-700">{selectedTraining.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-success-green">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Time</p>
                      <p className="text-gray-700">{selectedTraining.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-success-green">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-700">{selectedTraining.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-success-green">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Attendees</p>
                      <p className="text-gray-700">{selectedTraining.attendees}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Training Selected</h3>
              <p className="text-muted-foreground">Select a date with a training session to view details.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Schedule;
