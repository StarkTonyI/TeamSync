// @ts-nocheck
import { useEffect, useRef, useState } from "react";

const CustomSwiper = ({ items, slidesPerView = 2 }) => {
    const [index, setIndex] = useState(0);
    const containerRef = useRef(null);
  
    const [slideWidth, setSlideWidth] = useState(0);
  
    useEffect(() => {
      const updateWidth = () => {
        if (containerRef.current) {
          setSlideWidth(containerRef.current.offsetWidth / slidesPerView);
        }
      };
  
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }, [slidesPerView]);
  
    // Функции переключения
    const nextSlide = () => setIndex((prev) => Math.min(prev + 1, items.length - slidesPerView));
    const prevSlide = () => setIndex((prev) => Math.max(prev - 1, 0));
  
    return (
      <div className="relative w-full max-w-[980px] mx-auto overflow-hidden" ref={containerRef}>
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${index * slideWidth}px)`,
          }}
        >
          {items?.map((item, i) => (
            <div key={i} style={{ width: `${slideWidth}px`, flexShrink: 0 }} className="p-2">
              {item}
            </div>
          ))}
        </div>
  
        {/* Кнопки */}
        <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2">{"<"}</button>
        <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2">{">"}</button>
      </div>
    );
  };
  
  export default CustomSwiper