import { cn } from "../../../../uiCompoents/lib/utils";

type ProgressBarProps = {
  progress: number;
  className?: string;
};

const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  // Make sure progress is between 0 and 100
  const normalizedProgress = Math.max(0, Math.min(100, progress));
  
  // Determine color based on progress
  const getColorClass = () => {
    if (normalizedProgress < 25) return "bg-red-500";
    if (normalizedProgress < 50) return "bg-amber-500";
    if (normalizedProgress < 75) return "bg-blue-500";
    return "bg-emerald-500";
  };

  return (
    <div className={cn("h-2 bg-slate-700/50 rounded-full overflow-hidden", className)}>
      <div
        className={cn("h-full transition-all duration-300", getColorClass())}
        style={{ width: `${normalizedProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;