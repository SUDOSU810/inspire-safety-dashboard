
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Flame, Lock, Mail, Shield } from "lucide-react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation
      if (email && password) {
        toast({
          title: "Success",
          description: "You've successfully logged in!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-pale-green/10 to-white p-4 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-success-green/5 to-light-green/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-mint-green/5 to-pale-green/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success-green to-light-green flex items-center justify-center shadow-lg animate-glow">
              <Flame className="h-9 w-9 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold font-montserrat text-black mb-2 tracking-tight">
            Inspire Safety
          </h1>
          <p className="text-muted-foreground">
            Admin Dashboard for Safety Training Management
          </p>
        </div>

        <Card className="backdrop-blur-sm border border-secondary/20 shadow-lg animate-scale-in">
          <CardHeader className="space-y-1 border-b border-secondary/20">
            <CardTitle className="text-xl text-black flex items-center gap-2">
              <Shield size={18} className="text-success-green" />
              Sign in
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black/90 flex items-center gap-2">
                  <Mail size={14} className="text-success-green" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@inspiresafety.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/50 border-secondary/30 focus:border-success-green/50 focus:ring-success-green/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-black/90 flex items-center gap-2">
                    <Lock size={14} className="text-success-green" />
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-xs text-success-green hover:text-success-green/80 transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/50 border-secondary/30 focus:border-success-green/50 focus:ring-success-green/20"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-secondary/40 data-[state=checked]:bg-success-green/90" />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal text-black/80"
                >
                  Remember me for 30 days
                </Label>
              </div>
              <Button
                type="submit"
                variant="success"
                animation="shine"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="border-t border-secondary/20">
            <p className="text-center text-sm text-muted-foreground w-full">
              Need more info?{" "}
              <a href="#" className="text-success-green hover:text-success-green/80 transition-colors">
                Contact support
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
