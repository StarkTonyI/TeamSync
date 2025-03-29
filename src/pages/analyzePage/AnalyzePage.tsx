import { KpiCard } from "./dashboard/KpiCard";
import { AnalyticsChart } from "./dashboard/AnalyticsChart";
import { useTotalTaskAdminMutation, useTotalTaskUserMutation } from "../../redux/totalTaskApi/totalTask";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext/userContext";
import AnalyzeRadioSwitch from "../../features/radio-choose-switch/analyze-switch";
import { analyzeTask } from "./dashboard/AnalyticsChart";
import { format, addMonths, parse } from 'date-fns';
import HeadersNavigate from "../headersNavigate/headersNavigate";
interface valueAnalyzeState {
  name:string, 
  value:number | undefined;
}
const AnalyzePage = (  ) => {

  const { id, role } = useContext(UserContext) || {};

  const [checked, setChecked] = useState('user');
  const [totalTask, setTotalTask] = useState<analyzeTask[]>();

  const [totalTaskApiUser] = useTotalTaskUserMutation();  

  const [totalTaskApiAdmin] = useTotalTaskAdminMutation();
  
  const [allData, setAllData] = useState<valueAnalyzeState[]>([]);
  const [completedData, setCompletedData] = useState<valueAnalyzeState[]>([]);
  const [notCompletedData, setNotCompletedData] = useState<valueAnalyzeState[]>([]);

  const [commandOrUserTask, setCommandOrUserTask] = useState<analyzeTask[]>([])

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
    totalTask.reduce((acc: { [key: string]: analyzeTask }, obj) => {
      if (!acc[obj.month]) acc[obj.month] = obj;
      return acc;
    }, {})
  ).map((obj) => obj.month);

  const earliestMonth = uniqueMonths && 
  uniqueMonths.length ? parse(`01 ${uniqueMonths[0]} 2025`, "dd MMMM yyyy", new Date())
  : new Date();
 
    useEffect(() => {
      const newData = [];
      const completedData = [];
      const notCompletedData = [];

      const filterTotalTask = totalTask?.filter(i => i.status == checked);
      
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
    };

    if(filterTotalTask){
      if (checked == 'total' && totalTask){
        setCommandOrUserTask(totalTask)
      } else{
    setCommandOrUserTask(filterTotalTask);
    }
    setAllData(newData);
    setCompletedData(completedData);
    setNotCompletedData(notCompletedData)
    }
}, [totalTask, checked]);

const totalTaskLength = commandOrUserTask?.length;
const totalCompleted = commandOrUserTask?.filter(i => i.completed).length;
const totalNotCompleted = commandOrUserTask?.filter(i => !i.completed).length;



return (
    <div className="min-h-screen p-8 animate-in fade-in duration-500 bg-[rgb(10,11,31)]">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div>
          <div className="flex justify-between items-center -mt-5">
              <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
              <HeadersNavigate image={null}/>   
          </div>
          <AnalyzeRadioSwitch setChecked={setChecked} role={role || ''}/>
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiCard
            title="Total task"
            value={totalTaskLength || '0'}
            trend="up"
          />
          <KpiCard
            title="Total completed"
            value={totalCompleted || '0'}
            trend="down"
          />
          <KpiCard
            title="Total not completed"
            value={totalNotCompleted || '0'}
            trend="down"
          />
         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnalyticsChart 
            title="Totak task" 
            type="area"
            // @ts-ignore
            data={allData}
          />
          <AnalyticsChart 
            title="Completed task" 
            type="bar"
            // @ts-ignore
            data={completedData}
          />
        </div>

        <div className="grid grid-cols-1 gap-4">

        <AnalyticsChart 
            title="Not completed" 
            type="line"
            // @ts-ignore
            data={notCompletedData}
          />
        
        </div>
      </div>
   
    </div>
  );
};

export default AnalyzePage;