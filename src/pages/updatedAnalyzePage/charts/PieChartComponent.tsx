
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../uiCompoents/ui/card";

interface PieChartComponentProps {
  title: string;
  data: { name: string; value: number; color: string }[];
  height?: number;
}

export const PieChartComponent = ({
  title,
  data,
  height = 300,
}: PieChartComponentProps) => {
  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={height}>
 
        <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={50}
              paddingAngle={4}
              dataKey="value"
              animationDuration={1000}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222 47% 14%)",
                borderColor: "hsl(217 32% 17%)",
                borderRadius: "6px",
                color: "#e2e8f0",
              }}
              formatter={(value: number) => [`${value}`, ""]}
            />
          </PieChart>

        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
