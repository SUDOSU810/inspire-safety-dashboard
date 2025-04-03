
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Calendar, 
  ChevronLeft, 
  Award, 
  User, 
  Phone, 
  Mail, 
  BarChart3, 
  Users,
  Clock,
  MessageSquare
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import StatCard from "@/components/dashboard/StatCard";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for trainer
const trainer = { 
  id: 1, 
  name: "Raj Kumar", 
  specialty: "Fire Safety", 
  initials: "RK", 
  trainings: 45,
  rating: 4.8,
  email: "raj.kumar@inspiresafety.org",
  phone: "+91 9876543210",
  status: "active",
  certifications: ["Fire Safety Expert", "Hazard Management", "Emergency Response"],
  avatar: "/placeholder.svg",
  bio: "Raj is a certified Fire Safety expert with over 10 years of experience in industrial and commercial safety training. He specializes in emergency response drills and hazard management."
};

// Sample training sessions data
const sessionData = [
  { month: 'Jan', sessions: 5 },
  { month: 'Feb', sessions: 3 },
  { month: 'Mar', sessions: 6 },
  { month: 'Apr', sessions: 4 },
  { month: 'May', sessions: 7 },
  { month: 'Jun', sessions: 5 },
  { month: 'Jul', sessions: 3 },
  { month: 'Aug', sessions: 4 },
  { month: 'Sep', sessions: 6 },
  { month: 'Oct', sessions: 8 },
  { month: 'Nov', sessions: 7 },
  { month: 'Dec', sessions: 2 },
];

// Sample category data
const categoryData = [
  { name: 'Fire Safety', value: 25, color: '#FF7F00' },
  { name: 'Emergency Response', value: 15, color: '#F55142' },
  { name: 'Hazard Management', value: 5, color: '#DE3C36' },
];

// Sample upcoming sessions
const upcomingTrainings = [
  {
    id: 1,
    title: "Fire Safety Workshop",
    date: "2023-11-15",
    time: "10:00 - 12:00",
    location: "Chennai Central Office",
    participants: 15,
  },
  {
    id: 2,
    title: "Emergency Response Drill",
    date: "2023-11-17",
    time: "13:00 - 15:00",
    location: "Chennai Central Office",
    participants: 30,
  },
  {
    id: 3,
    title: "Hazard Identification Training",
    date: "2023-11-22",
    time: "09:00 - 11:00",
    location: "Bangalore Manufacturing Plant",
    participants: 12,
  },
];

// Sample feedback data
const feedbackData = [
  {
    id: 1,
    name: "Priya Sharma",
    feedback: "Excellent training session. Very informative and engaging.",
    date: "October 15, 2023",
    rating: 5,
    avatar: "/placeholder.svg",
    initials: "PS",
  },
  {
    id: 2,
    name: "Vikram Singh",
    feedback: "Practical demonstrations were very helpful. Clear explanations.",
    date: "October 10, 2023",
    rating: 4,
    avatar: "/placeholder.svg",
    initials: "VS",
  },
  {
    id: 3,
    name: "Ananya Patel",
    feedback: "Raj is knowledgeable and answered all our questions thoroughly.",
    date: "September 28, 2023",
    rating: 5,
    avatar: "/placeholder.svg",
    initials: "AP",
  },
];

const TrainerDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <DashboardLayout>
      <div className="pb-6 border-b border-olivine/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link to="/trainers">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold font-montserrat">Trainer Profile</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" /> Message
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-oxford-blue to-charcoal text-white">
              <Calendar className="h-4 w-4" /> Schedule Training
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <Card className="bg-gradient-to-br from-white to-tea-green/10 border-olivine/20 animate-fade-in">
          <CardHeader className="pb-3">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4 border-4 border-white shadow-lg">
                <AvatarImage src={trainer.avatar} />
                <AvatarFallback className="bg-oxford-blue text-white text-2xl">
                  {trainer.initials}
                </AvatarFallback>
              </Avatar>
              
              <CardTitle className="text-2xl font-bold text-oxford-blue">{trainer.name}</CardTitle>
              
              <Badge className="mt-2 bg-cambridge-blue text-white border-none">
                {trainer.specialty}
              </Badge>
              
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className={`w-4 h-4 ${star <= Math.floor(trainer.rating) ? "text-yellow-400" : "text-gray-300"}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">{trainer.rating}/5.0</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-charcoal text-sm mb-6">{trainer.bio}</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-oxford-blue/10 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-oxford-blue" />
                </div>
                <span className="text-charcoal">{trainer.email}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-oxford-blue/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-oxford-blue" />
                </div>
                <span className="text-charcoal">{trainer.phone}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-oxford-blue/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-oxford-blue" />
                </div>
                <Badge variant="outline" className="bg-olivine/10 text-charcoal border-olivine/30">
                  {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
                </Badge>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-olivine/20">
              <h3 className="font-semibold text-oxford-blue mb-3 flex items-center gap-2">
                <Award className="h-4 w-4" /> Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {trainer.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="bg-tea-green/20 border-olivine/20">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs and content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-olivine/10 p-1">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-oxford-blue data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="sessions" 
                className="data-[state=active]:bg-oxford-blue data-[state=active]:text-white"
              >
                Sessions
              </TabsTrigger>
              <TabsTrigger 
                value="feedback" 
                className="data-[state=active]:bg-oxford-blue data-[state=active]:text-white"
              >
                Feedback
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatCard
                  title="Total Trainings"
                  value={trainer.trainings}
                  icon={<Calendar className="h-5 w-5" />}
                  variant="default"
                />
                <StatCard
                  title="Total Participants"
                  value="580"
                  icon={<Users className="h-5 w-5" />}
                  variant="info"
                />
                <StatCard
                  title="Avg. Session Duration"
                  value="2.5 hrs"
                  icon={<Clock className="h-5 w-5" />}
                  variant="success"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-olivine/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-oxford-blue">Training Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sessionData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                          <XAxis dataKey="month" stroke="#465362" />
                          <YAxis stroke="#465362" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #ccc',
                              borderRadius: '8px' 
                            }} 
                          />
                          <Bar 
                            dataKey="sessions" 
                            name="Sessions" 
                            fill="#82A3A1" 
                            radius={[4, 4, 0, 0]} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-olivine/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-oxford-blue">Session Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6 border-olivine/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-oxford-blue">Upcoming Trainings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTrainings.map((training) => (
                      <div 
                        key={training.id} 
                        className="flex items-center justify-between p-3 border border-olivine/20 rounded-lg hover:bg-tea-green/10 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-oxford-blue/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-oxford-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium text-oxford-blue">{training.title}</h4>
                            <p className="text-xs text-charcoal">
                              {training.date} • {training.time} • {training.location}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-cambridge-blue border-none">
                          {training.participants} Participants
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sessions" className="mt-6">
              <Card className="border-olivine/20">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-oxford-blue">Monthly Training Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sessionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="month" stroke="#465362" />
                        <YAxis stroke="#465362" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #ccc',
                            borderRadius: '8px' 
                          }} 
                        />
                        <Bar 
                          dataKey="sessions" 
                          name="Sessions" 
                          fill="#011936" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-olivine/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-oxford-blue">Session Locations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-charcoal">Chennai Central Office</span>
                        <span className="text-sm font-medium text-oxford-blue">18 Sessions</span>
                      </div>
                      <div className="w-full bg-olivine/10 rounded-full h-2">
                        <div className="bg-olivine h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-charcoal">Bangalore Manufacturing Plant</span>
                        <span className="text-sm font-medium text-oxford-blue">12 Sessions</span>
                      </div>
                      <div className="w-full bg-olivine/10 rounded-full h-2">
                        <div className="bg-olivine h-2 rounded-full" style={{ width: '27%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-charcoal">Mumbai Transportation Hub</span>
                        <span className="text-sm font-medium text-oxford-blue">8 Sessions</span>
                      </div>
                      <div className="w-full bg-olivine/10 rounded-full h-2">
                        <div className="bg-olivine h-2 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-charcoal">Delhi Transport Authority</span>
                        <span className="text-sm font-medium text-oxford-blue">5 Sessions</span>
                      </div>
                      <div className="w-full bg-olivine/10 rounded-full h-2">
                        <div className="bg-olivine h-2 rounded-full" style={{ width: '11%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-charcoal">Other Locations</span>
                        <span className="text-sm font-medium text-oxford-blue">2 Sessions</span>
                      </div>
                      <div className="w-full bg-olivine/10 rounded-full h-2">
                        <div className="bg-olivine h-2 rounded-full" style={{ width: '4%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-olivine/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-oxford-blue">Session Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-oxford-blue/10 flex items-center justify-center">
                          <Users className="h-8 w-8 text-oxford-blue" />
                        </div>
                        <div>
                          <p className="text-sm text-charcoal">Total Participants</p>
                          <p className="text-2xl font-bold text-oxford-blue">580</p>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-charcoal">Average Attendance Rate</span>
                          <span className="text-oxford-blue font-medium">92%</span>
                        </div>
                        <div className="w-full bg-olivine/10 rounded-full h-2">
                          <div className="bg-cambridge-blue h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-tea-green/20 rounded-lg p-3 text-center">
                          <p className="text-sm text-charcoal">Avg. Participants</p>
                          <p className="text-xl font-bold text-oxford-blue">12.9</p>
                          <p className="text-xs text-charcoal">per session</p>
                        </div>
                        <div className="bg-cambridge-blue/20 rounded-lg p-3 text-center">
                          <p className="text-sm text-charcoal">Highest Attendance</p>
                          <p className="text-xl font-bold text-oxford-blue">32</p>
                          <p className="text-xs text-charcoal">participants</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="feedback" className="mt-6">
              <Card className="border-olivine/20">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-oxford-blue">Participant Feedback</CardTitle>
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star} 
                            className="w-5 h-5 text-yellow-400" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 font-semibold text-oxford-blue">4.8/5.0</span>
                      <span className="ml-2 text-sm text-charcoal">(42 reviews)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 pt-2">
                    {feedbackData.map((item) => (
                      <div key={item.id} className="border-b border-olivine/20 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={item.avatar} />
                            <AvatarFallback className="bg-cambridge-blue text-white">
                              {item.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-oxford-blue">{item.name}</h4>
                                <p className="text-xs text-charcoal">{item.date}</p>
                              </div>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg 
                                    key={star} 
                                    className={`w-4 h-4 ${star <= item.rating ? "text-yellow-400" : "text-gray-300"}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-charcoal">{item.feedback}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="text-cambridge-blue border-cambridge-blue">
                      View All Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrainerDetail;
