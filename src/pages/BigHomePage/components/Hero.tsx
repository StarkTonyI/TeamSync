import ImageLoader from './ImageLoader';
import { ArrowRight, Globe, Heart, LifeBuoy, Sparkles, Zap } from 'lucide-react';
import { motion } from "framer-motion";
interface HeroProps {
  onOpenAuth: (type: 'login' | 'register') => void;
}

const Hero = ({ onOpenAuth }: HeroProps) => {
  return (
    <section className="min-h-screen pt-20 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 to-slate-900">

    {/* Animated background elements */}
    <div className="absolute inset-0 opacity-15">
      <div className="absolute w-full h-full bg-[radial-gradient(#4f6de4_0.5px,transparent_1px)] [background-size:30px_30px] animate-grid-pulse" />
    </div>
    
    {/* Floating gradients */}
    <div className="absolute top-1/4 -left-10 w-60 h-60 bg-gradient-to-r from-blue-600/30 to-purple-600/20 rounded-full blur-[100px] animate-float z-0" />
    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-r from-purple-600/30 to-pink-600/20 rounded-full blur-[120px] animate-float animation-delay-2000 z-0" />
  
    <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row items-center gap-16 relative z-20">
      <div className="flex-1 max-w-2xl">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-blue-400 font-medium mb-8 backdrop-blur-sm"
        >
          <Sparkles className="inline mr-2 h-4 w-4" />
          Teamwork. Reimagined.
        </motion.span>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400 bg-clip-text text-transparent animate-text-gradient">
          Next-Level Collaboration
          <span className="block mt-4">with TeamSync</span>
        </h1>
        
        <p className="text-xl text-slate-400/90 mb-10 max-w-xl leading-relaxed">
          Redefine team synergy with AI-powered workflows, real-time co-creation, and smart automation designed for future-ready teams.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenAuth('register')}
            className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-medium shadow-2xl shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>
  
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 text-lg font-medium backdrop-blur-sm transition-all"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Features
          </motion.button>
        </div>
      </div>
      
      <div className="flex-1 relative w-full max-w-2xl">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative aspect-video rounded-3xl overflow-hidden border-2 border-slate-700/50 bg-slate-800/20 shadow-2xl backdrop-blur-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
          <ImageLoader
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
            alt="Team collaboration"
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
          />
          
          {/* Animated overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 to-transparent">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-lg text-slate-100 font-medium leading-snug">
                "TeamSync became our team's neural center - intuitive, powerful, and beautifully designed."
              </p>
              <p className="text-sm text-slate-400 mt-2">
                — Alex Chen, Tech Lead at FutureCorp
              </p>
            </div>
          </div>
  
          {/* Live status */}
          <div className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-slate-300">Live Demo</span>
          </div>
        </motion.div>
      </div>
    </div>
  
    {/* Stats grid */}
    <div className="container mx-auto mt-20 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: '5K+', label: 'Global Teams', icon: Globe },
          { value: '98%', label: 'Satisfaction', icon: Heart },
          { value: '30%', label: 'Productivity', icon: Zap },
          { value: '24/7', label: 'Support', icon: LifeBuoy }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.5 }}
            className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-colors"
          >
            <stat.icon className="h-8 w-8 text-blue-400 mb-4" />
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Hero;
