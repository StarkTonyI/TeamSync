import { Button } from "../../../uiCompoents/ui/button";
import ImageLoader from './ImageLoader';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenAuth: (type: 'login' | 'register') => void;
}

const Hero = ({ onOpenAuth }: HeroProps) => {
  return (
    <section className="min-h-screen pt-20 flex flex-col justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50 z-10" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-full bg-[radial-gradient(#5b8af7_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 -left-10 w-40 h-40 bg-primary/20 rounded-full filter blur-3xl animate-float z-0" />
      <div className="absolute bottom-1/4 -right-10 w-60 h-60 bg-primary/10 rounded-full filter blur-3xl animate-float animation-delay-200 z-0" />
      
      <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row items-center gap-12 relative z-20">
        <div className="flex-1 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 opacity-0 animate-fade-in">
            Teamwork. Simplified.
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fade-in animate-delay-100">
            Elevate Your Team's Productivity with{" "}
            <span className="text-gradient">TeamSync</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 opacity-0 animate-fade-in animate-delay-200">
            Transform how your team collaborates with our intuitive platform designed for modern workflows. Streamline communication, manage tasks, and achieve goals together—effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in animate-delay-300">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-lg px-6"
              onClick={() => onOpenAuth('register')}
            >
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-muted hover:bg-secondary/50 text-lg"
              onClick={() => {
                const element = document.getElementById('features');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See how it works
            </Button>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <div className="relative w-full aspect-video bg-gradient-to-tr from-primary/5 to-primary/20 rounded-2xl overflow-hidden shadow-2xl opacity-0 animate-fade-in animate-delay-400">
            <div className="absolute inset-0 bg-black/10" />
            <ImageLoader
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
              <p className="text-sm text-foreground/80 font-medium">
                "TeamSync has revolutionized how our team works together. It's the perfect tool for modern teams."
              </p>
              <p className="text-xs text-foreground/60 mt-1">
                — Alex Chen, Product Manager
              </p>
            </div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -top-5 -right-5 glass-card px-4 py-3 rounded-lg opacity-0 animate-fade-in animate-delay-500">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-medium">Live collaboration</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats banner */}
      <div className="container mx-auto mt-16 mb-10">
        <div className="glass-card rounded-xl py-8 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-0 animate-fade-in animate-delay-500">
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">5,000+</p>
            <p className="text-sm text-muted-foreground mt-1">Teams using TeamSync</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">98%</p>
            <p className="text-sm text-muted-foreground mt-1">Customer satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">30%</p>
            <p className="text-sm text-muted-foreground mt-1">Increase in productivity</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">24/7</p>
            <p className="text-sm text-muted-foreground mt-1">Customer support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
