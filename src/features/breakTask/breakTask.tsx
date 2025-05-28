import { useContext, useEffect, useState } from "react";
import '../../pages/UserPage/UserPage.css'
import { UserContext } from "../../userContext/userContext.js";
import DeleteButton from "../deleteButton/deleteButton.js";
import EditButton from "../editButton/editButton.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store.js";
import { breakTaskState, deleteBreakTask, fetchBreakTask, isEditTask  } from "../../redux/reduxSlice/breakTaskSlice.ts"; 
import type { Task } from "../../types/task.ts";

interface TaskCardProps {
  task: Task;
  mainTaskId:string | undefined;
  onClick:()=>void;
  modalMove:boolean | undefined;
}



export default function BreakTask({ task, mainTaskId, onClick, modalMove  } : TaskCardProps){
  
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const { id } = useContext(UserContext) || {};

  const dispath:AppDispatch = useDispatch();

  const breakTaskArray: Task[] = useSelector(breakTaskState);

  const emptyBreakTask = {
    mainTaskId:'',
    title: 'No exist',
    description: 'Create task',
    completed: false,
    deadline: ''
  }
  
  useEffect(()=>{
    if(mainTaskId){
      dispath(fetchBreakTask({ taskType:'breakTask', id:id || '' }));
    }
  }, [id]);
 
  function LastTrueIndex(){
    let lastTrueIndex = -1; // Если true не найден, вернём -1
    for (let i = breakTaskArray.length - 1; i >= 0; i--) {
      if (breakTaskArray[i].completed === true) {
        lastTrueIndex = i;
        break;
  }
}
  return lastTrueIndex
}
 
  function CorrectBreakTask(){

    const filterBreakTaskArray = breakTaskArray.length > 0 ? 
    breakTaskArray.filter(i => i.mainTaskId == mainTaskId) : []

  if(filterBreakTaskArray){
    for(let i=0; filterBreakTaskArray.length < 5; i++){
        // @ts-ignore
      filterBreakTaskArray.push(emptyBreakTask)
    }
  }

  return filterBreakTaskArray || []
}

function editButtonFunction(task:Task){
  dispath(isEditTask(task));
  onClick();
}
const deleteButtonFunction = (taskId:string) => {
  dispath(deleteBreakTask({taskId, taskType:'breakTask'}));
}


return <div className={`
  ${modalMove  && 'break-task-move'}
   absolute group w-[550px] z-[5999] center`} onClick={(e)=>e.stopPropagation()}>
    
    <div
      className=" overflow-hidden z-[5999]  h-[600px] rounded-2xl 
        bg-gradient-to-b bg-[rgb(5,4,26)] to-slate-900 p-[1px] 
      shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/25"
    >
      <div
        className="inset-0 bg-gradient-to-b z-[5999] from-cyan-500 to-blue-500 opacity-20"
      ></div>
  
      <div
        className="relative rounded-2xl z-[5999] bg-gradient-to-b bg-[rgb(5,4,26)] h-[500px] to-slate-900 p-6"
      >
        <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div><div
          className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br 
          from-blue-500/20 to-cyan-500/0 blur-2xl transition-all duration-500 group-hover:scale-150
          group-hover:opacity-70"></div>
  
        <div className="absolute -right-[1px] -top-[1px] overflow-hidden rounded-tr-2xl">
          <div
            className="absolute h-20 w-20 bg-gradient-to-r from-cyan-500 to-blue-500"
          ></div>
          <div className="absolute h-20 w-20 bg-slate-950/90"></div>
          <div
            className="absolute right-0 top-[22px] h-[2px] w-[56px] rotate-45 bg-gradient-to-r
             from-cyan-500 to-blue-500"
          ></div>
          <span
            className="absolute right-1 top-1 text-[10px] font-semibold text-white"
            >POPULAR</span>
        </div>
   
      <div className="relative">
        <h3 className="text-sm font-medium uppercase tracking-wider">
         
          Break task
        
        </h3>
      
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{task.title}</span>
        </div>
        <p className="mt-2 text-sm text-slate-400">
            {task.description}
        </p>
      </div>


    <div className="relative mt-6 space-y-0">
    
          {CorrectBreakTask()?.map((task, index) => (
          
          <div key={index} 
          onMouseEnter={() => setIsHovered(index)}
          onMouseLeave={() => setIsHovered(null)}
          className="flex items-start gap-4 hover:bg-black p-[18px]">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center 
              rounded-full ${task.completed ? 'bg-green-500' : 'bg-[rgb(28,21,87)] hover:bg-red-500' }` 
              } 
              >
                <svg
                  stroke="white"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-cyan-500"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
                <div className={`${index == LastTrueIndex() ? '' : ''}`}></div>
              </div>
              <div className="-mt-2">
             
                    <p className="text-xl font-medium text-white">{task.title}</p>
                    <p className="text-sm text-slate-400">{task.description}</p>
                 
              
             
              
              </div>
            {isHovered == index && (
              <>
                <DeleteButton onClick={()=>deleteButtonFunction(task._id)} />
                <EditButton onClick={()=>editButtonFunction(task)}/>
              </>
            )}
            
            
          </div>
          
          ))}

    </div>


    <button onClick={onClick}  className="ml-[70px] bg-[rgb(28,88,148)]  
    px-20 z-30 py-3 rounded-md text-white relative 
    font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-[rgb(29,25,80)] 
    after:left-5 overflow-hidden after:bottom-0 after:translate-y-full 
    after:rounded-md after:hover:scale-[300] after:hover:transition-all 
    after:hover:duration-700 after:transition-all after:duration-700 transition-all 
    duration-700 hover:[text-shadow:2px_2px_2px_#fda4af] text-2xl">
  Add break task
</button>


  
    
      </div>
    </div>
  </div>
  
}