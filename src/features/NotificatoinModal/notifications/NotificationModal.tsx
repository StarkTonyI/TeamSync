
import { useState, useEffect, useRef, useContext } from 'react';
import { X, Bell } from 'lucide-react';
import { useNotifications } from '../../../uiCompoents/hooks/useNotifications';
import NotificationItem from './NotificationItem';
import { cn } from '../../../uiCompoents/lib/utils';
import { UserContext } from '../../../userContext/userContext';
import { Button } from '../../../uiCompoents/ui/button';

export default function NotificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { toggle, setToggle } = useContext(UserContext) || {};
  const { notifications, showBadge, 
    markAllAsRead, handleAccept, deleteNotificatoin 
    } = useNotifications();
  
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      if (isOpen) {
        setIsAnimating(true);
      }
    }, [isOpen]);

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
  
  const unread = notifications.filter(n => !n.read).length


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={closeModal} />
    
    <div 
      className={cn(
        "relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl transition-all",
        "border border-white/10 flex flex-col max-h-[85vh]",
        "bg-[#1e2a44]/95 text-white", // тёмно-синий фон с лёгкой прозрачностью
        isAnimating ? "animate-fade-in" : ""
      )}
    >
      <div className="notification-header p-4 flex items-center justify-between bg-white/5 border-b border-white/10">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-blue-300" />
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
          {unread > 0 && (
            <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 shadow">
              { unread } new
            </span>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={closeModal} className="h-8 w-8 text-white hover:bg-white/10">
          <X className="h-4 w-4" />
        </Button>
      </div>
  
      <div className="overflow-y-auto p-4 flex-grow">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              type="admin"
              key={notification.id}
              notification={notification}
              onAccept={handleAccept}
              deleteNotificatoin={deleteNotificatoin}
            />
          ))
        ) : (
          <div className="text-center py-10 text-blue-100">
            <Bell className="mx-auto h-8 w-8 opacity-40" />
            <p className="mt-2 opacity-70">No notifications</p>
          </div>
        )}
      </div>
    </div>
  </div>
  



  );
}
