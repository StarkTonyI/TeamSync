import '../../UserPage/UserPage.css'
import ChatContactContent from "./chatContactData";

interface ContactsListProps {
  onSelectContact: (contactId:string, contact:string, status:string) => void;
  offlinePeople: { [key: string]: string };
  onlinePeople:{ [key: string]: string },
  usersLogo:[{ _id:string, imageUrl:string }]
}

export function ContactList({ onSelectContact, offlinePeople, onlinePeople, usersLogo }: ContactsListProps) {

return (
  <div className={`correct-chat-width remove-pc-chat min-h-screen bg-chat-darker border-r border-white/10`}>
    <div className="p-4 border-b border-white/10">
      <h2 className="text-xl font-semibold text-white">Messages</h2>
    </div>
    <div className="overflow-y-auto h-[calc(100%-4rem)]">
                    {
                      Object.keys(onlinePeople).map((contact) => ( 
                        <ChatContactContent 
                          key={contact}
                          onClick={onSelectContact} 
                          status="online" 
                          contactId={contact}  
                          contact={onlinePeople[contact]} 
                          logo={usersLogo?.filter(i => i._id == contact)}
                        />
                       ))
                      }       
                        
                      {
                      Object.keys(offlinePeople).map((contact) => ( 
                        <ChatContactContent onClick={onSelectContact} status="offline" 
                          key={contact}
                          contactId={contact} 
                          contact={offlinePeople[contact]} 
                          logo={usersLogo?.filter(i => i._id == contact)} 
                        /> 
                  ))   
              }
    </div>
  </div>
);

}
 