
import { BarChart3, Calendar, File, Users, ArrowUp, ArrowDown } from "lucide-react";
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
        <h1 className="text-3xl font-bold font-montserrat">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to Inspire Safety Foundation dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Trainings"
          value="256"
          icon={<Calendar size={20} />}
          trend={{ value: 12, isUpward: true }}
          variant="default"
          className="animate-slide-in"
          style={{ animationDelay: "0ms" }}
        />
        
        <StatCard
          title="Active Trainers"
          value="32"
          icon={<Users size={20} />}
          trend={{ value: 8, isUpward: true }}
          variant="info"
          className="animate-slide-in"
          style={{ animationDelay: "100ms" }}
        />
        
        <StatCard
          title="Documents"
          value="1,250"
          icon={<File size={20} />}
          trend={{ value: 5, isUpward: true }}
          variant="success"
          className="animate-slide-in"
          style={{ animationDelay: "200ms" }}
        />
        
        <StatCard
          title="Analytics"
          value="24.5K"
          icon={<BarChart3 size={20} />}
          trend={{ value: 3, isUpward: false }}
          variant="danger"
          className="animate-slide-in"
          style={{ animationDelay: "300ms" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="col-span-2">
          <ActivityChart />
        </div>
        
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Training Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">Fire Safety</span>
                  <div className="text-xs text-muted-foreground">216 out of 300 sessions</div>
                </div>
                <span className="text-sm font-medium">72%</span>
              </div>
              <Progress value={72} className="h-2 bg-muted" indicatorClassName="bg-safety-orange" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">Road Safety</span>
                  <div className="text-xs text-muted-foreground">184 out of 250 sessions</div>
                </div>
                <span className="text-sm font-medium">74%</span>
              </div>
              <Progress value={74} className="h-2 bg-muted" indicatorClassName="bg-deep-blue" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">Industrial Safety</span>
                  <div className="text-xs text-muted-foreground">312 out of 400 sessions</div>
                </div>
                <span className="text-sm font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2 bg-muted" indicatorClassName="bg-success-green" />
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium">Overall Completion</span>
                  <div className="text-xs text-muted-foreground">712 out of 950 sessions</div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2 bg-muted" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-2">
          <UpcomingTrainings />
        </div>
        
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Fire Safety Protocol 2023", type: "PDF", date: "2 days ago", domain: "fire" },
                { name: "Chennai Region Traffic Analysis", type: "Excel", date: "5 days ago", domain: "road" },
                { name: "Machinery Safety Guidelines", type: "Word", date: "1 week ago", domain: "industrial" },
                { name: "Training Effectiveness Report", type: "PowerPoint", date: "2 weeks ago", domain: "fire" },
              ].map((doc, index) => (
                <div key={index} className="document-card flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      doc.domain === "fire" 
                        ? "bg-safety-orange/10 text-safety-orange" 
                        : doc.domain === "road" 
                          ? "bg-deep-blue/10 text-deep-blue"
                          : "bg-success-green/10 text-success-green"
                    }`}>
                      <File size={18} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{doc.name}</p>
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
