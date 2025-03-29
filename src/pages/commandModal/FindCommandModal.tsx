
import { useState } from 'react';
import { Button } from '../../uiCompoents/ui/button';
import TeamModal from './components/TeamModal';
import { ChevronRight } from 'lucide-react';

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
  commandList:CommandListType
}
/*
<div className="min-h-screen flex flex-col items-center justify-center -ml-[20px] mb-[15px] lg:p-8">
      <div className="pt-4 animate-slide-up" style={{ animationDelay: '500ms' }}>
*/
const CommandModalSearch = ({ commandList }:CommandType ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
      <div>
    
          <Button
            onClick={() => setIsModalOpen(true)}
            className="px-2 py-2 text-base bg-gradient-to-r from-primary to-primary/80
             hover:from-primary/90 hover:to-primary/70 border-0 rounded-xl transition-all duration-300 
             ease-out hover:scale-[1.02] button-glow group"
          >
            Find a Team
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        
     { commandList && <TeamModal isOpen={isModalOpen} onClose={() => 
     // @ts-ignore
     setIsModalOpen(false)} commandList={commandList}/>  } 
      
      </div>  
  );
};

export default CommandModalSearch;