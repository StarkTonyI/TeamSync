import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { mainTaskStateAdmin } from '../../../../redux/reduxSlice/mainTaskSlice';

const TaskStatistics = () => {
  const mainTaskArray = useSelector(mainTaskStateAdmin);
  const tasks = mainTaskArray.length;

  const UpdateMainTaskArray = mainTaskArray.map(task => {
    const totalTask = task.userId.length;
    const completedTask = task.userId.filter(i => i.completed == 'true').length;
    
    if (totalTask === completedTask && totalTask !== 0) {
        return { ...task, completed: true }; // Создаём обновлённый объект
    }
    
    return task; // Возвращаем неизменённый, если условие не выполнено
});



  const completedTasks = UpdateMainTaskArray.filter(i => i.completed == true).length;
  const inProgress = UpdateMainTaskArray.filter(i => i.status == 'todo').length;
  const highStatus = UpdateMainTaskArray.filter(i => i.priority == 'high').length;
 
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 ">

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card p-6 rounded-xl hover-scale"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Tasks</h3>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-semibold">{counts.total}</span>
          <div className="w-12 h-12">
            
            <CircularProgressbar 
              value={counts.total > 0  ? 100 : 0} 
              text={`${counts.total}`}
              styles={buildStyles({
                textSize: '2rem',
                pathColor: 'hsl(var(--primary))',
                textColor: 'hsl(var(--foreground))',
                trailColor: 'hsl(var(--muted))'
              })}
            />
          
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="glass-card p-6 rounded-xl hover-scale"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Completed</h3>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-semibold">{counts.completed}</span>
          <div className="w-12 h-12">
            
            <CircularProgressbar 
              value={(counts.completed > 0 ? counts.completed / counts.total : 0) * 100} 
              text={`${Math.round((counts.completed > 0 ? counts.completed / counts.total : 0) * 100)}%`}
              styles={buildStyles({
                textSize: '1.5rem',
                pathColor: '#2A9D8F',
                textColor: 'hsl(var(--foreground))',
                trailColor: 'hsl(var(--muted))'
              })}
            />

          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="glass-card p-6 rounded-xl hover-scale"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-2">In Progress</h3>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-semibold">{counts.inProgress}</span>
          <div className="w-12 h-12">
            <CircularProgressbar 
              value={(counts.inProgress > 0 ? counts.inProgress / counts.total : 0) * 100} 
              text={`${Math.round((counts.inProgress > 0 ? counts.inProgress / counts.total : 0) * 100)}%`}
              styles={buildStyles({
                textSize: '1.5rem',
                pathColor: '#E9C46A',
                textColor: 'hsl(var(--foreground))',
                trailColor: 'hsl(var(--muted))'
              })}
            />
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="glass-card p-6 rounded-xl hover-scale"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-2">High priority</h3>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-semibold">{counts.pending}</span>
          <div className="w-12 h-12">
            <CircularProgressbar 
              value={(counts.pending ?  counts.pending / counts.total : 0) * 100} 
              text={`${Math.round((counts.pending ?  counts.pending / counts.total : 0) * 100)}%`}
              styles={buildStyles({
                textSize: '1.5rem',
                pathColor: '#E76F51',
                textColor: 'hsl(var(--foreground))',
                trailColor: 'hsl(var(--muted))'
              })}
            />
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default TaskStatistics;