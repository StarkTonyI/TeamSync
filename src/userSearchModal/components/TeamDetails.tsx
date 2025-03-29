import React, { useContext, useState } from 'react';
import { Button } from '../../uiCompoents/ui/button';
import { Users, Info, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';
import { CommandListType } from '../FindCommandModal';
import { UserContext } from '../../userContext/userContext';
import { useInviteUserMutation } from '../../redux/adminApi/adminApi';

export interface Team {
  id: number;
  name: string;
  image: string;
  description: string;
  members: number;
  tags: string[];
  openPositions: number;
}

interface TeamDetailsProps {
  team: CommandListType;
}
//{team.openPositions !== 1 ? 's' : ''}
const TeamDetails: React.FC<TeamDetailsProps> = ({ team }) => {
  const [hasJoined, setHasJoined] = useState(false);
  const [inviteUser] = useInviteUserMutation();
  const { id } = useContext(UserContext) || {}  


  const handleJoinTeam = async() => {
    if (hasJoined) return;
    await inviteUser(id).unwrap(); 
    setHasJoined(true);
    toast.success(`You've successfully joined ${team.commandName}!`, {
      description: "You'll be contacted by the team lead shortly.",
    });
  };

  return (
    <div className="p-6 h-full">
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format" 
          alt={team.commandName} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">{team.commandName}</h2>
          
          <div className="flex items-center mt-2 text-muted-foreground">
            <Users className="h-5 w-5 mr-2" />
            <span>{team.users.length} members</span>
            <span className="mx-2">•</span>
            <span>{team.commandMemberNumber} open position</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-lg font-medium">
            <Info className="h-5 w-5 text-primary" />
            <h3>About This Team</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {team.commandDescription}
          </p>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Expertise</h3>
          <div className="flex flex-wrap gap-2">
      
          </div>
        </div>
        
        <div className="glass-morphism rounded-xl p-6 mt-6">
          <h3 className="text-lg font-medium mb-2">Looking for new members</h3>
          <p className="text-muted-foreground mb-4">
            This team is actively recruiting {team.commandMemberNumber} new member to join their projects.
          </p>
          
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

export default TeamDetails;
