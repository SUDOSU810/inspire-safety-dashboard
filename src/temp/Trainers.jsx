
import React from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const TrainerCard = ({ trainer }) => {
  return (
    <Card className="hover:shadow-lg transition-all overflow-hidden">
      <div className="flex p-4 items-center space-x-4">
        <Avatar className="h-14 w-14 border-2 border-olivine/20">
          <AvatarImage src={trainer.avatar} />
          <AvatarFallback className="bg-gradient-to-br from-success-green to-tea-green text-white">
            {trainer.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h3 className="font-medium text-lg">{trainer.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">{trainer.specialization}</span>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-xs ml-1">{trainer.rating}/5</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 items-end">
          <Badge variant="outline" className="bg-success-green/10 text-success-green border-success-green/20">
            {trainer.trainings} trainings
          </Badge>
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/trainer/${trainer.id}`} className="flex items-center">
              <span className="text-xs">View Profile</span>
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="border-t border-border/20 px-4 py-2 bg-muted/10">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Award className="h-3.5 w-3.5 text-cambridge-blue" />
            <span>{trainer.certifications} certifications</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-cambridge-blue" />
            <span>{trainer.experience} years experience</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Trainers = () => {
  // Sample data for trainers
  const trainers = [
    {
      id: 1,
      name: "Dr. Alex Morgan",
      specialization: "Fire Safety Specialist",
      avatar: "",
      rating: 4.9,
      trainings: 42,
      certifications: 5,
      experience: 8
    },
    {
      id: 2,
      name: "Sarah Chen",
      specialization: "First Aid & CPR Instructor",
      avatar: "",
      rating: 4.7,
      trainings: 36,
      certifications: 4,
      experience: 6
    },
    {
      id: 3,
      name: "James Wilson",
      specialization: "Emergency Response Coordinator",
      avatar: "",
      rating: 4.8,
      trainings: 29,
      certifications: 3,
      experience: 5
    },
    {
      id: 4,
      name: "Priya Sharma",
      specialization: "Hazardous Materials Expert",
      avatar: "",
      rating: 4.6,
      trainings: 24,
      certifications: 4,
      experience: 7
    },
    {
      id: 5,
      name: "Michael Johnson",
      specialization: "Workplace Safety Analyst",
      avatar: "",
      rating: 4.5,
      trainings: 18,
      certifications: 3,
      experience: 4
    }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-white tracking-tight">Trainers</h1>
        <p className="text-muted-foreground">
          View and manage safety trainers
        </p>
      </div>
      
      <div className="grid gap-6 grid-cols-1">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-white/10 bg-card/80">
            <CardTitle className="text-lg font-semibold text-white">Safety Training Specialists</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {trainers.map((trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Trainers;
