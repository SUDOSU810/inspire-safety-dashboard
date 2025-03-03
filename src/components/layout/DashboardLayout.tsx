
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
  Search
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
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
        active 
          ? "bg-sidebar-accent text-white" 
          : "text-white/80 hover:bg-sidebar-accent/50 hover:text-white"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
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
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-sidebar fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <div className={`flex items-center gap-2 ${!sidebarOpen && "hidden"}`}>
            <div className="w-8 h-8 rounded-md bg-safety-orange flex items-center justify-center">
              <span className="text-white font-bold">IS</span>
            </div>
            <h1 className="text-white font-montserrat font-semibold">
              Inspire Safety
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-sidebar-accent"
          >
            <Menu size={20} />
          </Button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="space-y-1 px-2">
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

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-safety-orange text-white">
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
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 bg-gray-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-safety-orange text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="flex flex-col items-start py-2">
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
                <Button variant="ghost" className="relative flex items-center gap-2" size="sm">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-safety-orange text-white">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
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
