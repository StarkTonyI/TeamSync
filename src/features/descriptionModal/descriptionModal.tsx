
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../uiCompoents/lib/utils";
import { useToast } from "../../uiCompoents/hooks/use-toast";

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick:(description:string) => void;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({ isOpen, onClose, onClick }) => {
  const [description, setDescription] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {

 
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onClick(description);
    if (description.trim()) {
      toast({
        title: "Description added",
        description: "Your description has been successfully added.",
      });
      onClose();
      setDescription("");
    } else {
      toast({
        title: "Empty description",
        description: "Please enter a description.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0"
      )}
      onClick={onClose}
    >
      <div 
        className={cn(
          "w-full max-w-md transform transition-all duration-300 ease-out",
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-zinc-900 border border-zinc-800 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="inline-block px-2.5 py-1 mb-2 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full">
                  New Entry
                </div>
                <h3 className="text-xl font-semibold text-white">Add Description</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors duration-200"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-zinc-300">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter your description..."
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 focus:border-violet-500 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all duration-200"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoFocus
                />
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleSubmit} 
        className="flex-1 flex items-center justify-center  bg-gradient-to-r from-violet-600 
        to-indigo-600 text-white font-medium rounded-lg hover:from-violet-500 
        hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-violet-900/30 px-4 py-2.5 "
     >
                 
                  Add Description
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-medium rounded-lg border border-zinc-700 hover:border-zinc-600 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;