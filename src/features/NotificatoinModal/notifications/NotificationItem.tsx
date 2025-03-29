
import { Info } from 'lucide-react';
import { Notification } from '../../../uiCompoents/hooks/useNotifications';
import { useGetUserCommandQuery } from '../../../redux/userCommandApi/UserCommandApi';
import { toast } from 'sonner';

interface NotificationItemProps {
  notification: Notification;
  onAccept: (notification: string, type:string) => void;
  deleteNotificatoin:(id:string) => void;
}

export default function NotificationItem({ notification, onAccept, deleteNotificatoin }: NotificationItemProps) {
 const { data:command } = useGetUserCommandQuery({});
  const formatTime = (date: Date) => {
    const now = new Date();
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
      className={`p-4 mb-3 rounded-lg transition-all duration-300",
        "notification-glass border-l-4 border-l-notification-accent ${notification.read && 'opacity-60'}`}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          <Info className="text-notification-accent" size={18} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-notification-text">{notification.username || notification.commandName}</h4>
            <span className="text-xs text-notification-subtext ml-2 whitespace-nowrap">
            
            {formatTime(notification.date)}

            </span>
          </div>
          <p className="text-sm text-notification-subtext mt-1">
            { notification.commandName ? 'You are invited to join the team' : 'The user wants to join the team' }
          </p>
          
            <div className="flex justify-end space-x-2 mt-3">         
              <button
                  onClick={() => handleAction('delete')}
                  className="px-3 py-1 text-xs font-medium rounded 
                  bg-red-600 text-white hover:bg-red-400 transition-colors button-hover"
                >
                  Delete Notification
                </button>
                <button onClick={() => handleAction('accept')} className="px-3 py-1 text-xs font-medium rounded 
                  bg-green-600 text-white hover:bg-notification-success-hover transition-colors button-hover">
                    { notification._id ? 
                    'Join the team' : 'Accept User' }  
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
