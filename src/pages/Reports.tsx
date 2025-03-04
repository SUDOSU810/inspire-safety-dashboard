
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
  TrendingUp,
  Download,
  Calendar as CalendarIcon
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
  Line,
  Area,
  AreaChart
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
  { name: "Fire Safety", value: 45, color: "#2EBD6B" },
  { name: "Road Safety", value: 30, color: "#1A9953" },
  { name: "Industrial Safety", value: 25, color: "#4FCB87" },
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
      <div className="mb-8 animate-slide-in">
        <h1 className="text-4xl font-bold font-montserrat text-gray-800 tracking-tight mb-2">Analytics & Reports</h1>
        <p className="text-gray-600 text-lg">
          View performance metrics and training analytics
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="w-full md:w-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full sm:w-auto grid-cols-3 sm:grid-cols-3 p-1 rounded-xl bg-gray-100 border-success-green/10">
              <TabsTrigger value="overview" className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-success-green data-[state=active]:shadow-sm">Overview</TabsTrigger>
              <TabsTrigger value="performance" className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-success-green data-[state=active]:shadow-sm">Performance</TabsTrigger>
              <TabsTrigger value="regional" className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-success-green data-[state=active]:shadow-sm">Regional</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Card className="overflow-hidden border-success-green/10 rounded-xl shadow-sm md:col-span-2 bg-white">
                  <CardHeader className="bg-gradient-to-r from-success-green/10 to-transparent border-b border-success-green/10 p-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-800">Training Categories</CardTitle>
                        <CardDescription className="text-gray-600">Monthly training sessions by category</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="border-success-green/20 text-success-green">
                        <Download className="mr-2 h-4 w-4" />
                        Export Chart
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 pt-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart
                        data={barData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'white', borderColor: '#e0e0e0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                          labelStyle={{ color: '#333', fontWeight: 'bold' }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="fire" name="Fire Safety" stroke="#2EBD6B" fill="#2EBD6B" fillOpacity={0.4} activeDot={{ r: 6 }} />
                        <Area type="monotone" dataKey="road" name="Road Safety" stroke="#1A9953" fill="#1A9953" fillOpacity={0.3} activeDot={{ r: 6 }} />
                        <Area type="monotone" dataKey="industrial" name="Industrial Safety" stroke="#4FCB87" fill="#4FCB87" fillOpacity={0.2} activeDot={{ r: 6 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-success-green/10 rounded-xl shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-success-green/10 to-transparent border-b border-success-green/10 p-5">
                    <CardTitle className="text-lg font-semibold text-gray-800">Category Distribution</CardTitle>
                    <CardDescription className="text-gray-600">Training types percentages</CardDescription>
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
                          contentStyle={{ backgroundColor: 'white', borderColor: '#e0e0e0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                          labelStyle={{ color: '#333', fontWeight: 'bold' }}
                        />
                      </RePieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Card className="overflow-hidden border-success-green/10 rounded-xl shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-success-green/10 to-transparent border-b border-success-green/10 p-5">
                    <CardTitle className="text-lg font-semibold text-gray-800">Weekly Trends</CardTitle>
                    <CardDescription className="text-gray-600">Training sessions and participants</CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 pt-6">
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart
                        data={lineData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'white', borderColor: '#e0e0e0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                          labelStyle={{ color: '#333', fontWeight: 'bold' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="trainings" name="Training Sessions" stroke="#4FCB87" strokeWidth={2} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="participants" name="Participants" stroke="#2EBD6B" strokeWidth={2} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-success-green/10 rounded-xl shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-success-green/10 to-transparent border-b border-success-green/10 p-5">
                    <CardTitle className="text-lg font-semibold text-gray-800">Regional Performance</CardTitle>
                    <CardDescription className="text-gray-600">Training completion rates by region</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-6 space-y-5">
                    {regionData.map((region) => (
                      <div key={region.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-sm font-medium text-gray-800">{region.name} Region</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium text-gray-800">{region.completion}%</span>
                            <TrendingUp size={14} className="text-success-green" />
                          </div>
                        </div>
                        <div className="relative h-2 overflow-hidden rounded-full bg-gray-100">
                          <div 
                            className={`absolute top-0 left-0 h-full rounded-full ${
                              region.completion > 80 
                                ? "bg-gradient-to-r from-success-green to-light-green"
                                : region.completion > 70
                                  ? "bg-gradient-to-r from-light-green to-vibrant-green"
                                  : "bg-gradient-to-r from-dark-green to-dark-green/70"
                            }`} 
                            style={{ width: `${region.completion}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="mt-5">
              <Card className="animate-fade-in overflow-hidden border-success-green/10 rounded-xl shadow-sm">
                <CardHeader className="bg-gradient-to-r from-success-green/10 to-transparent border-b border-success-green/10 p-5">
                  <CardTitle className="text-lg font-semibold text-gray-800">Performance Metrics</CardTitle>
                  <CardDescription className="text-gray-600">Interactive performance dashboard coming soon</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="w-16 h-16 rounded-full bg-success-green/20 flex items-center justify-center mb-4">
                    <BarChart className="h-8 w-8 text-success-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Performance Dashboard</h3>
                  <p className="text-gray-600 max-w-md mb-6">
                    Detailed performance metrics and KPIs for training programs and trainers will be available here soon.
                  </p>
                  <Button>Check Back Soon</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="regional" className="mt-5">
              <Card className="animate-fade-in overflow-hidden border-success-green/10 rounded-xl shadow-sm">
                <CardHeader className="bg-gradient-to-r from-success-green/10 to-transparent border-b border-success-green/10 p-5">
                  <CardTitle className="text-lg font-semibold text-gray-800">Regional Analysis</CardTitle>
                  <CardDescription className="text-gray-600">Region-wise training breakdown coming soon</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="w-16 h-16 rounded-full bg-success-green/20 flex items-center justify-center mb-4">
                    <PieChart className="h-8 w-8 text-success-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Regional Dashboard</h3>
                  <p className="text-gray-600 max-w-md mb-6">
                    Detailed region-wise analysis of training programs, participation, and effectiveness will be available here soon.
                  </p>
                  <Button>Check Back Soon</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="thisMonth">
            <SelectTrigger className="w-[180px] border-success-green/10 rounded-lg">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastQuarter">Last Quarter</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="border-success-green/10 rounded-lg">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="border-success-green/10 rounded-lg">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card className="border-success-green/10 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-success-green/10 rounded-bl-full" />
            <div className="relative">
              <h3 className="text-gray-500 font-medium text-sm mb-1">Total Trainings</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">248</span>
                <Badge className="ml-2 bg-success-green/10 text-success-green border-0">+12%</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1" /> Last 30 days
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="border-success-green/10 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-light-green/10 rounded-bl-full" />
            <div className="relative">
              <h3 className="text-gray-500 font-medium text-sm mb-1">Participants</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">3,782</span>
                <Badge className="ml-2 bg-success-green/10 text-success-green border-0">+8%</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1" /> Last 30 days
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="border-success-green/10 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-vibrant-green/10 rounded-bl-full" />
            <div className="relative">
              <h3 className="text-gray-500 font-medium text-sm mb-1">Completion Rate</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">87.5%</span>
                <Badge className="ml-2 bg-success-green/10 text-success-green border-0">+5%</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1" /> Last 30 days
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="border-success-green/10 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-dark-green/10 rounded-bl-full" />
            <div className="relative">
              <h3 className="text-gray-500 font-medium text-sm mb-1">Satisfaction Rate</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">92.3%</span>
                <Badge className="ml-2 bg-success-green/10 text-success-green border-0">+2%</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1" /> Last 30 days
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
