import { Card } from "../../../uiCompoents/ui/card";
import { cn } from "../../../uiCompoents/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function KpiCard({ title, value, change, trend, className }: KpiCardProps) {
  return (
    <Card className={cn("glass-card p-6 hover-scale", className)}>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      {change && (
        <p className={cn(
          "mt-2 text-sm",
          trend === "up" && "text-green-500",
          trend === "down" && "text-red-500",
          trend === "neutral" && "text-muted-foreground"
        )}>
          {change}
        </p>
      )}
    </Card>
  );
}