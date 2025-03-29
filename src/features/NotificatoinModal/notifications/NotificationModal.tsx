
import { useState, useEffect, useRef, useContext } from 'react';
import { X, BellOff } from 'lucide-react';
import { useNotifications } from '../../../uiCompoents/hooks/useNotifications';
import NotificationItem from './NotificationItem';
import { cn } from '../../../uiCompoents/lib/utils';
import { UserContext } from '../../../userContext/userContext';

export default function NotificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { toggle, setToggle } = useContext(UserContext) || {};
  const { notifications, isLoading, showBadge, 
    markAllAsRead, handleAccept, deleteNotificatoin 
    } = useNotifications();
  
  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen && showBadge) {
      setTimeout(() => { 
        markAllAsRead()
      } , 3000);
    }
};  
  const closeModal = () => {
    setIsOpen(false);
    setToggle && setToggle(false)
  }

  useEffect(()=>{
    if(toggle) toggleModal()
  }, [toggle]);

  useEffect(() => {
    if (isOpen && toggle) {
      setShowModal(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => {
        setShowModal(false);
        document.body.style.overflow = '';
      }, 300);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setToggle && setToggle(false);
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!showModal) return null;
  

  
  return (
    <div
    className={cn(
      "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0",
      "bg-black/60 backdrop-blur-sm transition-opacity",
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div 
        ref={modalRef}
        className={cn(
          "w-full max-w-md max-h-[85vh] overflow-hidden rounded-xl shadow-xl",
          "bg-notification bg-gradient-to-br from-notification to-notification-lighter",
          "border border-notification-accent/20 transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
          "animate-enter"
        )}
      >
        <div 
        className="flex items-center justify-between p-4 border-b border-notification-accent/10">
          <h3 className="text-xl font-semibold text-notification-text">Notifications</h3>
          <button 
            onClick={closeModal}
            className="p-1 rounded-full hover:bg-notification-accent/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-notification-text" />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {isLoading && notifications ? (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="w-10 h-10 border-4 border-notification-accent/30 border-t-notification-accent rounded-full animate-spin"></div>
              <p className="mt-4 text-sm text-notification-subtext">Loading notifications...</p>
            </div>
          ) : notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationItem 
                deleteNotificatoin={deleteNotificatoin}
                key={notification.id}
                notification={notification}
                onAccept={handleAccept}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <BellOff size={40} className="text-notification-accent/50 mb-4" />
              <h4 className="text-lg font-medium text-notification-text mb-1">No notifications</h4>
              <p className="text-sm text-notification-subtext">You're all caught up!</p>
            </div>
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="border-t border-notification-accent/10 p-4 flex justify-between items-center">
            <p className="text-xs text-notification-subtext">
              {notifications.filter(n => !n.read).length} unread notifications
            </p>
            <button 
              className="text-xs text-notification-accent hover:text-notification-accent/80 transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        )}
        
      </div>

    </div>
  );
}
