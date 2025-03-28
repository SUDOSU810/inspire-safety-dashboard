
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TabsContent, 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { 
  Grid, 
  List, 
  MessageSquare, 
  Phone, 
  Search, 
  UserPlus, 
  Calendar,
  Award,
  Star,
  Info
} from "lucide-react";

const trainers = [
  { 
    id: 1, 
    name: "Raj Kumar", 
    specialty: "Fire Safety", 
    initials: "RK", 
    trainings: 45,
    rating: 4.8,
    email: "raj.kumar@inspiresafety.org",
    phone: "+91 9876543210",
    status: "active",
    certifications: ["Fire Safety Expert", "Hazard Management"],
    avatar: "/placeholder.svg",
    bio: "10+ years of experience in fire safety training. Expert in evacuation procedures and fire prevention techniques."
  },
  { 
    id: 2, 
    name: "Priya Singh", 
    specialty: "Road Safety", 
    initials: "PS", 
    trainings: 38,
    rating: 4.7,
    email: "priya.singh@inspiresafety.org",
    phone: "+91 9876543211",
    status: "active",
    certifications: ["Traffic Safety Specialist", "Driver Education"],
    avatar: "/placeholder.svg",
    bio: "Former traffic police officer with specialized knowledge in road safety protocols and defensive driving techniques."
  },
  { 
    id: 3, 
    name: "Vikram Mehta", 
    specialty: "Industrial Safety", 
    initials: "VM", 
    trainings: 52,
    rating: 4.9,
    email: "vikram.mehta@inspiresafety.org",
    phone: "+91 9876543212",
    status: "active",
    certifications: ["Industrial Safety Expert", "Machine Operation Safety"],
    avatar: "/placeholder.svg",
    bio: "Industrial engineering background with extensive experience in factory safety procedures and risk assessment."
  },
  { 
    id: 4, 
    name: "Sunita Patel", 
    specialty: "Fire Safety", 
    initials: "SP", 
    trainings: 29,
    rating: 4.6,
    email: "sunita.patel@inspiresafety.org",
    phone: "+91 9876543213",
    status: "vacation",
    certifications: ["Fire Emergency Response", "Evacuation Planning"],
    avatar: "/placeholder.svg",
    bio: "Specializes in emergency response planning and evacuation strategies for commercial buildings."
  },
  { 
    id: 5, 
    name: "Karthik Nair", 
    specialty: "Industrial Safety", 
    initials: "KN", 
    trainings: 41,
    rating: 4.5,
    email: "karthik.nair@inspiresafety.org",
    phone: "+91 9876543214",
    status: "active",
    certifications: ["Chemical Safety", "PPE Specialist"],
    avatar: "/placeholder.svg",
    bio: "Chemical engineer focused on hazardous materials handling and personal protective equipment training."
  },
  { 
    id: 6, 
    name: "Ananya Desai", 
    specialty: "Road Safety", 
    initials: "AD", 
    trainings: 36,
    rating: 4.7,
    email: "ananya.desai@inspiresafety.org",
    phone: "+91 9876543215",
    status: "active",
    certifications: ["Traffic Management", "Pedestrian Safety"],
    avatar: "/placeholder.svg",
    bio: "Focuses on pedestrian safety and traffic management during public events and in school zones."
  },
];

const getSpecialtyColor = (specialty: string) => {
  switch (specialty) {
    case "Fire Safety":
      return "bg-oxford-blue/10 text-oxford-blue border-oxford-blue/30";
    case "Road Safety":
      return "bg-charcoal/10 text-charcoal border-charcoal/30";
    case "Industrial Safety":
      return "bg-cambridge-blue/10 text-cambridge-blue border-cambridge-blue/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-olivine/10 text-olivine border-olivine/30";
    case "vacation":
      return "bg-tea-green/10 text-charcoal border-tea-green/30";
    case "inactive":
      return "bg-destructive/10 text-destructive border-destructive/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Trainers = () => {
  return (
    <DashboardLayout>
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold font-montserrat text-oxford-blue">Training Specialists</h1>
        <p className="text-charcoal">
          Manage and view all safety training specialists
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-charcoal" />
          <Input
            type="search"
            placeholder="Search trainers..."
            className="pl-8 bg-white border-cambridge-blue/30"
          />
        </div>

        <div className="flex items-center gap-2">
          <Tabs defaultValue="grid" className="w-[150px]">
            <TabsList className="grid w-full grid-cols-2 bg-tea-green/20">
              <TabsTrigger value="grid" className="data-[state=active]:bg-oxford-blue data-[state=active]:text-white">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-oxford-blue data-[state=active]:text-white">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button className="bg-gradient-to-r from-oxford-blue to-charcoal text-white hover:opacity-90">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Trainer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {trainers.map((trainer) => (
          <HoverCard key={trainer.id}>
            <HoverCardTrigger asChild>
              <Card 
                className="overflow-hidden animate-fade-in hover:border-cambridge-blue/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <CardHeader className="border-b border-olivine/20 flex flex-row items-center justify-between bg-card/50 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-olivine/20">
                      <AvatarImage src={trainer.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-oxford-blue to-charcoal text-white">
                        {trainer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base text-oxford-blue">{trainer.name}</CardTitle>
                      <Badge className={getSpecialtyColor(trainer.specialty)}>{trainer.specialty}</Badge>
                    </div>
                  </div>
                  <Badge className={getStatusColor(trainer.status)}>
                    {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-tea-green/20 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-oxford-blue">{trainer.trainings}</div>
                      <div className="text-xs text-charcoal">Trainings</div>
                    </div>
                    <div className="bg-cambridge-blue/20 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-oxford-blue">{trainer.rating}</div>
                      <div className="text-xs text-charcoal">Rating</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="w-4 h-4 mr-2 text-charcoal">@</div>
                      <span className="text-charcoal">{trainer.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-charcoal" />
                      <span className="text-charcoal">{trainer.phone}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-olivine/20 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-oxford-blue/20 text-oxford-blue" asChild>
                      <Link to={`/trainer/${trainer.id}`}>Profile</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-cambridge-blue/20 text-cambridge-blue">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 glass-panel border border-cambridge-blue/20">
              <div className="flex justify-between space-x-4">
                <Avatar className="h-12 w-12 border-2 border-olivine/20">
                  <AvatarImage src={trainer.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-oxford-blue to-charcoal text-white">
                    {trainer.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{trainer.name}</h4>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-chart-yellow text-chart-yellow mr-1" />
                    <p className="text-xs text-muted-foreground">{trainer.rating} rating</p>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{trainer.trainings} sessions conducted</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  {trainer.bio}
                </p>
              </div>
              <div className="mt-4">
                <h5 className="text-xs font-medium mb-2 flex items-center">
                  <Award className="h-3 w-3 mr-1" /> 
                  Certifications
                </h5>
                <div className="flex flex-wrap gap-1">
                  {trainer.certifications.map((cert, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-[10px] py-0 bg-oxford-blue/5"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-dashed border-cambridge-blue/20">
                <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                  <Link to={`/trainer/${trainer.id}`}>
                    <Info className="h-3 w-3 mr-1" />
                    View Full Profile
                  </Link>
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Trainers;
