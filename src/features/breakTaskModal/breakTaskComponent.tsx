import { Check, Plus, X } from "lucide-react";
import { UserContext } from "../../userContext/userContext";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { breakTaskState, deleteBreakTask, fetchBreakTask,
   isEditTask, makeCompleteBreakTask } from "../../redux/reduxSlice/breakTaskSlice";
import { Task } from "../../types/task";
import { useContext, useEffect, useState } from "react";
import DeleteButton from "../deleteButton/deleteButton";
import EditButton from "../editButton/editButton";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task:Task
  handleAddTask:()=>void
}

const BreakTaskComponent = ({ isOpen, onClose, task, handleAddTask }: TaskModalProps) => {
  const [tasks, setTasks] = useState<Task>();
  const [expanded, setExpanded] = useState({ title: false, description: false });

  const [isHovered, setIsHovered] = useState<number | null>(null);
  const { id } = useContext(UserContext) || {};
  const { setBreakTaskChangeSignal } = useContext(UserContext) || {};
  const dispath:AppDispatch = useDispatch();
  const breakTaskArray: Task[] = useSelector(breakTaskState);

  const emptyBreakTask = {
    mainTaskId:'',
    title: 'No exist',
    description: 'Create task',
    completed: false,
    deadline: ''
  }

  const toggleExpand = (key: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const truncate = (text:string, isExpanded:boolean) => {
    return isExpanded || text.length <= 20 ? text : text.slice(0, 20) + "...";
  };

  useEffect(()=>{
    if(task?.userId.length){
        const completedOrNo = task.userId.filter(i => i.id == id);
        const completedOrNoValue = JSON.parse(completedOrNo[0].completed);
        setTasks({...task, completed:completedOrNoValue, description:completedOrNo[0].description });
    } else {
      dispath(fetchBreakTask({ taskType:'breakTask', id:task?._id }));
      setTasks(task);
    }

  }, [task, id]);

function CorrectBreakTask(){
    const filterBreakTaskArray = breakTaskArray.length > 0 ? 
    breakTaskArray.filter(i => i.mainTaskId == task?._id) : [];
    if(filterBreakTaskArray){
      for(let i=0; filterBreakTaskArray.length < 5; i++){
        // @ts-ignore
        filterBreakTaskArray.push(emptyBreakTask)
    }
  };

  return filterBreakTaskArray || []
}

function editButtonFunction(task:Task){
  dispath(isEditTask(task));
  setBreakTaskChangeSignal && setBreakTaskChangeSignal(true);
  onClose()
}

const deleteButtonFunction = (taskId:string) => {
  dispath(deleteBreakTask({taskId, taskType:'breakTask'}));
}

const completeBreakTaskFunction = (task:Task, taskType:string) => {
  dispath(makeCompleteBreakTask({ breakTaskId:task._id, taskType:taskType }));
  if(taskType == 'mainTask'){
    setTasks({ ...task, completed:true });
  }
}


  if (!isOpen) return null;
  return createPortal(
    <div className="fixed w-full h-full inset-0 bg-black/60 backdrop-blur-sm flex items-center 
    justify-center p-4 z-[9999]" onClick={onClose}>
 <div className="bg-modal-background rounded-xl border border-modal-border shadow-xl w-full 
      max-w-lg animate-scale-in" onClick={(e)=>e.stopPropagation()}>
  <div className="flex justify-between items-center p-6 border-b border-modal-border">
  <div className="max-w-[80%]"> 
    

    <motion.p
      className="cursor-pointer text-white text-3xl font-bold hover:text-gray-600 break-words"
      onClick={() => toggleExpand("title")}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
  {truncate(task?.title, expanded.title)}
</motion.p>


    <motion.p
      className="cursor-pointer text-gray-200 text-sm mt-[10px] hover:text-gray-600 break-words"
      onClick={() => toggleExpand("description")}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: expanded.description ? 1 : 0.7 }}
      transition={{ duration: 0.3 }}>
      Description: { truncate(task?.description, expanded.description) }
    </motion.p>
    
  </div>

  <button 
    onClick={onClose}
    className="text-gray-400 hover:text-white transition-colors"
  >
    <X size={20} />
  </button>
</div>

       
        <div className="p-6 space-y-4">
          {CorrectBreakTask().map((subtask, index) => (
            <div 
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
            key={index}
            className="flex items-center group p-3 rounded-lg hover:bg-modal-lighter transition-colors">
              <button
                onClick={() => completeBreakTaskFunction(subtask, 'breakTask')}
                className='w-5 h-5 rounded flex items-center justify-center transition-colors 
                  bg-success text-green-300 border border-gray-600 hover:border-success'>
                {subtask.completed &&  <Check size={26} className="animate-check-mark" />}
              </button>
              
              <span className={`ml-3 flex-1 text-sm ${
                subtask.completed
                  ? "text-gray-400 line-through" 
                  : "text-gray-200"
              }`}>
              { subtask.description }
               
                
              </span>
              { isHovered !== index && (
                     <span className="text-sm">
                     { subtask.deadline.slice(0, 10) }
                   </span>
             ) }
         

              {isHovered == index && (
                <>
                  <DeleteButton onClick={()=>deleteButtonFunction(subtask._id)} />
                  <EditButton onClick={()=>editButtonFunction(subtask)}/>
                </>
              )}

            </div>
          ))}
        </div>

        <div className="p-6 border-t border-modal-border flex justify-between items-center">
          <button
            onClick={handleAddTask}
            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Add subtask
          </button>

          <button
            onClick={() => completeBreakTaskFunction(task, 'mainTask')}
            disabled={task?.completed}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            !tasks?.completed ? 
            "bg-green-700 hover:bg-success-light": "bg-gray-700 text-gray-400 cursor-not-allowed"}`}>
                Complete Task
          </button>

        </div>

      </div>

    </div>,
    document.body
  );
}; 




export default BreakTaskComponent;








