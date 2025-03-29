import { useContext, useEffect, useState } from "react";
import { Button } from "../../uiCompoents/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,DialogTitle, DialogTrigger,} from "../../uiCompoents/ui/dialog";
import { Input } from "../../uiCompoents/ui/input";
import { Label } from "../../uiCompoents/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../uiCompoents/ui/select";
import { Textarea } from "../../uiCompoents/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import CreateTaskButton from "../../features/createTaskButton/createTaskButton";
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
interface CreateTaskButtonProps {
  userType: string;

}


export const CreateTaskContent = ({ userType }: CreateTaskButtonProps) => {
  const [open,setOpen] = useState(false);
  const { id } = useContext(UserContext) || {};
  const dispath:AppDispatch = useDispatch();

  const mainTask = useSelector(editMainTaskState);
  const mainTaskAdmin = useSelector(editMainTaskStateAdmin);


  const { handleSubmit,setValue, register } = useForm({
    defaultValues: {
      title:mainTask?.title,
      description: mainTask?.description,
      deadline:mainTask?.deadline,
      priority:mainTask?.priority
    }
  });

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
      if(userType == 'admin'){
        if(!mainTaskAdmin){
          dispath(createMainTask({mainTask:data}));
        } else {
          dispath(editMainTaskFunction({mainTask:data, taskId:mainTaskAdmin._id}));
        }
      } else {
        if(mainTask){
          dispath(editBreakTaskFunction({breakTask:data, taskId:mainTask._id, taskType:'mainTask'}));
        }else {
   
        dispath(createBreakTask({breakTask:data, mainTaskId:id, taskType:'mainTask'}));
        } 
      }
      setOpen(false);
  } catch(e){
    alert('Error:' +  e);
  }
}

  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
     
      <DialogTrigger asChild>
        <Button className="mb-12">Create New Task</Button>
      </DialogTrigger>
     
      <DialogContent className="glass-card animate-scale-in z-[300]">
    
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
     
        <form onSubmit={
          // @ts-ignore
          handleSubmit(onSubmit)}>
          <div className="space-y-4 mt-4 z-[300]">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input { ...register("title", { required:true }) } 
            id="title" placeholder='Enter Break task title' />
          </div>
          <div className="space-y-2">
            <DialogDescription>Description</DialogDescription>
            <Textarea { ...register("description", { required:true }) }
             id="description" placeholder="Enter task description" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select onValueChange={(value: "low" | "medium" | "high") => setValue("priority", value)}>
                <SelectTrigger className="z-[300]">
                  <SelectValue placeholder="Select priority"/>

                </SelectTrigger>
                <SelectContent className="z-[300]">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input 
              { ...register("deadline", { required:true }) }
              id="dueDate" type="date" />
            </div>
          </div>


         <CreateTaskButton name="Add Task"/>
        


          </div>
        </form>
    
   
      </DialogContent>

    </Dialog>
  );
};