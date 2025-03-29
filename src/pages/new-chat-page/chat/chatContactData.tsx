import { useEffect, useState } from 'react';
import userPng from '../../../images/user.png'
import { useGetProfileQuery } from '../../../redux/authApi/authApi';
import { useGetLastMessageChatQuery } from '../../../redux/messageApi/messageApi';
import formatDate, { getLatestItem, MessageFilter } from '../../../features/dateFormat/dateFormat';
import { useSelector } from 'react-redux';
import { selectMessages } from '../../../redux/reduxSlice/messageSlice';
import { logoType } from '../../../types/TaskType';
interface ContactProps {
  contact: string;
  onClick: (contactId:string, contact:string, status:string) => void;
  status: "online" | "offline";
  contactId:string,
  logo:logoType[]
}
// selectedContactId === contact.id ? : ""
export default function ChatContactContent({ contact, onClick, status, contactId, logo  }:ContactProps){
  const messages = useSelector(selectMessages);
  interface LastMessage {
    lastMessage?: string;
    messageText?: string;
    createdAt?: string;
    file?: boolean;
  }
  
  const [lastMessage, setLastMessage] = useState<LastMessage | null>(null);
  const { data:profile } = useGetProfileQuery({});
  const { data, refetch } = useGetLastMessageChatQuery({});

  useEffect(() => {
    if (data && profile?.id || messages) {

      const filteredMessage = MessageFilter(contactId, profile?.id, data);
      //console.log(filteredMessage);
      if(messages.length && contactId){
        const correctMessageUser = (
          messages[0].recipient === contactId || messages[0].sender === contactId
        );
        
        console.log(typeof contactId, typeof messages[0].recipient, typeof messages[0].sender);

        if(correctMessageUser){
          setLastMessage(getLatestItem(messages))
        }    
      } else{
          // @ts-ignore
          const filteredData = filteredMessage?.filter(user => 
            user.deleteNotMy.length === 0 || 
            // @ts-ignore
            !user.deleteNotMy.some(msg => msg.id === profile?.id)
          );
          setLastMessage(getLatestItem(filteredData));
        }      
  }
}, [profile, data, messages]);


  return <div
    key={contact}
    onClick={()=>{
      refetch()
      onClick(contactId, contact, status)}} className={`p-4 cursor-pointer transition-colors hover:bg-chat-lighter/30 ${ "bg-chat-lighter/50" }`}>

  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-chat-lighter flex items-center justify-center">
        <img src={ logo && logo[0]?.imageUrl || userPng } alt="userLogo" />
      </div>

    {
      status === 'online' ? (
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full 
      border-2 border-chat-darker" />)
      :  (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full 
        border-2 border-chat-darker" />)
    }
    </div>

  <div className="flex-1 min-w-0">
    <div className="flex justify-between items-center mb-1">
      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl truncate">{contact}</h3>
      <span className="text-xs text-white/50">{ formatDate(lastMessage?.createdAt || '') }</span>
    </div>
      <p className="text-sm text-white/70 truncate">
    { 
        !lastMessage?.file ? 
        lastMessage?.lastMessage || lastMessage?.messageText ? 
        lastMessage.lastMessage || lastMessage?.messageText : 'No message' 
        : 'File'
    }
  

      </p>
  </div>
</div>

</div>  
  

} 