import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}
export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
<div className="flex min-h-screen h-full w-full">
  <DashboardSidebar />
  <div className="flex-1 flex flex-col">
    <main className="flex-1">
    { children }
    </main>
  </div>
  </div>


  );
};
