"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageList } from "@/components/MessageList";
import { MessageComposer } from "@/components/MessageComposer";
import { ArrowLeft, Settings } from "lucide-react";

const PERSONAS = {
  hitesh: {
    name: "Hitesh",
    bio: "Senior Full-Stack Developer & Tech Lead",
    avatar: "",
    fallback: "H",
  },
  piyush: {
    name: "Piyush",
    bio: "AI/ML Engineer & Research Scientist",
    avatar: "",
    fallback: "P",
  },
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const persona = params.persona && PERSONAS[params.persona] ? PERSONAS[params.persona] : null;

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!persona) {
      router.push("/");
      return;
    }

    // Set welcome message only on client-side
    setMessages([
      
    ]);
  }, [persona, router]);

  const handleSendMessage = async (inputMessage) => {
    if (!inputMessage.trim()) {
      console.log("Empty message, skipping API call");
      return;
    }

    console.log("handleSendMessage triggered:", { inputMessage, persona: persona.name }); // Debug log

    const updatedMessages = [
      ...messages,
      { role: "user", content: inputMessage },
    ];

    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const endpoint =
        persona.name.toLowerCase() === "hitesh" ? "/api/hitesh" : "/api/piyush";

      console.log("Fetching from endpoint:", endpoint); // Debug log

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      console.log("API response:", data); // Debug log

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
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">{persona.fallback}</span>
              </div>
              <div>
                <h1 className="font-semibold text-foreground">Chat with {persona.name}</h1>
                <p className="text-sm text-muted-foreground">{persona.bio}</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="hover:bg-primary/10">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <MessageList
        messages={messages}
        isTyping={isLoading}
        personaName={persona.name}
        personaAvatar={persona.avatar}
      />

      <MessageComposer
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        disabled={false}
      />
    </div>
  );
}