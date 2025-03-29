import defaultUser from '../../images/user.png'
import { Contact } from '../../pages/new-chat-page/Chat';


interface ContactProps {
  contact: string;
  onClick: (contact:Contact) => void;
  status: "online" | "offline";
  contactId:string,
  logo:[{ id:string, imageUrl:string }]
}

export default function ChatContact({ contact, onClick, status, contactId, logo  }:ContactProps){

    return  <div
    onClick={() => onClick({ id:contactId, name:contact, status:status,  })}
    key={contactId}
    className="px-6 py-6 border border-b-gray-500 hover:bg-white/5 
    transition-colors cursor-pointer group"
  >
    <div className="flex items-start gap-3">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center">
            <img src={ logo && (logo[0]?.imageUrl ? logo[0]?.imageUrl : defaultUser) } alt="userImage" />
        </div>
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
            status === "online" ? "bg-green-500" : "bg-gray-500"
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="whiteflex justify-between items-start">
          <h3 className="font-medium truncate">{contact}</h3>
        </div>
        <p className="text-sm text-gray-400 truncate">Some last nessage</p>
      </div>
    </div>
  </div>


}