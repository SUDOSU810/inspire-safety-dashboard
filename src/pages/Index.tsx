
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Flame } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-royal-purple/20 via-background to-background -z-10"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-royal-purple/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-safety-orange/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-safety-orange to-royal-purple/90 flex items-center justify-center shadow-lg animate-glow">
              <Flame className="h-7 w-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold font-montserrat text-white mb-2 tracking-tight">
            Inspire Safety
          </h1>
          <p className="text-muted-foreground">
            Admin Dashboard for Safety Training Management
          </p>
        </div>

        <Card className="animate-scale-in border-white/5 shadow-2xl bg-card/70 backdrop-blur-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-white">Sign in</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@inspiresafety.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted border-white/10 focus:border-accent/50"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white/90">Password</Label>
                  <a
                    href="#"
                    className="text-xs text-accent hover:text-accent/80 transition-colors"
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
                  className="bg-muted border-white/10 focus:border-accent/50"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-accent" />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal text-white/80"
                >
                  Remember me for 30 days
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent hover:shadow-lg transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground w-full">
              Need more info?{" "}
              <a href="#" className="text-accent hover:text-accent/80 transition-colors">
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
