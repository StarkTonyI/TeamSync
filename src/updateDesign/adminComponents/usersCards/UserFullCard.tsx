
import  { useState } from "react";
import { UsersGrid } from "./usersCardsItems/UsersGrid";
import UserDetailModal  from "./usersCardsItems/TaskModal";
import { logoType, userTypeInterface } from "../../../types/TaskType";
import { useGetUserMutation } from "../../../redux/adminCommandApi/AdminCommandApi";
import { useDeleteUserMutation } from "../../../redux/adminApi/adminApi";
import DeleteUserModal from "../../../features/deleteUserModal/DeleteUserModal";

interface UserFullCardType {
  editOrDelete:string;
}

const UserFullCard = ({ editOrDelete }:UserFullCardType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIsModalOpen, setDeleteIsModalOpen] = useState(false);
  const [memberFull, setMemberFull] = useState<userTypeInterface | null>(null)
  const [user] = useGetUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  
  const openModal = async (member: userTypeInterface, logo:logoType[]) => {
    const { data } = await user(member?.id);
    setMemberFull({...data, logo});
    if(editOrDelete == 'delete') setDeleteIsModalOpen(true);
    if(!editOrDelete) setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
   // setTimeout(() => setSelectedUser(null), 300);
  };




  const deleteUserFunction = async(id:string) =>{
    try{
      await deleteUser(id);
     // window.location.reload();
    }catch(err){
      console.log('Error' + err);
    }
  }

  return (
      <>
  {
    editOrDelete == 'delete' &&
    <DeleteUserModal 
    user={memberFull} isOpen={deleteIsModalOpen} 
    onClose={()=>setDeleteIsModalOpen(false)} onDelete={deleteUserFunction}/> 
  }  

        <UsersGrid onUserClick={openModal} />
  
        <UserDetailModal
          user={memberFull}
          isOpen={isModalOpen}
          onClose={closeModal}
        />   
      </>
   
 
  );
};

export default UserFullCard;
