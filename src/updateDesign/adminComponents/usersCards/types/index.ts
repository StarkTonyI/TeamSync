
export interface TaskType {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface UserType {
  id: number;
  name: string;
  avatar: string;
  status: string;
  position: string;
  progress: number;
  email: string;
  tasks: TaskType[];
}
