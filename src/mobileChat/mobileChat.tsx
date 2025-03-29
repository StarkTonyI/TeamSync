
import { SetStateAction } from "react";
import FloatingChatButton from "./chat/FloatingChatButton";
import ContactsList from "./chat/ContactsList";
import { cn } from "../uiCompoents/lib/utils";


interface MobileChatType {
  onSelectContact: (contactId:string, contact:string, status:string) => void;
  offlinePeople: { [key: string]: string };
  onlinePeople:{ [key: string]: string },
  usersLogo:[{ _id:string, imageUrl:string }]
  isContactsOpen:boolean,
  setIsContactsOpen: React.Dispatch<SetStateAction<boolean>>,
  chatOpen:boolean
}
const MobileChat = ({ 
  onSelectContact, offlinePeople, onlinePeople, usersLogo,
  isContactsOpen, setIsContactsOpen, chatOpen }: MobileChatType) => {

  

  return (<>
    <FloatingChatButton 
    chatOpen={chatOpen}
    
    onClick={() =>{ 
      !isContactsOpen && setIsContactsOpen(true)
      isContactsOpen && setIsContactsOpen(false)
    
    } 
  } 
    
      />

    <div
      className={cn(
"fixed inset-x-0 bottom-0 z-[1000] transform transition-transform overflow-hidden duration-300 ease-in-out",
        isContactsOpen ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-gray-900/95 backdrop-blur-lg border border-gray-800 rounded-t-2xl max-h-[80vh] overflow-hidden">
       
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Contacts</h2>
            <button
              onClick={()=>setIsContactsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>

   
                  {
                       Object.keys(onlinePeople).map((contact) => ( 
                       <ContactsList onClick={onSelectContact} status="online" 
                        contactId={contact}  contact={onlinePeople[contact]} 
                        key={contact}
                        // @ts-ignore
                        logo={usersLogo}
                       /> ))
                }
                {
                       Object.keys(offlinePeople).map((contact) => ( 
                       <ContactsList onClick={onSelectContact} status="offline" 
                       contactId={contact}
                       contact={offlinePeople[contact]} key={contact}
                       // @ts-ignore
                       logo={usersLogo}

                       /> ))   
                }

        </div>
    </div>

        

  </>
     
 
  );
};

export default MobileChat;
