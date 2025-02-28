
import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Grid, List, Plus } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample trainers data
const trainers = [
  { id: 1, name: "Raj Kumar", specialty: "Fire Safety", initials: "RK" },
  { id: 2, name: "Priya Singh", specialty: "Road Safety", initials: "PS" },
  { id: 3, name: "Vikram Mehta", specialty: "Industrial Safety", initials: "VM" },
  { id: 4, name: "Sunita Patel", specialty: "Fire Safety", initials: "SP" },
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
      return "bg-safety-orange/10 text-safety-orange border-safety-orange/30";
    case "road":
      return "bg-deep-blue/10 text-deep-blue border-deep-blue/30";
    case "industrial":
      return "bg-success-green/10 text-success-green border-success-green/30";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("month");
  const [createEventOpen, setCreateEventOpen] = useState(false);
  
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

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat">Training Schedule</h1>
        <p className="text-muted-foreground">
          Manage and organize training sessions
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h2 className="text-xl font-semibold">
            {monthName} {year}
          </h2>
          
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
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
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Dialog open={createEventOpen} onOpenChange={setCreateEventOpen}>
            <DialogTrigger asChild>
              <Button className="md:ml-auto">
                <Plus className="mr-2 h-4 w-4" /> Schedule Training
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Schedule New Training</DialogTitle>
                <DialogDescription>
                  Add details for the new training session. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter training title" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
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
                  <Label htmlFor="trainer">Assign Trainer</Label>
                  <Select>
                    <SelectTrigger id="trainer">
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map(trainer => (
                        <SelectItem key={trainer.id} value={trainer.id.toString()}>
                          {trainer.name} ({trainer.specialty})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Add details about the training" />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateEventOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Training</Button>
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
          <Card className="animate-fade-in elegant-card overflow-hidden">
            <CardContent className="p-0">
              {/* Calendar Header - Days of Week */}
              <div className="grid grid-cols-7 border-b border-border">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <div 
                    key={index} 
                    className="p-3 text-center font-medium text-sm border-r last:border-r-0 border-border"
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
                    className={`border-r border-b last:border-r-0 p-1 relative border-border ${
                      !day.day ? "bg-muted/20" : ""
                    }`}
                  >
                    {day.day && (
                      <>
                        <div className="p-1 font-medium text-sm">{day.day}</div>
                        <div className="space-y-1 mt-1">
                          {day.events?.map(event => (
                            <div 
                              key={event.id}
                              className={`calendar-event ${event.category} rounded-sm px-2 py-1 text-xs cursor-pointer`}
                              title={event.title}
                            >
                              {event.title}
                            </div>
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
          <Card className="animate-fade-in elegant-card overflow-hidden">
            <CardContent className="pt-6 p-5">
              <div className="space-y-3">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => (
                  <div key={index} className="border border-border rounded-md overflow-hidden">
                    <div className="bg-muted/30 p-3 font-medium">{day}</div>
                    <div className="p-4">
                      {events.slice(index, index + 1).map(event => (
                        <div key={event.id} className="flex items-center justify-between p-3 border border-border rounded-md bg-card/50">
                          <div className="flex items-center">
                            <div className={`w-2 h-10 rounded-full ${
                              event.category === "fire" 
                                ? "bg-safety-orange" 
                                : event.category === "road" 
                                  ? "bg-deep-blue" 
                                  : "bg-success-green"
                            } mr-3`}></div>
                            <div>
                              <h3 className="font-medium">{event.title}</h3>
                              <p className="text-sm text-muted-foreground">
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
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="bg-secondary text-white">
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
          <Card className="animate-fade-in elegant-card overflow-hidden">
            <CardContent className="py-6 p-5">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">November 15, 2023</h3>
                <p className="text-muted-foreground">Wednesday</p>
              </div>
              
              <div className="space-y-6">
                {events.slice(0, 2).map(event => (
                  <div 
                    key={event.id} 
                    className="relative border border-border rounded-lg p-4 flex items-start gap-4"
                  >
                    <div className="text-center min-w-24">
                      <div className="text-sm font-medium">{event.time.split(" - ")[0]}</div>
                      <div className="text-xs text-muted-foreground mt-1">to</div>
                      <div className="text-sm font-medium">{event.time.split(" - ")[1]}</div>
                    </div>
                    
                    <div className={`w-1 h-full absolute left-28 top-0 rounded-full ${
                      event.category === "fire" 
                        ? "bg-safety-orange" 
                        : event.category === "road" 
                          ? "bg-deep-blue" 
                          : "bg-success-green"
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
                          <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Cancel</Button>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-muted-foreground">
                        <div className="flex items-center gap-1 text-sm mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="bg-secondary text-white">
                                {event.trainer.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-2">
                              <p className="text-sm font-medium">{event.trainer.name}</p>
                              <p className="text-xs">{event.trainer.specialty} Trainer</p>
                            </div>
                          </div>
                          
                          <div className="text-sm">
                            <span className="font-medium">{event.participants}</span> participants
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
