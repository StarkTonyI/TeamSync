import { Card } from "../../uiCompoents/ui/card";
import { Badge } from "../../uiCompoents/ui/badge";
import { Task } from "../types/task";
const priorityColors = {
  high: "text-warning border-warning/20",
  medium: "text-yellow-400 border-yellow-400/20",
  low: "text-blue-400 border-blue-400/20",
};
const statusColors = {
  todo: "text-muted-foreground border-muted-foreground/20",
  "in-progress": "text-blue-400 border-blue-400/20",
  completed: "text-success border-success/20",
};

 export const TaskCard = ({ tasks, onClick }: { tasks: Task, onClick: (task:Task) => void } ) => {

const TruncateText = (text:string, maxLength = 17 ) => {
  const truncated = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  return <span title={text}>{truncated}</span>;
};

  return (

    <Card className=" z-[40] p-6 hover-scale " onClick={()=>onClick(tasks)}>
  <div className="flex justify-between items-start mb-4 max-w-full ">

      <div>
        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{TruncateText(tasks.title)}</h3>
        <p className="text-xs sm:text-sm mt-[8px] text-gray-400">Description: {TruncateText(tasks.description, 25)}</p>
      </div>
      <Badge variant="outline" className={`flex-shrink-0 ${priorityColors[tasks.priority]}`}>
        {tasks.priority}
      </Badge>
    </div>
    <div className="flex justify-between items-center">
    <Badge variant="outline" className={statusColors[tasks.status]}>
        {tasks.status}
      </Badge>
      <span className="text-sm text-muted-foreground">Due:{tasks.deadline}</span>
    </div>
  </Card>
  )
};