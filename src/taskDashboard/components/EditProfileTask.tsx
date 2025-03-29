import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,DialogTitle} from "../../uiCompoents/ui/dialog";
import { Input } from "../../uiCompoents/ui/input";
import { Label } from "../../uiCompoents/ui/label";
import { Textarea } from "../../uiCompoents/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import CreateTaskButton from "../../features/createTaskButton/createTaskButton";
import { useForm } from "react-hook-form";

import { Task } from "../types/task";
import { useEditProfileMutation } from "../../redux/authApi/authApi";


interface EditTask {
    name:string, 
    description:string
}

interface CreateTaskButtonProps {
  setEdit: Dispatch<SetStateAction<boolean>>;
  editMainTask:EditTask
}


export const EditProfileTask = ({ setEdit, editMainTask  }: CreateTaskButtonProps) => {
    const [editProfile] = useEditProfileMutation(); 
    const [open,setOpen] = useState(true);
    const [wrongNumber, setWrongNumber] = useState(false);


    const { handleSubmit,setValue, register } = useForm({
        defaultValues: {
            name:editMainTask?.name,
            description: editMainTask?.description,
    }
  });

  useEffect(() => {
    if (editMainTask) {
      setValue('name', (editMainTask)?.name); // обновляем значение формы
      setValue('description', (editMainTask)?.description);
    }
  }, [editMainTask, setValue]);


  const onSubmit = async (data:Task) => {
    try {   
      if(data.name.length > 15 || data.description.length > 100){
        setWrongNumber(true)
        return 
      }
      setWrongNumber(false)
      await editProfile(data)
      setTimeout(()=>{
        window.location.reload();
      }, 400);
  } catch(e){
    alert('Error:' +  e);
  }
}

    const onClose = ( ) => {
        setOpen(false);
        setEdit(false);
    }
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
   
      <DialogContent className="glass-card animate-scale-in z-[300]">
    
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
    
        <form onSubmit={
        // @ts-ignore
          handleSubmit(onSubmit)}>
          <div className="space-y-4 mt-4 z-[300]">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input { ...register("name", { required:true }) } 
            id="name" placeholder='Enter Break task name' />
            { wrongNumber && <p className="text-red-500">The length must not exceed 15 characters.</p>} 
          </div>
          <div className="space-y-2 pt-[40px] pb-[40px]">
            <DialogDescription>Description</DialogDescription>
            <Textarea { ...register("description", { required:true }) }
             id="description" placeholder="Enter task description" className="h-[200px]" />
            { wrongNumber && <p className="text-red-500">The length must not exceed 100 characters.</p>} 
          </div>
     


         <CreateTaskButton name="Edit Profile"/>
        


          </div>
        </form>
    
   
      </DialogContent>

    </Dialog>
  );
};