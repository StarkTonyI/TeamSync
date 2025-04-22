import React from 'react';
import { Users } from 'lucide-react';
import { CommandListType } from '../FindCommandModal';

export interface Team {
  id: number;
  name: string;
  image: string;
  description: string;
  members: number;
  tags: string[];
  openPositions: number;
}

interface TeamCardProps {
  team: CommandListType;
  onClick: () => void;
  isActive: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onClick, isActive }) => {
  return (
    <div 
      className={`
        rounded-xl border border-border p-4 hover-scale cursor-pointer 
        ${isActive ? 'ring-2 ring-primary' : 'hover:bg-secondary/30'} 
        transition-all duration-300
      `}
      onClick={onClick}
    >
      <div className="flex space-x-4">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format" 
            alt={team.commandName} 
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{team.commandName}</h3>
          
          <div className="flex items-center mt-1 text-muted-foreground text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>{team.users?.length} members</span>
            <span className="mx-2">•</span>
            <span>{team.commandMemberNumber} open position </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
