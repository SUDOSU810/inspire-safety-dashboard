
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Calendar, 
  File, 
  Home, 
  LogOut, 
  Menu, 
  Settings, 
  Users, 
  Bell, 
  Search,
  Flame,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
};

const NavItem = ({ to, icon: Icon, label, active }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 overflow-hidden ${
        active 
          ? "bg-gradient-to-r from-success-green/90 to-light-green/60 text-white shadow-md" 
          : "text-gray-600 hover:bg-gradient-to-r hover:from-success-green/20 hover:to-light-green/10"
      }`}
    >
      <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${active ? "bg-white/20" : "bg-success-green/10"}`}>
        <Icon size={18} className={active ? "text-white" : "text-success-green"} />
      </div>
      <span className={`font-medium ${active ? "text-white" : ""}`}>{label}</span>
      {active && (
        <ChevronRight className="absolute right-3 h-4 w-4 text-white/70" />
      )}
    </Link>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPath = location.pathname;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleRefresh = () => {
    window.location.reload();
    toast({
      title: "Refreshed",
      description: "Dashboard data has been refreshed.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/documents", icon: File, label: "Documents" },
    { to: "/schedule", icon: Calendar, label: "Scheduler" },
    { to: "/trainers", icon: Users, label: "Trainers" },
    { to: "/messages", icon: MessageSquare, label: "Messages" },
    { to: "/reports", icon: BarChart3, label: "Reports" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen flex bg-off-white">
      {/* Unique Sidebar Design */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out border-r border-success-green/10 bg-oxford-blue/95 shadow-lg ${
          sidebarOpen ? "w-72" : "w-20"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-cambridge-blue/20">
          <Link 
            to="/dashboard" 
            className={`flex items-center gap-3 ${!sidebarOpen && "opacity-0 w-0 overflow-hidden"}`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success-green to-vibrant-green flex items-center justify-center shadow-md">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-montserrat font-bold tracking-tight text-white text-lg">
              Inspire Safety
            </h1>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-cambridge-blue/20 rounded-lg"
          >
            <Menu size={20} />
          </Button>
        </div>

        <div className="flex-1 py-6 px-3 overflow-y-auto bg-gradient-to-b from-oxford-blue/95 to-charcoal/90">
          <div className={`mb-6 px-2 ${!sidebarOpen && "opacity-0 h-0 overflow-hidden"}`}>
            <h2 className="text-xs uppercase font-semibold text-tea-green tracking-wider pl-2 mb-4">Main Menu</h2>
          </div>
          <nav className="space-y-2.5 px-2">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={currentPath === item.to}
              />
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-cambridge-blue/20 bg-gradient-to-br from-charcoal/90 to-oxford-blue/95">
          <div className="flex items-center gap-3">
            <Avatar className="border border-tea-green/20 h-10 w-10 shadow-sm">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-br from-success-green to-vibrant-green text-white">
                AD
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div>
                <p className="text-white text-sm font-medium">Admin User</p>
                <p className="text-tea-green/70 text-xs">admin@inspiresafety.org</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main 
        className={`flex-1 transition-all duration-300 bg-gradient-to-br from-white to-tea-green/20 ${
          sidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        {/* Top navbar */}
        <header className="h-16 border-b border-success-green/10 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 bg-gray-50 border-success-green/10 focus:border-success-green/30 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative rounded-xl border-success-green/10 text-gray-600 hover:text-success-green">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-success-green text-white text-xs flex items-center justify-center shadow-sm">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px] border-success-green/10">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-success-green/10" />
                <div className="max-h-[300px] overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="flex flex-col items-start py-3 focus:bg-success-green/5 cursor-pointer">
                      <div className="font-medium">New training scheduled</div>
                      <div className="text-xs text-gray-500">
                        Fire Safety Training in Chennai Region
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        10 minutes ago
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative flex items-center gap-2 border-success-green/10 rounded-xl" size="sm">
                  <Avatar className="h-8 w-8 border border-success-green/10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-to-br from-success-green to-vibrant-green text-white">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm text-gray-700">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-success-green/10">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-success-green/10" />
                <DropdownMenuItem onClick={() => navigate("/settings")} className="focus:bg-success-green/5 cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")} className="focus:bg-success-green/5 cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-success-green/10" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:bg-red-50 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
