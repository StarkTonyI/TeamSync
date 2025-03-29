import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { useLocation, useNavigate } from 'react-router-dom';

const BigHomePage = () => {
  //const [isAuthModalOpenState, setIsAuthModalOpenState ] = useState(false);
  //const [authTypeState, setAuthTypeState] = useState<'login' | 'register'>('login');
  
  const location = useLocation();

  // Проверяем, нужно ли открыть модальное окно
  const isAuthModalOpen = location.pathname === "/login" || location.pathname === "/register";
  const authType = location.pathname === "/login" ? "login" : "register";

  const navigate = useNavigate();

 

  const openAuthModal = (type: 'login' | 'register') => {
    navigate(`/${type}`, { replace: false });
    //setAuthTypeState(type);
    //setIsAuthModalOpenState(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenAuth={openAuthModal} />
      <main className="flex-grow">

        <Hero onOpenAuth={openAuthModal} />
        <Features />
        <Testimonials />
        
        {/* Pricing section (simplified) */}
        <section id="pricing" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
              Choose the perfect plan for your team's needs with no hidden fees.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {['Starter', 'Professional', 'Enterprise'].map((plan, i) => (
                <div key={i} className="glass-card rounded-xl p-8 relative">
                  {i === 1 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-xs rounded-full text-primary-foreground">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{plan}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">
                      ${i === 0 ? '0' : i === 1 ? '24' : '49'}
                    </span>
                    <span className="text-muted-foreground">
                      {i === 0 ? '/forever' : '/user/month'}
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm mb-8">
                    {[
                      i === 0 ? 'Up to 5 team members' : 'Unlimited team members',
                      i === 0 ? 'Basic features' : 'All features',
                      i === 0 ? '5GB storage' : i === 1 ? '50GB storage' : 'Unlimited storage',
                      i > 0 && 'Advanced analytics',
                      i > 0 && 'Priority support',
                      i === 2 && 'Custom integrations',
                      i === 2 && 'Dedicated account manager'
                    ].filter(Boolean).map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="h-5 w-5 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className={`w-full py-2 rounded-lg transition-colors ${
                      i === 1 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    onClick={() => openAuthModal('register')}
                  >
                    {i === 0 ? 'Start for free' : 'Get started'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact section */}
        <section id="contact" className="py-24 bg-secondary/50 relative overflow-hidden">
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-primary/5 rounded-full filter blur-3xl z-0" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl z-0" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your teamwork?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join thousands of teams already using TeamSync to elevate their collaboration.
              </p>
              <button 
                className="px-8 py-3 bg-primary hover:bg-primary/90 transition-colors rounded-lg text-primary-foreground font-medium"
                onClick={() => openAuthModal('register')}
              >
                Start your free trial
              </button>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      { 
        isAuthModalOpen && 
      <AuthModal 
        isOpen={true} 
        onClose={() =>   navigate('/')} 
        type={authType} 
      />
      }
     
    </div>
  );
};

export default BigHomePage;
