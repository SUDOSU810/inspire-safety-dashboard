
import { BarChart3, Calendar, File, Users, TrendingUp, ArrowDownRight, ArrowUpRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import UpcomingTrainings from "@/components/dashboard/UpcomingTrainings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-white tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to Inspire Safety Foundation dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Trainings"
          value="256"
          icon={<div className="w-10 h-10 rounded-full gradient-orange flex items-center justify-center"><Calendar size={20} className="text-primary" /></div>}
          trend={{ value: 12, isUpward: true }}
          variant="default"
          className="animate-slide-in glass-card border-primary/10"
          style={{ animationDelay: "0ms" }}
        />
        
        <StatCard
          title="Active Trainers"
          value="32"
          icon={<div className="w-10 h-10 rounded-full gradient-blue flex items-center justify-center"><Users size={20} className="text-deep-blue" /></div>}
          trend={{ value: 8, isUpward: true }}
          variant="info"
          className="animate-slide-in glass-card border-deep-blue/10"
          style={{ animationDelay: "100ms" }}
        />
        
        <StatCard
          title="Documents"
          value="1,250"
          icon={<div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center"><File size={20} className="text-royal-purple" /></div>}
          trend={{ value: 5, isUpward: true }}
          variant="success"
          className="animate-slide-in glass-card border-royal-purple/10"
          style={{ animationDelay: "200ms" }}
        />
        
        <StatCard
          title="Analytics"
          value="24.5K"
          icon={<div className="w-10 h-10 rounded-full gradient-green flex items-center justify-center"><BarChart3 size={20} className="text-success-green" /></div>}
          trend={{ value: 3, isUpward: false }}
          variant="danger"
          className="animate-slide-in glass-card border-success-green/10"
          style={{ animationDelay: "300ms" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="col-span-2">
          <Card className="elegant-card overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-card/80">
              <CardTitle className="text-lg font-semibold text-white">Activity Analytics</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <ActivityChart />
            </CardContent>
          </Card>
        </div>
        
        <Card className="animate-fade-in elegant-card overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-card/80">
            <CardTitle className="text-lg font-semibold text-white">Training Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-white/90">Fire Safety</span>
                  <div className="text-xs text-muted-foreground">216 out of 300 sessions</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-white/90">72%</span>
                  <TrendingUp size={14} className="text-safety-orange" />
                </div>
              </div>
              <Progress value={72} className="h-2 bg-muted" indicatorClassName="bg-gradient-to-r from-safety-orange to-safety-orange/70" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-white/90">Road Safety</span>
                  <div className="text-xs text-muted-foreground">184 out of 250 sessions</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-white/90">74%</span>
                  <TrendingUp size={14} className="text-deep-blue" />
                </div>
              </div>
              <Progress value={74} className="h-2 bg-muted" indicatorClassName="bg-gradient-to-r from-deep-blue to-deep-blue/70" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-white/90">Industrial Safety</span>
                  <div className="text-xs text-muted-foreground">312 out of 400 sessions</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-white/90">78%</span>
                  <TrendingUp size={14} className="text-success-green" />
                </div>
              </div>
              <Progress value={78} className="h-2 bg-muted" indicatorClassName="bg-gradient-to-r from-success-green to-success-green/70" />
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-white/90">Overall Completion</span>
                  <div className="text-xs text-muted-foreground">712 out of 950 sessions</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-white/90">75%</span>
                  <TrendingUp size={14} className="text-royal-purple" />
                </div>
              </div>
              <Progress value={75} className="h-2 bg-muted" indicatorClassName="bg-gradient-to-r from-royal-purple to-royal-purple/70" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-2">
          <UpcomingTrainings />
        </div>
        
        <Card className="animate-fade-in elegant-card overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-card/80">
            <CardTitle className="text-lg font-semibold text-white">Recent Documents</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              {[
                { name: "Fire Safety Protocol 2023", type: "PDF", date: "2 days ago", domain: "fire" },
                { name: "Chennai Region Traffic Analysis", type: "Excel", date: "5 days ago", domain: "road" },
                { name: "Machinery Safety Guidelines", type: "Word", date: "1 week ago", domain: "industrial" },
                { name: "Training Effectiveness Report", type: "PowerPoint", date: "2 weeks ago", domain: "fire" },
              ].map((doc, index) => (
                <div key={index} className="document-card flex items-center justify-between p-3 rounded-lg border border-white/5 hover:border-white/10 bg-card/60 backdrop-blur-sm transition-all">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      doc.domain === "fire" 
                        ? "gradient-orange" 
                        : doc.domain === "road" 
                          ? "gradient-blue"
                          : "gradient-green"
                    }`}>
                      <File size={18} className={
                        doc.domain === "fire" 
                          ? "text-safety-orange" 
                          : doc.domain === "road" 
                            ? "text-deep-blue"
                            : "text-success-green"
                      } />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white/90">{doc.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {doc.type} • {doc.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
