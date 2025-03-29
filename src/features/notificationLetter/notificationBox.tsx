import { Bell, CheckCircle, Info, AlertCircle } from "lucide-react";
import NotificationItem from "./NotificationItem.tsx";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../uiCompoents/ui/dialog.tsx";
import Notification from "../notification/notification.tsx";
import { useJoinTeamMutation } from "../../redux/userCommandApi/UserCommandApi.ts";
import { DialogTitle } from "@radix-ui/react-dialog";

interface NotificationBoxProps {
  notification: {
    id: string;
    commandName: string;
  } 
}

const NotificationBox = ({ notification }: NotificationBoxProps) => {


  const notifications = [{
      id: 1,
      title: "You have been invited to the team",
      message: `Command: ${notification?.commandName} invited you to her team, to accept, click on the card, if not, ignore`, 
      timestamp: "2 minutes ago",
      type: "success" as const,
      icon: CheckCircle,
      commandId:notification?.id   
},
{
      id: 2,
      title: "New Message",
      message: "You have received a new message from Sarah Parker.",
      timestamp: "15 minutes ago",
      type: "info" as const,
      icon: Info,
      commandId:''
},
{
      id: 3,
      title: "Storage Warning",
      message: "You're running low on storage space. Consider upgrading your plan.",
      timestamp: "1 hour ago",
      type: "warning" as const,
      icon: AlertCircle,
      commandId:''
}];

const [joinTeam] = useJoinTeamMutation();
const [open, setOpen] = useState(false);

const handleJoinCommand = (id:string) => {
joinTeam(id);
} 

return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogTrigger asChild>
        <div>
          <Notification/>
        </div>
      </DialogTrigger>
      
      <DialogContent>
      <div className="z-50 rounded-xl bg-gradient-to-br from-notification-bg to-notification-card p-[1px]">
      <div className="rounded-xl bg-notification-bg/95 p-4 backdrop-blur-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="text-white" size={20} />
              <DialogTitle>
                Notificatoion
              </DialogTitle>
          </div>
          <span className="rounded-full bg-notification-info px-2 py-1 text-xs text-white">
            {notifications.length} New
          </span>
        </div>
        
        <div className="space-y-3 overflow-y-auto max-h-[400px]">
          {notifications.map((notification) => (
            <NotificationItem
              onClick={handleJoinCommand}
              key={notification.id}
              {...notification}
            />
          ))}
        </div>
      </div>
      </div>
      </DialogContent>
      
    </Dialog>
  );
};

export default NotificationBox;