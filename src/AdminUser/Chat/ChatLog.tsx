// @ts-nocheck
import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../uiCompoents/ui/card";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchMessages, selectMessages } from "../../redux/reduxSlice/messageSlice";
import { useFetchUsersLogoMutation } from "../../redux/adminCommandApi/AdminCommandApi";
import { UserContext } from "../../userContext/userContext";
import { useGetAdminDataQuery, useGetUserCommandQuery } from "../../redux/userCommandApi/UserCommandApi";
import { fetchPeopleList, selectOfflinePeople, selectOnlinePeople, showOnlinePeople } from "../../redux/onlineOfflinePeople/onlineOfflinePeople";
import { AppDispatch } from "../../redux/store";
import { connectToWs, ws } from "../../features/wsServer/wsServer";
import ContactList from "./ChatComponents/chatParts/ContactList";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import ChatHeader from "./ChatComponents/chatParts/chatHeader";
import MessagesList from "./ChatComponents/chatParts/messagesList";
import { makeDelay } from "../adminOrUserFeatures/animationFeatures";
import MessagesInput from "./ChatComponents/chatParts/messagesInput";
import dayjs from "dayjs";

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

export interface setSelectedContact {
  contactName:string,
  contactId:string,
  status:string,
  image:string
}
export interface DeleteMessageArgs {
  message: [{
      message: string;
      sender: string;
      id: string | undefined;
  }]
}


export default function AdminChat(){
    const [hidden, setHidden] = useState(false);
    const [deleteMessageSignal, setDeleteMessageSignal] = useState<boolean | null>(null);
    const messages = useSelector(selectMessages);
    const [usersLogo, setUsersLogo] = useState();
    const [fetchUsersLogo] = useFetchUsersLogoMutation();
    const controls = useAnimation();
    const [addedMessage, setAddedMessage] = useState(false);
    const [selectedContact, setSelectedContact] = useState<setSelectedContact>({
       contactName: '', 
       contactId: '', 
       status: '',
       image:'' 
     });
     const [chatOpen, setChatOpen] = useState({
      signal:false,
      id:''
    });

     const isoDate = dayjs().toDate()
     const { id } = useContext(UserContext) ?? {};
     const { data:adminData  } = useGetAdminDataQuery({});
     const { data: userCommand } = useGetUserCommandQuery({}) || []; 
    const bottomRef = useRef<HTMLDivElement>(null);
     const onlinePeopleArray = useSelector(selectOnlinePeople);
     const offlinePeopleArray = useSelector(selectOfflinePeople);

     const dispatch:AppDispatch  = useDispatch(); 
     const onlinePeopleExclOurUser = { ...onlinePeopleArray }; 
     if(id) delete onlinePeopleExclOurUser[id]; 
     Object.keys(onlinePeopleArray).forEach(id => delete offlinePeopleArray[id]);

      const mergedPeople = {
        ...Object.fromEntries(
          Object.entries(offlinePeopleArray).map(([id, name]) => [
            id,
            { name, status: "offline" },
          ])
        ),
        ...Object.fromEntries(
          Object.entries(onlinePeopleExclOurUser).map(([id, name]) => [
            id,
            { name, status: "online" },
          ])
        ),
      };
       
     useEffect(() => {
       connectToWs(handleMessage);
     }, []);
   
     const sendFile = async (ev:any) => {
       const reader = new FileReader();
       reader.readAsDataURL(ev.target.files[0]);
       reader.onload = () => {
         sendMessage(null, {
           name: ev.target.files[0].name,
           data: reader.result,
         });
       };   
     }
     const isEmpty = (obj:any) => Object.keys(obj).length > 0;
   
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
     
const scrollToBottom = () => {
  
  bottomRef.current?.scrollIntoView({ 
    behavior: 'smooth',
  });
  document.body.style.overflow = "hidden";
  document.documentElement.style.scrollBehavior = 'smooth';
  setTimeout(() => {
    document.body.style.overflow = "auto";
  }, 1000); // 1000ms = 1 секунда

  };

  
   
     const sendMessage = async(messageText:string | null, file:fileStyle | null = null  ) => {
      setAddedMessage(true)
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
         if(isEmpty(onlinePeopleArray) || isEmpty(offlinePeopleArray)){
         const usersLogoList = { ...onlinePeopleArray, ...offlinePeopleArray };
         try {
           const userLogo = await fetchUsersLogo(usersLogoList).unwrap();
          
           setUsersLogo(userLogo);
         } catch (error) {
           console.error("Ошибка при получении логотипов:", error);
         }
         //setUsersLogo(usersLogo);
       }
     }
       fetchUsersLogoFunction()
     }, [onlinePeopleArray, offlinePeopleArray, fetchUsersLogo]);
   
    const openCloseChat = () => {
       if (selectedContact.contactId) {
         if(chatOpen.id !== selectedContact.contactId){
           setChatOpen({ signal:true, id:selectedContact.contactId });
            const timeout  = setTimeout(()=>setHidden(true), 600)
            dispatch(fetchMessages({ selectedUserId:selectedContact.contactId }));
            return () => clearTimeout(timeout);
          }else{
           setChatOpen({ signal:false, id:'' })
         }
     }
   }
     useEffect(() => {
       openCloseChat();
     }, [selectedContact.contactId]);
   
     function selectedContactData(contact:string, contactName:string, status:string, image:string){
  
       setSelectedContact({ contactId:contact, contactName, status, image }) 
       openCloseChat()  
       //setIsContactsOpen(false);
   }
   const onClickHandler = (param:string) =>{ 
    if(param == 'delete') setDeleteMessageSignal(prev => !prev)
    else if(param == 'exit') {
      setChatOpen({signal:false, id:''});
      setAddedMessage(false)
      setHidden(false);
    }
  };


   
   useEffect(() => {
    if (chatOpen.signal) {
      setTimeout(() => {
        controls.start({ x: -200, opacity: 0, transition: { duration: 1.5 } });
      }, 700); // подбираешь по вкусу
      setTimeout(()=>{
        scrollToBottom()
      }, 1000)
    } else {
      setAddedMessage(false)
      controls.start({ x: 0, opacity: 1 });
  }
}, [chatOpen]);
const peopleExist = Object.keys(mergedPeople).length === 0

//mergedPeople
console.log(mergedPeople);
return  (
<motion.div
  animate={{ height: chatOpen.signal ? 570 : 300 }}
  transition={{ 
    duration: 0.5, 
    ease: "easeInOut", 
    delay: makeDelay('high', chatOpen.signal),
  }}
>
  <Card className={`bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full
  `}>
   
    <motion.div
      initial={false}
      animate={{
        opacity: chatOpen.signal ? 0 : 1,
        x: chatOpen.signal ? -300 : 0,
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        display: hidden ? "none" : "block",
        pointerEvents: chatOpen.signal ? "none" : "auto",
      }}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-slate-100 flex items-center text-base">
          <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
          Communications Log
        </CardTitle>
  
      </CardHeader>

    </motion.div>

    {/* Chat Header */}
    <AnimatePresence>
      {chatOpen.signal && (
        <motion.div
          key="entrance"
          className="-mt-[12px]"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: makeDelay('header', chatOpen.signal),
          }}
        >
        
          <ChatHeader onClick={onClickHandler} user={selectedContact}/>

        </motion.div>
      )}
    </AnimatePresence>

    {/* Messages Section */}
    <AnimatePresence>
      {chatOpen.signal && (
        <MessagesList 
        messages={messages} addedMessage={addedMessage} signal={chatOpen.signal}
        deleteMessageSignal={deleteMessageSignal} setDeleteMessageSignal={setDeleteMessageSignal}
        selectedContact={selectedContact}
        />
      
      )}
       <div ref={bottomRef}></div>
    </AnimatePresence>
    {/* Contact List Section */}
    <CardContent>
      <ContactList
        offlinePeople={mergedPeople}
        usersLogo={usersLogo}
        onSelectContact={selectedContactData}
        signal={chatOpen.signal}
      />
    </CardContent>

    {/* Footer Section */}
    <AnimatePresence>
      {chatOpen.signal && (
        <motion.div
          key="entrance"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay:makeDelay('input', chatOpen.signal)
          }}
        >
          <MessagesInput sendFile={sendFile} sendMessage={sendMessage}/>

        </motion.div>
      )}
    </AnimatePresence>

  </Card>

</motion.div>
)
}