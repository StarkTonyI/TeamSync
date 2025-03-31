import { useContext } from 'react';
import { Dialog, DialogContent } from "../../uiCompoents/ui/dialog";
import { Button } from "../../uiCompoents/ui/button";
import { Badge } from "../../uiCompoents/ui/badge";
import { CheckSquare, PlusSquare } from 'lucide-react';
import { useToast } from "../../uiCompoents/ui/use-toast";
import '../profileCard/profileCard.css'
import { UserContext } from '../../userContext/userContext';
import { useSelector } from 'react-redux';
import { mainTaskStateAdmin } from '../../redux/reduxSlice/mainTaskSlice';
import userPng from '../../images/user.png'

interface UserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id:string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  member: {
    login: string,
    _id: string,
    username: string,
    role: string,
    mainTask:[]
  }
  logo:[{ _id:string, imageUrl:string }]
}

const UserModal = ({ open, onOpenChange, member, setIsModalOpen, logo }: UserModalProps) => {
  const { toast } = useToast();
  const { setSignalOpenAssignTask } = useContext(UserContext) || {};
  
  const mainTaskState = useSelector(mainTaskStateAdmin);
  
  const filteredTasks = mainTaskState.filter(task => 
    task.userId.some(i => i.id == member._id) 
  );


const handleAssignTask = () => {
    toast({
      title: "Task Assignment",
      description: "New task assignment feature coming soon!",
    });
    if(setSignalOpenAssignTask) setSignalOpenAssignTask({
      signal:true,
      userId:member._id,
      taskId:''
    });
    setIsModalOpen(false);
};     

const TruncateText = (text:string, maxLength = 17 ) => {
  const truncated = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  return <span title={text}>{truncated}</span>;
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-modal-background border-modal-border 
      text-modal-foreground max-w-2xl mx-auto p-0 overflow-hidden">
        <div className="relative">

          <div className=" absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.1)_50%,transparent_75%,transparent_100%)] pointer-events-none" />
          <div className="relative p-6 space-y-6">     
            <div className="flex items-start gap-6">
             <div className="relative">
                <div className="w-26 h-26 rounded-full bg-gradient-to-br from-gray-700 
                o-gray-900 flex items-center justify-center border-2 border-modal-border shadow-lg">
                  <img src={logo && (logo[0].imageUrl ? logo[0].imageUrl : userPng) } 
                  className=' w-[120px] h-[120px] rounded-full object-cover'
                  alt="user" />
                </div>
                <div className="absolute bottom-1 right-1">
                  <span className="flex h-3 w-3">
                    <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="space-y-1">
                  <Badge variant="secondary" className="bg-gray-700 text-gray-200">Senior Developer</Badge>
                  <h2 className="text-2xl font-semibold">{member.username}</h2>
                </div>
                <p className=" text-sm white">
                  Full-stack developer with expertise in React and Node.js. 
                  Passionate about creating elegant solutions to complex problems.
                </p>
              </div>
            </div>

        
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Current Tasks</h3>
                <Button
                  onClick={handleAssignTask}
                  className="bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
                >
                  <PlusSquare className="mr-2 h-4 w-4" />
                  Assign Task
                </Button>
              </div>

              <div className="space-y-3 ">
              
              { filteredTasks.length ? (filteredTasks.map((task) => (
         
         <div
             key={task._id}
             className="flex items-center justify-between p-3 
             rounded-lg bg-gray-800/50 border border-modal-border backdrop-blur-sm 
             transition-all duration-200 hover:bg-gray-800/70">

             <div className="flex items-center gap-3">
               <CheckSquare
                 className={`h-5 w-5 ${
                   task.status === 'completed' ? 'text-green-500' : 'text-gray-400'
                 }`}
               />
               <span>{TruncateText(task.title, 50)}</span>
             </div>

             <Badge
               variant="secondary"
               className={`${
                 task.status === 'completed'
                   ? 'bg-green-500/20 text-green-300'
                   : 'bg-yellow-500/20 text-yellow-300'
               }`}
             >
               {task.status === 'completed' ? 'Completed' : 'In Progress'}
             </Badge>
         
         </div>
  
         ))) : 
         (<p>Task no exist</p> ) }
             
              </div>
            </div>
          </div>
        
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;