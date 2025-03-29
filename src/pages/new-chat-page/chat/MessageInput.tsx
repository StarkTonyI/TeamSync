
import { File, Send } from "lucide-react";
import { useRef, useState } from "react";

interface MessageInputProps {
  sendMessage:(messageText: string)=>void;
  sendFile:(ev:any) => void
}

export function MessageInput({ sendMessage, sendFile }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-chat-darker">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 w-full bg-chat-lighter/30 text-white placeholder-white/50
          rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-chat-accent"/>
          
          <div
        onClick={handleClick}
        className="p-3 rounded-full bg-chat-accent hover:bg-chat-accent-hover 
          transition-colors">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={sendFile}
                  className="hidden"
                  />
              <File className="w-5 h-5 text-white"/>
          </div>

         
        <button
          type="submit"
          className="p-3 rounded-full bg-chat-accent hover:bg-chat-accent-hover transition-colors"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
}
