
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Schedule from "./pages/Schedule";
import Trainers from "./pages/Trainers";
import TrainerDetail from "./pages/TrainerDetail";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";

// Configure our query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner 
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(130, 163, 161, 0.3)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              fontFamily: "Raleway, sans-serif"
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/trainer/:id" element={<TrainerDetail />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/messages" element={<Messages />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
