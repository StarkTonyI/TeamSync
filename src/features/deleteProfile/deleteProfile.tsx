
import { useState } from "react";
import { Button } from "../../uiCompoents/ui/button";
import { Trash2 } from "lucide-react";
import DeleteModal from "./deleteModal";
import { toast } from "sonner";
import { useDeleteProfileMutation } from "../../redux/authApi/authApi";
import { useNavigate } from "react-router-dom";

interface DeleteProfileType {
  role:string | undefined;
  id:string | undefined;  
}

const DeleteProfile = ({ role, id }:DeleteProfileType ) => {
 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProfile] = useDeleteProfileMutation();
  const navigate = useNavigate();
  const handleDelete = async() => {
  try {
    if(role == 'admin'){
      await deleteProfile(id);
      toast.success("Command successfully deleted", {
        description: "The command has been permanently removed",
        position: "bottom-center",
      });
      localStorage.removeItem('role');
      setTimeout(()=>{
        navigate('/')
        window.location.reload()
      }, 300);

    } else if(role == 'user'){
    await deleteProfile(id);
    toast.success("Profile successfully deleted", {
      description: "The command has been permanently removed",
      position: "bottom-center",
    });
    localStorage.removeItem('role');
    setTimeout(()=>{
      navigate('/');
      window.location.reload()
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
          Delete Profile
        </Button>
     
      
      <DeleteModal 
        type="profile"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        commandName="Your profile"
      />
    </div>
  );
};

export default DeleteProfile;
