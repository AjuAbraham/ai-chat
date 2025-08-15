"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageList } from "@/components/MessageList";
import { MessageComposer } from "@/components/MessageComposer";
import { ArrowLeft, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { personas } from "@/lib/utils";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const persona = params.persona
    ? personas.find((p) => p.id === params.persona)
    : null;

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!persona) {
      router.push("/");
      return;
    }

    // Set welcome message only on client-side
    setMessages([]);
  }, [persona, router]);

  const handleSendMessage = async (inputMessage) => {
    if (!inputMessage.trim()) {
      console.log("Empty message, skipping API call");
      return;
    }

    console.log("handleSendMessage triggered:", {
      inputMessage,
      persona: persona.name,
    });

    const updatedMessages = [
      ...messages,
      { role: "user", content: inputMessage },
    ];

    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const endpoint =
        persona.name.toLowerCase() === "hitesh" ? "/api/hitesh" : "/api/piyush";

      console.log("Fetching from endpoint:", endpoint);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      console.log("API response:", data);

      if (!data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.result },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "⚠️ Oops! I couldn't process your request.",
          },
        ]);
      }
    } catch (err) {
      console.error("API call error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Network error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!persona) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <span className="text-muted-foreground text-lg animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm p-4 shadow-sm relative">
        <div className="absolute inset-0 gradient-primary opacity-5"></div>
        <div className="relative max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="hover:bg-primary/20 transition-all duration-300 hover:shadow-glow rounded-lg cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 rounded-full shadow-glow transition-transform hover:scale-105">
                <AvatarImage
                  src={persona.avatar}
                  alt={`${persona.name} profile picture`}
                  className="object-cover rounded-full"
                />
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                  {persona.fallback}
                </AvatarFallback>
              </Avatar>
              <h1 className="font-bold text-foreground text-xl">
                Chat with {persona.name}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-background/95">
        <MessageList
          messages={messages}
          isTyping={isLoading}
          personaName={persona.name}
          personaAvatar={persona.avatar}
        />
      </div>

      <div className="border-t border-border/50 bg-card/50 backdrop-blur-sm p-4 shadow-sm border-gradient-primary">
        <MessageComposer
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={false}
        />
      </div>
    </div>
  );
}
