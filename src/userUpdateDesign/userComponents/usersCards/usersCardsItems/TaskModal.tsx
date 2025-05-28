
import { useContext, useState } from "react";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription 
} from "../../../../uiCompoents/ui/dialog";
import { Button } from "../../../../uiCompoents/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../uiCompoents/ui/tabs";
import { Separator } from "../../../../uiCompoents/ui/separator";
import { Plus } from "lucide-react";
import TaskItem from "./taskItems";
import { UserContext } from "../../../../userContext/userContext";
import { userTypeInterface } from "../../../../types/TaskType";
import { useSelector } from "react-redux";
import { mainTaskStateAdmin } from "../../../../redux/reduxSlice/mainTaskSlice";


interface UserDetailModalProps {
  user: userTypeInterface  | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailModal = ({ user, isOpen, onClose }: UserDetailModalProps) => {
  
    const mainTaskState = useSelector(mainTaskStateAdmin);
    const filteredTasks = mainTaskState.filter(task => 
      task.userId.some(i => i.id == user?._id) 
    );
    const completedTasks = filteredTasks.filter(i => i.completed);
    const completedTasksPercentage = 
    filteredTasks.length > 0 
      ? (completedTasks.length / filteredTasks.length) * 100 
      : 0;


  const [activeTab, setActiveTab] = useState("all");
  const logoFilter = user?.logo?.filter(i => i._id == user.id)  

  const { setSignalOpenAssignTask } = useContext(UserContext) || {}; 

function AssingTask(){
    if(setSignalOpenAssignTask) setSignalOpenAssignTask({
      signal:true,
      userId:user?._id || '',
      taskId:''
    });
    onClose()
  }

  if(!user) return <div></div>

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
   
   <DialogContent className="sm:max-w-[600px] bg-[#101827] border border-[#1f2a3a] rounded-2xl shadow-xl max-h-[85vh] overflow-y-auto px-6 py-5">
  <DialogHeader>
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2c3e50]">
          <img 
               src={logoFilter?.length ? logoFilter[0].imageUrl : 
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.username
                )}&background=7047eb&color=fff`
              }        
            alt={`${user.username}'s avatar`} 
            className="w-full h-full object-cover"
          />
        </div>
      
      </div>
      <div>
        <DialogTitle className="text-xl text-white">{user.username}</DialogTitle>
        <DialogDescription className="flex items-center gap-1 text-sm text-zinc-400">
          { user.login }
        </DialogDescription>
      </div>
    </div>
  </DialogHeader>

  <div className="grid grid-cols-2 gap-4 my-5 bg-[#1a2537] rounded-xl p-4">
    <div className="flex flex-col items-center bg-[#1f2f45] rounded-lg p-3 shadow-inner">
      <span className="text-zinc-400 text-sm mb-1">Tasks Completed</span>
      <span className="text-3xl font-extrabold text-green-400">{filteredTasks.length}</span>
    </div>
    <div className="flex flex-col items-center bg-[#1f2f45] rounded-lg p-3 shadow-inner">
      <span className="text-zinc-400 text-sm mb-1">Completion Rate</span>
      <span className="text-3xl font-extrabold text-sky-400">{completedTasksPercentage}%</span>
      <span className="text-xs text-sky-300 mt-1 tracking-wide">{25 > 85 ? 'Excellent' : 'Needs Work'}</span>
    </div>
  </div>


  <Separator className="my-5 bg-[#2c3e50]" />

  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-white">Tasks</h3>
      <Button 
        variant="ghost" 
        size="sm" 
        className="bg-[#2b3c52] text-zinc-200 hover:bg-[#354961]" 
        onClick={() => AssingTask()}>
        <Plus size={16} className="mr-1" /> Attach Task
      </Button>
    </div>

    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 gap-2 bg-[#1a2537] p-1 rounded-lg mb-4">
        <TabsTrigger value="all" className="data-[state=active]:bg-[#314a6e] data-[state=active]:text-white text-zinc-300">All ({filteredTasks.length})</TabsTrigger>
        <TabsTrigger value="completed" className="data-[state=active]:bg-[#314a6e] data-[state=active]:text-white text-zinc-300">Completed ({completedTasks.length})</TabsTrigger>
        <TabsTrigger value="pending" className="data-[state=active]:bg-[#314a6e] data-[state=active]:text-white text-zinc-300">Pending ({filteredTasks.length - completedTasks.length})</TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab} className="max-h-[300px] overflow-y-auto pr-1">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem key={task._id} task={task} />
          ))
        ) : (
          <div className="text-center py-8 text-zinc-500">
            <p>No tasks found</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  </div>
</DialogContent>

    
    </Dialog>
  );
  
};

export default UserDetailModal;