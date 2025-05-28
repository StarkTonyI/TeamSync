
import { BarChartComponent } from "./charts/BarChartComponent";
import { LineChartComponent } from "./charts/LineChartComponent";
import { PieChartComponent } from "./charts/PieChartComponent";
import { DashboardLayout } from "./dashboard/DashboardLayout";
import { StatCard } from "./dashboard/StatCard";
import { Activity, CheckCheck, LucideFileWarning, NotebookPen } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext/userContext";
import { useTotalTaskAdminMutation, useTotalTaskUserMutation } from "../../redux/totalTaskApi/totalTask";
import { addMonths, format, parse } from "date-fns";
import { CardTitle } from "../../uiCompoents/ui/card";
import { AnalyzeTask } from "../../types/TaskType";
import dayjs from "dayjs";

interface valueAnalyzeState {
  name:string, 
  value:number | undefined;
}

interface valuePieAnalyze {
  name:string, 
  value:number;
  color:string
}


const UpdatedAnalyzPage = () => {

    const { id, role } = useContext(UserContext) || {}
    const [checked] = useState('user');
    const [totalTask, setTotalTask] = useState<AnalyzeTask[]>();
  
    const [totalTaskApiUser] = useTotalTaskUserMutation();  
  
    const [totalTaskApiAdmin] = useTotalTaskAdminMutation();
    
    const [allData, setAllData] = useState<valueAnalyzeState[]>([]);
    const [fullParametrList, setFullParametrList] = useState<
    { name: string; total: number | undefined; completed: number | undefined; notCompleted: number | undefined; }[]>([]);
    const [completedPercentage, setCompletedPercentage] = useState<{ name: string; completedRate: number; }[]>(); 
    const [commandOrUserTask, setCommandOrUserTask] = useState<AnalyzeTask[]>([])
    const [completedAndNot, setCompletedAndNot] = useState<valuePieAnalyze[]>([]);

    const handleClick = async (id:string) => {
      try {
        if(role == 'admin') {
          const response = await totalTaskApiAdmin(id).unwrap();
          setTotalTask(response?.allTask);
        }else if(role == 'user'){
          const response = await totalTaskApiUser(id).unwrap();
          setTotalTask(response?.allTask);
        }
      } catch (error) {
          console.error('Ошибка запроса:', error);
      }
  };
  
    useEffect(()=>{
      if(id) {
        handleClick(id);
    }
  }, [id]);
  
    const uniqueMonths = totalTask && Object.values(
      totalTask.reduce((acc: { [key: string]: AnalyzeTask }, obj) => {
        if (!acc[obj.month]) acc[obj.month] = obj;
        return acc;
      }, {})
    ).map((obj) => obj.month);
  
    const earliestMonth = uniqueMonths && 
    uniqueMonths.length ? parse(`01 ${uniqueMonths[0]} 2025`, "dd MMMM yyyy", dayjs().toDate())
    : dayjs().toDate();
   
      useEffect(() => {
        const newData = [];
        const completedData = [];
        const notCompletedData = [];
        const allParametr = [];
        const completedTaskPrecentege = [];
        const completedAndNotPercentage = [];
        const filterTotalTask = totalTask?.filter(i => i.status == checked);
        setCompletedAndNot([
        {
          name:'Yes',
          value:totalTask?.filter(i => i.completed).length || 0,
          color:'#07db0a'
        },
        {
          name:'No',
          value:totalTask?.filter(i => !i.completed).length || 0,
          color:'#b80d1e'
        }
      ])
        for (let i = 0; i < 6; i++) {
  
          const nextMonthDate = addMonths(earliestMonth, i);
          const nextMonthFormat = format(nextMonthDate, "MMMM");
      
          const totalChecked = checked === 'total'
          
          const tasksInMonth = totalTask?.filter(task => 
          task.month == nextMonthFormat && (!totalChecked ? task.status == checked : true));
         
          const completedTask = totalTask?.filter(task => 
          task.month == nextMonthFormat && task.completed === true && (!totalChecked ? task.status == checked : true));
          
          const notCompletedTask = totalTask?.filter(task => 
          task.month == nextMonthFormat && !task.completed && (!totalChecked ? task.status == checked : true));
          
            newData.push({
              name: nextMonthFormat,
              value: tasksInMonth?.length
            });
            completedData.push({
              name: nextMonthFormat,
              value: completedTask?.length
            })
            notCompletedData.push({
              name: nextMonthFormat,
              value: notCompletedTask?.length
            })
            allParametr.push({
              name:nextMonthFormat,
              total:tasksInMonth?.length,
              completed:completedTask?.length,
              notCompleted:notCompletedTask?.length
            })
            completedTaskPrecentege.push({
              name:nextMonthFormat,
              completedRate: (tasksInMonth?.length && completedTask?.length)
              ? + ( (completedTask.length / tasksInMonth.length) * 100 ).toFixed(2) : 0 
            })
            completedAndNotPercentage.push({
              name:nextMonthFormat,
              completedRate: (tasksInMonth?.length && completedTask?.length)
              ? + ( (completedTask.length / tasksInMonth.length) * 100 ).toFixed(2) : 0,
              notCompletedRate:(tasksInMonth?.length && notCompletedTask?.length)
              ? + ( (notCompletedTask.length / tasksInMonth.length) * 100 ).toFixed(2) : 0,

            })

      };
  
      if(filterTotalTask){
        if (checked == 'total' && totalTask){
          setCommandOrUserTask(totalTask)
        } else{
          setCommandOrUserTask(filterTotalTask);
      }
      setAllData(newData);
      setFullParametrList(allParametr);
      setCompletedPercentage(completedTaskPrecentege);

        }
  }, [totalTask, checked]);
  
  const totalTaskLength = commandOrUserTask?.length;
  const totalCompletedLength = commandOrUserTask?.filter(i => i.completed).length;
  const totalNotCompleted = commandOrUserTask?.filter(i => !i.completed).length;
  
  console.log(allData)

  return (
<DashboardLayout>
<div className="grid grid-cols-1 gap-6 animate-fade-in">
        <CardTitle className="text-slate-100 flex items-center mb-6 md:mt-8 ml-5 mt-20">
            <Activity className="mr-2 h-5 w-5 text-cyan-500" />
              Analytics page
        </CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <StatCard
            title="Total task"
            value={totalTaskLength.toString() || '0'}
            icon={NotebookPen}
            color="primary"
          />
          <StatCard
            title="Completed task"
            value={totalCompletedLength.toString() || '0'}
            icon={CheckCheck}
            color="success"
          />
          <StatCard
            title="Not completed task"
            value={totalNotCompleted.toString() || '0'}
            icon={LucideFileWarning}
            color="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
       
            <LineChartComponent
              title="Total task"
              //@ts-ignore
              data={allData}
              dataKey="value"
              color="#8B5CF6"
              height={300}
            />
       
          </div>
          <div className="lg:col-span-1">
            <PieChartComponent
              title="Completed or no"
              data={completedAndNot}
              height={300}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
         
            <BarChartComponent
              title="All task states"
              data={fullParametrList}
              bars={[
                { dataKey: "total", color: "#1050e8", name: "Total" },
                { dataKey: "completed", color: "#10B981", name: "Completed" },
                { dataKey: "notCompleted", color: "#a3070c", name: "Not completed" },
              ]}
              height={300}
            />

          </div>
          <div className="lg:col-span-1">
            <LineChartComponent
              title="Procent task completed"
              data={completedPercentage}
              dataKey="completedRate"
              color="#10B981"
              height={300}
            />
          </div>
        </div>
      </div>
</DashboardLayout>

  );
};

export default UpdatedAnalyzPage;
