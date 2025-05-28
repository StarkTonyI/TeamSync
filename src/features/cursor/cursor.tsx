import { useEffect, useState } from "react";
import './cursor.css'
interface CustomCursorType {
    tools:string
} 
export default function CustomCursor({ tools }:CustomCursorType ) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        document.body.style.cursor = "none"; 
      
        document.addEventListener("mousemove", updatePosition);
        return () => document.removeEventListener("mousemove", updatePosition);
    }, []);


    return (
        <>
            <div
                className={`cursor-${tools}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            />
        </>
    );
}
