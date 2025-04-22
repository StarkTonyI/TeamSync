
import { Dispatch, SetStateAction } from 'react';
import TeamModal from './components/TeamModal';

export interface CommandListType {
  admin: string;
  commandDescription: string;
  commandMemberNumber: string;
  commandName: string;
  commandTask: string;
  notification: []
  users: [];
  _id: string;
  file:string
}

 interface CommandType {
  commandList:CommandListType;
  commandModal:boolean;
  setCommandModal:Dispatch<SetStateAction<boolean>>;
}

const CommandModalSearch = ({ commandList, commandModal, setCommandModal }:CommandType ) => {
  return (
      <div>
     { commandList && <TeamModal type={'admin'} isOpen={commandModal} onClose={() => 
     // @ts-ignore
     setCommandModal(false)} commandList={commandList}/>  } 
      
      </div>  
  );
};

export default CommandModalSearch;