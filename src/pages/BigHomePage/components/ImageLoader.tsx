import React, { useState, useEffect } from 'react';
import { cn } from '../../../uiCompoents/lib/utils';

interface ImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const ImageLoader = ({ src, alt, className, ...props }: ImageLoaderProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
  }, [src]);

  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 bg-muted/30 animate-pulse-slow",
          loaded ? "opacity-0" : "opacity-100",
          "transition-opacity duration-300"
        )}
      />
      <img
        src={src}
        alt={alt}
        className={cn(
          className,
          loaded ? "opacity-100" : "opacity-0",
          "transition-opacity duration-500"
        )}
        {...props}
      />
    </div>
  );
};

export default ImageLoader;
