
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample data
const monthlyData = [
  { name: "Jan", fire: 40, road: 24, industrial: 60 },
  { name: "Feb", fire: 30, road: 28, industrial: 45 },
  { name: "Mar", fire: 20, road: 48, industrial: 30 },
  { name: "Apr", fire: 27, road: 39, industrial: 57 },
  { name: "May", fire: 18, road: 59, industrial: 42 },
  { name: "Jun", fire: 23, road: 38, industrial: 55 },
];

const weeklyData = [
  { name: "Mon", fire: 10, road: 24, industrial: 35 },
  { name: "Tue", fire: 15, road: 13, industrial: 25 },
  { name: "Wed", fire: 25, road: 18, industrial: 30 },
  { name: "Thu", fire: 12, road: 29, industrial: 37 },
  { name: "Fri", fire: 20, road: 15, industrial: 32 },
  { name: "Sat", fire: 5, road: 8, industrial: 15 },
  { name: "Sun", fire: 0, road: 5, industrial: 10 },
];

type TimeRange = "weekly" | "monthly";

const ActivityChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  
  const data = timeRange === "monthly" ? monthlyData : weeklyData;
  
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Activity by Safety Domain</CardTitle>
          <CardDescription>Number of training sessions conducted</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={timeRange === "weekly" ? "default" : "outline"}
            onClick={() => setTimeRange("weekly")}
          >
            Weekly
          </Button>
          <Button 
            size="sm"
            variant={timeRange === "monthly" ? "default" : "outline"}
            onClick={() => setTimeRange("monthly")}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "8px", 
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  border: "none"
                }} 
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar 
                dataKey="fire" 
                name="Fire Safety" 
                fill="#FF7F00" 
                radius={[4, 4, 0, 0]} 
                barSize={30} 
                animationDuration={1000}
              />
              <Bar 
                dataKey="road" 
                name="Road Safety" 
                fill="#0A3D62" 
                radius={[4, 4, 0, 0]} 
                barSize={30} 
                animationDuration={1500}
              />
              <Bar 
                dataKey="industrial" 
                name="Industrial Safety" 
                fill="#27AE60" 
                radius={[4, 4, 0, 0]} 
                barSize={30} 
                animationDuration={2000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
