import TeamForm from './components/TeamForm';
import AnimatedBlur from './components/AnimatedBlur';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
const CreateCommandPage = () => {
  return (
    <div className="min-h-screen w-full relative pb-20 bg-gradient-to-br from-slate-900 to-slate-950">
    <AnimatedBlur />
    <div className="container mx-auto px-4 pt-12 md:pt-20 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <div className="inline-flex rounded-full px-4 py-2 text-sm font-medium bg-slate-800/50 border border-slate-700/50 text-slate-300 mb-4 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
          New Team Space
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
          Create Your Dream Team
        </h1>
        <p className="text-slate-400/90 text-lg max-w-xl mx-auto leading-relaxed">
          Craft a collaborative workspace with custom roles, smart permissions and real-time sync.
        </p>
      </motion.div>
  
      <TeamForm/>

    </div>
  </div>
  );
};

export default CreateCommandPage;
