
import React, { useState } from 'react';
import { Dialog, DialogContent } from '../../uiCompoents/ui/dialog';
import TeamCard from './TeamCard';
import TeamDetails from './TeamDetails';
import { X } from 'lucide-react';
import { CommandListType } from '../FindCommandModal';



interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  commandList:CommandListType[]
}

const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose, commandList }) => {
  const [selectedTeam, setSelectedTeam] = useState<typeof commandList[0] | null>(null);

  const handleTeamClick = (team: typeof commandList[0]) => {
    setSelectedTeam(team);
  };

  const handleClose = () => {
    setSelectedTeam(null);
    onClose();
  };

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
            {/* Teams list */}
            <div className={`w-full ${selectedTeam ? 'md:w-1/2 border-r border-border' : ''} overflow-y-auto p-6`}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Available Users</h2>
                <p className="text-muted-foreground mt-2">
                  Explore and join teams that match your interests and skills
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {commandList.map((team) => (
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
                <TeamDetails team={selectedTeam} />
              </div>
            )}
          </div>
        </div>
      </DialogContent>

    </Dialog>
  );
};

export default TeamModal;
