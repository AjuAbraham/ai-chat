import { PersonaCard } from '@/components/PersonaCard';
import { MessageCircle, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Dual Persona Talk - AI Chat with Experts',
  description: 'Connect with specialized AI personas: Hitesh (Full-Stack Developer) and Piyush (AI/ML Engineer). Choose your conversation partner for meaningful discussions.',
  openGraph: {
    title: 'Dual Persona Talk - AI Chat with Experts',
    description: 'Connect with specialized AI personas for expert conversations in web development and AI/ML.',
  },
};

export default function HomePage() {
  const personas = [
    {
      id: 'hitesh',
      name: 'Hitesh',
      bio: 'Senior Full-Stack Developer & Tech Lead with expertise in modern web technologies',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      fallback: 'H',
    },
    {
      id: 'piyush', 
      name: 'Piyush',
      bio: 'AI/ML Engineer & Research Scientist specializing in machine learning and data science',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      fallback: 'P',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <section className="text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Sparkles className="w-6 h-6" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  AI Personas
                </span>
                <Sparkles className="w-6 h-6" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent leading-tight">
                Dual Persona Talk
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Connect with specialized AI personas tailored for different expertise areas. 
                Choose your conversation partner and dive into meaningful discussions.
              </p>
            </div>

            {/* Chat Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                <MessageCircle className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            {/* Personas Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
              {personas.map((persona) => (
                <PersonaCard
                  key={persona.id}
                  id={persona.id}
                  name={persona.name}
                  bio={persona.bio}
                  avatar={persona.avatar}
                  fallback={persona.fallback}
                />
              ))}
            </div>

            {/* Footer Info */}
            <div className="mt-16 text-center">
              <p className="text-sm text-muted-foreground">
                Select a persona above to start your conversation
              </p>
            </div>
          </section>
        </div>
      </header>
    </div>
  );
}