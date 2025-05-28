
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Navigation, RotateCcw, Home, AlertTriangle } from "lucide-react";
import { Button } from "../../uiCompoents/ui/button";
import { cn } from "../../uiCompoents/lib/utils";

const WrongWay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [randomTip, setRandomTip] = useState("");

  const tips = [
    "Check the URL for typos",
    "The page might have been moved or deleted",
    "Perhaps you're looking for something that doesn't exist... yet",
    "Double-check your navigation breadcrumbs",
    "Try using the search function",
    "Return to the home page and start over"
  ];

  useEffect(() => {
    // Random helpful tip
    setRandomTip(tips[Math.floor(Math.random() * tips.length)]);
    
    // Animation timing
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-4">
      <div 
        className={cn(
          "max-w-2xl w-full transition-all duration-700 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Error Sign */}
        <div className="mb-8 relative">
          <div className="flex justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-red-600 flex items-center justify-center border-4 border-white relative">
              <AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-white animate-pulse" />
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 p-2 bg-gray-950 text-center">
            <div className="px-6 py-3 bg-gray-800 rounded-md relative">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gray-600 rounded-full"></div>
              <span className="text-sm md:text-base font-mono text-red-400">ERROR CODE 404</span>
            </div>
          </div>
        </div>

        {/* Title and Message */}
        <div className="text-center mb-12 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
            WRONG WAY
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            You've ventured off the mapped routes
          </p>
          <div className="relative py-5">
            <div className="border-t border-gray-700 absolute w-full top-1/2 left-0"></div>
            <div className="relative bg-gray-950 inline-block px-4">
              <Navigation className="h-5 w-5 text-gray-400 inline-block" />
            </div>
          </div>
          <p className="text-gray-400 italic">{randomTip}</p>
        </div>

        {/* Decorative Paths */}
        <div className="hidden md:block relative w-full h-24 mb-8">
          <div className="absolute left-1/4 h-full border-l-2 border-dashed border-gray-700"></div>
          <div className="absolute right-1/4 h-full border-l-2 border-dashed border-gray-700"></div>
          <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-700">
            <div className="absolute -top-1.5 -right-1 w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
          <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <MapPin className="h-6 w-6 text-red-500" />
          </div>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button 
            variant="outline"
            className="group border-gray-700 hover:border-gray-500 hover:bg-gray-800 transition-all"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4 group-hover:text-blue-400" />
              <span>Return to Home</span>
            </Link>
          </Button>
          
          <Button 
            variant="outline"
            className="group border-gray-700 hover:border-gray-500 hover:bg-gray-800 transition-all"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-green-400" />
            <span>Go Back</span>
          </Button>
          
          <Button 
            variant="outline"
            className="group border-gray-700 hover:border-gray-500 hover:bg-gray-800 transition-all"
            onClick={() => window.location.reload()}
          >
            <RotateCcw className="mr-2 h-4 w-4 group-hover:text-purple-400" />
            <span>Try Again</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WrongWay;
