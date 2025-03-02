
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart,
  FileDown, 
  Filter, 
  PieChart, 
  TrendingUp 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

const barData = [
  { name: "Jan", fire: 65, road: 40, industrial: 24 },
  { name: "Feb", fire: 59, road: 45, industrial: 30 },
  { name: "Mar", fire: 80, road: 52, industrial: 45 },
  { name: "Apr", fire: 78, road: 61, industrial: 48 },
  { name: "May", fire: 85, road: 50, industrial: 38 },
  { name: "Jun", fire: 90, road: 58, industrial: 65 },
];

const lineData = [
  { name: "Week 1", trainings: 25, participants: 420 },
  { name: "Week 2", trainings: 30, participants: 580 },
  { name: "Week 3", trainings: 28, participants: 510 },
  { name: "Week 4", trainings: 32, participants: 620 },
  { name: "Week 5", trainings: 38, participants: 740 },
  { name: "Week 6", trainings: 35, participants: 680 },
];

const pieData = [
  { name: "Fire Safety", value: 45, color: "#FF8A3D" },
  { name: "Road Safety", value: 30, color: "#0E4777" },
  { name: "Industrial Safety", value: 25, color: "#2EBD6B" },
];

const regionData = [
  { name: "Chennai", completion: 78 },
  { name: "Mumbai", completion: 65 },
  { name: "Delhi", completion: 82 },
  { name: "Bangalore", completion: 74 },
  { name: "Hyderabad", completion: 69 },
];

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-white tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground">
          View performance metrics and training analytics
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <Tabs defaultValue="overview" className="w-full md:w-auto">
          <TabsList className="grid w-full sm:w-auto grid-cols-3 sm:grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Select defaultValue="thisMonth">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastQuarter">Last Quarter</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <TabsContent value="overview" className="mt-0 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="elegant-card overflow-hidden md:col-span-2">
            <CardHeader className="border-b border-white/5 bg-card/80">
              <CardTitle className="text-lg font-semibold text-white">Training Categories</CardTitle>
              <CardDescription>Monthly training sessions by category</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <ReBarChart
                  data={barData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(17, 20, 26, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}
                    labelStyle={{ color: 'rgba(255,255,255,0.9)' }}
                  />
                  <Legend />
                  <Bar dataKey="fire" name="Fire Safety" fill="#FF8A3D" />
                  <Bar dataKey="road" name="Road Safety" fill="#0E4777" />
                  <Bar dataKey="industrial" name="Industrial Safety" fill="#2EBD6B" />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="elegant-card overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-card/80">
              <CardTitle className="text-lg font-semibold text-white">Distribution</CardTitle>
              <CardDescription>Training categories distribution</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-6 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <RePieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(17, 20, 26, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}
                    labelStyle={{ color: 'rgba(255,255,255,0.9)' }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="elegant-card overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-card/80">
              <CardTitle className="text-lg font-semibold text-white">Weekly Trainings</CardTitle>
              <CardDescription>Training sessions and participants</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-6">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={lineData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(17, 20, 26, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}
                    labelStyle={{ color: 'rgba(255,255,255,0.9)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="trainings" name="Training Sessions" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="participants" name="Participants" stroke="#FF8A3D" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="elegant-card overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-card/80">
              <CardTitle className="text-lg font-semibold text-white">Regional Performance</CardTitle>
              <CardDescription>Training completion rates by region</CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-6 space-y-5">
              {regionData.map((region) => (
                <div key={region.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium text-white/90">{region.name} Region</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-white/90">{region.completion}%</span>
                      <TrendingUp size={14} className="text-success-green" />
                    </div>
                  </div>
                  <Progress 
                    value={region.completion} 
                    className="h-2 bg-muted" 
                    indicatorClassName={
                      region.completion > 80 
                        ? "bg-gradient-to-r from-success-green to-success-green/70"
                        : region.completion > 70
                          ? "bg-gradient-to-r from-safety-orange to-safety-orange/70"
                          : "bg-gradient-to-r from-deep-blue to-deep-blue/70"
                    } 
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="performance" className="mt-0">
        <Card className="elegant-card animate-fade-in overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-card/80">
            <CardTitle className="text-lg font-semibold text-white">Performance Metrics</CardTitle>
            <CardDescription>Interactive performance dashboard coming soon</CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center justify-center h-[400px] text-center">
            <div className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center mb-4">
              <BarChart className="h-8 w-8 text-royal-purple" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Performance Dashboard</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Detailed performance metrics and KPIs for training programs and trainers will be available here soon.
            </p>
            <Button>Check Back Soon</Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="regional" className="mt-0">
        <Card className="elegant-card animate-fade-in overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-card/80">
            <CardTitle className="text-lg font-semibold text-white">Regional Analysis</CardTitle>
            <CardDescription>Region-wise training breakdown coming soon</CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center justify-center h-[400px] text-center">
            <div className="w-16 h-16 rounded-full gradient-blue flex items-center justify-center mb-4">
              <PieChart className="h-8 w-8 text-deep-blue" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Regional Dashboard</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Detailed region-wise analysis of training programs, participation, and effectiveness will be available here soon.
            </p>
            <Button>Check Back Soon</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </DashboardLayout>
  );
};

export default Reports;
