import TeamForm from './components/TeamForm';
import AnimatedBlur from './components/AnimatedBlur';

const CreateCommandPage = () => {
  return (
    <div className="min-h-screen w-full relative pb-20">
      <AnimatedBlur />
      <div className="container mx-auto px-4 pt-12 md:pt-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <div className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-white/10 text-white/70 mb-4">
            New team
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Create Your Team
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Build a collaborative workspace for your team. Add members, set permissions, 
            and start working together seamlessly.
          </p>
        </div>
        
        <TeamForm />
      </div>
    </div>
  );
};

export default CreateCommandPage;
