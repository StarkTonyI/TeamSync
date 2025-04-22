
import { Task } from "../../../../types/task";
import { cn } from "../../../../uiCompoents/lib/utils";
import { Check, Calendar, TimerIcon } from "lucide-react";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { title, description, completed, priority, deadline } = task;
  
  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className={cn(
      "border rounded-md p-4 mb-3 transition-all",
      completed ? "border-muted bg-muted/30" : "border-border  bg-[#1f2f45]"
    )}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
       
           { completed ? (
        <div className={cn(
          "w-6 h-6 rounded-md flex items-center justify-center border",
          "bg-green-700 border-primary/40"
           )}>
          { <Check size={14} className=" white" />}
  </div>
           ) : (
            <div className={cn(
              "w-6 h-6 rounded-md flex items-center justify-center border",
              " border-primary/40"
            )}>
              { <TimerIcon size={14} className=" white" />}
            </div>
           ) }

      
       

            <h4 className={cn(
              "font-medium text-xl",
              completed && "line-through text-muted-foreground"
            )}>
              {title}
            </h4>
          </div>
          <p className={cn(
            "text-sm text-muted-foreground mt-1 ml-8",
            completed && "line-through"
          )}>
            {description}
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className={cn(
            "text-xs px-2 py-1 rounded border",
            getPriorityColor(priority)
          )}>
            {priority}
          </span>
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <Calendar size={12} />
            <span>{formatDate(deadline)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;