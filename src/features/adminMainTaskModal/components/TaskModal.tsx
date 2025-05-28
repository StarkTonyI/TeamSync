import React, { useContext, useState } from 'react';
import { Dialog, DialogContent } from "../../../uiCompoents/ui/dialog";
import TaskProgressBar from './TaskProgressBar';
import TeamMemberList from './TeamMemberList';
import TaskProgress from '../../../pages/adminpage/adminPageFolder/components/TaskProgress';
import { useFetchUserMainTaskMutation } from '../../../redux/adminApi/adminApi';
import { UserContext } from '../../../userContext/userContext';
import { TaskType } from '../../../types/TaskType';
import { isEditMainTask } from '../../../redux/reduxSlice/mainTaskSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { userId } from '../../../types/task';

interface TaskModalProps {
  editOrDelete:string
};


const TaskModal: React.FC<TaskModalProps> = ({ editOrDelete }) => {
  
  const dispatch:AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [fetchUserMainTask] = useFetchUserMainTaskMutation();
  const [usersList, setUsersList] = useState(); 
  const [taskData, setTaskData] = useState<TaskType>();
  const [expanded, setExpanded] = useState({ title: false, description:false });
  const { setMainTask } = useContext(UserContext) || {};
  
const openModal = () => {
  if(!editOrDelete) setIsOpen(true);
}


const passTaskData = (data:TaskType) => {
  openModal();
  setTaskData(data);
  getUserTask(data._id);
  if(editOrDelete){    
    //@ts-ignore
    if(setMainTask && data) setMainTask(data); 
    setIsOpen(false)
    //@ts-ignore
    if(editOrDelete == 'edit') dispatch(isEditMainTask(data))
}

}

const getUserTask = async(taskId:string) => {
  const { data } = await fetchUserMainTask(taskId);
  setUsersList(data); 
}
const updateFunction = (task:userId[] | undefined) => {
  const totalUserLength = task?.length || 0;
  const mainCompleted = task?.filter(i => i.completed == 'true').length || 0; 
  
  const percentage = mainCompleted !== 0 
  ? Math.round((mainCompleted / totalUserLength ) * 100) 
  : 0; 
 return percentage
}

function CloseModal(){
  setIsOpen(false);
  setTaskData(undefined);
  setUsersList(undefined);
};

const toggleExpand = (key: keyof typeof expanded) => {
  setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
};

const truncate = (text:string, isExpanded:boolean) => {
  return isExpanded || text?.length <= 20 ? text : text?.slice(0, 20) + "...";
};

  return (
    <Dialog open={isOpen} onOpenChange={CloseModal}>
      
    <TaskProgress onClick={passTaskData}/>

      <DialogContent className="sm:max-w-[800px] min-h-[500px] bg-modal-background border-modal-border p-0">
      <div className="p-6 space-y-6 animate-fade-in" onClick={() => toggleExpand("title")}>
        <h2 className="text-2xl font-semibold text-modal-foreground mb-2">
          Title:{truncate(taskData?.title || '', expanded.title)}
        </h2>
        <h3 onClick={() => toggleExpand("description")}>
          Description:{truncate(taskData?.description || '', expanded.description)}
        </h3>
        <h4>Deadline:{taskData?.deadline}</h4>
        <div className="space-y-2">

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-modal-foreground opacity-75">Progress</span>
            <span className="text-sm font-medium text-modal-foreground">{ 
            updateFunction(taskData?.userId) }%</span>
          </div>
          <TaskProgressBar progress={updateFunction(taskData?.userId)} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-modal-foreground">Team Members</h3>

          { (usersList && taskData) ? 
          <TeamMemberList  members={usersList} taskData={taskData?.userId}/> 
          : <span className='flex items-center justify-center '>No members</span>} 
         
        </div>
      </div>
      </DialogContent>
    
    
    </Dialog>
  );
};

export default TaskModal;