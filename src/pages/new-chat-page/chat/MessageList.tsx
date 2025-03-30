import { Dispatch, SetStateAction, useEffect, useState } from "react";
import getBaseUrl from "../../../features/getBaseUrl";
import '../../UserPage/UserPage.css'
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { deleteMessageAsync } from "../../../redux/reduxSlice/messageSlice";
import DeleteMessageModal from "../../../features/deleteModal/deleteModal";

interface Message {
  _id: string;
  messageText: string;
  sender: string;
  timestamp: string;
  file:string;
  deleteNotMy:[{ id:string }]
}

interface MessageListProps {
  messages: Message[];
  selectedContact: string;
  deleteMessageSignal: boolean;
  setDeleteMessageSignal:Dispatch<SetStateAction<boolean | null>>
  selectedContactName:string
}

export default function MessageList({ 
  messages, selectedContact, deleteMessageSignal, setDeleteMessageSignal, selectedContactName
}:MessageListProps) {
 
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
        // @ts-ignore
        dispatch(deleteMessageAsync({ messageDeleteArray: deleteMessageList, status:forAllOrNo }));
      }
      setDeleteMessageList([]);
    }

  const deleteOptionMessage = (id: string, sender:string) => {
    setDeleteMessageList(prev => [...prev, { id, sender }]);
  }

return (
  <div className="flex-1  overflow-y-auto p-6 space-y-4 text-base sm:text-lg md:text-xl">
   
   {messages.map((message) => (
  <div
    key={message._id}
    className={`flex items-center gap-2 break-words ${
      message.sender !== selectedContact ? "justify-end" : "justify-start"
    }`}
  >
    {/* Если отправитель - выбранный контакт, чекбокс слева, иначе справа */}
    {deleteMessageSignal && message.sender === selectedContact && (
      <div
        className="dark:bg-black/10 m-[10px]"
        onClick={() => deleteOptionMessage(message._id, message.sender)}
      >
        <label className="text-white">
          <input
            className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 
            ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-9 h-9"
            type="checkbox"
          />
        </label>
      </div>
    )}

    {/* Само сообщение */}
    <div
      className={`message-bubble ${
        message.sender !== selectedContact
          ? "bg-chat-accent text-white"
          : "bg-chat-message-bg text-white/90"
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
      <span className="text-xs opacity-50 mt-1 block">{message.timestamp}</span>
    </div>

    {/* Если отправитель - не выбранный контакт, чекбокс справа */}
    {deleteMessageSignal && message.sender !== selectedContact && (
      <div
        className="dark:bg-black/10 m-[10px]"
        onClick={() => deleteOptionMessage(message._id, message.sender)}
      >
        <label className="text-white">
          <input
            className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 
            ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-9 h-9"
            type="checkbox"
          />
        </label>
      </div>
    )}
  </div>
))}





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
        recipientName={selectedContactName}
        />

  </div>
);
}