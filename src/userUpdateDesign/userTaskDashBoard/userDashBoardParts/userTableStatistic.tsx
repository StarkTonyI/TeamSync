import { useSelector } from "react-redux";
import { ProcessRow } from "../../../AdminUser/adminOrUserComponents/MetricCards";
import TimeLeft from "../../../AdminUser/adminOrUserComponents/timeLeft";
import { mainTaskState } from "../../../redux/reduxSlice/breakTaskSlice";

export default function AdminTableStatistic(){
   const mainTaskArray = useSelector(mainTaskState)

  return  <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
    <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
    
    <div className="col-span-1">Index</div>
      <div className="col-span-3">Name</div>
      <div className="col-span-2">Participants</div>
      <div className="col-span-2">Already done</div>
      <div className="col-span-2">Time remaining</div>
      <div className="col-span-1 ml-4">Status</div>
  
    </div>

    <div className="divide-y divide-slate-700/30">
    { mainTaskArray && mainTaskArray.map((task, index)=>(
        <ProcessRow
            pid={(index + 1).toString()}
            name={task.title}
            user={'1'}
            memory={<TimeLeft createdAt={task.creatAt} deadline={task.deadline}/>}
            completedUsers={task.completed ? 100 : 0}
            status={task.completed}
   />
    )

    ) }
 

    </div>

  </div>

}