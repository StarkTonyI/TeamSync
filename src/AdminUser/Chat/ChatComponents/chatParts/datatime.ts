
export interface User {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'away';
  }
  
  export interface Message {
    id: string;
    content: string;
    senderId: string;
    timestamp: Date;
    read: boolean;
  }
  
  export const currentUser: User = {
    id: 'user1',
    name: 'Sophia Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'online'
  };
  
  export const chatPartner: User = {
    id: 'user2',
    name: 'Alex Morgan',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'online'
  };
  
  export const mockMessages: Message[] = [
    {
      id: 'm1',
      content: 'Hey! How are you doing?',
      senderId: 'user2',
      timestamp: new Date('2025-04-10T09:30:00'),
      read: true
    },
    {
      id: 'm2',
      content: 'I\'m good, thanks for asking! Just wrapped up a project. How about you?',
      senderId: 'user1',
      timestamp: new Date('2025-04-10T09:32:00'),
      read: true
    },
    {
      id: 'm3',
      content: 'That\'s awesome! I\'m doing well too. Working on some new designs.',
      senderId: 'user2',
      timestamp: new Date('2025-04-10T09:34:00'),
      read: true
    },
    {
      id: 'm4',
      content: 'Oh nice! Would love to see those sometime.',
      senderId: 'user1',
      timestamp: new Date('2025-04-10T09:35:00'),
      read: true
    },
    {
      id: 'm5',
      content: 'Sure thing! I\'ll share them when they\'re ready. What was your project about?',
      senderId: 'user2',
      timestamp: new Date('2025-04-10T09:37:00'),
      read: true
    },
    {
      id: 'm6',
      content: 'It was a new chat interface with a dark theme. Very sleek!',
      senderId: 'user1',
      timestamp: new Date('2025-04-10T09:39:00'),
      read: true
    },
    {
      id: 'm7',
      content: 'That sounds amazing! Dark themes are my favorite.',
      senderId: 'user2',
      timestamp: new Date('2025-04-10T09:40:00'),
      read: true
    }
  ];