
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-16 h-16 rounded-full bg-safety-orange flex items-center justify-center mb-6">
        <span className="text-white text-2xl font-bold">!</span>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 font-montserrat">Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved to another URL.
      </p>
      
      <div className="space-x-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button onClick={() => navigate("/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
