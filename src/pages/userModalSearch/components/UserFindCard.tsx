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

const UserFindCard: React.FC<TeamCardProps> = ({ team, onClick, isActive }) => {
  

  
  return (

    <div 
    className={`
      rounded-2xl border border-[#2a395b] p-4 cursor-pointer 
      transition-all duration-300 shadow-md
      ${isActive 
        ? 'ring-2 ring-[#3e69bd] bg-[#182742]' 
        : 'hover:bg-[#1b2b4a]/60 hover:shadow-lg'} 
    `}
    onClick={onClick}
  >
    <div className="flex space-x-4">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-inner border border-[#2f456d]">
        <img 
          src={team.imageUrl ? team.imageUrl : UserPng} 
          alt={team.username} 
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      
      <div className="flex-1 text-white">
        <h3 className="font-semibold text-lg text-[#c8dbff]">{team.username}</h3>
  
        <div className="flex items-start mt-1 text-sm text-[#8aa3c2]">
          <Users className="h-4 w-4 mr-1 mt-0.5 text-[#6e8ec0]" />
          <p className="break-words">{`Description: ${team.description || 'No description'}`}</p>
        </div>
      </div>
    </div>
  </div>

  
  );
};

export default UserFindCard;
