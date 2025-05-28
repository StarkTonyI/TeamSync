import { cn } from '../../../../uiCompoents/lib/utils';
import { Message } from './datatime';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageBubble = ({ message, isCurrentUser }: MessageBubbleProps) => {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(message.timestamp);

  return (
    <div 
      className={cn(
        'flex mb-2 message-bubble-in',
        isCurrentUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div 
        className={cn(
          'max-w-[80%] px-4 py-2 rounded-2xl text-chat-bubbleText',
          isCurrentUser ? 'bg-chat-sender rounded-tr-none' : 'bg-chat-receiver rounded-tl-none'
        )}
      >
        <p className="text-sm">{message.content}</p>
        <div className={cn(
          'text-xs mt-1',
          isCurrentUser ? 'text-purple-200' : 'text-gray-400'
        )}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;