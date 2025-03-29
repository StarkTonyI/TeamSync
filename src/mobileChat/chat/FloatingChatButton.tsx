
import { MessageCircle } from "lucide-react";
import { Button } from "../../uiCompoents/ui/button";

interface FloatingChatButtonProps {
  onClick: () => void;
  chatOpen:boolean
}

const FloatingChatButton = ({ onClick, chatOpen }: FloatingChatButtonProps) => {

  return (
    <Button
      onClick={onClick}
      className={`${chatOpen ? 'top-2 right-[110px] h-12 w-12 absolute' : 
        'bottom-6 right-6 h-14 w-14 fixed'}  z-[1000] rounded-full bg-blue-600 p-0
       hover:bg-blue-700 shadow-lg`}
      aria-label="Open chat"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
};

export default FloatingChatButton;
