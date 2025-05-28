import { useSelector } from "react-redux";
import { ProcessRow } from "../../../AdminUser/adminOrUserComponents/MetricCards";
import { mainTaskStateAdmin } from "../../../redux/reduxSlice/mainTaskSlice";
import usersCompletedCount from "../../adminFeatures/usersCompletedCount";
import TimeLeft from "../../../AdminUser/adminOrUserComponents/timeLeft";


export default function AdminTableStatistic(){
   const mainTaskArray = useSelector(mainTaskStateAdmin)

return <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
<div className="overflow-x-auto">
  {/* Заголовки таблицы */}
  <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50 min-w-[500px]">
  <div className="col-span-2 sm:col-span-1">Index</div>
    <div className="col-span-3 sm:col-span-3">Name</div>
    <div className="hidden sm:block col-span-2">Participants</div>
    <div className="hidden sm:block col-span-2">Progress</div>
    <div className="sm:block col-span-2">Time</div>
    <div className="col-span-4 sm:col-span-1">Completed</div>
  </div>

  {/* Строки таблицы */}
  <div className="divide-y divide-slate-700/30 min-w-[500px]">
    {mainTaskArray?.map((task, index) => (
      <ProcessRow
        key={index}
        pid={(index + 1).toString()}
        name={task.title}
        user={task.userId.length.toString()}
        completedUsers={usersCompletedCount(task.userId)}
        memory={<TimeLeft createdAt={task.creatAt} deadline={task.deadline} />}
        status={task.completed}
      />
    ))}
  </div>
</div>
</div>
  

}