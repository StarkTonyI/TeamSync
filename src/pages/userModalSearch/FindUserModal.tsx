import { Dispatch, SetStateAction } from 'react';
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
  setOpenUserSearch:Dispatch<SetStateAction<boolean>>;
}

const UserModalSearch = ({ usersList, openUserSearch, setOpenUserSearch }:CommandType ) => {
  

  return (
    <div >
    { usersList && <UserFindModal  isOpen={openUserSearch} 
    // @ts-ignore
    onClose={()=>setOpenUserSearch(false)} usersList={usersList}/>  } 

    </div>

  );
};

export default UserModalSearch;