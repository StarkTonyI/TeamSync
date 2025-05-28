
import { useState, useEffect, useMemo} from 'react';
import { useAcceptUserMutation, useGetCommandQuery } from '../../redux/adminCommandApi/AdminCommandApi';
import { useDeleteNotificationMutation, useMakeReadNotificationMutation } from '../../redux/adminApi/adminApi';
import { useGetProfileQuery } from '../../redux/authApi/authApi';
import { useJoinTeamMutation } from '../../redux/userCommandApi/UserCommandApi';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialized } from '../../redux/reduxSlice/joinTeamOrUserSlice';
import { toast } from 'sonner';
import type { AppDispatch } from '../../redux/store'
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
    login:string;
    id: string;
    role: string;
    username: string;
    read:boolean;
    date:Date;
    commandName:string;
    _id:string;
}

export function useNotifications() {

// @ts-ignore
  const hasInitialized = useSelector((state:AppDispatch) => state.join.hasInitialized);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBadge, setShowBadge] = useState(false);
  
  const [deleteNotificatoinApi] = useDeleteNotificationMutation({});
  const [makeReadNotification] = useMakeReadNotificationMutation({});
  
  const [acceptUser] = useAcceptUserMutation({});
  const [joinTeam] = useJoinTeamMutation({});
  
  const { data:command } = useGetCommandQuery({});
  const { data:userData } = useGetProfileQuery({});
 
 

  const commandNotificationBox = useMemo(() => {
    if (!userData) return [];
    return userData.role === 'admin' ? command?.commandNotification : userData.notification;
  }, [userData, command]);

  useEffect(() => {
    setIsLoading(false);
    if(!commandNotificationBox?.length || hasInitialized) return;
    const timer = setTimeout(() => {
      setNotifications(commandNotificationBox);
      setShowBadge(commandNotificationBox.some((notif: Notification) => !notif.read));
    }, 800);

    return () => clearTimeout(timer);

}, [commandNotificationBox]);

  const deleteNotificatoin = async(id:string) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => !(notification.id === id || notification._id === id))
    );
    await deleteNotificatoinApi(id)
  }

  const markAllAsRead = async() => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    dispatch(setInitialized());
    await makeReadNotification('');
    setShowBadge(false);
  };

  const handleAccept = async (notification: string, type: string) => {
    try {
      setNotifications(prevNotifications =>
        prevNotifications.filter(notif => notif.id !== notification)
      );
  
      if (type === 'acceptUser') {
        deleteNotificatoin(notification);
        await acceptUser(notification);
        setTimeout(() => {
          window.location.reload()
        }, 800);
      } else if (type === 'joinTeam') {
        deleteNotificatoin(notification);
        await joinTeam(notification);
        setTimeout(() => {
          window.location.reload()
        }, 800);
      }
    } catch (err) {
      toast.error("User can't join team!", {
        description: "The user already has a command",
      });  
    }
  };
  return {
    notifications,
    isLoading,
    showBadge,
    markAllAsRead,
    handleAccept,
    deleteNotificatoin,
  };
}
