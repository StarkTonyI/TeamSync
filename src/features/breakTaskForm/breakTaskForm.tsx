import { useDispatch, useSelector } from "react-redux"
import { createBreakTask, editBreakTaskFunction, editBreakTaskState } from "../../redux/reduxSlice/breakTaskSlice.ts";
import { useForm } from "react-hook-form";
import { AppDispatch } from "../../redux/store.ts";
import { Task } from "../../types/task.ts";
import { useContext, useEffect } from "react";
import { UserContext } from "../../userContext/userContext.tsx";

export default function BreakTaskForm(){

  const dispatch:AppDispatch = useDispatch()
  const { mainTask } = useContext(UserContext) || {};
  const breakTaskState = useSelector(editBreakTaskState);
  const { register, handleSubmit, reset } = useForm<Task>();
  const { id } = useContext(UserContext) || {}; 
    useEffect(() => {
      if (breakTaskState) {
        reset({
          title: breakTaskState.title || "",
          description: breakTaskState.description || "",
          deadline: breakTaskState.deadline || ""
        });
      }
    }, [breakTaskState, reset]);
  
    const onSubmit = async (breakTaskSubmit: Task) => { 
    try {
      if(!breakTaskState){
        dispatch(createBreakTask(
          {breakTask:breakTaskSubmit, mainTaskId:mainTask?._id, taskType:'breakTask', id: id || ''}
        ));
      }else{
        dispatch(editBreakTaskFunction({breakTask:breakTaskSubmit, taskId:breakTaskState._id, taskType:'breakTask'}));
      }
      alert('Succses:' )
  } catch(e){
    alert('Error:' +  e);
    }
  }
   return <div className="flex flex-col items-center  h-screen dark z-[110] justify-center">
      <div onClick={e=>e.stopPropagation()}  className="max-w-md bg-[rgb(12,19,56)] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">{!breakTaskState ? 'Create task' : 'Edit task'}</h2>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
  
          <input
            { ...register("description", { required:true }) }
            placeholder="Description"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 
            focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500
             transition ease-in-out duration-150 pb-[100px]"
            type="text"
          />
        {!breakTaskState &&
        <>
          <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="gender">
            Priority
          </label>

          <select
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 
            focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="gender"
          >
            <option value="male">Low</option>
            <option value="female">Medium</option>
            <option value="other">High</option>
          </select>
        </>
        } 
          <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="age">
            Date
          </label>
          <input
           { ...register("deadline", { required:true }) }
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
            id="age"
            type="date"
          />
        
          <button
      
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            {!breakTaskState ? 'Create' : 'Edit'} break task
          </button>
        </form>
      </div>
    </div>
    
}