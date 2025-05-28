import { useEffect, useState } from 'react';
import { format, addDays, differenceInDays, parseISO } from 'date-fns';
import dayjs from 'dayjs';
export default function useSlidingDates() {
    const [dates, setDates] = useState<string[]>([]);
  
    useEffect(() => {
      const STORAGE_KEY = 'chart_start_date';
  
      const today = dayjs().toDate()
  
      let savedStartDateStr = localStorage.getItem(STORAGE_KEY);
  
      let startDate: Date;
  
      if (!savedStartDateStr) {
        startDate = today;
        localStorage.setItem(STORAGE_KEY, today.toISOString());
      } else {
        startDate = parseISO(savedStartDateStr);
      }
  
      const daysSinceStart = differenceInDays(today, startDate);
  
      if (daysSinceStart >= 7) {
        startDate = addDays(startDate, daysSinceStart - 6);
        localStorage.setItem(STORAGE_KEY, startDate.toISOString());
      }
  
      const generatedDates: string[] = [];
      for (let i = 0; i < 7; i++) {
        const date = addDays(startDate, i);
        generatedDates.push(format(date, 'd MMM'));
      }
  
      setDates(generatedDates);
    }, []);
  
    return dates;
  }
  