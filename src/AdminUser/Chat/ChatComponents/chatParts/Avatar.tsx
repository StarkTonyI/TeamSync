import { cn } from '../../../../uiCompoents/lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
  status?: 'online' | 'offline' | 'away';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar = ({ src, alt, status, size = 'md', className }: AvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500'
  };

  return (
    <div className={cn('relative', className)}>
      <div className={cn('rounded-full overflow-hidden', sizeClasses[size])}>
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </div>
      {status && (
        <span 
          className={cn(
            'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-chat-dark',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};

export default Avatar;