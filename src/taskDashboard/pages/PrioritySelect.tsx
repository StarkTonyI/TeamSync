
import React from "react";
import { AlertCircle, AlertTriangle, AlertOctagon } from "lucide-react";
import { cn } from "../../uiCompoents/lib/utils";

interface PrioritySelectProps {
  value: "low" | "medium" | "high";
  onChange: (value: "low" | "medium" | "high") => void;
  id?: string;
}

const PrioritySelect = ({ value, onChange, id }: PrioritySelectProps) => {
  return (
    <div 
      className="flex gap-2 w-full" 
      id={id}
    >
      <PriorityButton
        type="low"
        selected={value === "low"}
        onClick={() => onChange("low")}
        icon={<AlertCircle size={18} />}
        color="bg-emerald-500"
        label="Low"
      />
      
      <PriorityButton
        type="medium"
        selected={value === "medium"}
        onClick={() => onChange("medium")}
        icon={<AlertTriangle size={18} />}
        color="bg-amber-500"
        label="Medium"
      />
      
      <PriorityButton
        type="high"
        selected={value === "high"}
        onClick={() => onChange("high")}
        icon={<AlertOctagon size={18} />}
        color="bg-rose-500"
        label="High"
      />
    </div>
  );
};

interface PriorityButtonProps {
  type: string;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  color: string;
  label: string;
}

const PriorityButton = ({ 
  selected, 
  onClick, 
  icon, 
  color, 
  label 
}: PriorityButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-1.5 rounded-lg py-3 transition-all",
        selected 
          ? `border-2 border-${color.split('-')[1]}-400 bg-zinc-800` 
          : "border border-zinc-700 bg-zinc-800 hover:border-zinc-600"
      )}
      onClick={onClick}
      aria-selected={selected}
    >
      <div className={cn("rounded-full p-1", selected ? color : "bg-zinc-700")}>
        {icon}
      </div>
      <span className={cn(
        "text-sm font-medium",
        selected ? "text-white" : "text-zinc-400"
      )}>
        {label}
      </span>
    </button>
  );
};

export default PrioritySelect;
