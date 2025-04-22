
export interface User {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'away' | 'offline' | 'busy';
    position: string;
    email: string;
    department: string;
    tasksCompleted: number;
    tasksAssigned: number;
    completionRate: number;
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    assignedTo: string; // user ID
  }
  
  // Sample user data
  export const users: User[] = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=11",
      status: "online",
      position: "Senior Developer",
      email: "alex.j@example.com",
      department: "Engineering",
      tasksCompleted: 18,
      tasksAssigned: 25,
      completionRate: 72
    },
    {
      id: "2",
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/150?img=5",
      status: "busy",
      position: "Product Designer",
      email: "sarah.m@example.com",
      department: "Design",
      tasksCompleted: 15,
      tasksAssigned: 22,
      completionRate: 68
    },
    {
      id: "3",
      name: "Marcus Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "away",
      position: "Project Manager",
      email: "marcus.c@example.com",
      department: "Management",
      tasksCompleted: 32,
      tasksAssigned: 40,
      completionRate: 80
    },
    {
      id: "4",
      name: "Nadia Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=9",
      status: "offline",
      position: "Data Analyst",
      email: "nadia.r@example.com",
      department: "Analytics",
      tasksCompleted: 21,
      tasksAssigned: 30,
      completionRate: 70
    }
  ];
  
  // Sample task data
  export const tasks: Task[] = [
    {
      id: "task1",
      title: "Complete API Documentation",
      description: "Write comprehensive documentation for the new API endpoints",
      completed: true,
      dueDate: "2025-04-15",
      priority: "high",
      assignedTo: "1"
    },
    {
      id: "task2",
      title: "Fix Homepage Responsive Issues",
      description: "Address the responsive layout issues on the homepage for mobile devices",
      completed: false,
      dueDate: "2025-04-10",
      priority: "medium",
      assignedTo: "1"
    },
    {
      id: "task3",
      title: "Review Pull Requests",
      description: "Review and provide feedback on pending pull requests",
      completed: true,
      dueDate: "2025-04-08",
      priority: "high",
      assignedTo: "1"
    },
    {
      id: "task4",
      title: "Setup User Authentication",
      description: "Implement user authentication system with JWT",
      completed: false,
      dueDate: "2025-04-20",
      priority: "high",
      assignedTo: "1"
    },
    {
      id: "task5",
      title: "Create Design System",
      description: "Develop a comprehensive design system for the application",
      completed: true,
      dueDate: "2025-04-05",
      priority: "medium",
      assignedTo: "2"
    },
    {
      id: "task6",
      title: "Update User Onboarding Flow",
      description: "Redesign the user onboarding flow to improve conversion",
      completed: false,
      dueDate: "2025-04-18",
      priority: "high",
      assignedTo: "2"
    },
    {
      id: "task7",
      title: "Project Timeline Planning",
      description: "Create detailed timeline for Q2 projects",
      completed: true,
      dueDate: "2025-04-03",
      priority: "high",
      assignedTo: "3"
    },
    {
      id: "task8",
      title: "Data Migration Plan",
      description: "Develop a plan for migrating user data to the new database",
      completed: false,
      dueDate: "2025-04-25",
      priority: "medium",
      assignedTo: "4"
    }
  ];
  
  // Function to get tasks for a specific user
  export const getTasksByUserId = (userId: string): Task[] => {
    return tasks.filter(task => task.assignedTo === userId);
  };