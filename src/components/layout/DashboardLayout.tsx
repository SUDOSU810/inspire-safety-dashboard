
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Flame
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
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
        active 
          ? "bg-primary/20 text-primary border-l-2 border-primary" 
          : "text-white/70 hover:bg-sidebar-accent/50 hover:text-white"
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/documents", icon: File, label: "Documents" },
    { to: "/schedule", icon: Calendar, label: "Scheduler" },
    { to: "/trainers", icon: Users, label: "Trainers" },
    { to: "/reports", icon: BarChart3, label: "Reports" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`bg-sidebar fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out border-r border-sidebar-border ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col backdrop-blur-lg`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <div className={`flex items-center gap-2 ${!sidebarOpen && "hidden"}`}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-safety-orange to-accent flex items-center justify-center shadow-lg">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-white font-montserrat font-semibold tracking-tight">
              Inspire Safety
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-sidebar-accent"
          >
            <Menu size={18} />
          </Button>
        </div>

        <div className="flex-1 py-6 px-3 overflow-y-auto">
          <nav className="space-y-1.5">
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

        <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/30">
          <div className="flex items-center gap-3">
            <Avatar className="border border-white/10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-br from-safety-orange to-accent text-white">
                AD
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div>
                <p className="text-white text-sm font-medium">Admin User</p>
                <p className="text-white/60 text-xs">admin@inspiresafety.org</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main 
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top navbar */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 bg-muted border-border/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-safety-orange text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px] bg-card/95 backdrop-blur-lg border-white/10">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <div className="max-h-[300px] overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="flex flex-col items-start py-2 focus:bg-white/5">
                      <div className="font-medium">New training scheduled</div>
                      <div className="text-xs text-muted-foreground">
                        Fire Safety Training in Chennai Region
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        10 minutes ago
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center gap-2 text-white" size="sm">
                  <Avatar className="h-8 w-8 border border-white/10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-to-br from-safety-orange to-accent text-white">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-lg border-white/10">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="focus:bg-white/5">Profile</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/5">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10">
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
