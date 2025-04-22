import { useState } from 'react';
import UserModal from './UserModal';
import { motion } from 'framer-motion';
import { useGetUserMutation } from '../../redux/adminCommandApi/AdminCommandApi';
import { useSelector } from 'react-redux';
import { mainTaskStateAdmin } from '../../redux/reduxSlice/mainTaskSlice';
import TaskProgressBar from '../adminMainTaskModal/components/TaskProgressBar';
import userPng from '../../images/user.png';
import DeleteUserModal from '../deleteUserModal/DeleteUserModal';
import { useDeleteUserMutation } from '../../redux/adminApi/adminApi';
import { logoType } from '../../types/TaskType';

interface adminModalType {
  member: {
    login: string,
    id: string,
    username: string,
    role: string,
    _id: string
  };
  logo:logoType[];
  editOrDelete:string;

}


const AdminModal = ({ member, logo, editOrDelete }:adminModalType) => {
  const [deleteIsModalOpen, setDeleteIsModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberFull, setMemberFull] = useState();
  const [user] = useGetUserMutation();
  const mainTaskState = useSelector(mainTaskStateAdmin);
  const logoFilter = logo?.filter(i => i._id == member.id)
  const [deleteUser] = useDeleteUserMutation();

  const filteredTasks = mainTaskState.filter(task => task.userId.some(i => i.id == member.id)); 
  const userIdTask = filteredTasks.flatMap(obj =>  obj.userId.filter(item => item.id === member.id))
  
  const mainCompleted = userIdTask?.filter(i => i.completed == 'true').length; 
  const percentage = mainCompleted !== 0 ? Math.round((mainCompleted / filteredTasks.length) * 100) : 0; 

  const userOpen = async() => {

    if(editOrDelete == 'delete') setDeleteIsModalOpen(true);
    if(!editOrDelete) setIsModalOpen(true);
    
    const { data } = await user(member.id);
    setMemberFull(data);
  }
  
  const deleteUserFunction = async(id:string) =>{
    try{
      await deleteUser(id);
      window.location.reload();
    }catch(err){
      console.log('Error' + err);
    }
  }



return (
    <>
  <div >
    <motion.div
    onClick={()=>userOpen()}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 12 * 0.1 }}
    className="glass-card p-6 rounded-xl hover-scale cursor-pointer max-w-[500px]">

  <div className="flex items-center space-x-4 mb-4">
    <img 
      src={logo && (logoFilter[0]?.imageUrl ? logoFilter[0].imageUrl : userPng) } 
      alt={member.username} 
      className="w-12 h-12 rounded-full object-cover"
    />
    <div>
      <h3 className="font-medium">{member.username}</h3>
      <p className="text-sm text-muted-foreground">{member.role}</p>
    </div>
  </div>

<div className="space-y-3">
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">Tasks Progress:</span>
    <span>{percentage}%</span>
  </div>
  
  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
 
    <TaskProgressBar progress={percentage}/>

 </div>

</div>
    </motion.div>   
  
  </div>    
 

  {
    
    editOrDelete == 'delete' &&
    <DeleteUserModal 
    user={member} isOpen={deleteIsModalOpen} 
    onClose={()=>setDeleteIsModalOpen(false)} onDelete={deleteUserFunction}/> 
  }  
  {  

      memberFull && !editOrDelete ?  
      <UserModal   
        member={memberFull}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        setIsModalOpen={setIsModalOpen}
  // @ts-ignore
        logo={logoFilter}/>
    : ''
  } 
    </>
  );
};

export default AdminModal;