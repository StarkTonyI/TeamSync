import { useContext, useEffect, useState } from "react";
import { StorageItem } from "../../AdminUser/adminOrUserComponents/MetricCards";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../types/task";
import { UserContext } from "../../userContext/userContext";
import {  TaskType } from "../../types/TaskType";
import { deleteBreakTask, isEditTask, mainTaskState } from "../../redux/reduxSlice/breakTaskSlice";
import { useTotalTaskUserMutation } from "../../redux/totalTaskApi/totalTask";
import BreakTaskComponent from "../../features/breakTaskModal/breakTaskComponent";
import { useToast } from "../../uiCompoents/hooks/use-toast";
interface TaskModalProps {
  editOrDelete:string
};

export default function TaskListCard({ editOrDelete }:TaskModalProps){
  
    const { id } = useContext(UserContext) || {};    
    const [totalTaskApi] = useTotalTaskUserMutation();  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispath:AppDispatch = useDispatch()
    const { setMainTask, setBreakTaskChangeSignal } = useContext(UserContext) || {};
    const [taskData, setTaskData] = useState<TaskType>();
    const { toast } = useToast();

    const mainTaskArray: Task[] = useSelector(mainTaskState);
    const userTask = mainTaskArray.filter(i => !i.userId.length);
    const commandTask = mainTaskArray.filter(task => task.userId.some(i => i.id == id));
    
  useEffect(()=>{
  if(id){
    const taskApiFunction = async() => totalTaskApi(id).unwrap();
    taskApiFunction();
  }
}, [id]);

    const passTaskData = (task:Task, status:string) => {
      console.log(task)  
      if(setMainTask && task) {
        setMainTask(task)
      }; 
      if(!editOrDelete){
         setTaskData(task);
         setIsModalOpen(prev => !prev);
         }
         if(editOrDelete){
            if(status === 'command'){
              return  toast({
                title: "Impossible operation",
                description: "Only administrator can delete or edit a command task.",
                variant: "destructive",
              });
            }    
        
           //setIsOpen(false)
           console.log(editOrDelete)
           if(editOrDelete == 'edit') dispath(isEditTask(task));
           else if(editOrDelete == 'delete') dispath(deleteBreakTask({taskId:task._id, taskType:'mainTask'}));
       } 
      }

 const handleAddTask = () => {    
  setIsModalOpen(false);
  setTimeout(()=>setBreakTaskChangeSignal && setBreakTaskChangeSignal(true), 100)
};

    return  <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
        <p className="m-2">Your task:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     
        { 
          userTask && userTask.map((task:Task, index:number) => (
            <StorageItem onClick={()=>passTaskData(task, 'user')} key={index} name={task.title}
              percentage={task.completed ? 100 : 0} type="UR" />
          ))
        }
        </div>

        <p className="m-2">Command task:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     
        { 
          commandTask && commandTask.map((task:Task, index:number) => (
            <StorageItem onClick={()=>passTaskData(task, 'command') } key={index} name={task.title}
            percentage={task.completed ? 100 : 0} type="CM" />
          ))
        }
        </div>

     <div>
     <BreakTaskComponent
      isOpen={isModalOpen}
      // @ts-ignore
      task={taskData}
      onClose={() => setIsModalOpen(false)} 
      handleAddTask={handleAddTask}
      />
        
      </div>
    </div>

}