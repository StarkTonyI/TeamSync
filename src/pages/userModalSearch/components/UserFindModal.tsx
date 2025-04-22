
import React, { useState } from 'react';
import { Dialog, DialogContent } from '../../../uiCompoents/ui/dialog';
import TeamCard from './UserFindCard';
import UserFindDetails from './UserFindDetails';
import { X } from 'lucide-react';
import { UsersListType } from '../FindUserModal';


interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  usersList:UsersListType[]
}

const UserFindModal: React.FC<TeamModalProps> = ({ isOpen, onClose, usersList }) => {
  const [value] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<typeof usersList[0] | null>(null);

    const handleTeamClick = (team: typeof usersList[0]) => {
    setSelectedTeam(team);
  };

  const handleClose = () => {
    setSelectedTeam(null);
    onClose();
  };
  const filterUsers = usersList.filter(i => i.username.toLowerCase().includes(value.toLowerCase()));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
    }}>

<DialogContent className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 p-0 max-w-5xl max-h-[85vh] overflow-auto rounded-xl z-[1200] shadow-2xl shadow-slate-900/50">

<div className="relative w-full h-full overflow-auto">

  <button 
    onClick={handleClose} 
    className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-800/90 backdrop-blur-lg hover:bg-slate-700 transition-all duration-300 shadow-md hover:shadow-lg shadow-slate-900/30 hover:scale-105"
    aria-label="Close dialog"
  >
    <X className="h-6 w-6 text-slate-200 stroke-[1.5]" />
  </button>

  <div className="flex flex-col md:flex-row h-full">

    <div className={`w-full ${selectedTeam ? 'md:w-1/2 border-r border-slate-700' : ''} overflow-y-auto p-6`}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
          Available Teams
        </h2>
        <p className="text-slate-400 mt-2 text-[0.925rem] leading-relaxed">
         Explore and join teams that match your interests and skills
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filterUsers.map((user) => (
          <TeamCard 
            key={user._id} 
            team={user} 
            onClick={() => handleTeamClick(user)}
            isActive={selectedTeam?._id === user._id}
          />
        ))}
      </div>
    </div>

    {selectedTeam && (
      <div className="w-full md:w-1/2 overflow-y-auto animate-slide-right bg-gradient-to-b from-slate-900/30 to-transparent">
       <UserFindDetails user={selectedTeam} />
      </div>
    )}

  </div>
</div>
</DialogContent>

    </Dialog>
  );
};

export default UserFindModal;
