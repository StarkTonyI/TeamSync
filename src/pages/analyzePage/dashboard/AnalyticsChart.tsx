import { Card } from "../../../uiCompoents/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "../../../uiCompoents/lib/utils";


export interface analyzeTask {
  completed: boolean;
  deadline: string;
  formatData: string;
  _id: string;
  month: string;
  status:string;
}
interface valueAnalyzeState {
  name:string, 
  value:number | undefined;
}


interface AnalyticsChartProps {
  title: string;
  type?: "line" | "area" | "bar";
  className?: string;
  data:valueAnalyzeState
}

export function AnalyticsChart({ title, type = "line", className, data }: AnalyticsChartProps) {
  

const renderChart = () => {
    const commonProps = {
      data, 
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
};



    switch (type) {
      case "area":
        return (
          // @ts-ignore
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2E37" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "rgba(26, 31, 44, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px"
              }}
            />
            <Area type="monotone" dataKey="value" stroke="#4ADE80" fill="url(#gradient)" />
          </AreaChart>
        );
      case "bar":
        return (
          // @ts-ignore
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2E37" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "rgba(26, 31, 44, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px"
              }}
            />
            <Bar dataKey="value" fill="#4ADE80" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      default:
        return (
      // @ts-ignore
      <LineChart {...commonProps}>
         <CartesianGrid strokeDasharray="3 3" stroke="#2A2E37" />
         <XAxis dataKey="name" stroke="#6B7280" />
         <YAxis stroke="#6B7280" />
         <Tooltip 
           contentStyle={{ 
             backgroundColor: "rgba(26, 31, 44, 0.9)",
             border: "1px solid rgba(255, 255, 255, 0.1)",
             borderRadius: "8px"
           }}
         />
         <Line type="monotone" dataKey="value" stroke="#4ADE80" strokeWidth={2} dot={false} />
       </LineChart>
        );
    }
  };

  return (
    <Card className={cn("glass-card p-6", className)}>
      <h3 className="font-medium text-muted-foreground mb-4">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}