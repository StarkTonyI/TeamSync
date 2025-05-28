
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { makeDelay } from '../../../adminOrUserFeatures/animationFeatures';
import { UserContext } from '../../../../userContext/userContext';
import { AppDispatch } from '../../../../redux/store';
import { useDispatch } from 'react-redux';
import DeleteMessageModal from '../../../../features/deleteModal/deleteModal';
import { setSelectedContact } from '../../ChatLog';
import { deleteMessageAsync } from '../../../../redux/reduxSlice/messageSlice';
import getBaseUrl from '../../../../features/getBaseUrl';

interface Message { 
  _id: string;
  messageText: string;
  sender: string;
  recipient: string;
  file:null | string;
}

interface MessagesListProps {
  messages: Message[];
  addedMessage:boolean;
  signal:boolean;
  deleteMessageSignal: boolean | null;
  setDeleteMessageSignal:Dispatch<SetStateAction<boolean | null>>
  selectedContact:setSelectedContact
}

const MessagesList = ({ messages,addedMessage, signal, deleteMessageSignal, setDeleteMessageSignal, selectedContact }: MessagesListProps) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  const { id } = useContext(UserContext) || {};
  useEffect(() => {
    // Scroll to bottom of messages
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const dispatch: AppDispatch = useDispatch();
  
  const [deleteSignal, setDeleteSignal] = useState<boolean | null>(null);
  const [deleteMessageList, setDeleteMessageList] = useState<{ id: string, sender:string }[]>([]);
  
  
  useEffect(() => {
    if(deleteMessageSignal) {
      //dispatch(fetchMessages({ selectedUserId:selectedContact }));
      setDeleteSignal(false);
    }if(deleteSignal == false) {
      setDeleteSignal(true)
    }
  }, [deleteMessageSignal]);

    function DeleteMessage(forAllOrNo:boolean){
      setDeleteMessageSignal(null);
      setDeleteSignal(null);
      if (deleteMessageList.length > 0) {
        //@ts-ignore
        dispatch(deleteMessageAsync({ messageDeleteArray: deleteMessageList, status:forAllOrNo }));
      }
      setDeleteMessageList([]);
    }

  const deleteOptionMessage = (id: string, sender:string) => {
    setDeleteMessageList(prev => [...prev, { id, sender }]);
  }

  return (
  <div className="flex-1 mt-2 overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[400px]">
    {messages.map((message) => (
      <motion.div
        key={message._id}
        initial={{ opacity: 0, x: message.sender !== id ? -300 : 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{
          duration: addedMessage ? 0 : 0.8,
          ease: "easeOut",
          delay: addedMessage ? 0 : makeDelay('messages', signal),
        }}
      >


        <div key={message._id} className={`flex ${ message.sender == id ? "justify-end" : "justify-start" }`}>
          <div className={`flex max-w-[70%] gap-[3px] ${message.sender == id  ? 'flex-row-reverse' : ''} `}>  
     

          <div className={`flex w-full ${message.sender == id  ? 'flex-row-reverse' : ''} `}>
          
            <div
              className={`p-3 rounded-2xl ${
                message.sender == id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
              }`}
            >
              <p>{message.messageText}</p>
                    {message?.file && (
                      <div>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 border-b"
                          href={getBaseUrl() + "/uploads/" + message.file}
                        >
                          Файл
                        </a>
                      </div>
                    )}
            </div>
           
        
          { deleteMessageSignal && (
      <div
        className="dark:bg-black/10 m-[10px]"
        onClick={() => deleteOptionMessage(message._id, message.sender)}
      >
        <label className="text-white">
          <input
            className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 
            ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-8 h-8"
            type="checkbox"
          />
        </label>
      </div>
          )}

          </div>
         </div>
      
     
       
        </div>



      </motion.div>
      ))}
      <div ref={endOfMessagesRef}></div>
  
       <DeleteMessageModal
          isOpen={deleteSignal}
          onClose={() => {
            setDeleteMessageSignal(null);
            setDeleteSignal(null);
            setDeleteMessageList([]);
          }}
          // @ts-ignore
          messages={deleteMessageList}
          onDelete={DeleteMessage}
          recipientName={selectedContact.contactName}
          />
  </div>
  );
};

export default MessagesList;