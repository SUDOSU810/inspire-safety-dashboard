
import DashboardLayout from "@/components/layout/DashboardLayout";
import React from 'react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-white tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your safety training dashboard
        </p>
      </div>
      
      <div className="grid gap-6 grid-cols-1">
        {/* Dashboard content will go here */}
        <p>Dashboard content placeholder</p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
