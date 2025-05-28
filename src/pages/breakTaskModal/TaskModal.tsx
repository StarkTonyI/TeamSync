
import { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../uiCompoents/ui/dialog";
import { Button } from "../../uiCompoents/ui/button";
import { Textarea } from "../../uiCompoents/ui/textarea";
import { Label } from "../../uiCompoents/ui/label";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { UserContext } from "../../userContext/userContext";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createBreakTask, editBreakTaskFunction, editBreakTaskState, isEditTask } from "../../redux/reduxSlice/breakTaskSlice";
import { useForm } from "react-hook-form";
import { Task } from "../../types/task";

const BreakTaskModal = () => {
  const { breakTaskChangeSignal, setBreakTaskChangeSignal } = useContext(UserContext) || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useContext(UserContext) || {};
  const dispatch:AppDispatch = useDispatch()
  const { mainTask } = useContext(UserContext) || {};
  const breakTaskState = useSelector(editBreakTaskState);
  const { register, handleSubmit, reset, formState:{ errors } } = useForm<Task>();
  
  console.log(mainTask);

  useEffect(() => {
    if (breakTaskState) {
        reset({
            description: breakTaskState.description || "",
            deadline: breakTaskState.deadline || ""
          });
        }
      }, [breakTaskState, reset]);

    const onSubmit = async (breakTaskSubmit: Task) => { 
    try {
      if(breakTaskSubmit.description.length > 40){
        return
      }
      setIsSubmitting(true);
      if(!breakTaskState) {
        dispatch(createBreakTask({breakTask:breakTaskSubmit, mainTaskId:mainTask?._id, taskType:'breakTask', id:id || ''}));
      } else {
        dispatch(editBreakTaskFunction({
          breakTask:breakTaskSubmit, taskId:breakTaskState._id, taskType:'breakTask'}
        ));
        dispatch(isEditTask(null));
    }

      setTimeout(()=>{
        setBreakTaskChangeSignal && setBreakTaskChangeSignal(false);
        setIsSubmitting(false);
        toast.success("Task created successfully!");
      }, 400);

  } catch(e){
    alert('Error:' +  e);
    }
  }

  return (
    <Dialog open={breakTaskChangeSignal} onOpenChange={()=>setBreakTaskChangeSignal ? setBreakTaskChangeSignal(false) : undefined}>
      
      <DialogContent className="bg-modal-background sm:max-w-md animate-fade-in z-[1000]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Create a New SubTask</DialogTitle>

            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4 animate-slide-up">
           
              
              <div className="space-y-2">
              <Label htmlFor="description" className="text-taskapp-gray-light">Description</Label>
              <Textarea
                id="description"
                { ...register("description", { required:true, 
                minLength: {
                value: 5, 
                message: "Minimum 5 characters!"
                },
                maxLength: {
                value: 30,
                message: "No more than 30 characters!"
                },
              }
          )}
                placeholder="Description..."
                className="bg-taskapp-darker border-taskapp-gray-dark focus:border-taskapp-purple min-h-[100px]"
              />
               {errors.description && <p className="text-red-500">{errors.description.message}</p>}
              </div>
            
              
              <div className="space-y-3 flex flex-col">
              <Label className="text-taskapp-gray-light m-[3px]">Deadline</Label>      
              <input { ...register("deadline", { required:true }) }
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                id="age"
                type="date"/>
              </div>

              <DialogFooter className="sm:justify-between gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={()=> setBreakTaskChangeSignal ? setBreakTaskChangeSignal(false) : undefined}
                className="text-taskapp-gray-light hover:text-white border-taskapp-gray-dark hover:bg-taskapp-gray-dark"
              >
                <X size={16} className="mr-2" />
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-taskapp-purple hover:bg-taskapp-purple-hover text-white"
              >
                <Check size={16} className="mr-2" />
                {isSubmitting ? "Creating..." : "Create Task"}
              </Button>
              </DialogFooter>
            </form>

        </DialogHeader>
      </DialogContent>
    
    </Dialog>
  );
};

export default BreakTaskModal;
