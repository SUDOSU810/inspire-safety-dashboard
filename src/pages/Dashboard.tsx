
import { BarChart3, Calendar, File, Users, TrendingUp, ShieldCheck, Flame, RefreshCw, Award } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import UpcomingTrainings from "@/components/dashboard/UpcomingTrainings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-montserrat text-foreground tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back to Inspire Safety Foundation dashboard
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw size={16} />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Trainings"
          value="256"
          icon={<div className="w-10 h-10 rounded-full gradient-vibrant-orange flex items-center justify-center"><Calendar size={20} className="text-white" /></div>}
          trend={{ value: 12, isUpward: true }}
          variant="default"
          className="animate-slide-in"
          style={{ animationDelay: "0ms" }}
        />
        
        <StatCard
          title="Active Trainers"
          value="32"
          icon={<div className="w-10 h-10 rounded-full gradient-vibrant-blue flex items-center justify-center"><Users size={20} className="text-white" /></div>}
          trend={{ value: 8, isUpward: true }}
          variant="info"
          className="animate-slide-in"
          style={{ animationDelay: "100ms" }}
        />
        
        <StatCard
          title="Documents"
          value="1,250"
          icon={<div className="w-10 h-10 rounded-full gradient-vibrant-purple flex items-center justify-center"><File size={20} className="text-white" /></div>}
          trend={{ value: 5, isUpward: true }}
          variant="success"
          className="animate-slide-in"
          style={{ animationDelay: "200ms" }}
        />
        
        <StatCard
          title="Analytics"
          value="24.5K"
          icon={<div className="w-10 h-10 rounded-full gradient-vibrant-green flex items-center justify-center"><BarChart3 size={20} className="text-white" /></div>}
          trend={{ value: 3, isUpward: false }}
          variant="danger"
          className="animate-slide-in"
          style={{ animationDelay: "300ms" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="col-span-2">
          <GlassCard className="h-full">
            <CardHeader className="border-b border-secondary/20 bg-white/50 rounded-t-xl">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Award size={18} className="text-primary" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ActivityChart />
            </CardContent>
          </GlassCard>
        </div>
        
        <GlassCard variant="success" className="h-full">
          <CardHeader className="border-b border-secondary/20 bg-white/50 rounded-t-xl">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <ShieldCheck size={18} className="text-success-green" />
              Training Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-foreground">Fire Safety</span>
                  <div className="text-xs text-muted-foreground">216 out of 300 sessions</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-foreground">72%</span>
                  <TrendingUp size={14} className="text-[#FF7F00]" />
                </div>
              </div>
              <Progress value={72} className="h-2.5 bg-muted/40" indicatorClassName="bg-gradient-to-r from-[#FF7F00] to-[#FFA500]" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-foreground">Road Safety</span>
                  <div className="text-xs text-muted-foreground">184 out of 250 sessions</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-foreground">74%</span>
                  <TrendingUp size={14} className="text-[#3B82F6]" />
                </div>
              </div>
              <Progress value={74} className="h-2.5 bg-muted/40" indicatorClassName="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-foreground">Industrial Safety</span>
                  <div className="text-xs text-muted-foreground">312 out of 400 sessions</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-foreground">78%</span>
                  <TrendingUp size={14} className="text-success-green" />
                </div>
              </div>
              <Progress value={78} className="h-2.5 bg-muted/40" indicatorClassName="bg-gradient-to-r from-success-green to-light-green" />
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-foreground">Overall Completion</span>
                  <div className="text-xs text-muted-foreground">712 out of 950 sessions</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-foreground">75%</span>
                  <TrendingUp size={14} className="text-chart-purple" />
                </div>
              </div>
              <Progress value={75} className="h-2.5 bg-muted/40" indicatorClassName="bg-gradient-to-r from-chart-purple to-chart-pink" />
            </div>
            
            <div className="mt-2 pt-4 border-t border-secondary/20">
              <Button variant="success" className="w-full" animation="shine">
                <Flame size={16} />
                View Detailed Report
              </Button>
            </div>
          </CardContent>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-2">
          <GlassCard className="h-full">
            <CardHeader className="border-b border-secondary/20 bg-white/50 rounded-t-xl">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                Upcoming Trainings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <UpcomingTrainings />
            </CardContent>
          </GlassCard>
        </div>
        
        <GlassCard variant="info" className="h-full">
          <CardHeader className="border-b border-secondary/20 bg-white/50 rounded-t-xl">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <File size={18} className="text-chart-blue" />
              Recent Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              {[
                { name: "Fire Safety Protocol 2023", type: "PDF", date: "2 days ago", domain: "fire" },
                { name: "Chennai Region Traffic Analysis", type: "Excel", date: "5 days ago", domain: "road" },
                { name: "Machinery Safety Guidelines", type: "Word", date: "1 week ago", domain: "industrial" },
                { name: "Training Effectiveness Report", type: "PowerPoint", date: "2 weeks ago", domain: "fire" },
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-secondary/30 hover:border-primary/30 bg-white/80 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      doc.domain === "fire" 
                        ? "gradient-vibrant-orange" 
                        : doc.domain === "road" 
                          ? "gradient-vibrant-blue"
                          : "gradient-vibrant-green"
                    }`}>
                      <File size={18} className="text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {doc.type} • {doc.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-2 pt-4 border-t border-secondary/20">
                <Button variant="outline" className="w-full">
                  View All Documents
                </Button>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
