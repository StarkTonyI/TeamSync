
import React from "react";
import { Badge } from "../../../../uiCompoents/ui/badge";
import { logoType, userTypeInterface } from "../../../../types/TaskType";
import { useSelector } from "react-redux";
import { mainTaskStateAdmin } from "../../../../redux/reduxSlice/mainTaskSlice";
import { Progress, ProgressIndicator } from "@radix-ui/react-progress";


interface UserCardProps {
  user: userTypeInterface;
  onClick: () => void;
  logo:logoType[]
}

export const UserCard: React.FC<UserCardProps> = ({ user, onClick, logo }) => {

  const mainTaskState = useSelector(mainTaskStateAdmin);
  const filteredTasks = mainTaskState.filter(task => 
      task.userId.some(i => i.id == user?.id) 
    );

  const logoFilter = logo?.filter(i => i._id == user.id);
  const completedTasks = filteredTasks.filter(i => i.completed);
  const completedTasksPercentage = 
  filteredTasks.length > 0 
    ? (completedTasks.length / filteredTasks.length) * 100 
    : 0;


  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-gray-800 to-gray-900 w-full
       rounded-xl  shadow-lg border border-gray-700 max-h-[300px] 
        hover:border-indigo-500 transition-all duration-300 hover:shadow-indigo-500/10 cursor-pointer"
    >
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-700">
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                
              <img
                  src={logo && (logoFilter[0]?.imageUrl ? logoFilter[0].imageUrl : 
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.username
                    )}&background=7047eb&color=fff`
                    )}               
                    
                    alt={user.username}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.username
                      )} &background=7047eb&color=fff`;
                    }}
                  />
                  
              
            
  
              </div>
            </div>
           
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-100">{user.username}</h3>
            <p className="text-gray-400 text-sm">{user.login}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Badge
            variant="outline"
            className="bg-gray-700/50 border-gray-600 text-gray-300">
            user
          </Badge>
          <span className="text-sm text-gray-400">
            {filteredTasks.length} tasks
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Progress</span>
            <span>{completedTasksPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={completedTasksPercentage} className="h-2 bg-slate-600">
            <ProgressIndicator
              className={`h-full transition-all rounded-full ${ completedTasksPercentage === 0 ? "bg-slate-500"
              : completedTasksPercentage < 60
              ? "bg-amber-500"
              : "bg-green-600"
      }
    `}
    style={{ width: `${completedTasksPercentage}%` }}
  />
</Progress>
        </div>
      </div>
    </div>
  );
};
