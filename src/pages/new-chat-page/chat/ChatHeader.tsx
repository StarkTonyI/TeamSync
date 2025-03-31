import DeleteMessageTrashIcon from "../../../features/deleteMessage/deleteMessageIcon";

interface ChatHeaderProps {
  name: string;
  status: string;
  onClick:()=>void;
}

export function ChatHeader({ name, status, onClick }: ChatHeaderProps) {
  return (
    <div className="h-16 px-6 flex items-center justify-between border-b border-white/10 bg-chat-darker" >
     
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-white">{name}</h2>
        <span
          className={`inline-block w-2 h-2 rounded-full ${
            status === "online" ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      </div>
    
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-full  transition-colors">
          <DeleteMessageTrashIcon onClick={onClick}/>
        </div>
      </div>

    </div>
  );
}
