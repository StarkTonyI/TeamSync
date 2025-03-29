
import React, { useRef, useEffect } from 'react';
import { Check, Users, Calendar, ChartBar, Rocket } from 'lucide-react';
import ImageLoader from './ImageLoader';
import { cn } from '../../../uiCompoents/lib/utils';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const Feature = ({ title, description, icon, index }: FeatureProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add('opacity-100');
          ref.current?.classList.add('translate-y-0');
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={ref}
      className={cn(
        "glass-card rounded-xl p-6 opacity-0 translate-y-8 transition-all duration-700",
        `delay-[${index * 100}ms]`
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

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
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 -right-20 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute bottom-1/3 -left-10 w-40 h-40 bg-primary/5 rounded-full filter blur-3xl z-0" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div 
              ref={featuresRef}
              className="opacity-0 translate-y-8 transition-all duration-700"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Features designed for <span className="text-gradient">modern teams</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform provides everything you need to optimize teamwork and achieve your goals together.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Intuitive interface for teams of all sizes",
                  "Secure data handling with enterprise-grade encryption",
                  "Custom workflows tailored to your team's needs",
                  "Seamless integration with your existing tools"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <Feature
                  key={i}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Product showcase */}
        <div className="mt-24 relative">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="pt-8 pb-4 px-8 text-center">
              <h3 className="text-2xl font-semibold mb-2">Seamless Teamwork Experience</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our intuitive dashboard brings together all the tools your team needs in one place.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <ImageLoader
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="TeamSync Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
          
          {/* Feature badges */}
          <div className="absolute -top-4 left-1/4 glass-card px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-medium">Task Management</span>
            </div>
          </div>
          
          <div className="absolute top-1/4 -right-2 glass-card px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-medium">Project Timeline</span>
            </div>
          </div>
          
          <div className="absolute bottom-1/4 left-10 glass-card px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-medium">Team Chat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
