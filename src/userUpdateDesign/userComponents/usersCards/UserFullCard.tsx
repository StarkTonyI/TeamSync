
import  { useState } from "react";
import { UsersGrid } from "./usersCardsItems/UsersGrid";
import UserDetailModal  from "./usersCardsItems/TaskModal";
import { logoType, userTypeInterface } from "../../../types/TaskType";
import { useGetUserMutation } from "../../../redux/adminCommandApi/AdminCommandApi";
const UserFullCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberFull, setMemberFull] = useState<userTypeInterface | null>(null)
  const [user] = useGetUserMutation();
  
  const openModal = async (member: userTypeInterface, logo:logoType[]) => {

    const { data } = await user(member?.id);
    setMemberFull({...data, logo});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
   // setTimeout(() => setSelectedUser(null), 300);
  };


  return (
      <>
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
