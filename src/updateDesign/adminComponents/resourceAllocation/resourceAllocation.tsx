import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../../../uiCompoents/ui/card";
import { Slider } from "../../../uiCompoents/ui/slider";
import { mainTaskStateAdmin } from "../../../redux/reduxSlice/mainTaskSlice";
import { useEffect, useState } from "react";
import { Task } from "../../../types/task";
import { mainTaskState } from "../../../redux/reduxSlice/breakTaskSlice";

interface ResoureAllocation {
  type:'admin' |'user'
}
 
export default function ResoureAllocation({ type }: ResoureAllocation){
    const [value, setValue] = useState([3]); 
    const [filterMainTask, setFilterMainTask] = useState<Task[]>([]);
    const mainTaskStateAdminArr = useSelector(mainTaskStateAdmin);
    const mainTaskStateUserArr = useSelector(mainTaskState);
    const mainTaskStateArr = type === 'admin' ? mainTaskStateAdminArr : mainTaskStateUserArr;
    function getPercent(part:number, total:number) {
        if (total === 0) return 0;
        return (part / total) * 100;
      }
      

    useEffect(() => {
        switch (true) {
          case value[0] < 2:
            setFilterMainTask(mainTaskStateArr.filter(i => i.priority === "low"));
            break;
          case value[0] === 3:
            setFilterMainTask(mainTaskStateArr.filter(i => i.priority === "medium"));
            break;
          default:
            setFilterMainTask(mainTaskStateArr.filter(i => i.priority === "high"));
        }
      }, [value, mainTaskStateArr]);
      const totalTask = mainTaskStateArr.length;
      const totalTaskFilter = filterMainTask.length;
      const completedTaskFilter = filterMainTask.filter(i => i.completed).length;
      const notCompletedFilter = filterMainTask.filter(i => !i.completed).length;    


   return   <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 text-base">Resource Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-slate-400">Total Task</div>
                            <div className="text-xs text-cyan-400">{getPercent(totalTaskFilter, totalTask).toFixed(1)}% allocated</div>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              style={{ width: `${getPercent(totalTaskFilter, totalTask).toFixed(1)}%` }}
                            ></div>
                          </div>
                        </div>
    
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-slate-400">Completed Task</div>
                            <div className="text-xs text-purple-400">
                            {getPercent(completedTaskFilter, totalTask).toFixed(1)}% allocated</div>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              style={{ width: `${getPercent(completedTaskFilter, totalTask).toFixed(1)}%` }}
                            ></div>
                          </div>
                        </div>
    
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-slate-400">Not Completed Task</div>
                            <div className="text-xs text-blue-400">{getPercent(notCompletedFilter, totalTask).toFixed(1)}% allocated</div>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                              style={{ width: `${getPercent(notCompletedFilter, totalTask).toFixed(1)}%` }}
                            ></div>
                          </div>
                        </div>
    
                        <div className="pt-2 border-t border-slate-700/50">
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-slate-400">Priority Level</div>
                            <div className="flex items-center">
                            <Slider
                                value={value}
                                onValueChange={setValue}
                                max={5}
                                step={1}
                                className="w-24 mr-2"
                                />
                            <span className="text-cyan-400">{value[0]}/5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
}