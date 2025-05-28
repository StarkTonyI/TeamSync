// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { cn } from "../../uiCompoents/lib/utils";
import userIcon from '../../images/user.png';
import taskIcon from '../../images/task.png'
import '../profileCard/profileCard.css';
import { useGetUserMutation } from "../../redux/adminCommandApi/AdminCommandApi";
import { UserContext } from "../../userContext/userContext";
import { useDispatch, useSelector } from "react-redux";
import { assignMainTask, mainTaskStateAdmin } from "../../redux/reduxSlice/mainTaskSlice";
import { AppDispatch } from "../../redux/store";
import DescriptionModal from "../descriptionModal/descriptionModal";
import { Task } from "../../types/task";
import { setSignalOpenAssignTaskType } from "../../types/TaskType";


interface TaskModalProps {
  isOpen: boolean | undefined;
  onClose:React.Dispatch<React.SetStateAction<setSignalOpenAssignTaskType>> | undefined;
}
const TaskModal = ({ isOpen, onClose }: TaskModalProps) => {
  const mainTaskState = useSelector(mainTaskStateAdmin);
  const [regulateSustem, setRegulateSustem] = useState<null | Task>(null);
  const [user, setUser] = useState('');
  const [getUser] = useGetUserMutation();
  const { signalOpenAssignTask } = useContext(UserContext) || {};
  const dispath:AppDispatch = useDispatch()


  
  const [tasks, setTasks] = useState<Task[]>(mainTaskState);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(()=>{
    const userFunction = async() => {
      const { data } = await getUser(signalOpenAssignTask?.userId);
      setUser(data)
    }
    userFunction();
  }, [signalOpenAssignTask]);


  const toggleTask = async(description:string) => {
    const userId = user?._id;
    await dispath(assignMainTask({userId, task:regulateSustem, description}));
    setRegulateSustem(null);
    setIsModalOpen(true)
  }

  useEffect(()=>{
    setTasks(mainTaskState);
  }, [mainTaskState]);

  useEffect(()=>{
    if(regulateSustem?.userId.some(i => i.id == user?._id)){
      toggleTask('')
    }
}, [regulateSustem]);

function CorrectOpenDescriptionModal(){
  if(regulateSustem?.userId.some(i => i.id == user?._id)){
    return 
  }else if(regulateSustem) {
    return <DescriptionModal onClick={toggleTask} 
    isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/> 
  }
}

  return (
    <AnimatePresence>
      {isOpen && (
      
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50"
          onClick={()=>onClose({
            signal:false,
            id:''
})}>

<motion.div
  initial={{ scale: 0.95, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.95, opacity: 0 }}
  transition={{ duration: 0.2 }}
  className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-white/10"
  onClick={(e) => e.stopPropagation()}
>
  <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-md">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={user && (user.imageUrl ? user.imageUrl : userIcon)}
          alt="User avatar"
          className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-400/30"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">{user?.username}</h3>
          <p className="text-sm text-white/50">User</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="w-5 h-5 text-white/60" />
      </button>
    </div>
  </div>

  <div className="max-h-[450px] overflow-y-auto p-6 space-y-4">
    {tasks.map((task) => (
      <motion.div
        key={task._id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
      >
        <img
          src={taskIcon}
          alt={task.title}
          className="w-12 h-12 rounded-md object-cover"
        />

        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              "text-base font-medium truncate",
              task?.userId.some((i) => i.id == user?._id)
                ? "text-white/40"
                : "text-white"
            )}
          >
            {task.title}
          </h4>
          <p
            className={cn(
              "text-sm truncate",
              task?.userId.some((i) => i.id == user?._id)
                ? "text-white/30"
                : "text-white/60"
            )}
          >
            {task.description}
          </p>
        </div>
        <button
          onClick={() => setRegulateSustem(task)}
          className={cn(
            "p-2 rounded-full transition-colors",
            task?.userId.some((i) => i.id == user?._id)
              ? "text-green-400"
              : "text-white/40 hover:text-white"
          )}
        >
          <CheckCircle2 className="w-6 h-6" />
        </button>
      </motion.div>
    ))}
  </div>
</motion.div>


          { 
          CorrectOpenDescriptionModal()
          } 
        
        </motion.div>

     )}
    </AnimatePresence>
  );
};

export default TaskModal;