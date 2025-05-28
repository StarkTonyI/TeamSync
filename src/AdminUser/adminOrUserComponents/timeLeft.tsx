import { useState, useEffect } from 'react';
import dayjs from 'dayjs'
export default function TimeLeft({ createdAt, deadline }: { deadline: string, createdAt: string }) {
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [color, setColor] = useState<string>('green');

    useEffect(() => {
        const deadlineDate = new Date(deadline);
        const createdDate = new Date(createdAt);

        const interval = setInterval(() => {
            const now = dayjs().toDate()
        
            const totalTime = deadlineDate.getTime() - createdDate.getTime(); // полное время от создания до дедлайна
            const elapsedTime = now.getTime() - createdDate.getTime(); // время, которое прошло с создания задачи
            const remainingTime = totalTime - elapsedTime; // оставшееся время до дедлайна
            const remainingPercentage = (remainingTime / totalTime) * 100; // процент оставшегося времени

            const daysLeft = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft(`${daysLeft}d ${hoursLeft}h ${minutesLeft}m`);

            // Цвет в зависимости от процента оставшегося времени
            if (remainingPercentage > 70) {
                setColor('green');
            } else if (remainingPercentage > 40) {
                setColor('yellow');
            } else {
                setColor('red');
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [deadline, createdAt]);

    return (
        <div style={{ color }}>
            <p>{timeLeft}</p>
        </div>
    );
}
