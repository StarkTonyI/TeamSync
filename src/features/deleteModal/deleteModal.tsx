
import { useState, useEffect, useContext } from 'react';
import { Trash2, AlertCircle, X } from 'lucide-react';
import { useToast } from "../../uiCompoents/hooks/use-toast";
import { UserContext } from '../../userContext/userContext';

interface DeleteMessageModalProps {
  isOpen: boolean | null;
  onClose: () => void;
  messages: [{id:string, sender:string}];
  onDelete: (deleteForAll: boolean) => void;
  recipientName?: string;
}

const DeleteMessageModal = ({
  isOpen,
  onClose,
  messages,
  onDelete,
  recipientName = "Alexey"
}: DeleteMessageModalProps) => {
  const { id } = useContext(UserContext) || {};
  const [deleteForAll, setDeleteForAll] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const { toast } = useToast();
  const idsToRemove = messages.filter((item) => item.sender !== id);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setAnimateOut(false);
      onClose();
    }, 200);
    setDeleteForAll(false);
  };

  const handleDelete = () => {
    onDelete(deleteForAll);
    handleClose();
    toast({
      title: "Messages deleted",
      description: `${messages.length} ${messages.length === 1 ? 'message' : 
        'messages'} ${deleteForAll ? `deleted for you and ${recipientName}` : 'deleted for you'}`,
    });
    setDeleteForAll(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 
      ${animateOut ? 'animate-fade-out' : 'animate-fade-in'}`}
      onClick={handleClose}
    >
      <div 
        className={`w-full max-w-md p-6 rounded-xl ${animateOut ? 'animate-modal-out' : 
          'animate-modal-in'} bg-telegram-bg border border-white/10 shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 mr-3 text-telegram-danger" />
            <h2 className="text-xl font-semibold text-white">Delete Messages</h2>
          </div>
          <button 
            onClick={handleClose} 
            className="p-1 transition-colors rounded-full text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-200 mb-2">
            Are you sure you want to delete {messages.length} {messages.length === 1 ? 'message' : 'messages'}?
          </p>
          <p className="text-gray-400 text-sm">
            This action cannot be undone.
          </p>
        </div>
        
        {recipientName && (
          <label className="flex items-center space-x-3 mb-6 cursor-pointer group">
            <div className="relative flex items-center">
              <input 
                type="checkbox" 
                checked={deleteForAll}
                onChange={idsToRemove.length ? undefined : () => setDeleteForAll(!deleteForAll)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border ${deleteForAll ? 'bg-telegram-accent border-telegram-accent' :
                 'border-gray-600 bg-transparent'} rounded transition-colors group-hover:border-gray-400`}>
                {deleteForAll && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                )}
              </div>
            </div>
            <span className="text-gray-200 group-hover:text-white transition-colors">
                { idsToRemove.length ? (
                    <s> Also delete for {recipientName}</s>
                ) : (
                  <p>Also delete for {recipientName}</p>
                ) }
                
            </span>
          </label>
)}        
        <div className="flex justify-end space-x-3">
            <button onClick={handleClose} className="px-4 py-2 rounded-lg bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white transition-colors">
              Cancel
            </button>
            <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-telegram-danger flex items-center text-white transition-all hover:bg-opacity-90 active:scale-95">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMessageModal;