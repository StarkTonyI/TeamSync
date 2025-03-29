
import BreakTaskComponent from "./breakTaskComponent";
import { TaskCard } from "../../taskDashboard/components/TaskCard";
import { Task } from "../../taskDashboard/types/task";
import { useContext, useState } from "react";
import { UserContext } from "../../userContext/userContext";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { deleteBreakTask, fetchBreakTask, isEditTask } from "../../redux/reduxSlice/breakTaskSlice";
import '../../pages/UserPage/UserPage.css'
interface BreakTaskModalType {
  tasks:Task[],
  editOrDelete:string
}

const BreakTaskModal = ({ tasks, editOrDelete }:BreakTaskModalType ) => {
  const [taskClick, setTaskClick] = useState<Task>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState<Task>();
  const { setBreakTaskChangeSignal, setMainTask } = useContext(UserContext) || {};
  const dispatch:AppDispatch = useDispatch();
  
  const onClick = (tasks:Task) => {
 
    if(!editOrDelete){
    setMainTask && setMainTask({...tasks, option:'edit'});
    setTaskClick(tasks)
    setIsModalOpen(true);
    dispatch(fetchBreakTask({ taskType:'mainTask', id:task?._id || ''}));
    // @ts-ignore
    setTask(tasks?._id);
    }else{ 
        if(editOrDelete == 'delete') dispatch(deleteBreakTask({taskId:tasks._id, taskType:'mainTask'}));
        else dispatch(isEditTask(tasks))
     } 
    }

  const handleAddTask = () => {    
    setIsModalOpen(false);
    setTimeout(()=>setBreakTaskChangeSignal && setBreakTaskChangeSignal(true), 100)
  };

  return (
    <>
    <div className="grid correct-grid-cols gap-4">
      
      { tasks && tasks.map((task, index)=>(
          <TaskCard
           key={index}
          tasks={task}
          onClick={onClick}        
/>    
        )) }

    </div>

    <BreakTaskComponent 
      isOpen={isModalOpen}
      // @ts-ignore
      task={taskClick}
      onClose={() => setIsModalOpen(false)} 
      handleAddTask={handleAddTask}
      />
   </>
    
  );
};

export default BreakTaskModal;
