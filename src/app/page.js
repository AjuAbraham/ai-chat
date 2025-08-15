import { PersonaCard } from "@/components/PersonaCard";
import { MessageCircle, Sparkles } from "lucide-react";
import { personas } from "@/lib/utils";
export const metadata = {
  title: "Dual Persona Talk - AI Chat with Experts",
  description:
    "Connect with specialized AI personas: Hitesh (Full-Stack Developer) and Piyush (AI/ML Engineer). Choose your conversation partner for meaningful discussions.",
  openGraph: {
    title: "Dual Persona Talk - AI Chat with Experts",
    description:
      "Connect with specialized AI personas for expert conversations in web development and AI/ML.",
  },
};

export default function HomePage() {
  return (
    <div className="bg-background w-full flex flex-col justify-center min-h-fit">
      {/* Hero Section */}
      <header className="relative bg-background">
        <div className="absolute inset-0 gradient-primary opacity-5 h-screen"></div>
        <div className="relative max-w-5xl mx-auto px-4 py-10">
          <section className="text-center space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  AI Personas
                </span>
                <Sparkles className="w-5 h-5" />
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold gradient-primary bg-clip-text text-transparent leading-tight">
                Persona Talk
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Connect with specialized AI personas for expert insights.
              </p>
            </div>

            {/* Chat Icon */}
            <div className="flex justify-center">
              <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center shadow-glow transition-transform hover:scale-105">
                <MessageCircle className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>

            {/* Personas Grid */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-8">
              {personas.map((persona) => (
                <div
                  key={persona.id}
                  className="flex flex-col h-full transition-transform hover:scale-105"
                >
                  <PersonaCard
                    id={persona.id}
                    name={persona.name}
                    bio={persona.bio}
                    avatar={persona.avatar}
                    fallback={persona.fallback}
                  />
                </div>
              ))}
            </div>

            {/* Footer Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Select a persona to start your conversation
              </p>
            </div>
          </section>
        </div>
      </header>
    </div>
  );
}
