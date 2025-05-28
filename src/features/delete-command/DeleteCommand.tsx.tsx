import { useState } from "react";
import { Button } from "../../uiCompoents/ui/button";
import { Trash2 } from "lucide-react";
import DeleteModal from "./components/DeleteModal";
import { toast } from "sonner";
import { useDeleteCommandMutation } from "../../redux/adminApi/adminApi";
import { useLeaveCommandMutation } from "../../redux/userApi/userApi";

interface DeleteCommandType{
  role:string | undefined;
  id:string | undefined;  
}

const DeleteCommand = ({ role, id }:DeleteCommandType) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCommand] = useDeleteCommandMutation();
  const [leaveCommand] = useLeaveCommandMutation()
 
  const handleDelete = async() => {
    try{
    if(role == 'admin'){
    
      await deleteCommand(id)
    
      toast.success("Command successfully deleted", {
      description: "The command has been permanently removed",
      position: "bottom-center",
    });
    
    setTimeout(()=>{
      window.location.reload();
    }, 300);
  
  } else if(role == 'user'){
    await leaveCommand(id);
    
    toast.success("Profile successfully deleted", {
      description: "The command has been permanently removed",
      position: "bottom-center",
    });  

    setTimeout(()=>{
      window.location.reload();
    }, 300);
  }
    setIsDeleteModalOpen(false);
}catch(err){
  toast.error("Error Блять", {
    description: `Error:${err}`,
    position: "bottom-right",
  });
  }
}
  
  return (
    <div className="">
    
    <Button 
          variant="destructive" 
          onClick={() => setIsDeleteModalOpen(true)}
          className="bg-red-900/40 hover:bg-red-900/60 border border-red-900/50 transition-all duration-200 group"
        >
          <Trash2 className="h-4 w-4 mr-2 group-hover:text-red-300" strokeWidth={1.5} />
          {role == 'admin' ? 'Delete Command' : 'Leave command'}
        </Button>
     
      
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        commandName="Your command"
        role={role}
        
      />
    </div>
  );
};

export default DeleteCommand;
