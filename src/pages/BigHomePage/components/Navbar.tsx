
import { useState, useEffect } from 'react';
import { cn } from "../../../uiCompoents/lib/utils";
import { motion } from 'framer-motion';

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
    "fixed top-0 w-full z-50 transition-all duration-500 px-4 xs:px-5 sm:px-6 md:px-8",
    scrolled 
      ? "bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-slate-950/50 py-3 border-b border-slate-800/50" 
      : "bg-transparent py-4 sm:py-5"
  )}
>
  <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
    
    {/* Логотип */}
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 xs:gap-3 group cursor-pointer flex-shrink-0"
    >
      <div className="h-8 w-8 xs:h-9 xs:w-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
        <span className="font-bold text-white text-lg xs:text-xl">TS</span>
      </div>
      <h1 className="text-lg xs:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
        TeamSync
      </h1>
    </motion.div>

    {/* Навигация */}
    <div className="hidden md:flex flex-1 items-center justify-center gap-5 lg:gap-6 mx-4">
      {[
        { href: '#features', label: 'Features' },
        { href: '#testimonials', label: 'Testimonials' },
        { href: '#pricing', label: 'Pricing' },
        { href: '#contact', label: 'Contact' }
      ].map((link) => (
        <motion.a
          key={link.href}
          whileHover={{ y: -2 }}
          href={link.href}
          className="relative text-slate-300 hover:text-blue-400 transition-colors text-sm xs:text-[15px] font-medium whitespace-nowrap"
        >
          <span className="relative group">
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full" />
          </span>
        </motion.a>
      ))}
    </div>

    {/* Кнопки */}
    <div className="flex items-center flex-shrink-0 gap-2 sm:gap-3 min-w-0">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onOpenAuth('login')}
        className="px-3 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs xs:text-sm sm:text-base whitespace-nowrap text-slate-300 hover:text-blue-400 transition-colors bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-400/30"
      >
        Sign In
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onOpenAuth('register')}
        className="px-3 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs xs:text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all relative overflow-hidden whitespace-nowrap"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        Get Started
      </motion.button>
    </div>
  </div>
</nav>

  
  
  );
};

export default Navbar;
