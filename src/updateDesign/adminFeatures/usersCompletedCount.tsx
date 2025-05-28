import { userId } from "../../types/task";

export default function usersCompletedCount(task:userId[]){
    const totalUserLength = task.length;
    const mainCompleted = task.filter(i => i.completed == 'true').length; 
    const percentage = mainCompleted !== 0 
    ? Math.round((mainCompleted / totalUserLength) * 100) : 0; 
    return percentage  
}