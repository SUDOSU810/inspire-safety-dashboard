
import React from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  FileText, 
  Star,
  Clock, 
  CheckCircle, 
  Users
} from "lucide-react";

const TrainerDetail = () => {
  const { id } = useParams();
  
  // Mock data for the trainer based on ID
  const trainer = {
    id: parseInt(id),
    name: id === "1" ? "Dr. Alex Morgan" : `Trainer ${id}`,
    role: "Fire Safety Specialist",
    bio: "Dr. Alex Morgan is a certified fire safety specialist with over 8 years of experience in industrial safety training. He has conducted over 40 workshops and training sessions across multiple organizations.",
    email: "alex.morgan@inspiresafety.org",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "",
    rating: 4.9,
    certifications: [
      "Certified Fire Protection Specialist (CFPS)",
      "Industrial Emergency Response Trainer",
      "National Fire Protection Association (NFPA) Certified",
      "OSHA 30-Hour Safety Training",
      "Advanced First Aid & CPR Instructor"
    ],
    upcomingTrainings: [
      {
        id: 1,
        title: "Fire Safety Basics",
        date: "April 12, 2025",
        time: "10:00 AM - 1:00 PM",
        location: "Training Center Room 102",
        attendees: 18
      },
      {
        id: 2,
        title: "Emergency Evacuation Procedures",
        date: "April 18, 2025",
        time: "2:00 PM - 4:00 PM",
        location: "Main Building Conference Hall",
        attendees: 25
      }
    ],
    completedTrainings: [
      {
        id: 101,
        title: "Fire Extinguisher Handling",
        date: "March 25, 2025",
        participants: 22,
        duration: "3 hours",
        feedback: 4.8
      },
      {
        id: 102,
        title: "Workplace Fire Prevention",
        date: "March 15, 2025",
        participants: 19,
        duration: "4 hours",
        feedback: 4.7
      },
      {
        id: 103,
        title: "Emergency Response Coordination",
        date: "March 5, 2025",
        participants: 24,
        duration: "5 hours",
        feedback: 4.9
      }
    ]
  };

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-white tracking-tight">Trainer Profile</h1>
        <p className="text-muted-foreground">
          Viewing details for {trainer.name}
        </p>
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left column - Trainer Profile */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-success-green/10 to-vibrant-green/5 border-b border-success-green/20">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-white/20 shadow-lg mb-3">
                  <AvatarImage src={trainer.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-success-green to-vibrant-green text-white text-xl font-semibold">
                    {trainer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-bold text-center">{trainer.name}</CardTitle>
                <Badge className="mt-2 bg-gradient-to-r from-cambridge-blue to-tea-green text-white border-none">
                  {trainer.role}
                </Badge>
                <div className="flex items-center mt-3 bg-white/10 px-3 py-1.5 rounded-full">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{trainer.rating} rating</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{trainer.bio}</p>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-cambridge-blue" />
                    <span className="text-sm">{trainer.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-cambridge-blue" />
                    <span className="text-sm">{trainer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-cambridge-blue" />
                    <span className="text-sm">{trainer.location}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/20 mt-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-cambridge-blue" />
                    Certifications
                  </h3>
                  <ul className="space-y-2">
                    {trainer.certifications.map((cert, index) => (
                      <li key={index} className="text-xs flex items-start gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-success-green mt-0.5" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 mt-4">
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Trainer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Tabs with Training Information */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">Upcoming Trainings</TabsTrigger>
              <TabsTrigger value="completed">Completed Sessions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-4">
              {trainer.upcomingTrainings.map((training) => (
                <Card key={training.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold mb-3">{training.title}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-success-green" />
                        <span className="text-sm">{training.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-success-green" />
                        <span className="text-sm">{training.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-success-green" />
                        <span className="text-sm">{training.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-success-green" />
                        <span className="text-sm">{training.attendees} attendees</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {trainer.completedTrainings.map((session) => (
                <Card key={session.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold">{session.title}</h3>
                      <Badge variant="outline" className="bg-success-green/10 text-success-green border-success-green/20">
                        <Star className="h-3 w-3 fill-current mr-1" />
                        {session.feedback}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-cambridge-blue" />
                        <span className="text-sm">{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-cambridge-blue" />
                        <span className="text-sm">{session.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-cambridge-blue" />
                        <span className="text-sm">{session.participants} participants</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        View Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrainerDetail;
