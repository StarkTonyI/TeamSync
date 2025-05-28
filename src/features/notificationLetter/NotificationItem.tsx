import { FC, useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import CheckBox from "../checkbox/checkBox";
import '../../pages/UserPage/UserPage.css'
interface NotificationItemProps {
  title: string;
  message: string;
  timestamp: string;
  type: "success" | "info" | "warning";
  icon: LucideIcon;
  onClick: (id: string) => void;
  commandId:string;
}

const NotificationItem: FC<NotificationItemProps> = ({
  onClick,
  title,
  message,
  timestamp,
  type,
  icon: Icon,
  commandId
}) => {
  const typeColors = {
    success: "text-notification-success",
    info: "text-notification-info",
    warning: "text-notification-warning",
  };
//<CheckBox/>
const [active, setActive] = useState('');

function notificationClick(id:string){
  onClick(id);
  setActive('active')
}

useEffect(()=>{
  if(active){
    setTimeout(()=>{
      setActive('');
    }, 1000);
  }
}, [active]);
  return (
    <div className="animate-notification-in relative" onClick={()=>notificationClick(commandId)}>
   
   
      <div className={`relative group  flex items-start gap-4  rounded-lg bg-black p-4 backdrop-blur-sm transition-all
      hover:bg-notification-card/100`}>
        <div className={`absolute -mt-[16px] -ml-[16px] w-full h-full greenAnimation ${active} z-99`}></div>
      <div className={`mt-1 ${typeColors[type]}`}>
          <Icon size={20} />
        </div>
        
        <div className="flex-1">
          { active && <CheckBox/> }
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-gray-300">{message}</p>
          <span className="mt-2 block text-xs text-gray-400">{timestamp}</span>
        </div>



      </div>

    </div>
  );
};

export default NotificationItem;