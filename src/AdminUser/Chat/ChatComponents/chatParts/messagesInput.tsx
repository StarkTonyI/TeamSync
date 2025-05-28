import { File, MessageCircle } from "lucide-react";
import { Button } from "../../../../uiCompoents/ui/button";
import { CardFooter } from "../../../../uiCompoents/ui/card";
import { useRef, useState } from "react";

interface MessageInputProps {
    sendMessage:(messageText: string)=>void;
    sendFile:(ev:any) => void
  }

export default function MessagesInput({sendFile, sendMessage}:MessageInputProps){
   
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
    
   
   return <form onSubmit={handleSubmit}>
    <CardFooter  className="border-t border-slate-700/50 pt-4">
                <div className="flex items-center w-full space-x-2">
              
                  <input
                    onChange={(e)=>setMessage(e.target.value)}
                    value={message}
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />


                  <div onClick={handleClick} className="p-3 rounded-full bg-chat-accent hover:bg-chat-accent-hover transition-colors">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={sendFile}
                        className="hidden"
                      />
                    <File className="w-5 h-5 text-white"/>
                  </div>

                  <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="h-4 w-4" />
                  </Button>

                </div>
              </CardFooter>
</form>
}