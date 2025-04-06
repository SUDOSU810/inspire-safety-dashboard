
import React, { useState } from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import Calendar from "@/components/calendar/calendar";
import TrainingForm from "@/components/training/training-form";
import TrainingDetails from "@/components/training/training-details";
import { useToast } from "@/hooks/use-toast";

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const { toast } = useToast();

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    const trainingOnDate = trainings.find(training => {
      try {
        const trainingDate = training.date ? new Date(training.date) : null;
        return trainingDate && 
          trainingDate.getFullYear() === selectedDate.getFullYear() && 
          trainingDate.getMonth() === selectedDate.getMonth() && 
          trainingDate.getDate() === selectedDate.getDate();
      } catch (error) {
        console.error("Error comparing dates:", error);
        return false;
      }
    });
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

  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-white tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">
          Manage your training schedule
        </p>
      </div>
      
      <div className="flex justify-end mb-4">
        <TrainingForm 
          open={dialogOpen} 
          setOpen={setDialogOpen} 
          onSubmit={handleAddTraining} 
        />
      </div>
      
      {/* Calendar Section */}
      <Calendar 
        trainings={trainings} 
        onDateClick={handleDateSelect} 
        selectedDate={date}
      />
      
      {/* Training Details Section */}
      <TrainingDetails selectedTraining={selectedTraining} />
    </DashboardLayout>
  );
};

export default Schedule;
