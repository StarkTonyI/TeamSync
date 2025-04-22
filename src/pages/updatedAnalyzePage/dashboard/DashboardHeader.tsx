import { Avatar, AvatarFallback } from "../../../uiCompoents/ui/avatar";

export const DashboardHeader = () => {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6">
      <div className="text-xl font-semibold">Dashboard Overview</div>
      
      <div className="flex items-center space-x-4">
             
        <Avatar className="h-12 w-12 border border-border">
          <AvatarFallback className="bg-black text-xl">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
