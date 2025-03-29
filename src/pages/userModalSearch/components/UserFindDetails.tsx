import React, { useEffect, useState } from 'react';
import { Button } from '../../../uiCompoents/ui/button';
import { Users, Info, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';
import { UsersListType } from '../FindUserModal';
import { useInviteUserMutation } from '../../../redux/adminApi/adminApi';
import UserPng from '../../../images/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { addJoinId, fetchJoinUserOrCommand } from '../../../redux/reduxSlice/joinTeamOrUserSlice';
import { useGetCommandQuery } from '../../../redux/adminCommandApi/AdminCommandApi';
  interface TeamDetailsProps {
    user: UsersListType;
  };

const UserFindDetails: React.FC<TeamDetailsProps> = ({ user }) => {
  const [hasJoined, setHasJoined] = useState(false);
  // @ts-ignore
  const joinState = useSelector(state => state.join.joinState)
  const [inviteUser] = useInviteUserMutation();
  const dispatch:AppDispatch = useDispatch();
  const { data:command } = useGetCommandQuery({});
  
useEffect(() => {
  async function fetchUserData() {
    if (user) {
      await dispatch(fetchJoinUserOrCommand()); // Дожидаемся ответа от сервера
    }
  }
  fetchUserData();
}, [user]);


  useEffect(()=>{
    if(joinState){
      // @ts-ignore
      const existingIds = new Set(joinState.map(item => item));
      const newItems = existingIds.has(user._id);
      newItems ? setHasJoined(true) : setHasJoined(false);
    }
  }, [joinState, user])

  const handleJoinTeam = async() => {
    if (hasJoined) return;
    if(!command){
      return toast.error(`You don't have a command!`, {
        description: "You should create a command, and after that, you can join the user.",
      });
    }
    await inviteUser(user._id).unwrap(); 
    dispatch(addJoinId(user._id))
    toast.success(`You've successfully joined ${user.username}!`, {
      description: "You'll be contacted by the team lead shortly.",
    });
  };
  return (
    <div className="p-6 h-full">
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        <img 
          src={user.imageUrl ? user.imageUrl : UserPng} 
          alt={user.username} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">{user.username}</h2>
          
          <div className="flex items-center mt-2 text-muted-foreground">
            <Users className="h-5 w-5 mr-2" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-lg font-medium">
            <Info className="h-5 w-5 text-primary" />
            <h3>About This User</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {user.description}
          </p>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Expertise</h3>
          <div className="flex flex-wrap gap-2">
      
          </div>
        </div>
        
        <div className="glass-morphism rounded-xl p-6 mt-6">
          <h3 className="text-lg font-medium mb-2">Looking for new members</h3>
          <Button
            onClick={handleJoinTeam}
            disabled={hasJoined}
            className={`
              w-full py-6 text-lg transition-all duration-300 rounded-xl
              ${hasJoined 
                ? 'bg-green-500/20 text-green-500 hover:bg-green-500/20' 
                : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 button-glow'}
            `}
          >
            {hasJoined ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Joined Team
              </>
            ) : (
              <>
                <Plus className="mr-2 h-5 w-5" />
                Join Team
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserFindDetails;
