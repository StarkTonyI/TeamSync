import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { useEffect } from 'react';
import { fetchMainTask, mainTaskStateAdmin } from '../../../../redux/reduxSlice/mainTaskSlice';
import { userId } from '../../../../taskDashboard/types/task';
import { TaskType } from '../../../../types/TaskType';


const TaskProgress = ({ onClick }: { onClick: (task: TaskType) => void }) => {
  const dispath:AppDispatch = useDispatch()
  
  useEffect(()=>{
    dispath(fetchMainTask());
  }, []);
  // @ts-ignore
  const mainTaskArray: TaskType[] = useSelector(mainTaskStateAdmin);

  const updateFunction = (task:userId[]) => {
    const totalUserLength = task.length;
    const mainCompleted = task.filter(i => i.completed == 'true').length; 
    const percentage = mainCompleted !== 0 
    ? Math.round((mainCompleted / totalUserLength) * 100) : 0; 
    return percentage  
}
 
const getPriorityColor = (priority: string) => {  
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'bg-[#E76F51]';
    case 'medium':
      return 'bg-[#E9C46A]';
    case 'low':
      return 'bg-[#2A9D8F]';
    default:
      return 'bg-gray-400';
  }
};

const TruncateText = (text:string, maxLength = 17 ) => {
  const truncated = text?.length > maxLength ? text?.slice(0, maxLength) + "..." : text;
  return <span title={text}>{truncated}</span>;
};

  return (
    <div>
      <h2 className="text-xl font-semiboldmb-6 p-4">Task Progress</h2>
      <div className="space-y-4">
      {mainTaskArray && mainTaskArray.map((task:TaskType, index:number) => (
      <motion.div
            key={task._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={()=>onClick(task)}
            className="glass-card p-6 rounded-xl hover-scale min-w-[800px">

          <div className="flex items-center justify-between mb-4">
      
          <div className='flex justify-between'>     
            <div className='flex flex-col'>
              <h3 className="text-base sm:text-lg lg:text-2xl xl:text-3xl z-[3000]">
                {TruncateText(task.title, 16)}
                </h3>
            </div> 
          </div>
          
          <div> 
        
    </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium 
                ${getPriorityColor(task.priority)} bg-opacity-20`}>
                {task.priority}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span>{updateFunction(task.userId)}%</span>
                
              </div>
            
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">

              <motion.div 
                  className={`h-full ${getPriorityColor(task.priority)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${updateFunction(task.userId)}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />

              </div>
            
            </div>
     
      </motion.div>     
      ))}

      </div>
    </div>
  );
};

export default TaskProgress;
