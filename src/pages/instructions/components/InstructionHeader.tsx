
import React, { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import HeadersNavigate from "../../headersNavigate/headersNavigate";

const InstructionHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className={`sticky  
      top-0 z-50 transition-all duration-300 w-full ${
      isScrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-md" : "bg-transparent"
    }`}>
      <div className="px-4 w-full">
        <div className="flex items-center justify-between w-full h-18 ">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-purple-500" />
            <span className="font-bold text-xl">Instructions</span>
          </div>
          <div>
            <HeadersNavigate image={null}/>
          </div>


        </div>
      </div>
      
      
    </header>
  );
};

export default InstructionHeader;
