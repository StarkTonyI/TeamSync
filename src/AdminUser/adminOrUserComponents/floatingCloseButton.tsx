import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // или можно любую иконку

export default function FloatingCloseButton({ show, onClose, onClick }: { show: boolean; onClose: () => void, onClick:()=>void; }) {



return (
<AnimatePresence>
  {show && (
    <motion.button

      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={()=>{
        onClose();
        onClick()
      }}
      className="fixed top-7 left-1/2 -translate-x-1/2 z-50 
        bg-gradient-to-br from-red-400 to-rose-500 
        backdrop-blur-lg backdrop-brightness-110
        hover:from-rose-500 hover:to-red-500 
        text-white hover:text-rose-100 
        border-2 border-red-300/30 
        rounded-full px-4 py-3 
        shadow-2xl hover:shadow-lg 
        transition-all duration-300
        group -ml-6"
    >
      <X className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
    </motion.button>
  )}
</AnimatePresence>
    );
}
