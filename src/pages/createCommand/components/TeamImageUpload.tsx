
import React, { useState, useRef } from 'react';
import { Camera, Check, ImageIcon } from 'lucide-react';

interface TeamImageUploadProps {
  onImageChange: (file: File | null) => void;
}

const TeamImageUpload: React.FC<TeamImageUploadProps> = ({ onImageChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
  const file = e.target.files?.[0] || null;

  if (file) {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        setPreview(reader.result as string);
        onImageChange(file);
        setIsLoading(false);
      }, 1200); 
    };
    reader.readAsDataURL(file);
} else {
    setPreview(null);
    onImageChange(null);
}
};


  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

 return (
  <div className="w-full mb-8 animate-fade-up border 
 
  border-white/10" style={{ animationDelay: '0.1s' }}>
    <p className="text-xs uppercase tracking-wider text-white/60 mb-2">Team Image</p>
    
    <div 
      onClick={triggerFileInput}
      className={`
 
        relative w-full h-64 overflow-hidden rounded-xl cursor-pointer 
        ${preview ? '' : 'glass-morphism'} 
        transition-all duration-300 group
      `}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
        </div>
      ) : preview ? (
        <>
          <img 
            src={preview} 
            alt="Team preview" 
            className="w-full h-full object-cover animate-blur-in rounded-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-lg">
              <Camera size={16} className="text-white/80" />
              <span className="text-sm text-white/80">Change image</span>
            </div>
            <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-md p-1 rounded-full">
              <Check size={16} className="text-white" />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-white/60 gap-3">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
            <ImageIcon size={32} className="text-white/40" />
          </div>
          <p className="text-sm">Click to upload team image</p>
          <p className="text-xs text-white/40">Recommended size: 1200 x 800px</p>
        </div>
      )}
    </div>
    
    <input 
      type="file" 
      ref={fileInputRef}
      onChange={handleFileChange}
      accept="image/*" 
      className="hidden"
    />
  </div>
);
};

export default TeamImageUpload;
