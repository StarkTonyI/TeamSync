
import { useState, useEffect } from 'react';
import { Button } from "../../../uiCompoents/ui/button";
import { cn } from "../../../uiCompoents/lib/utils";

interface NavbarProps {
  onOpenAuth: (type: 'login' | 'register') => void;
}

const Navbar = ({ onOpenAuth }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300 px-4 md:px-8", 
        scrolled 
          ? "bg-background/80 backdrop-blur-lg shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="font-bold text-primary-foreground">T</span>
          </div>
          <h1 className="text-xl font-bold">TeamSync</h1>
        </div>
        
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">
            Features
          </a>
          <a href="#testimonials" className="text-foreground/80 hover:text-primary transition-colors">
            Testimonials
          </a>
          <a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors">
            Contact
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="transition-colors"
            onClick={() => onOpenAuth('login')}>
            Login
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 transition-colors"
            onClick={() => onOpenAuth('register')}
          >
            Register
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
