// @ts-nocheck
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { ContactList } from "./chat/ContactList";
import { ChatHeader } from "./chat/ChatHeader";
import  MessageList  from "./chat/MessageList";
import { MessageInput } from "./chat/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { addMessage,fetchMessages, selectLoading, selectMessages } from "../../redux/reduxSlice/messageSlice";
import { useFetchUsersLogoMutation } from "../../redux/adminCommandApi/AdminCommandApi";
import { useGetAdminDataQuery, useGetUserCommandQuery } from "../../redux/userCommandApi/UserCommandApi";
import { fetchPeopleList, selectOfflinePeople, selectOnlinePeople, showOnlinePeople } from "../../redux/onlineOfflinePeople/onlineOfflinePeople";
import { AppDispatch } from "../../redux/store";
import { UserContext } from "../../userContext/userContext";
import { connectToWs, ws } from "../../features/wsServer/wsServer";
import MobileChat from "../../mobileChat/mobileChat";
import '../UserPage/UserPage.css';


interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}


interface fileStyle { 
  name: any; 
  data: string | ArrayBuffer | null; }

export interface Contact {
  id: string;
  name: string;
  status: "online" | "offline";
}
interface ChatPage {
  chatOpen:{
    signal:boolean,
    id:string
  };
  setChatOpen:Dispatch<SetStateAction<{ signal: boolean; id: string; }>>
}

interface setSelectedContact {
  contactName:string,
  contactId:string,
  status:string
}
export interface DeleteMessageArgs {
  message: [{
      message: string;
      sender: string;
      id: string | undefined;
  }]
}

export function NewChat({ chatOpen, setChatOpen }:ChatPage) {
 
  const [deleteMessageSignal, setDeleteMessageSignal] = useState<boolean>(false);
  const messages = useSelector(selectMessages);
  const loading = useSelector(selectLoading)
  const [usersLogo, setUsersLogo] = useState();
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [fetchUsersLogo] = useFetchUsersLogoMutation();
  const [selectedContact, setSelectedContact] = useState<setSelectedContact>({
    contactName: '', 
    contactId: '', 
    status: '' 
  });
  
  const isoDate = new Date().toISOString();

  const { id } = useContext(UserContext) ?? {};
  const { data:adminData  } = useGetAdminDataQuery({});
  const { data: userCommand } = useGetUserCommandQuery({}) || []; 

  const onlinePeopleArray = useSelector(selectOnlinePeople);
  const offlinePeopleArray = useSelector(selectOfflinePeople);
  const dispatch:AppDispatch  = useDispatch();
  const onlinePeopleExclOurUser = { ...onlinePeopleArray }; 
  if(id) delete onlinePeopleExclOurUser[id]; 
  Object.keys(onlinePeopleArray).forEach(id => delete offlinePeopleArray[id]);
  const offlinePeopleExclOurUser = { ...offlinePeopleArray };

  useEffect(() => {
    connectToWs(handleMessage);
  }, []);

  const sendFile = async (ev) => {
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: ev.target.files[0].name,
        data: reader.result,
      });
    };   
  }
  const isEmpty = (obj) => Object.keys(obj).length > 0;

  function handleMessage(message: MessageEvent) {
    const messageData: Message = JSON.parse(message.data);
    if ('online' in messageData) {
      dispatch(showOnlinePeople(messageData))
    } else if ('messageText' in messageData) {
      dispatch(addMessage(messageData));
    }
  }

  const generateObjectId = () =>
    Array.from(crypto.getRandomValues(new Uint8Array(12)))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  

  const sendMessage = async(messageText:string | null, file:fileStyle | null = null  ) => {
    
    const idObject = generateObjectId();

    const messageObj: Message = {
      messageText: messageText || null,
      sender: id || '',
      recipient: selectedContact.contactId,
      _id: idObject,
      file,
      createdAt:isoDate,
      deleteNotMy:[] 
    };

    if(file){
      dispatch(addMessage(messageObj));
    }else {
    dispatch(addMessage(messageObj));
    }
    ws.send(JSON.stringify(messageObj));
  };




  useEffect(() => {
    if(id && userCommand) {
      const listCommandData = [ ...userCommand.users, { ...adminData } ]
        dispatch(fetchPeopleList({ listCommandData, id }));
  }
}, [userCommand, id, adminData]);

  useEffect(()=>{
   async function fetchUsersLogoFunction(){
    if(isEmpty(onlinePeopleArray) && isEmpty(offlinePeopleArray)){
      const usersLogoList = { ...onlinePeopleArray, ...offlinePeopleArray };
      const userLogo = await fetchUsersLogo(usersLogoList).unwrap();
      setUsersLogo(userLogo);
    }
  }
    fetchUsersLogoFunction()
  }, [onlinePeopleArray, offlinePeopleArray, fetchUsersLogo]);

  const openCloseChat = () => {
    if (selectedContact.contactId) {
      if(chatOpen.id !== selectedContact.contactId){
        setChatOpen({ signal:true, id:selectedContact.contactId });
        dispatch(fetchMessages({ selectedUserId:selectedContact.contactId }));
      }else{
        setChatOpen({ signal:false, id:'' })
      }
  }
}

  useEffect(() => {
    openCloseChat();
  }, [selectedContact.contactId]);

  function selectedContactData(contact:string, contactName:string, status:string){
    setSelectedContact({ contactId:contact, contactName, status }) 
    openCloseChat()  
    setIsContactsOpen(false);
}
  const onClickHandler = useCallback(() => {
  setDeleteMessageSignal(prev => !prev);
}, []);

return (
    <>
  <div className={ ` mobile-chat-user `}>
    
    <MobileChat    
      onSelectContact={selectedContactData} 
      usersLogo={usersLogo}
      offlinePeople={offlinePeopleExclOurUser}
      onlinePeople={onlinePeopleExclOurUser}
      isContactsOpen={isContactsOpen}
      setIsContactsOpen={setIsContactsOpen}
      chatOpen={chatOpen.signal}
    /> 

  </div>
  
    <div className={`flex flex-1 g-chat-dark 
      text-white animate-fade-in  ${ (chatOpen.signal) && 'w-full' }`}>
    <ContactList
            onSelectContact={selectedContactData} 
            usersLogo={usersLogo}
            offlinePeople={offlinePeopleExclOurUser}
            onlinePeople={onlinePeopleExclOurUser}
    />

    { (chatOpen.signal && !loading) && (
      <div className="flex flex-col w-full max-h-[100vh] overflow-x-hidden">
          <ChatHeader  name={selectedContact.contactName} 
          onClick={onClickHandler}
          status={selectedContact.status} />

        <MessageList messages={messages} deleteMessageSignal={deleteMessageSignal} 
          selectedContact={selectedContact.contactId} selectedContactName={selectedContact.contactName} setDeleteMessageSignal={setDeleteMessageSignal}/>
          
          <MessageInput sendFile={sendFile}
          sendMessage={sendMessage} />
        
      </div>  
    )}

    </div> 
    </>

 
  );
}
