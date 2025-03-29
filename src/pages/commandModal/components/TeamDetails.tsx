import React, { useEffect, useState } from 'react';
import { Button } from '../../../uiCompoents/ui/button';
import { Users, Info, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';
import { CommandListType } from '../FindCommandModal';
import { useSendInvitationMutation } from '../../../redux/userCommandApi/UserCommandApi';
import TeamPage from '../../../images/team.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { addJoinId, fetchJoinUserOrCommand } from '../../../redux/reduxSlice/joinTeamOrUserSlice';

interface TeamDetailsProps {
  team: CommandListType;
}
const TeamDetails: React.FC<TeamDetailsProps> = ({ team }) => {
  const [hasJoined, setHasJoined] = useState(false);
  const [joinTeam] = useSendInvitationMutation();
  const dispath:AppDispatch = useDispatch()
  // @ts-ignore
  const joinState = useSelector((state) => state.join.joinState) || []
  
  useEffect(()=>{
      if(team){
          dispath(fetchJoinUserOrCommand());
      }
    }, [team]);

 
useEffect(()=>{
    if(joinState.length){
      // @ts-ignore
      const existingIds = new Set(joinState.map(item => item));
      const newItems = existingIds.has(team._id);
      newItems ? setHasJoined(true) : setHasJoined(false);
    }
  }, [joinState, team])

  const handleJoinTeam = async() => {
    if (hasJoined) return;
    await joinTeam(team._id).unwrap(); 
    dispath(addJoinId(team._id))
    toast.success(`You've successfully joined ${team.commandName}!`, {
      description: "You'll be contacted by the team lead shortly.",
    });
  };

  return (
    <div className="p-6 h-full">
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        <img 
          src={team.file ? `https://working-project-teamsync.up.railway.app/uploads/${team.file}` : TeamPage}
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
