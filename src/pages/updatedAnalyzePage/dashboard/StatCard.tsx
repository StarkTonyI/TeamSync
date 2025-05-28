
import { LucideIcon } from "lucide-react";
import { cn } from "../../../uiCompoents/lib/utils";
import { Card, CardContent } from "../../../uiCompoents/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: "primary" | "success" | "warning" | "info";
}

export const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
  };

  return (
    <Card className="glass-card border border-white/10 bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/60 backdrop-blur-md rounded-2xl shadow-xl transition-all hover:shadow-2xl">
    <CardContent className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-4xl font-semibold text-white">{value}</h3>
        </div>
        <div className={cn(
          "p-3 rounded-xl shadow-inner border border-white/10",
          colorClasses[color]
        )}>
          <Icon size={28} />
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
        <span className="text-xs text-gray-400">From all period</span>
      </div>
    </CardContent>
  </Card>
  
  );
};
