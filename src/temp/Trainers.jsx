
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
import { useToast } from "@/hooks/use-toast";

const trainers = [
  { 
    id: "t1", 
    name: "Raj Kumar", 
    specialty: "Fire Safety", 
    initials: "RK", 
    trainings: 32,
    rating: 4.8,
    email: "raj.kumar@email.com",
    phone: "+91 9876543210",
    status: "active",
    certifications: ["Fire Safety Expert", "Hazard Management"],
    avatar: "/avatars/raj-kumar.jpg",
    bio: "10+ years of experience in fire safety training. Expert in evacuation procedures and fire prevention techniques."
  },
  { 
    id: "t2", 
    name: "Priya Singh", 
    specialty: "Road Safety", 
    initials: "PS", 
    trainings: 28,
    rating: 4.7,
    email: "priya.singh@email.com",
    phone: "+91 9876543211",
    status: "active",
    certifications: ["Traffic Safety Specialist", "Driver Education"],
    avatar: "/avatars/priya-singh.jpg",
    bio: "Former traffic police officer with specialized knowledge in road safety protocols and defensive driving techniques."
  },
  { 
    id: "t3", 
    name: "Vikram Mehta", 
    specialty: "Industrial Safety", 
    initials: "VM", 
    trainings: 45,
    rating: 4.9,
    email: "vikram.mehta@email.com",
    phone: "+91 9876543212",
    status: "vacation",
    certifications: ["Industrial Safety Expert", "Machine Operation Safety"],
    avatar: "/avatars/vikram-mehta.jpg",
    bio: "Industrial engineering background with extensive experience in factory safety procedures and risk assessment."
  },
  { 
    id: "t4", 
    name: "Sunita Patel", 
    specialty: "Fire Safety", 
    initials: "SP", 
    trainings: 37,
    rating: 4.6,
    email: "sunita.patel@email.com",
    phone: "+91 9876543213",
    status: "active",
    certifications: ["Fire Emergency Response", "Evacuation Planning"],
    avatar: "/avatars/sunita-patel.jpg",
    bio: "Specializes in emergency response planning and evacuation strategies for commercial buildings."
  },
  { 
    id: "t5", 
    name: "Karthik Nair", 
    specialty: "Industrial Safety", 
    initials: "KN", 
    trainings: 39,
    rating: 4.7,
    email: "karthik.nair@email.com",
    phone: "+91 9876543214",
    status: "active",
    certifications: ["Chemical Safety", "PPE Specialist"],
    avatar: "/avatars/karthik-nair.jpg",
    bio: "Chemical engineer focused on hazardous materials handling and personal protective equipment training."
  },
  { 
    id: "t6", 
    name: "Ananya Desai", 
    specialty: "Road Safety", 
    initials: "AD", 
    trainings: 22,
    rating: 4.5,
    email: "ananya.desai@email.com",
    phone: "+91 9876543215",
    status: "inactive",
    certifications: ["Traffic Management", "Pedestrian Safety"],
    avatar: "/avatars/ananya-desai.jpg",
    bio: "Focuses on pedestrian safety and traffic management during public events and in school zones."
  },
];

const getSpecialtyColor = specialty => {
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

const getStatusColor = status => {
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
  const { toast } = useToast();
  const navigate = useNavigate();
  const [addTrainerOpen, setAddTrainerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newTrainer, setNewTrainer] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "Fire Safety",
    status: "active"
  });

  const handleNewTrainerChange = (e) => {
    const { name, value } = e.target;
    setNewTrainer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTrainer = (e) => {
    e.preventDefault();
    // In a real app, this would add the trainer to the database
    // For now, we'll just show a toast
    toast({
      title: "Trainer Added",
      description: `${newTrainer.name} has been added as a trainer.`,
    });
    setAddTrainerOpen(false);
    setNewTrainer({
      name: "",
      email: "",
      phone: "",
      specialty: "Fire Safety",
      status: "active"
    });
  };

  const handleViewProfile = (trainerId) => {
    navigate(`/trainer/${trainerId}`);
  };

  return (
    <DashboardLayout>
      <CardHeader>
        <CardTitle>Training Specialists</CardTitle>
        <div className="text-sm text-muted-foreground">
          Manage and view all safety training specialists
        </div>
      </CardHeader>

      <div className="flex items-center justify-between space-x-2 mb-4">
        <div className="flex items-center relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search trainers..." 
            className="pl-8 w-[300px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="border rounded-md p-1">
            <Button variant="ghost" size="sm" className="px-2 py-1">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="px-2 py-1">
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Dialog open={addTrainerOpen} onOpenChange={setAddTrainerOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Trainer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Trainer</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new safety trainer to the system.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTrainer}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newTrainer.name}
                      onChange={handleNewTrainerChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newTrainer.email}
                      onChange={handleNewTrainerChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={newTrainer.phone}
                      onChange={handleNewTrainerChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="specialty" className="text-right">
                      Specialty
                    </Label>
                    <select
                      id="specialty"
                      name="specialty"
                      value={newTrainer.specialty}
                      onChange={handleNewTrainerChange}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Fire Safety">Fire Safety</option>
                      <option value="Road Safety">Road Safety</option>
                      <option value="Industrial Safety">Industrial Safety</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Trainer</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainers
          .filter(trainer => search ? trainer.name.toLowerCase().includes(search.toLowerCase()) : true)
          .map((trainer) => (
          <Card key={trainer.id} className="relative">
            <CardContent className="p-4">
              <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={trainer.avatar} />
                    <AvatarFallback>
                      {trainer.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{trainer.name}</h3>
                    <Badge className={getSpecialtyColor(trainer.specialty)}>{trainer.specialty}</Badge>
                  </div>
                </div>
                <Badge className={getStatusColor(trainer.status)}>
                  {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-md">
                  <span className="text-lg font-semibold">{trainer.trainings}</span>
                  <span className="text-xs text-muted-foreground">Trainings</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-md">
                  <span className="text-lg font-semibold">{trainer.rating}</span>
                  <span className="text-xs text-muted-foreground">Rating</span>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{trainer.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{trainer.phone}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleViewProfile(trainer.id)}
                >
                  Profile
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </CardContent>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" className="absolute top-0 right-0 h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80" align="end">
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={trainer.avatar} />
                    <AvatarFallback>
                      {trainer.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{trainer.name}</h4>
                    <div className="flex items-center text-xs">
                      <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
                      <span>{trainer.rating} rating</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>{trainer.trainings} sessions conducted</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm">{trainer.bio}</p>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2" /> 
                    <h5 className="text-sm font-medium">Certifications</h5>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {trainer.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <Button size="sm" className="w-full" onClick={() => handleViewProfile(trainer.id)}>
                    View Full Profile
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Trainers;
