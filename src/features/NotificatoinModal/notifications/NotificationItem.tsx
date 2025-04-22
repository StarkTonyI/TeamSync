
import { Bell, Check, X } from 'lucide-react';
import { Notification } from '../../../uiCompoents/hooks/useNotifications';
import { useGetUserCommandQuery } from '../../../redux/userCommandApi/UserCommandApi';
import { toast } from 'sonner';
import { cn } from '../../../uiCompoents/lib/utils';
import { Button } from '../../../uiCompoents/ui/button';
import dayjs from 'dayjs';

interface NotificationItemProps {
  notification: Notification;
  onAccept: (notification: string, type:string) => void;
  deleteNotificatoin:(id: string) => Promise<void>;
  type:string;
}

export default function NotificationItem({ notification, onAccept, deleteNotificatoin }: NotificationItemProps) {
 const { data:command } = useGetUserCommandQuery({});


 const formatTime = (date: Date) => {
    const now = dayjs().toDate()
    const parsedDate = new Date(date);
    const diffInMs = now.getTime() - parsedDate.getTime();
    
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  const handleAction = (action: 'accept' | 'delete') => {
    setTimeout(() => {
      if (action === 'accept') {
        if(notification._id){
          if(command?.commandName){
            toast.error("You can't join the team", {
              description: "You are already in a team, first exit the current team",
              position: "bottom-right",
            });
            return; 
          }
          onAccept(notification.id, 'joinTeam');
      
        }else{
          onAccept(notification.id, 'acceptUser');
          setTimeout(()=>{
            window.location.reload()
          }, 800);
        }

      } else {
        if(notification._id){
          deleteNotificatoin(notification._id);
        } else {
          deleteNotificatoin(notification.id);
        }
     
      } 
    }, 300);
  };



return (
<div 
  className={cn(
    "rounded-lg mb-3 overflow-hidden border-l-4 transition-shadow",
    "bg-[#24314e]/80 border-blue-500", // фон карточки + синяя левая граница
    !notification.read ? "shadow-md shadow-blue-800/30" : "opacity-70"
  )}
>
  <div className="p-4">
    <div className="flex items-start justify-between">
      <div className="flex items-center">
        <Bell 
          className={cn(
            "h-5 w-5 mr-2 transition-all",
            !notification.read 
              ? "text-blue-400 animate-pulse-subtle" 
              : "text-blue-200/50"
          )} 
        />
        <h3 className="font-medium text-sm text-white">
          {notification.username || notification.commandName}
        </h3>
      </div>
      <span className="text-xs text-blue-200/60">
        {formatTime(notification.date)}
      </span>
    </div>
    
    <p className="mt-1 text-sm text-blue-200/70">
      {notification.commandName 
        ? 'You are invited to join the team' 
        : 'The user wants to join the team'}
    </p>
    
    <div className="flex justify-end mt-3 gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="border border-red-400 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        onClick={() => handleAction('delete')}
      >
        <X className="h-4 w-4 mr-1" />
        Reject
      </Button>
      <Button 
        size="sm"
        className="bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        onClick={() => handleAction('accept')}
      >
        <Check className="h-4 w-4 mr-1" />
        Accept
      </Button>
    </div>
  </div>
</div>




  );
}
