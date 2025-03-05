
import { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  List, 
  Plus, 
  Users, 
  MapPin, 
  Clock, 
  Info,
  AlertTriangle
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

// Sample trainers data
const trainers = [
  { id: 1, name: "Raj Kumar", specialty: "Fire Safety", initials: "RK", avatar: "/placeholder.svg" },
  { id: 2, name: "Priya Singh", specialty: "Road Safety", initials: "PS", avatar: "/placeholder.svg" },
  { id: 3, name: "Vikram Mehta", specialty: "Industrial Safety", initials: "VM", avatar: "/placeholder.svg" },
  { id: 4, name: "Sunita Patel", specialty: "Fire Safety", initials: "SP", avatar: "/placeholder.svg" },
];

// Sample training events
const events = [
  {
    id: 1,
    title: "Fire Safety Workshop",
    date: "2023-11-15",
    time: "10:00 - 12:00",
    location: "Chennai Central Office",
    trainer: trainers[0],
    category: "fire",
    participants: 15,
    description: "Basic fire safety training covering prevention, equipment usage, and evacuation procedures."
  },
  {
    id: 2,
    title: "Road Safety Awareness",
    date: "2023-11-15",
    time: "14:00 - 16:00",
    location: "Mumbai Transportation Hub",
    trainer: trainers[1],
    category: "road",
    participants: 22,
    description: "Training on traffic rules, defensive driving techniques, and accident prevention."
  },
  {
    id: 3,
    title: "Industrial Machinery Training",
    date: "2023-11-16",
    time: "09:00 - 12:00",
    location: "Bangalore Manufacturing Plant",
    trainer: trainers[2],
    category: "industrial",
    participants: 18,
    description: "Safety procedures for operating heavy machinery and equipment in industrial settings."
  },
  {
    id: 4,
    title: "Emergency Response Drill",
    date: "2023-11-17",
    time: "13:00 - 15:00",
    location: "Chennai Central Office",
    trainer: trainers[3],
    category: "fire",
    participants: 30,
    description: "Practical drill on emergency response protocols and team coordination during incidents."
  },
  {
    id: 5,
    title: "Traffic Management Workshop",
    date: "2023-11-18",
    time: "10:00 - 12:00",
    location: "Delhi Transport Authority",
    trainer: trainers[1],
    category: "road",
    participants: 25,
    description: "Advanced techniques for managing traffic flow and optimizing transportation safety."
  },
];

// Helper function to generate calendar days
const generateCalendarDays = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const days = [];
  
  // Add empty days for start of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: "", date: null });
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dateString = date.toISOString().split("T")[0];
    const dayEvents = events.filter(event => event.date === dateString);
    
    days.push({
      day: i,
      date: dateString,
      events: dayEvents,
    });
  }
  
  return days;
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "fire":
      return "bg-[#FF7F00]/10 text-[#FF7F00] border-[#FF7F00]/30";
    case "road":
      return "bg-oxford-blue/10 text-oxford-blue border-oxford-blue/30";
    case "industrial":
      return "bg-cambridge-blue/10 text-cambridge-blue border-cambridge-blue/30";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const Schedule = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("month");
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [newTraining, setNewTraining] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "",
    trainerId: "",
    description: ""
  });
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  
  const calendarDays = generateCalendarDays(year, month);
  
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleInputChange = (field: string, value: string) => {
    setNewTraining(prev => ({ ...prev, [field]: value }));
  };

  const handleScheduleTraining = () => {
    if (!newTraining.title || !newTraining.date || !newTraining.category || !newTraining.trainerId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to schedule the training",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would save to a database
    console.log("Scheduling new training:", newTraining);
    
    toast({
      title: "Training Scheduled",
      description: `${newTraining.title} has been scheduled for ${newTraining.date}`,
    });

    setCreateEventOpen(false);
    setNewTraining({
      title: "",
      date: "",
      time: "",
      location: "",
      category: "",
      trainerId: "",
      description: ""
    });
  };

  const handleReschedule = (event: any) => {
    toast({
      title: "Reschedule Requested",
      description: `You requested to reschedule ${event.title}. This feature will be available soon.`,
    });
  };

  const handleViewDetails = (event: any) => {
    toast({
      title: "Viewing Details",
      description: `Showing details for ${event.title}. Full detail page coming soon.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-oxford-blue">Training Schedule</h1>
        <p className="text-charcoal">
          Manage and organize training sessions
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePreviousMonth}
            className="border-cambridge-blue/30 text-oxford-blue hover:bg-tea-green/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h2 className="text-xl font-semibold text-oxford-blue">
            {monthName} {year}
          </h2>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNextMonth}
            className="border-cambridge-blue/30 text-oxford-blue hover:bg-tea-green/20"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Tabs 
            defaultValue="month" 
            value={selectedView} 
            onValueChange={setSelectedView} 
            className="w-full md:w-auto"
          >
            <TabsList className="grid grid-cols-3 w-full md:w-auto bg-tea-green/20">
              <TabsTrigger 
                value="month" 
                className="data-[state=active]:bg-oxford-blue data-[state=active]:text-white"
              >
                Month
              </TabsTrigger>
              <TabsTrigger 
                value="week" 
                className="data-[state=active]:bg-oxford-blue data-[state=active]:text-white"
              >
                Week
              </TabsTrigger>
              <TabsTrigger 
                value="day" 
                className="data-[state=active]:bg-oxford-blue data-[state=active]:text-white"
              >
                Day
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Dialog open={createEventOpen} onOpenChange={setCreateEventOpen}>
            <DialogTrigger asChild>
              <Button className="md:ml-auto bg-gradient-to-r from-oxford-blue to-charcoal text-white hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" /> Schedule Training
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] bg-white/90 backdrop-blur-md border-cambridge-blue/20">
              <DialogHeader>
                <DialogTitle>Schedule New Training</DialogTitle>
                <DialogDescription>
                  Add details for the new training session. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                  <Input 
                    id="title" 
                    placeholder="Enter training title" 
                    value={newTraining.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={newTraining.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input 
                      id="time" 
                      type="time" 
                      value={newTraining.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="Enter location" 
                    value={newTraining.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                  <Select 
                    value={newTraining.category}
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fire">Fire Safety</SelectItem>
                      <SelectItem value="road">Road Safety</SelectItem>
                      <SelectItem value="industrial">Industrial Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="trainer">Assign Trainer <span className="text-red-500">*</span></Label>
                  <Select 
                    value={newTraining.trainerId}
                    onValueChange={(value) => handleInputChange('trainerId', value)}
                  >
                    <SelectTrigger id="trainer" className="flex justify-between">
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map(trainer => (
                        <SelectItem key={trainer.id} value={trainer.id.toString()} className="flex items-center">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={trainer.avatar} />
                              <AvatarFallback className="bg-oxford-blue text-white text-xs">
                                {trainer.initials}
                              </AvatarFallback>
                            </Avatar>
                            {trainer.name} - {trainer.specialty}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Add details about the training" 
                    value={newTraining.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
                
                {(!newTraining.title || !newTraining.date || !newTraining.category || !newTraining.trainerId) && (
                  <div className="flex items-center gap-2 text-amber-500 text-sm">
                    <AlertTriangle size={16} />
                    <span>Fields marked with * are required</span>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateEventOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-success-green to-cambridge-blue text-white"
                  onClick={handleScheduleTraining}
                >
                  Save Training
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs value={selectedView} onValueChange={setSelectedView} defaultValue="month" className="w-full">
        <div className="hidden">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="month">
          <Card className="animate-fade-in border-cambridge-blue/30 overflow-hidden shadow-lg">
            <CardContent className="p-0">
              {/* Calendar Header - Days of Week */}
              <div className="grid grid-cols-7 border-b border-olivine/20">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <div 
                    key={index} 
                    className="p-3 text-center font-medium text-sm border-r last:border-r-0 border-olivine/20 text-oxford-blue bg-tea-green/10"
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 min-h-[600px]">
                {calendarDays.map((day, index) => (
                  <div 
                    key={index} 
                    className={`border-r border-b last:border-r-0 p-1 relative border-olivine/20 ${
                      !day.day ? "bg-tea-green/5" : ""
                    }`}
                  >
                    {day.day && (
                      <>
                        <div className="p-1 font-medium text-sm text-oxford-blue">{day.day}</div>
                        <div className="space-y-1 mt-1">
                          {day.events?.map(event => (
                            <TooltipProvider key={event.id}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HoverCard>
                                    <HoverCardTrigger asChild>
                                      <div 
                                        className={`calendar-event ${event.category} rounded-sm px-2 py-1 text-xs cursor-pointer hover:shadow-md transition-all`}
                                      >
                                        {event.title}
                                      </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent 
                                      className="w-80 p-0 border-cambridge-blue/30 shadow-lg backdrop-blur-md bg-white/80"
                                      side="right"
                                    >
                                      <div className="p-4 border-b border-olivine/20 bg-gradient-to-r from-white to-tea-green/20">
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <Badge 
                                              className={getCategoryColor(event.category)}
                                            >
                                              {event.category === "fire" 
                                                ? "Fire Safety" 
                                                : event.category === "road" 
                                                  ? "Road Safety" 
                                                  : "Industrial Safety"}
                                            </Badge>
                                            <h3 className="font-medium text-oxford-blue mt-2">{event.title}</h3>
                                          </div>
                                          <Button variant="outline" size="icon" className="h-7 w-7">
                                            <Info className="h-3.5 w-3.5" />
                                          </Button>
                                        </div>
                                      </div>
                                      <div className="p-4 space-y-3">
                                        <div className="flex items-start gap-2">
                                          <Clock className="h-4 w-4 text-charcoal mt-0.5" />
                                          <div>
                                            <p className="text-sm font-medium text-oxford-blue">{event.time}</p>
                                            <p className="text-xs text-charcoal">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <MapPin className="h-4 w-4 text-charcoal mt-0.5" />
                                          <p className="text-sm text-charcoal">{event.location}</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                          <Users className="h-4 w-4 text-charcoal mt-0.5" />
                                          <p className="text-sm text-charcoal">{event.participants} participants</p>
                                        </div>
                                        <div className="pt-2 border-t border-olivine/20">
                                          <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                              <AvatarImage src={event.trainer.avatar} />
                                              <AvatarFallback className="bg-cambridge-blue text-white text-xs">
                                                {event.trainer.initials}
                                              </AvatarFallback>
                                            </Avatar>
                                            <div>
                                              <p className="text-sm font-medium text-oxford-blue">{event.trainer.name}</p>
                                              <p className="text-xs text-charcoal">{event.trainer.specialty}</p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="pt-2 text-xs text-charcoal">
                                          <p>{event.description}</p>
                                        </div>
                                      </div>
                                      <div className="p-3 bg-gradient-to-r from-tea-green/10 to-white border-t border-olivine/20 flex justify-end gap-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="h-8 text-xs border-cambridge-blue/30 text-cambridge-blue"
                                          onClick={() => handleReschedule(event)}
                                        >
                                          Reschedule
                                        </Button>
                                        <Button 
                                          size="sm" 
                                          className="h-8 text-xs bg-gradient-to-r from-oxford-blue to-charcoal text-white"
                                          onClick={() => handleViewDetails(event)}
                                        >
                                          View Details
                                        </Button>
                                      </div>
                                    </HoverCardContent>
                                  </HoverCard>
                                </TooltipTrigger>
                                <TooltipContent className="bg-white/80 backdrop-blur-md border-cambridge-blue/20">
                                  <p className="text-xs">{event.title} - {event.time}</p>
                                  <p className="text-xs">Trainer: {event.trainer.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="week">
          <Card className="animate-fade-in border-cambridge-blue/30 overflow-hidden">
            <CardContent className="pt-6 p-5">
              <div className="space-y-3">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => (
                  <div key={index} className="border border-olivine/20 rounded-md overflow-hidden">
                    <div className="bg-tea-green/20 p-3 font-medium text-oxford-blue">{day}</div>
                    <div className="p-4">
                      {events.slice(index, index + 1).map(event => (
                        <div key={event.id} className="flex items-center justify-between p-3 border border-olivine/20 rounded-md bg-white/50 hover:bg-tea-green/10 transition-colors backdrop-blur-sm">
                          <div className="flex items-center">
                            <div className={`w-2 h-10 rounded-full ${
                              event.category === "fire" 
                                ? "bg-[#FF7F00]" 
                                : event.category === "road" 
                                  ? "bg-oxford-blue" 
                                  : "bg-cambridge-blue"
                            } mr-3`}></div>
                            <div>
                              <h3 className="font-medium text-oxford-blue">{event.title}</h3>
                              <p className="text-sm text-charcoal">
                                {event.time} • {event.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge className={getCategoryColor(event.category)}>
                              {event.category === "fire" 
                                ? "Fire Safety" 
                                : event.category === "road" 
                                  ? "Road Safety" 
                                  : "Industrial Safety"}
                            </Badge>
                            <Avatar className="ml-4 h-8 w-8">
                              <AvatarImage src={event.trainer.avatar} />
                              <AvatarFallback className="bg-cambridge-blue text-white">
                                {event.trainer.initials}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="day">
          <Card className="animate-fade-in border-cambridge-blue/30 overflow-hidden">
            <CardContent className="py-6 p-5">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-oxford-blue">November 15, 2023</h3>
                <p className="text-charcoal">Wednesday</p>
              </div>
              
              <div className="space-y-6">
                {events.slice(0, 2).map(event => (
                  <div 
                    key={event.id} 
                    className="relative border border-olivine/20 rounded-lg p-4 flex items-start gap-4 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="text-center min-w-24">
                      <div className="text-sm font-medium text-oxford-blue">{event.time.split(" - ")[0]}</div>
                      <div className="text-xs text-charcoal mt-1">to</div>
                      <div className="text-sm font-medium text-oxford-blue">{event.time.split(" - ")[1]}</div>
                    </div>
                    
                    <div className={`w-1 h-full absolute left-28 top-0 rounded-full ${
                      event.category === "fire" 
                        ? "bg-[#FF7F00]" 
                        : event.category === "road" 
                          ? "bg-oxford-blue" 
                          : "bg-cambridge-blue"
                    }`}></div>
                    
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category === "fire" 
                              ? "Fire Safety" 
                              : event.category === "road" 
                                ? "Road Safety" 
                                : "Industrial Safety"}
                          </Badge>
                          <h3 className="text-lg font-semibold mt-2 text-oxford-blue">{event.title}</h3>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-cambridge-blue/30 text-cambridge-blue"
                            onClick={() => handleReschedule(event)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-charcoal/30 text-charcoal"
                            onClick={() => {
                              toast({
                                title: "Training Canceled",
                                description: `${event.title} has been canceled.`,
                                variant: "destructive"
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-charcoal">
                        <div className="flex items-center gap-1 text-sm mb-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={event.trainer.avatar} />
                              <AvatarFallback className="bg-cambridge-blue text-white">
                                {event.trainer.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-2">
                              <p className="text-sm font-medium text-oxford-blue">{event.trainer.name}</p>
                              <p className="text-xs text-charcoal">{event.trainer.specialty} Trainer</p>
                            </div>
                          </div>
                          
                          <div className="text-sm">
                            <span className="font-medium text-oxford-blue">{event.participants}</span> participants
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Schedule;
