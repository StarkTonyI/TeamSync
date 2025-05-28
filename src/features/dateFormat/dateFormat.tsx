
// @ts-nocheck
import dayjs from "dayjs";

export default function formatDate(createdAt:string) {
    const inputDate = new Date(createdAt);
    const today = dayjs().toDate() // Сегодняшняя дата (11 марта 2025 в вашем случае)
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // Вчера
  
    const inputDay = new Date(inputDate.setHours(0, 0, 0, 0));
    const todayDay = new Date(today.setHours(0, 0, 0, 0));
    const yesterdayDay = new Date(yesterday.setHours(0, 0, 0, 0));
    
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    if (inputDay.getTime() === todayDay.getTime()) {
      return "Today";
    } else if (inputDay.getTime() === yesterdayDay.getTime()) {
      return "Yesterday";
    } else {
      const day = inputDate.getDate();
      const month = months[inputDate.getMonth()];
      if(day && month){
        return `${day} ${month}`;
      }else{
        return ''
      }
    
    }
  }

export function getLatestItem(array) {
    if (!array || array.length === 0) return null; // Проверка на пустой массив
    return array.reduce((latest, current) => 
      new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
    );
  }
 
export function MessageFilter(sender: string, recipient: string, data) {
    return data?.filter(i => 
      (i.sender === sender && i.recipient === recipient) || 
      (i.sender === recipient && i.recipient === sender)
    );
}