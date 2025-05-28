
import React from 'react';

interface AnimatedBlurProps {
  className?: string;
}

const AnimatedBlur: React.FC<AnimatedBlurProps> = ({ className }) => {
  return (
    <div className={`fixed inset-0 -z-10  overflow-hidden ${className}`}>
      <div 
        className="absolute -top-40 -left-20 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl 
        opacity-30 animate-float"
        style={{ animationDelay: "0s" }}
      />
      <div 
        className="absolute top-60 -right-20 w-96 h-96 bg-blue-500/20 rounded-full filter
        blur-3xl opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div 
        className="absolute bottom-20 left-10 w-64 h-64 bg-cyan-400/20 rounded-full 
        filter blur-3xl opacity-20 animate-float"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
};

export default AnimatedBlur;
