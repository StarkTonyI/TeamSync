
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../uiCompoents/ui/card";
interface BarChartComponentProps {
  title: string;
  data: any[];
  bars: { dataKey: string; color: string; name: string }[];
  height?: number;
}

export const BarChartComponent = ({
  title,
  data,
  bars,
  height = 400,
}: BarChartComponentProps) => {
  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
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
            <Legend
              wrapperStyle={{ paddingTop: "10px" }}
              formatter={(value) => <span style={{ color: "#e2e8f0" }}>{value}</span>}
            />
            {bars.map((bar, index) => (
              <Bar
                key={index}
                dataKey={bar.dataKey}
                fill={bar.color}
                name={bar.name}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={index * 300}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
