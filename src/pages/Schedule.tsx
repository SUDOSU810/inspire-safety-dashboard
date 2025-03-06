
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { format, addDays, startOfWeek, getDay, isSameDay, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Plus,
  RefreshCw,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Sample data for trainers and training types
const trainers = [
  { id: 1, name: "John Doe", specialty: "Fire Safety" },
  { id: 2, name: "Jane Smith", specialty: "Road Safety" },
  { id: 3, name: "Bob Johnson", specialty: "Industrial Safety" },
  { id: 4, name: "Alice Williams", specialty: "First Aid" },
];

const trainingTypes = [
  { id: 1, name: "Fire Safety", category: "fire" },
  { id: 2, name: "Road Safety", category: "road" },
  { id: 3, name: "Industrial Safety", category: "industrial" },
  { id: 4, name: "First Aid", category: "first-aid" },
  { id: 5, name: "Hazardous Materials", category: "hazmat" },
];

// Initial training events
const initialEvents = [
  {
    id: 1,
    title: "Fire Safety Training",
    date: new Date(2024, 0, 15),
    time: "10:00 AM",
    type: "Fire Safety",
    category: "fire",
    trainer: 1,
    location: "Building A, Room 101",
  },
  {
    id: 2,
    title: "Road Safety Seminar",
    date: new Date(2024, 0, 17),
    time: "2:00 PM",
    type: "Road Safety",
    category: "road",
    trainer: 2,
    location: "Conference Center",
  },
  {
    id: 3,
    title: "Industrial Safety Workshop",
    date: new Date(2024, 0, 20),
    time: "9:00 AM",
    type: "Industrial Safety",
    category: "industrial",
    trainer: 3,
    location: "Factory Floor, Building C",
  },
];

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const { toast } = useToast();

  // State for new event form
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    time: "",
    type: "",
    category: "",
    trainer: 0,
    location: "",
  });

  // Effect to update newEvent.date when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setNewEvent(prev => ({ ...prev, date: selectedDate }));
    }
  }, [selectedDate]);

  // Generate days for calendar view
  const generateCalendarDays = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    let days = [];
    
    for (let i = 0; i < 35; i++) {
      const date = addDays(startDate, i);
      days.push(date);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  
  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.time || !newEvent.type || !newEvent.trainer) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Find the category based on the selected training type
    const trainingType = trainingTypes.find(t => t.name === newEvent.type);
    const category = trainingType ? trainingType.category : "";

    const eventToAdd = {
      id: events.length + 1,
      title: newEvent.title,
      date: selectedDate || new Date(),
      time: newEvent.time,
      type: newEvent.type,
      category: category,
      trainer: Number(newEvent.trainer),
      location: newEvent.location,
    };

    setEvents(prevEvents => [...prevEvents, eventToAdd]);
    
    setIsAddEventOpen(false);
    
    // Reset form
    setNewEvent({
      title: "",
      date: new Date(),
      time: "",
      type: "",
      category: "",
      trainer: 0,
      location: "",
    });

    toast({
      title: "Success",
      description: "Training session has been scheduled",
      variant: "default",
    });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  // Navigate to previous month
  const navigatePrevious = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  // Navigate to next month
  const navigateNext = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };
  
  // Get trainer name by ID
  const getTrainerName = (id: number) => {
    const trainer = trainers.find(t => t.id === id);
    return trainer ? trainer.name : "Unknown";
  };

  // Handle refresh button click
  const handleRefreshCalendar = () => {
    // Refresh the calendar (in a real app, this might fetch new data)
    toast({
      title: "Calendar Refreshed",
      description: "Latest training schedule has been loaded",
      variant: "default",
    });
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="page-title">Training Schedule</h1>
            <p className="text-charcoal font-raleway mt-1">
              Manage and view upcoming training sessions
            </p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" className="glass-button" onClick={handleRefreshCalendar}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button variant="creative">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Training
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-panel">
                <DialogHeader>
                  <DialogTitle>Schedule New Training</DialogTitle>
                  <DialogDescription>
                    Create a new training session for your team.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="col-span-3 justify-start text-left font-normal glass-button"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 glass-panel pointer-events-auto">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                      Time
                    </Label>
                    <div className="col-span-3 flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time"
                        name="time"
                        value={newEvent.time}
                        onChange={handleInputChange}
                        placeholder="e.g. 10:00 AM"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Type</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("type", value)}
                    >
                      <SelectTrigger className="col-span-3 glass-button">
                        <SelectValue placeholder="Select training type" />
                      </SelectTrigger>
                      <SelectContent className="glass-panel">
                        {trainingTypes.map((type) => (
                          <SelectItem key={type.id} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Trainer</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("trainer", value)}
                    >
                      <SelectTrigger className="col-span-3 glass-button">
                        <SelectValue placeholder="Select a trainer" />
                      </SelectTrigger>
                      <SelectContent className="glass-panel pointer-events-auto">
                        {trainers.map((trainer) => (
                          <SelectItem key={trainer.id} value={trainer.id.toString()}>
                            {trainer.name} - {trainer.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={newEvent.location}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEvent}>Save Training</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="glass-panel mb-6 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <Button variant="ghost" size="icon" onClick={navigatePrevious}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-semibold font-montserrat">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <Button variant="ghost" size="icon" onClick={navigateNext}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center py-2 text-sm font-semibold">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const dayEvents = getEventsForDate(day);
                
                return (
                  <div 
                    key={index}
                    className={`calendar-day group ${
                      isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
                    } ${
                      isSameDay(day, new Date()) ? 'calendar-day-active' : ''
                    } ${
                      isSameDay(day, selectedDate || new Date()) ? 'bg-tea-green/30 font-medium' : ''
                    }`}
                    onClick={() => {
                      setSelectedDate(day);
                      if (dayEvents.length === 0) {
                        setIsAddEventOpen(true);
                      }
                    }}
                  >
                    <div className="relative h-full w-full group-hover:bg-tea-green/20 rounded-md transition-colors p-2">
                      <span className="absolute top-0 right-2">{day.getDate()}</span>
                      <div className="mt-6 space-y-1">
                        {dayEvents.slice(0, 2).map((event, idx) => (
                          <div 
                            key={idx} 
                            className={`calendar-event ${event.category}`}
                            title={`${event.title} - ${event.time}`}
                          >
                            {event.title.length > 10 ? event.title.substring(0, 10) + '...' : event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-center font-medium text-muted-foreground">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {selectedDate && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold font-montserrat">
                Events for {format(selectedDate, 'MMMM d, yyyy')}
              </h2>
              <Button 
                variant="outline" 
                className="glass-button" 
                onClick={() => {
                  setIsAddEventOpen(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {getEventsForDate(selectedDate).map((event) => (
                <Card key={event.id} className={`glass-card-${event.category === 'fire' ? 'accent' : 'success'}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg font-raleway">{event.title}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${event.category === 'fire' ? 'chart-orange' : event.category === 'road' ? 'oxford-blue' : 'cambridge-blue'}/20 text-${event.category === 'fire' ? 'chart-orange' : event.category === 'road' ? 'oxford-blue' : 'cambridge-blue'}`}>
                        {event.type}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {event.time}
                      </div>
                      <div>|</div>
                      <div>{event.location}</div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-accent/20">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${event.trainer}`} />
                          <AvatarFallback className="avatar-gradient">
                            {getTrainerName(event.trainer).charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{getTrainerName(event.trainer)}</div>
                          <div className="text-xs text-muted-foreground">
                            {trainers.find(t => t.id === event.trainer)?.specialty}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {getEventsForDate(selectedDate).length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground glass-panel">
                  <p>No training sessions scheduled for this date.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 glass-button" 
                    onClick={() => setIsAddEventOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Training
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
