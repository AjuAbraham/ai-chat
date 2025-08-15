import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';

export function PersonaCard({ id, name, bio, avatar, fallback }) {
  return (
    <Card className="hover-scale gradient-card border-border/50 shadow-card backdrop-blur-sm transition-smooth">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Avatar className="w-20 h-20 shadow-glow">
            <AvatarImage 
              src={avatar} 
              alt={`${name} profile picture`}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              {fallback}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl font-bold text-foreground">
          {name}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {bio}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          asChild 
          className="w-full gradient-primary shadow-glow hover:shadow-xl transition-smooth group"
        >
          <Link href={`/chat/${id}`}>
            <MessageCircle className="w-4 h-4 mr-2 group-hover:animate-pulse" />
            Start Chat
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}