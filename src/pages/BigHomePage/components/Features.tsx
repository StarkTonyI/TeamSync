
import { useRef, useEffect } from 'react';
import { Check, Users, Calendar, ChartBar, Rocket } from 'lucide-react';
import ImageLoader from './ImageLoader';
import { motion } from 'framer-motion';


const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          featuresRef.current?.classList.add('opacity-100');
          featuresRef.current?.classList.add('translate-y-0');
        }
      },
      { threshold: 0.1 }
    );
    
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    
    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      title: "Team Collaboration",
      description: "Real-time communication and file sharing to keep your team aligned and productive.",
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      title: "Smart Scheduling",
      description: "Intelligent calendar management that finds the perfect time for team meetings.",
      icon: <Calendar className="h-6 w-6 text-primary" />
    },
    {
      title: "Performance Analytics",
      description: "Detailed insights into team productivity and project progress.",
      icon: <ChartBar className="h-6 w-6 text-primary" />
    },
    {
      title: "Workflow Automation",
      description: "Automate repetitive tasks and approval flows to save time and reduce errors.",
      icon: <Rocket className="h-6 w-6 text-primary" />
    }
  ];

  return (
<section id="features" className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950/80">
  {/* Floating background elements */}
  <div className="absolute top-1/3 -right-20 w-60 h-60 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-[100px] z-0" />
  <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-[120px] z-0" />
  
  <div className="container mx-auto px-4">
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-center gap-16"
    >
      {/* Text Content */}
      <div className="md:w-1/2 space-y-8">
        <div className="space-y-6">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Built for <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Next-Gen</span> Collaboration
          </motion.h2>
          
          <p className="text-lg text-slate-400/90 leading-relaxed">
            Empower your team with cutting-edge features designed for seamless coordination, 
            intelligent automation, and real-time productivity.
          </p>
          
          <ul className="space-y-5">
            {[
              "AI-powered workflow automation",
              "Military-grade security protocols",
              "Customizable team environments",
              "100+ integrations ecosystem"
            ].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.4 }}
                className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Check className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-slate-300/90">{item}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Features Grid */}
      <div className="md:w-1/2 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-lg hover:bg-slate-800/50 transition-colors group"
            >
              <div className="mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 w-max">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">{feature.title}</h3>
              <p className="text-slate-400/90 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>

    {/* Dashboard Showcase */}
    <motion.div 
      className="mt-24 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="rounded-3xl overflow-hidden border border-slate-700/50 bg-slate-800/20 backdrop-blur-xl shadow-2xl shadow-slate-950/50">
        <div className="pt-12 pb-8 px-12 text-center">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Unified Workspace
          </h3>
          <p className="text-slate-400/90 max-w-2xl mx-auto leading-relaxed">
            Experience the future of team collaboration with our intelligent dashboard
          </p>
        </div>
        <div className="relative -mt-8">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent z-10" />
          <ImageLoader
            src="https://images.unsplash.com/photo-1551434678-e076c223a692"
            alt="Dashboard"
            className="w-full h-auto scale-[1.02] hover:scale-100 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Animated Feature Badges */}
      {[
        { label: "Smart Analytics", position: "top-24 left-24" },
        { label: "Live Updates", position: "top-1/3 right-16" },
        { label: "AI Assistant", position: "bottom-32 left-40" }
      ].map((badge, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", delay: i * 0.2 + 0.5 }}
          className={`absolute ${badge.position} 
          md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800/50 border
           border-slate-700/50 backdrop-blur-md shadow-lg hover:-translate-y-1 transition-transform
          hidden md:visible
           `}
        >
          <div className="h-2.5  w-2.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm font-medium text-slate-300">{badge.label}</span>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
  );
};

export default Features;
