
import React from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const TrainingItem = ({ training }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-4 bg-white">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{training.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="text-success-green">
            <Calendar className="h-5 w-5" />
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

const Schedule = () => {
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
