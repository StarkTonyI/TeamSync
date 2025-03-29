import { Bell } from 'lucide-react';
import { useNotifications } from '../../../uiCompoents/hooks/useNotifications';

export default function NotificationBell() {
  const { showBadge, notifications } = useNotifications();
  const unreadCount = notifications?.filter(n => !n?.read).length;

  return ( 
  <>
       <button
       className="relative p-2 rounded-full button-hover focus:outline-none"
            aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}>
            <Bell 
              size={24} 
              className={`-ml-[8px] ${showBadge ? 'animate-bell-ring' : ''}`}/>
            {showBadge && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs 
              font-bold text-white bg-notification-accent rounded-full animate-pulse-subtle">
                {unreadCount}
              </span>
            )}
      </button>
      <p className='-ml-[8px]'>Notification</p>   
</>
         
  );
}
