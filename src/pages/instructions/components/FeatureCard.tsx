
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../uiCompoents/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  imageAlt: string;
  align: "left" | "right";
  index: number;
  className:string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  image, 
  imageAlt,
  align,
  className,
  }) => {
  const isImageLeft = align === "left";
 

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-center gap-8"
    >
      {/* Image Section */}
      <div className={cn(
        "w-full md:w-1/2", 
        isImageLeft ? "md:order-1" : "md:order-2"
      )}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="relative flex justify-center max-h-[650px] items-center
           overflow-hidden rounded-xl shadow-2xl">
          <img 
            src={image} 
            alt={imageAlt}
            className={`w-[${className ? className : '90'}%] h-auto object-cover rounded-xl`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-70"></div>
        </motion.div>
      </div>
      
      <div className={cn(
        "w-full md:w-1/2",
        isImageLeft ? "md:order-2" : "md:order-1"
      )}>
        <motion.div
          whileHover={{ x: isImageLeft ? 10 : -10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="p-4"
        >
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-900 text-purple-300 mr-3">
              {icon}
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
          <p className="text-gray-300 text-lg mb-4">
            {description}
          </p>
          
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
