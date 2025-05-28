import { BadgeAlert, Check,  NotebookPen } from "lucide-react";
import MetricCard from "../../../AdminUser/adminOrUserComponents/MetricCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainTask, mainTaskStateAdmin } from "../../../redux/reduxSlice/mainTaskSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";

export default function AdminTaskCard(){
    
  const dispath:AppDispatch = useDispatch();

    useEffect(()=>{
      dispath(fetchMainTask());
    }, []);

  const mainTaskArray = useSelector(mainTaskStateAdmin);
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
            icon={NotebookPen}
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
            icon={BadgeAlert}
            trend="down"
            color="red"
            detail=""
          />
        </div>
}