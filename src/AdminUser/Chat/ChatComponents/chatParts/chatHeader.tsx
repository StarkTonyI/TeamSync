import { ArrowLeft, Trash2Icon } from 'lucide-react';
import { setSelectedContact } from '../../ChatLog';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../uiCompoents/ui/avatar';
interface ChatHeaderProps {
  user: setSelectedContact;
  onClick:(info:string)=>void;
}

const ChatHeader = ({ user, onClick }: ChatHeaderProps) => {



return   <div className="">
          
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-br from-gray-800 to-gray-900">
              
              <div className="flex items-center">
             
                <button onClick={()=>onClick('exit')}>
                  <ArrowLeft className="mr-2" />
                </button>
           
                <Avatar className="h-10 w-10 mr-3">
                
                { user.image ? (
                  <AvatarImage
                    src={user.image}
                    alt="User"/>  
                ) : (
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">
                    US
                  </AvatarFallback>
                ) }
                
              
                </Avatar>
           
              <div>
                <h2 className="text-white font-semibold">{user.contactName}</h2>
                <p className={`${ user.status === 'online' ? 'text-green-400' : 'text-red-400' }  text-xs`}>{user.status}</p>
              </div>     
              </div> 
          
              <Trash2Icon onClick={()=>onClick('delete')} className="text-red-500 hover:text-red-800 w-8 h-8"/>

            </div>
          
            

          </div>
};

export default ChatHeader;