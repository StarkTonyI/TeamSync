import { TaskStats } from "../components/TaskStats";
import { ProgressBar } from "../components/ProgressBar";
import { CreateTaskContent } from "../components/CreateTaskButton";
import { Task } from "../types/task";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchBreakTask, mainTaskState } from "../../redux/reduxSlice/breakTaskSlice";
import { useContext, useEffect } from "react";
import { UserContext } from "../../userContext/userContext";
import { useTotalTaskUserMutation } from "../../redux/totalTaskApi/totalTask";
import BreakTaskModal from "../../features/breakTaskModal/breakTaskModal";

const TaskDashBoard = ({ editOrDelete  }: {editOrDelete:string } ) => {


  const { id } = useContext(UserContext) || {};  
  const dispath:AppDispatch = useDispatch()
  const [totalTaskApi] = useTotalTaskUserMutation();
  const tasks: Task[] = useSelector(mainTaskState);

  const userTask = tasks.filter(i => !i.userId.length);

  const commandTask = tasks.filter(task => task.userId.some(i => i.id == id));
 useEffect(()=>{
  if(id){
    dispath(fetchBreakTask({ taskType:'mainTask', id:id || '' }));
    const taskApiFunction = async() => totalTaskApi(id).unwrap();
    taskApiFunction();
  }
}, [id]);



const totalTask = tasks.length
const completeTask = tasks.filter(i => i.completed).length;
const completeTaskCommand = tasks.filter(task => 
  task.userId.some(user => user.id == id && user.completed === "true")
).length;


return (
    <div className="p-8 w-[90%] mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold white mb-8 animate-fade-in">Task Dashboard</h1>
            <CreateTaskContent userType="user"/>
        </div>
        <TaskStats tasks={tasks}/>
        <ProgressBar completed={completeTask + completeTaskCommand} total={totalTask} />
        <p className="pt-6 pb-10 flex">
          Command task:
        </p>
        <div className="flex justify-center">
        {!commandTask.length ? <span className="font-green"> Task no exist</span> : ""}
        </div>
          { 
          !!commandTask.length &&
          <BreakTaskModal editOrDelete={editOrDelete} tasks={commandTask} />
          }
        <p className="pt-6 pb-10 flex">
          User task:
        </p>
        
        <div className="flex justify-center ">
        {!userTask.length ? <span className="font-green"> Task no exist</span> : ""}
        </div>
          { 
          !!userTask.length &&
          <BreakTaskModal editOrDelete={editOrDelete} tasks={userTask} />
          }
      </div>
    </div>
  );
};

export default TaskDashBoard;


