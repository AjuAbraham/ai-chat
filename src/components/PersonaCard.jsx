import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';

export function PersonaCard({ id, name, bio, avatar, fallback }) {
  return (
    <Card className="h-full flex flex-col gradient-card border-border/50 shadow-sm hover:shadow-glow backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
      <CardHeader className="text-center pb-3">
        <div className="flex justify-center mb-3">
          <Avatar className="w-16 h-16 rounded-full shadow-glow transition-transform hover:scale-110">
            <AvatarImage 
              src={avatar} 
              alt={`${name} profile picture`}
              className="object-cover rounded-full"
            />
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
              {fallback}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-lg font-bold text-foreground">
          {name}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm line-clamp-3">
          {bio}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col justify-end">
        <Button 
          asChild 
          className="w-full gradient-primary shadow-glow hover:shadow-xl transition-all duration-300 group mt-4"
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