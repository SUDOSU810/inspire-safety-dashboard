
import DashboardLayout from "@/components/layout/DashboardLayout";
import React from 'react';

const Schedule = () => {
  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-white tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">
          Manage your training schedule
        </p>
      </div>
      
      <div className="grid gap-6 grid-cols-1">
        {/* Schedule content will go here */}
        <p>Schedule content placeholder</p>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
