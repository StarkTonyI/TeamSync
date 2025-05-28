import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, } from "../../uiCompoents/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../uiCompoents/ui/avatar";
import { Button } from "../../uiCompoents/ui/button";
import { AlertTriangle, Trash2, User } from "lucide-react";
import { cn } from "../../uiCompoents/lib/utils";

interface User {
  login: string,
  id: string,
  username: string,
  role: string
  _id:string;


}

interface DeleteUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (userId: string) => void;
}

const DeleteUserModal = ({ user, isOpen, onClose, onDelete }: DeleteUserModalProps) => {


  const handleDelete = () => {
    if (!user) return;
    setTimeout(() => {
      onDelete(user._id);
      onClose();
    
  }, 200)
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-md border border-zinc-800 bg-card text-zinc-100 shadow-2xl">
      <DialogHeader className="flex items-center gap-2">
        <div className="bg-red-900/20 p-2 rounded-full">
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <div className="flex-1">
          <DialogTitle className="text-xl">Delete User</DialogTitle>
          <DialogDescription className="text-zinc-400">
            This action cannot be undone.
          </DialogDescription>
        </div>
    
      </DialogHeader>

      <div className="p-4 my-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 border-2 border-zinc-700">
            <AvatarImage src={''} alt={user.username} />
            <AvatarFallback className="bg-zinc-800 text-zinc-300">
              {user?.username?.split(" ")?.map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="font-medium text-white">{user.username}</h3>
            <p className="text-sm text-zinc-400">{user.login}</p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  user.role === "admin" 
                    ? "bg-purple-500/20 text-purple-300" 
                    : "bg-blue-500/20 text-blue-300"
                )}
              >
                {user.role}
              </span>
         
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-950/20 border border-red-900/20 rounded-lg p-3 text-sm text-red-300">
        <p>Are you sure you want to delete this user? This will permanently remove the user and all associated data from the system.</p>
      </div>

      <DialogFooter className="sm:justify-between gap-2 mt-2">
        <Button
          variant="ghost"
          onClick={onClose}
          className="flex-1 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete User
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
};

export default DeleteUserModal;
