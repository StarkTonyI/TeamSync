import { userId } from "../taskDashboard/types/task";
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

export interface logoType {
     _id: string; imageUrl: string 
}
