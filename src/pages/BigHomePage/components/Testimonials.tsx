
import { useRef, useEffect } from 'react';
import { cn } from '../../../uiCompoents/lib/utils';
import { Award } from 'lucide-react';
import ImageLoader from './ImageLoader';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
  delay: number;
}

const Testimonial = ({ quote, author, role, company, avatarUrl, delay }: TestimonialProps) => {
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
        "glass-card rounded-xl p-6 opacity-0 translate-y-8 transition-all duration-700"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <ImageLoader
            src={avatarUrl}
            alt={author}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}, {company}</p>
        </div>
      </div>
      <p className="text-muted-foreground italic">{quote}</p>
    </div>
  );
};

const Testimonials = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current?.classList.add('opacity-100');
          titleRef.current?.classList.add('translate-y-0');
        }
      },
      { threshold: 0.1 }
    );
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);
  
  const testimonials = [
    {
      quote: "TeamSync has transformed how our marketing team collaborates. We've cut meeting time by 30% while improving our campaign coordination.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "GrowthLabs",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      quote: "The analytics dashboard gives me instant visibility into team performance. It's helped us identify bottlenecks and optimize our workflow.",
      author: "David Chen",
      role: "Engineering Lead",
      company: "TechCraft",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      quote: "As a remote team, we needed a solution that would keep us connected and organized. TeamSync does exactly that, and the interface is a joy to use.",
      author: "Mia Williams",
      role: "Operations Manager",
      company: "RemoteFirst",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80"
    },
    {
      quote: "I've tried many team collaboration tools, but TeamSync stands out with its intuitive design and powerful automation features.",
      author: "James Rodriguez",
      role: "Product Manager",
      company: "InnovateNow",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-60 h-60 bg-primary/5 rounded-full filter blur-3xl z-0" />
      <div className="absolute bottom-1/4 -right-10 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={titleRef}
          className="text-center max-w-2xl mx-auto mb-16 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-primary mr-2" />
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
              Trusted by industry leaders
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What our customers say</h2>
          <p className="text-muted-foreground text-lg">
            TeamSync is helping teams around the world transform their collaboration and productivity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <Testimonial
              key={i}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              avatarUrl={testimonial.avatarUrl}
              delay={i * 100}
            />
          ))}
        </div>
        
   

      </div>
    </section>
  );
};

export default Testimonials;
