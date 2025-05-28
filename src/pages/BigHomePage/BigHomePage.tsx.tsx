import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../../redux/authApi/authApi';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
const BigHomePage = () => {
  
  const { data } = useGetProfileQuery({});  
  const location = useLocation();

  // Проверяем, нужно ли открыть модальное окно
  const isAuthModalOpen = location.pathname === "/login" || location.pathname === "/register";
  const authType = location.pathname === "/login" ? "login" : "register";

  const navigate = useNavigate();

  const openAuthModal = (type: 'login' | 'register') => {
    if (data){
      navigate(`/${data?.role}`)
  }else{
    navigate(`/${type}`, { replace: false });
  }
};
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 to-slate-900">
    <Navbar onOpenAuth={openAuthModal} />
    <main className="flex-grow">
  
      <Hero onOpenAuth={openAuthModal} />
      <Features />
      <Testimonials />
  
      {/* Pricing section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transparent Pricing
            </h2>
            <p className="text-slate-400/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Choose your plan with crystal-clear pricing and enterprise-grade features
            </p>
          </motion.div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {['Starter', 'Professional', 'Enterprise'].map((plan, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`relative group rounded-2xl p-8 backdrop-blur-lg ${
                  i === 1 
                    ? 'bg-gradient-to-b from-blue-900/30 to-purple-900/20 border-2 border-blue-500/30 shadow-2xl shadow-blue-900/30'
                    : 'bg-slate-800/30 border border-slate-700/50'
                }`}
              >
                {i === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold ${
                    i === 1 ? 'text-blue-400' : 'text-slate-200'
                  }`}>
                    {plan}
                  </h3>
  
                  <div className="mb-8">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      ${i === 0 ? '0' : i === 1 ? '24' : '49'}
                    </span>
                    <span className="text-slate-400/90 block mt-1">
                      {i === 0 ? 'Lifetime access' : 'Per user/month'}
                    </span>
                  </div>
  
                  <ul className="space-y-4 text-left mb-10">
                    {[
                      i === 0 ? 'Up to 5 members' : 'Unlimited members',
                      i === 0 ? 'Basic features' : 'Premium features',
                      i === 0 ? '5GB storage' : i === 1 ? '50GB storage' : 'Unlimited storage',
                      i > 0 && 'Advanced analytics',
                      i > 0 && '24/7 support',
                      i === 2 && 'Custom solutions',
                      i === 2 && 'Dedicated manager'
                    ].filter(Boolean).map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-300/90">
                        <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-blue-400" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
  
                  <button
                    onClick={() => openAuthModal('register')}
                    className={`w-full py-3.5 rounded-xl font-medium transition-all ${
                      i === 1 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/20'
                        : 'bg-slate-700/50 hover:bg-slate-700/70 border border-slate-700/50'
                    }`}
                  >
                    {i === 0 ? 'Get Started Free' : 'Start Free Trial'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  
      {/* CTA Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-950/80 backdrop-blur-xl" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="max-w-4xl mx-auto text-center bg-slate-800/30 rounded-2xl p-12 backdrop-blur-lg border border-slate-700/50 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Revolutionize Your Workflow
            </h2>
            <p className="text-slate-400/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Join 50,000+ teams transforming their collaboration with TeamSync
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openAuthModal('register')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-medium text-lg shadow-xl shadow-blue-500/20 transition-all"
            >
              Start 14-Day Free Trial
            </motion.button>
            
            <p className="text-slate-500/90 text-sm mt-4">
              No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  
    <Footer />
    {isAuthModalOpen && (
      <AuthModal 
        isOpen={true} 
        onClose={() => navigate('/')} 
        type={authType} 
      />
    )}
  </div>
  );
};

export default BigHomePage;
