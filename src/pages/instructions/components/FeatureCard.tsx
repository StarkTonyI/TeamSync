
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
  className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-6 md:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-300"
>
  {/* Image Section */}
  <div className={cn(
    "w-full md:w-1/2", 
    isImageLeft ? "md:order-1" : "md:order-2"
  )}>
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex justify-center items-center overflow-hidden rounded-2xl shadow-2xl border border-gray-800"
    >
      <img 
        src={image} 
        alt={imageAlt}
        className={`w-[${className || '90'}%] h-auto object-cover rounded-2xl`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    </motion.div>
  </div>
  
  {/* Text Section */}
  <div className={cn(
    "w-full md:w-1/2",
    isImageLeft ? "md:order-2" : "md:order-1"
  )}>
    <motion.div
      whileHover={{ x: isImageLeft ? 8 : -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="space-y-5"
    >
      <div className="flex items-center mb-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-700 text-white shadow-md mr-4">
          {icon}
        </div>
        <h3 className="text-3xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 text-base leading-relaxed">
        {description}
      </p>
    </motion.div>
  </div>
</motion.div>

  );
};

export default FeatureCard;
