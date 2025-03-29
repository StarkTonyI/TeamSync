
import { Priority } from "../../../types/TaskType";
import { cn } from "../../../uiCompoents/lib/utils";
import { Flag } from "lucide-react";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  return (
    <div
      className={cn(
        "priority-tag flex items-center gap-1.5",
        {
          "priority-high": priority === "high",
          "priority-medium":priority === "medium",
          "priority-low": priority === "low",
        },
        className
      )}
    >
      <Flag size={12} />
      <span className="capitalize">{priority}</span>
    </div>
  );
};

export default PriorityBadge;
