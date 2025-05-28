interface ProgressBarProps {
  completed: number;
  total: number;
}

export const ProgressBar = ({ completed, total }: ProgressBarProps) => {
  
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <div className="glass-card p-6 mb-8 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium white">Overall Progress</h3>
        <span className="text-sm text-muted-foreground white">{percentage || 0}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-green-600 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage || 0}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2 white">
        {completed} of {total} tasks completed
      </p>
    </div>
  );
};