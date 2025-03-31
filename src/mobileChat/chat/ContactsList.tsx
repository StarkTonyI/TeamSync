
import { useEffect, useState } from "react";
import { Avatar } from "../../uiCompoents/ui/avatar";
import { ScrollArea } from "../../uiCompoents/ui/scroll-area";
import { cn } from "../../uiCompoents/lib/utils";
import userPng from '../../images/user.png'
import { useGetProfileQuery } from "../../redux/authApi/authApi";
import { useGetLastMessageChatQuery } from "../../redux/messageApi/messageApi";
import formatDate, { getLatestItem, MessageFilter } from "../../features/dateFormat/dateFormat";
import { selectMessages } from "../../redux/reduxSlice/messageSlice";
import { useSelector } from "react-redux";
export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  online: boolean;
}

interface ContactsListProps {
    contact: string;
    onClick: (contactId:string, contact:string, status:string) => void;
    status: "online" | "offline";
    contactId:string,
    logo:[{ id:string, imageUrl:string }],
    key:string
  
}

const ContactsList = ({ contact, onClick, status, contactId, logo }: ContactsListProps) => {

  const messages = useSelector(selectMessages);  
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  interface LastMessage {
    lastMessage?: string;
    messageText?: string;
    createdAt?: string;
  }
  
  const [lastMessage, setLastMessage] = useState<LastMessage>({});
  const { data:profile } = useGetProfileQuery({});
  const { data, refetch } = useGetLastMessageChatQuery({});

  function truncateText(text:any) {
    if (text?.length <= 10) return text;
    return text?.slice(0, 10) + '...';
}

useEffect(() => {
  if (data && profile?.id || messages) {
    const filteredMessage = MessageFilter(contactId, profile?.id, data);
    if(messages.length){
      const correctMessageUser = (messages[0].recipient || messages[0].sender) == contactId;
        if(correctMessageUser){
          setLastMessage(getLatestItem(messages))
        }
    } else {
      // @ts-ignore
        const filteredData =  filteredMessage?.filter(user => 
          user.deleteNotMy.length === 0 || 
          // @ts-ignore
          !user.deleteNotMy.some(msg => msg.id === profile?.id)
        );
        setLastMessage(getLatestItem(filteredData));
    }      
  }
}, [profile, data, messages]);

 

  return (
    <ScrollArea className="max-h-[80vh] overflow-y-auto">

    <div className="p-2">
        <button
           className={cn(
            "w-full flex items-center gap-3 p-3 rounded-lg transition-colors",
            "hover:bg-gray-800/50",
            selectedContact === contactId && "bg-gray-800/75"
          )}
          onClick={()=> {
            refetch()
            onClick(contactId, contact, status)
            setSelectedContact(contactId)
          }}
        >
          <div className="relative">
            <Avatar className="h-12 w-12">
              <img
                src={logo && (logo[0]?.imageUrl ? logo[0].imageUrl : userPng)}
                alt={contact}
                className="rounded-full h-12 w-12 object-cover"
              />
            </Avatar>
            {status == 'online' && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2
               border-gray-900" />
            )}
          </div>
          <div className="flex-1 text-left">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl">{contact}</p>
            <p className="text-sm text-gray-400 truncate">
            { lastMessage?.lastMessage &&  truncateText(lastMessage?.lastMessage)}
            { lastMessage?.messageText && truncateText(lastMessage?.messageText)}
          
            </p>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl">{ formatDate(lastMessage?.createdAt || '') }</p>
        </button>

    </div>       
    </ScrollArea>
     );
};

export default ContactsList;