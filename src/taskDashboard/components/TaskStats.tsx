import { useContext } from "react";
import { Card } from "../../uiCompoents/ui/card";
import { Task } from "../types/task";
import { UserContext } from "../../userContext/userContext";

interface StatCardProps {
  title: string;
  value: number;
  className?: string;
}

const StatCard = ({ title, value, className = "" }: StatCardProps) => (
  <Card className={`glass-card p-4 hover-scale ${className}`}>
    <p className="text-sm text-muted-foreground">{title}</p>
    <p className="text-2xl font-semibold mt-1">{value}</p>
  </Card>
);

export const TaskStats = ({ tasks }:{tasks:Task[]} ) => {

  const { id } = useContext(UserContext) || {} ;

  const totalTask = tasks.length
  const completeTask = tasks.filter(i => i.completed).length;
  const completeTaskCommand = tasks.filter(task => 
    task.userId.some(user => user.id == id && user.completed === "true")
  ).length;
  const inProgressTask = tasks.filter(i => i.status == 'in-progress').length;
  
  const dueToday = tasks.filter(i => i.priority == 'high').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in">
      <StatCard title="Total Tasks" value={totalTask} />
      <StatCard
        title="High priority"
        value={dueToday}
        className="border-warning/20 text-warning text-red-500"
      />
      <StatCard
        title="Completed"
        value={completeTask + completeTaskCommand}
        className="border-success/20 text-success"
      />
      <StatCard title="In Progress" value={inProgressTask} />
    </div>
  );
};