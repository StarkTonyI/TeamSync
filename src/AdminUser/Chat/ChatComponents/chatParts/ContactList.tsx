
import { CommunicationItem } from "../../../adminOrUserComponents/MetricCards";
import { AnimatePresence, motion } from "framer-motion";
interface ContactsListProps {
    onSelectContact: (contactId:string, contact:string, status:string, image:string) => void;
    offlinePeople: { [key: string]: { name: string; status: string } };
    onlinePeople:{ [key: string]: string },
    usersLogo:[{ _id:string, imageUrl:string }]
    signal:boolean
  }
export default function ContactList( { onSelectContact, offlinePeople, usersLogo, signal }:ContactsListProps ){



const variants = {
  hidden: (isEven:any) => ({
    opacity: 0,
    x: isEven ? -300 : 300,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
  exit: (isEven:any) => ({
    opacity: 0,
    x: isEven ? -300 : 300,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  }),
};


//<AvatarFallback className="bg-slate-700 text-cyan-500">{sender.charAt(0)}</AvatarFallback>
return (
<AnimatePresence mode="popLayout">
  {!signal &&
    Object.keys(offlinePeople).map((contact, index) => {
      const isEven = index % 2 === 0;
      const sender =  offlinePeople[contact];
      const avatar =
        usersLogo?.find((i) => i._id === contact)?.imageUrl ||
        '';

      return (
        <motion.div
          key={contact}
          custom={isEven}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
        >
          <CommunicationItem
            sender={sender}
            contactId={contact}
            onSelectContact={onSelectContact}
            avatar={avatar}
            unread
          />
        </motion.div>
      );
    })}
</AnimatePresence>

)
}