import React from 'react';

interface TaskProgressBarProps {
  progress: number;
}

const TaskProgressBar: React.FC<TaskProgressBarProps> = ({ progress }) => {
  //modal-accent
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-[#4CAF50] to-[#45a049] transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default TaskProgressBar;