
import React, { useState } from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Clock, MapPin, Users, Calendar as CalendarIcon, Plus } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

const TrainingItem = ({ training }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-4 bg-white">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{training.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="text-success-green">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <span className="text-gray-700">{training.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-success-green">
            <Clock className="h-5 w-5" />
          </div>
          <span className="text-gray-700">{training.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-success-green">
            <MapPin className="h-5 w-5" />
          </div>
          <span className="text-gray-700">{training.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-success-green">
            <Users className="h-5 w-5" />
          </div>
          <span className="text-gray-700">{training.attendees} attendees</span>
        </div>
      </div>
    </div>
  );
};

const AddTrainingForm = ({ onClose }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Training Title</Label>
        <Input id="title" placeholder="Enter training title" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="Enter location" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="attendees">Expected Attendees</Label>
        <Input id="attendees" type="number" min="1" placeholder="Number of attendees" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Enter training description" />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button>Add Training</Button>
      </div>
    </div>
  );
};

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const trainings = [
    {
      title: "Fire Safety Training",
      date: "April 10, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Training Center Room 101",
      attendees: 24
    },
    {
      title: "First Aid Certification",
      date: "April 15, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "Medical Wing, Building B",
      attendees: 18
    },
    {
      title: "Emergency Response Drill",
      date: "April 20, 2025",
      time: "9:00 AM - 11:00 AM",
      location: "Main Campus Grounds",
      attendees: 42
    },
    {
      title: "Workplace Hazard Identification",
      date: "April 25, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Conference Room A",
      attendees: 15
    }
  ];

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
            <AddTrainingForm onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
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
            onSelect={setDate}
            month={currentMonth}
            className="w-full"
            showOutsideDays={true}
            fixedWeeks={true}
          />
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-xl font-semibold">Upcoming Training Sessions</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {trainings.map((training, index) => (
            <TrainingItem key={index} training={training} />
          ))}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Schedule;
