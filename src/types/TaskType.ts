import { Task, userId } from "./task";
export interface TaskType {
    completed: boolean;
    deadline: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    progress: number;
    status: string;
    title: string;
    userId: userId[];
    _id: string;
    option:string;
}
export type Priority = 'high' | 'medium' | 'low';

export interface TeamMember {
  _id:string
  username: string;
  avatar: string;
  task: Task;
  imageUrl:string
}

export interface AnalyzeTask { 
            id: string
            completed:boolean,
            deadline:string,
            day:string,
            month:string,
            year:string,
            status:string,
            deleted:boolean,
            completedDate:[{
              id:string,
              date:Date, 
              completed:boolean
            }],
            users:[{
              userId:string,
              completed:boolean
            }],
            creatAt:string
}

export interface logoType {
     _id: string; imageUrl: string 
}

export interface userTypeInterface {
  _id:string;  
  id: string;
  login: string;
  role: string;
  username:string;
  logo:logoType[];
  imageUrl:null | string;
  }

 export interface setSignalOpenAssignTaskType {            
    signal: boolean; 
    userId: string;
    taskId:string;
  } 
  
export interface Contact {
  id:string; 
  name:string; 
  status:string;
}