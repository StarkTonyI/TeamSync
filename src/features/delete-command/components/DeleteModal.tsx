import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
   AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../../uiCompoents/ui/alert-dialog";
import { Trash2, AlertTriangle } from "lucide-react";
import { cn } from "../../../uiCompoents/lib/utils";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  commandName?: string;
  role:string | undefined;
}

const DeleteModal = ({ isOpen, onClose, onDelete, commandName = "this command", role }: DeleteModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#1A1F2C] border border-[#403E43]/50 text-white max-w-md w-full shadow-[0_0_25px_rgba(0,0,0,0.3)] backdrop-blur-sm animate-in fade-in-0 zoom-in-95 slide-in-from-center duration-150">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="bg-[#2A2134] rounded-full p-3 border border-[#403E43]/50 shadow-[0_0_15px_rgba(155,135,245,0.2)]">
            <Trash2 className="h-7 w-7 text-red-400" strokeWidth={1.5} />
          </div>
        </div>
        
        <AlertDialogHeader className="pt-6">
          <AlertDialogTitle className="text-xl font-semibold text-white text-center">
            { role == 'admin' ? 'Delete command' : 'Leave command' }
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 text-center mt-2">
            Are you sure you want to { role == 'admin' ? 'delete' : 'leave command' } <span className="text-[#9b87f5] font-medium">{commandName}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="my-4 p-3 bg-[#221F26]/70 rounded-lg border border-red-900/30 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-sm text-gray-300">
            This action cannot be undone. This will permanently delete the command and remove it from our servers.
          </p>
        </div>
        
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-2">
          <AlertDialogCancel 
            className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-gray-300 border-[#403E43] hover:text-white transition-colors duration-200"
            onClick={onClose}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            className={cn(
              "w-full sm:w-auto bg-red-900/30 hover:bg-red-900/50 text-white border border-red-900/50",
              "transition-all duration-200 group flex items-center justify-center"
            )}
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-2 group-hover:text-red-300" strokeWidth={1.5} />
            { role == 'admin' ? 'Delete' : 'Leave' }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
