
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../uiCompoents/ui/card";

interface LineChartComponentProps {
  title: string;
  data: { name: string; completedRate: number; }[] | undefined;
  dataKey: string;
  color: string;
  height?: number;
}

export const LineChartComponent = ({
  title,
  data,
  dataKey,
  color,
  height = 400,
}: LineChartComponentProps) => {
  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#a0aec0" }}
              tickLine={{ stroke: "#4a5568" }}
              axisLine={{ stroke: "#4a5568" }}
            />
            <YAxis
              tick={{ fill: "#a0aec0" }}
              tickLine={{ stroke: "#4a5568" }}
              axisLine={{ stroke: "#4a5568" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222 47% 14%)",
                borderColor: "hsl(217 32% 17%)",
                borderRadius: "6px",
                color: "#e2e8f0",
              }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${dataKey})`}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
