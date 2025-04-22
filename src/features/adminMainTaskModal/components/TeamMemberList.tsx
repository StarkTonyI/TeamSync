import React from 'react';
import userPng from '../../../images/user.png'
import { userId } from '../../../types/task';
import { TeamMember } from '../../../types/TaskType';

interface TeamMemberListProps {
  members: TeamMember[];
  taskData:userId[];
}


const TeamMemberList: React.FC<TeamMemberListProps> = ({ members, taskData }) => {

  const correctCompletedTask = (data:any) => {
    const taskDataFilter = taskData?.filter(i => i.id == data._id);  
    return taskDataFilter[0].completed;
  }

  
  return (
    <div className="space-y-4">
   
      {members?.map((member) => (
        <div 
          key={member._id}
          className="flex items-center justify-between p-4 rounded-lg bg-modal-accent bg-opacity-50 
          backdrop-blur-sm border border-modal-border transition-all duration-200 hover:bg-opacity-70"
        >
          <div className="flex items-center space-x-4">
            <img
              src={member && (member.imageUrl ? member.imageUrl : userPng)}
              alt={'member.username'}
              className="w-10 h-10 rounded-full object-cover border-2 border-modal-border"
            />
            <span className="font-medium text-modal-foreground">{member.username}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-modal-foreground opacity-75">  
                { correctCompletedTask(member) == 'false' ? 'not completed' : 'completed' }
            </span>
           



          </div>
        </div>
      ))}
   
    </div>
  );
};

export default TeamMemberList;

