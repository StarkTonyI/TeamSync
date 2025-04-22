import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { PerformanceChartAdmin } from "../../AdminUser/adminOrUserComponents/MetricCards";
import { CardContent } from "../../uiCompoents/ui/card";
import { TabsContent, TabsTrigger } from "../../uiCompoents/ui/tabs";
import AdminTaskCard from "./adminDashBoardParts/adminTasksCard";
import AdminTableStatistic from "./adminDashBoardParts/adminTableStatistic";
import TaskListCard from "../adminComponents/tasksListCard";

interface TaskModalProps {
  editOrDelete:string
};


export default function AdminTaskDashBoard({ editOrDelete }:TaskModalProps){

    return  <CardContent className="p-6">
              <AdminTaskCard/>        
      <div className="mt-8">
          <Tabs defaultValue="Schedule" className="w-full">
 
        <div className="flex items-center flex-col gap-3 md:flex-row justify-between mb-4">
         
          <TabsList className="bg-slate-800/50 p-1">
            <TabsTrigger
              value="Schedule"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Bar Chart
            </TabsTrigger>
            <TabsTrigger
              value="processes"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
              Processes
            </TabsTrigger>
            <TabsTrigger
              value="storage"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
            >
              Storage
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
              Total
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-600 mr-1"></div>
              Completed
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-red-600 mr-1"></div>
              Not completed
            </div>
          </div>
          
        </div>

        <TabsContent value="Schedule" className="mt-0">
          <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
            <PerformanceChartAdmin />
          </div>
        </TabsContent>

        <TabsContent value="processes" className="mt-0">
          <AdminTableStatistic/>
        </TabsContent>
        
        <TabsContent value="storage" className="mt-0">
          <TaskListCard  editOrDelete={editOrDelete}/>
        </TabsContent>

      </Tabs>
      </div>

  </CardContent>
}