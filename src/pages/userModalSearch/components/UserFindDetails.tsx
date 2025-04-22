import React, { useEffect, useState } from 'react';
import { Button } from '../../../uiCompoents/ui/button';
import { Users, Info, Plus, Check, Sparkles } from 'lucide-react';
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
<div className="p-6 h-full bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-xl">
  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 group border border-slate-700/50 shadow-2xl shadow-slate-900/30">
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent z-10" />
    <img 
      src={user.imageUrl ? user.imageUrl : UserPng} 
      alt={user.username} 
      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute bottom-4 left-4 z-20 flex items-center">
      <span className="px-3 py-1.5 bg-slate-800/80 backdrop-blur text-slate-100 text-sm rounded-full border border-slate-700/50 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-amber-400/80" />
        Profile Spotlight
      </span>
    </div>
  </div>
  
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold text-slate-100 tracking-tight mb-1">
        {user.username}
      </h2>
      <div className="flex items-center mt-2 text-slate-400">
        <Users className="h-5 w-5 mr-2 text-slate-400/80" />
        <span>User Profile</span>
      </div>
    </div>
    
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-medium">
        <Info className="h-6 w-6 text-blue-400/90" />
        <h3 className="text-slate-100">About This User</h3>
      </div>
      <p className="text-slate-300/90 leading-relaxed text-[0.95rem] tracking-wide">
        {user.description || 'No description provided.'}
      </p>
    </div>
    
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-slate-100">Expertise</h3>
      <div className="flex flex-wrap gap-2">
        {/* Теги можно добавить в формате: */}
        {/* <span className="px-3 py-1.5 bg-slate-800/50 text-slate-300 text-sm rounded-full border border-slate-700/50">
          Skill
        </span> */}
      </div>
    </div>
    
    <div className="rounded-xl p-6 mt-6 bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 shadow-xl shadow-slate-900/20">
      <h3 className="text-lg font-medium text-slate-100 mb-3">
        Looking for new members
      </h3>
      <Button
        onClick={handleJoinTeam}
        disabled={hasJoined}
        className={`
          w-full py-5 text-lg transition-all duration-300 rounded-xl
          relative overflow-hidden group
          ${hasJoined 
            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 cursor-default' 
            : `
              bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 
              shadow-lg shadow-blue-500/20 
              hover:shadow-xl hover:shadow-blue-500/30
              hover:-translate-y-0.5
            `
          }
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {hasJoined ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            <span className="relative">Joined Team</span>
          </>
        ) : (
          <>
            <Plus className="mr-2 h-5 w-5" />
            <span className="relative">Join Team</span>
          </>
        )}
      </Button>
    </div>
  </div>
</div>

  );
};

export default UserFindDetails;
