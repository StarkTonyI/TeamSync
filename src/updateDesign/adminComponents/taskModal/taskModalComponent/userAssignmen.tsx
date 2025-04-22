import { Check, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../uiCompoents/ui/avatar";
import { cn } from "../../../../uiCompoents/lib/utils";
import { TeamMember } from "../../../../types/TaskType";
import { userId } from "../../../../types/task";

type UserAssignmentProps = {
  user: TeamMember;
  taskType:userId[]
};

const UserAssignment = ({ user, taskType }: UserAssignmentProps) => {
  const initials = user.username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
// / { correctCompletedTask(member) == 'false' ? "text-amber-400" :  "text-emerald-400" } 
 
const correctCompletedTask = (data:any) => {
  const taskDataFilter = taskType?.filter(i => i.id == data._id);  
  return taskDataFilter[0].completed;
}


return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={user.avatar} alt={user.username} />
        <AvatarFallback className="bg-slate-600 text-white">
          {initials}
        </AvatarFallback>
      </Avatar>
  
      <div>
        <p className="font-medium text-slate-200">{user.username}</p>
        <p
          className={cn(
            "text-sm",
            correctCompletedTask(user) !=='false' ? "text-emerald-400" : "text-amber-400"
          )}
        >
          {correctCompletedTask(user) !=='false' ? "Completed" : "In progress"}
        </p>
      </div>
    </div>
  
    <div className="flex items-center gap-1.5 text-sm font-medium">
      {correctCompletedTask(user) !=='false' ? (
        <>
          <Check className="h-4 w-4 text-emerald-400" />
          <span className="text-emerald-400">Completed</span>
        </>
      ) : (
        <>
          <Clock className="h-4 w-4 text-amber-400" />
          <span className="text-amber-400">In progress</span>
        </>
      )}
    </div>
  </div>
  
  );
};

export default UserAssignment;