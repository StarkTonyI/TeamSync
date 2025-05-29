import React from 'react';
import { Users } from 'lucide-react';
import { CommandListType } from '../FindCommandModal';
import TeamPage from '../../../images/team.png';

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
  rounded-xl border border-slate-700/50 p-5 cursor-pointer
  bg-slate-800/40 hover:bg-slate-800/70 backdrop-blur-sm
  transform transition-all duration-300 
  hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/30
  ${isActive 
    ? 'ring-2 ring-blue-500/60 border-blue-600/50 bg-blue-900/20' 
    : 'hover:border-slate-600'
  }
  relative overflow-hidden
  group
`}
onClick={onClick}
>
{/* Subtle hover gradient overlay */}
<div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

<div className="flex space-x-4 relative z-10">
  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
    <img
      src={team.file ? `https://teamsync-qfqf.onrender.com/${team.file}` : TeamPage}
      alt={team.commandName}
      className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-slate-900/30 transition-opacity duration-300 group-hover:opacity-0" />
  </div>

  <div className="flex-1">
    <h3 className="font-semibold text-lg text-slate-100 tracking-tight">
      {team.commandName}
    </h3>
    
    <div className="flex items-center mt-1.5 text-sm">
      <Users className="h-4 w-4 mr-2 text-slate-400/80" />
      <span className="text-slate-400">
        {team.users.length} members
      </span>
      <span className="mx-2 text-slate-600">•</span>
      <span className="text-emerald-400/90 font-medium">
        {team.commandMemberNumber} open position
      </span>
    </div>

    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </div>
  </div>
</div>
</div>
  );
};

export default TeamCard;
