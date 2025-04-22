import '../UserPage/UserPage.css';
import { cn } from '../../uiCompoents/lib/utils';
import userPage from '../../images/user.png'
import { Contact } from '../../types/TaskType';

interface ContactProps {
  contact: string;
  onClick: (contact:Contact) => void;
  status: "online" | "offline";
  contactId:string
}

export default function ContactPerson({ contact, onClick, status, contactId }: ContactProps) {

return (
    <button
    onClick={() => onClick({ id:contactId, name:contact, status:status })}
    className="border border-white w-full p-4 flex items-center gap-3 
      hover:bg-secondary transition-colors duration-200"
 
  >
<div className="relative">
      <img
        src={userPage}
        className="w-[60px] h-[60px] rounded-full bg-muted"
      />
      <div
        className={cn(
          "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
          status === "online" && "bg-green-500",
          status === "offline" && "red"
        )}
      />
    </div> 
    <div className="flex-1 text-left">
      <h3 className="font-medium text-xl white">{contact}</h3>
      <p className="text-xs text-muted-foreground">
        {"online" === "online" ? "Active now" : "Last seen recently"}
      </p>
    </div>
</button>
  );
}