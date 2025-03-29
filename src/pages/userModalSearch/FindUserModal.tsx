import { useEffect, useState } from 'react';
import UserFindModal from './components/UserFindModal';


export interface UsersListType {
  _id: string;
  username: string;
  lastname: string;
  role: string;
  description:string;
  imageUrl:string;
}

 interface CommandType {
  usersList:UsersListType;
  openUserSearch:boolean;
}

const UserModalSearch = ({ usersList, openUserSearch }:CommandType ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  useEffect(()=>{
    if(openUserSearch) setIsModalOpen(true);
  }, [openUserSearch]);

  return (
    <div >
    { usersList && <UserFindModal isOpen={isModalOpen} 
    // @ts-ignore
    onClose={()=>setIsModalOpen(false)} usersList={usersList}/>  } 

    </div>

  );
};

export default UserModalSearch;