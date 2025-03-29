import React from 'react';
import { Users } from 'lucide-react';
import { UsersListType } from '../FindUserModal';
import UserPng from '../../../images/user.png';
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
  team: UsersListType;
  onClick: () => void;
  isActive: boolean;
}

<div className="flex flex-wrap gap-2 mt-3">
         
</div>
const UserFindCard: React.FC<TeamCardProps> = ({ team, onClick, isActive }) => {
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
            src={team.imageUrl ? team.imageUrl : UserPng} 
            alt={team.username} 
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{team.username}</h3>
          
          <div className="flex items-center mt-1 text-muted-foreground text-sm">
            <Users className="h-4 w-4 mr-1" />
            <p className='break-all'>{`Description: ${team.description || 'No description'}`}</p>
          </div>
          
        
        </div>

      </div>
    </div>
  );
};

export default UserFindCard;
