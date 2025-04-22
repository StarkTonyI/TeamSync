//@ts-nocheck
import { useContext, useEffect, useState } from "react";
import { Button } from "../../uiCompoents/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,DialogTitle,} from "../../uiCompoents/ui/dialog";
import { Input } from "../../uiCompoents/ui/input";
import { Label } from "../../uiCompoents/ui/label";
import { Textarea } from "../../uiCompoents/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { UserContext } from "../../userContext/userContext";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { createBreakTask, editBreakTaskFunction } from "../../redux/reduxSlice/breakTaskSlice";
import { Task } from "../types/task";
import { editMainTaskState } from "../../redux/reduxSlice/breakTaskSlice";
import { editMainTaskStateAdmin } from "../../redux/reduxSlice/mainTaskSlice";
import { useSelector } from "react-redux";
import { createMainTask, editMainTaskFunction } from "../../redux/reduxSlice/mainTaskSlice";
import { Popover, PopoverContent, PopoverTrigger } from "../../uiCompoents/ui/popover";
import { cn } from "../../uiCompoents/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";


import PrioritySelect from "../pages/PrioritySelect";
import Calendar from "../../uiCompoents/ui/calendar";
import { useTotalTaskAdminMutation, useTotalTaskUserMutation } from "../../redux/totalTaskApi/totalTask";

interface CreateTaskButtonProps {
  userType: string;
  openModal:boolean;
  setOpenModal: (value: boolean) => void;
}

export const CreateTaskContent = ({ userType, openModal, setOpenModal }: CreateTaskButtonProps) => {
  const [open, setOpen] = useState(false);
  const { id } = useContext(UserContext) || {};

  const [date, setDate] = useState<Date>()
  const [priority, setPriority] = useState("medium")

  const dispath:AppDispatch = useDispatch();

  const mainTask = useSelector(editMainTaskState);
  const mainTaskAdmin = useSelector(editMainTaskStateAdmin);

  const [totalAdminTask] = useTotalTaskAdminMutation();
  const [totalTaskUser] = useTotalTaskUserMutation();
  const { handleSubmit,setValue, register } = useForm({
    defaultValues: {
      title:mainTask?.title,
      description: mainTask?.description,
      deadline:mainTask?.deadline,
      priority:mainTask?.priority
    }
  });

  useEffect(()=>{
    if(openModal) setOpen(true);
  }, [openModal])

  useEffect(() => {
    if (mainTask || mainTaskAdmin) {
      setOpen(true);
      setValue('title', (mainTask || mainTaskAdmin)?.title); // обновляем значение формы
      setValue('description', (mainTask || mainTaskAdmin)?.description);
      setValue('deadline', (mainTask || mainTaskAdmin)?.deadline);
      setValue('priority', (mainTask || mainTaskAdmin)?.priority);
    }
  }, [mainTask, setValue, mainTaskAdmin]);


  const onSubmit = async (data:Task) => {
    try {   
      if(!date){
        return null;
      };
      const fullData = { 
        deadline:date,
        description:data.description,
        priority:priority,
        title:data.title
      }

      if(userType == 'admin'){
        if(!mainTaskAdmin){
          //await totalAdminTask(id).unwrap()
          dispath(createMainTask({mainTask:fullData}));
        } else {
          dispath(editMainTaskFunction({mainTask:fullData, taskId:mainTaskAdmin._id}));
        }
      } else {
        if(mainTask){
          dispath(editBreakTaskFunction({breakTask:fullData, taskId:mainTask._id, taskType:'mainTask'}));
        }else {
          //await totalTaskUser(id).unwrap()
        dispath(createBreakTask({breakTask:fullData, mainTaskId:id, taskType:'mainTask', id:id}));
        } 
      }

      setOpenModal(false);
      setOpen(false);
  } catch(e){
    alert('Error:' +  e);
  }
}
  return (
    <Dialog open={open} onOpenChange={()=>{
      setOpen(false);
      setOpenModal(false);
    }}>
    
   
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800 text-zinc-100 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Create a Task</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Add a new task to your list. Fill out the details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-zinc-300">
                Task Name
              </Label>
              <Input
                id="name"
                placeholder="Enter task name"
                { ...register("title", { required:true }) } 
                className="bg-zinc-800 border-zinc-700 focus:border-violet-500 text-white"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-zinc-300">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Add details about this task"
                { ...register("description", { required:true }) }
                className="bg-zinc-800 border-zinc-700 focus:border-violet-500 text-white min-h-[120px]"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date" className="text-zinc-300">
                Due Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-zinc-800 border-zinc-700 hover:bg-zinc-700",
                      !date && "text-zinc-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-zinc-800 border-zinc-700" align="start">
                  <Calendar setDate={setDate}/>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="priority" className="text-zinc-300">
                Priority
              </Label>
            
              <PrioritySelect 
                value={priority} 
                onChange={setPriority} 
                id="priority" 
              />
            </div>
          </div>
          
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-300"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>



    </Dialog>
  );
};