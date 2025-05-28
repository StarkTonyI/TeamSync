import { useContext, useEffect, useState } from "react";
import { StorageItem } from "../../AdminUser/adminOrUserComponents/MetricCards";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteMainTask, fetchMainTask, isEditMainTask, mainTaskStateAdmin } from "../../redux/reduxSlice/mainTaskSlice";
import { Task } from "../../types/task";
import usersCompletedCount from "../adminFeatures/usersCompletedCount";
import { UserContext } from "../../userContext/userContext";
import TaskDetailsModal from "./taskModal/taskModalComponent/taskDetailModal";
import { useFetchUserMainTaskMutation } from "../../redux/adminApi/adminApi";
import {  TaskType, TeamMember } from "../../types/TaskType";
interface TaskModalProps {
  editOrDelete:string
};

export default function TaskListCard({ editOrDelete }:TaskModalProps){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispath:AppDispatch = useDispatch()
    const { setMainTask } = useContext(UserContext) || {};
    const [fetchUserMainTask] = useFetchUserMainTaskMutation();
    const [taskData, setTaskData] = useState<TaskType>();
    const [usersList, setUsersList] = useState<TeamMember[]>()
    useEffect(()=>{
      dispath(fetchMainTask());
    }, []);

    const mainTaskArray: Task[] = useSelector(mainTaskStateAdmin);
  
    const closeModal = () => {
      setIsModalOpen(prev => !prev);
      setUsersList(undefined)
    }

    const passTaskData = (task:Task) => {
         //openModal();
        if(!editOrDelete){
         setTaskData({ ...task, option: '' });
         setIsModalOpen(prev => !prev);
         getUserTask(task._id);
        }
         else if(editOrDelete){    
           if(setMainTask && task) setMainTask(task); 
           //setIsOpen(false)
           if(editOrDelete == 'edit') dispath(isEditMainTask(task));
           else if(editOrDelete == 'delete') dispath(deleteMainTask({ taskId:task._id }));
       }
       
    }
 const getUserTask = async(taskId:string) => {
  const { data } = await fetchUserMainTask(taskId);
   setUsersList(data); 
 }



  return (
    <div className={`bg-slate-800/30 rounded-lg border
      ${mainTaskArray.length > 0 ? '' : 'flex justify-center items-center'}
        
     border-slate-700/50 p-4 min-h-[150px]`}>
      <div className={`max-h-[390px] overflow-y-auto pr-2 
        ${mainTaskArray.length > 0 ? 'grid' : ''}
        grid-cols-1 md:grid-cols-2 gap-4`}>
        {mainTaskArray.length > 0 ? mainTaskArray.map((task: Task, index: number) => (
          <StorageItem
            onClick={() => passTaskData(task)}
            key={index}
            name={task.title}
            percentage={usersCompletedCount(task.userId)}
            type="TS"
          />
        ))
        : <p className="text-gray-600">Tasks not created</p>
      }
  
        {(taskData && !editOrDelete) && (
          <TaskDetailsModal
            task={taskData}
            usersList={usersList}
            open={isModalOpen}
            onOpenChange={closeModal}
          />
        )}
      </div>
    </div>
  )
  

}