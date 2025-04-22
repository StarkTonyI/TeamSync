export interface userId {
  _id:string,
  id:string,
  completed:string
  description:string
}
export interface Task {
  option: string; // Added the missing property
  _id: string;
  title: string;
  description: string;
  mainTask:[];
  deadline: string;
  progress: number;
  priority: 'low' | 'medium' | 'high';
  completed:boolean;
  status: 'todo' | 'in-progress' | 'completed';
  mainTaskId:string;
  userId:userId[];
  name:string;
  creatAt:string
}

export interface ToolsOption {
  id:string;
  taskType:string;
}
