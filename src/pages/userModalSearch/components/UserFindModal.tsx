
import React, { useState } from 'react';
import { Dialog, DialogContent } from '../../../uiCompoents/ui/dialog';
import TeamCard from './UserFindCard';
import UserFindDetails from './UserFindDetails';
import { X } from 'lucide-react';
import { UsersListType } from '../FindUserModal';
import { Input } from '../../../uiCompoents/ui/input';


interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  usersList:UsersListType[]
}

const UserFindModal: React.FC<TeamModalProps> = ({ isOpen, onClose, usersList }) => {
  const [value, setValue] = useState('');
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
      <DialogContent className="bg-card border-border p-0 max-w-5xl max-h-[85vh] overflow-auto rounded-xl">
        <div className="relative w-full h-full overflow-auto">
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-muted/50 backdrop-blur-md hover:bg-muted transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex flex-col md:flex-row h-full">
            <div className={`w-full ${selectedTeam ? 'md:w-1/2 border-r border-border' : ''} overflow-y-auto p-6`}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Available Users</h2>
                <p className="text-muted-foreground mt-2">
                  Explore and join users that match your interests and skills
                </p>
                <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Search...'
                className='mt-3'
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {filterUsers.map((team) => (
                  <TeamCard 
                    key={team._id} 
                    team={team} 
                    onClick={() => handleTeamClick(team)}
                    isActive={selectedTeam?._id === team._id}
                  />
                ))}
              </div>
            </div>
            
            {selectedTeam && (
              <div className="w-full md:w-1/2 overflow-y-auto animate-slide-right">
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
