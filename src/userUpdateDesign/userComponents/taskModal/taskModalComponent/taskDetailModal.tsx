import { X } from "lucide-react";
import { Dialog, DialogContent } from "../../../../uiCompoents/ui/dialog";
import ProgressBar from "./progressBar";
import UserAssignment from './userAssignmen'
import { userId } from "../../../../types/task";
import { TaskType, TeamMember } from "../../../../types/TaskType";

export type UserType = {
  id: string;
  name: string;
  avatar: string;
  completed: boolean;
};

type TaskDetailsModalProps = {
  task: TaskType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  usersList:TeamMember[];
};

const TaskDetailsModal = ({ task, open, onOpenChange, usersList }: TaskDetailsModalProps) => {
  const totalUsers = task.userId.length;
  const completedUsers = task.userId.filter(i => i.completed).length;
  
 const updateFunction = (task:userId[] | undefined) => {
   const totalUserLength = task?.length || 0;
   const mainCompleted = task?.filter(i => i.completed == 'true').length || 0; 
   
   const percentage = mainCompleted !== 0 
   ? Math.round((mainCompleted / totalUserLength ) * 100) 
   : 0; 
  return percentage
 }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A2237] text-white border-slate-700 p-0 max-w-3xl overflow-hidden">
        <div className="relative flex flex-col min-h-[50vh]">
          {/* Header */}
          <div className="bg-[#22304D] p-6 border-b border-slate-700">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{task.title}</h2>
                <div className="text-slate-300 mt-1">Due {new Date(task.deadline).toLocaleDateString()}</div>
              </div>
              <button 
                onClick={() => onOpenChange(false)}
                className="rounded-full p-1 hover:bg-slate-700/50 transition-colors"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
          </div>
          
          {/* Body */}
          <div className="p-6 flex-grow space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-medium mb-2 text-slate-200">Description</h3>
              <p className="text-slate-300 whitespace-pre-line">{task.description}</p>
            </div>
            
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-slate-200">Progress</h3>
                <span className="text-slate-300 text-sm font-medium">
                  {updateFunction(task.userId)}%
                </span>
              </div>
              <ProgressBar progress={updateFunction(task.userId)} />
              
              <div className="mt-3 text-sm text-slate-400">
                {completedUsers} of {totalUsers} team members completed this task
              </div>
            </div>
            
            {/* Assigned Users */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-slate-200">Assigned Team Members</h3>
              <div className="space-y-3">
            
              {usersList?.map((user) => (
                  <UserAssignment key={user._id} user={user} taskType={task.userId}/>
                ))}

              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-[#1E283E] p-4 border-t border-slate-700 flex justify-end">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 transition-colors"
              onClick={() => onOpenChange(false)}
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal;