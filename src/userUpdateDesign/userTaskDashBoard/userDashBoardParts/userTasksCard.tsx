import { Check, Radar, Warehouse } from "lucide-react";
import MetricCard from "../../../AdminUser/adminOrUserComponents/MetricCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainTask } from "../../../redux/reduxSlice/mainTaskSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { mainTaskState } from "../../../redux/reduxSlice/breakTaskSlice";
import { Task } from "../../../types/task";

export default function UserTaskCard(){
    
  const dispath:AppDispatch = useDispatch();

    useEffect(()=>{
      dispath(fetchMainTask());
    }, []);

  
  const mainTaskArray: Task[] = useSelector(mainTaskState);
  const tasks = mainTaskArray.length;


  const completedTasks = mainTaskArray.filter(i => i.completed == true).length;
  const inProgress = mainTaskArray.filter(i => i.status == 'todo').length;
  const highStatus = mainTaskArray.filter(i => i.priority == 'high').length;
 
  const [counts, setCounts] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0
  });

  useEffect(() => {
    setCounts({
      total: tasks,
      completed: completedTasks,
      inProgress: inProgress,
      pending: highStatus
    });
  }, [mainTaskArray]);

    
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total task"
            value={counts.total}
            icon={Warehouse}
            trend="up"
            color="cyan"
            detail=""
          />
          <MetricCard
            title="Completed task"
            value={counts.completed}
            icon={Check}
            trend="stable"
            color="green"
            detail=""
          />
          <MetricCard
            title="High priority"
            value={counts.pending}
            icon={Radar}
            trend="down"
            color="red"
            detail=""
          />
        </div>
}