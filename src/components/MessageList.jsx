"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CodeBlock } from "@/components/CodeBlock";
import { Card } from "@/components/ui/card";
import { User, Bot } from "lucide-react";

export function MessageList({ messages, isTyping, personaName, personaAvatar }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const MarkdownComponents = {
    p: ({ children }) => (
      <p className="prose prose-sm dark:prose-invert max-w-none mb-3 leading-relaxed" suppressHydrationWarning>
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="prose prose-sm dark:prose-invert max-w-none list-disc list-inside mb-3 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="prose prose-sm dark:prose-invert max-w-none list-decimal list-inside mb-3 space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="prose prose-sm dark:prose-invert max-w-none leading-relaxed">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="prose prose-sm dark:prose-invert max-w-none border-l-4 border-primary/30 pl-4 my-3 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    h1: ({ children }) => (
      <h1 className="prose prose-sm dark:prose-invert max-w-none text-2xl font-bold mb-3 text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="prose prose-sm dark:prose-invert max-w-none text-xl font-semibold mb-2 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="prose prose-sm dark:prose-invert max-w-none text-lg font-medium mb-2 text-foreground">
        {children}
      </h3>
    ),
    code: ({ inline, className, children, ...props }) => {
      if (inline) {
        return (
          <code
            className="bg-muted/20 text-primary px-1.5 py-0.5 rounded-md text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      return <CodeBlock className={className} {...props}>{children}</CodeBlock>;
    },
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6" role="log" aria-live="polite" aria-label="Chat messages">
      {messages.length > 0 ? (
        <div className="mx-4">
          {messages.map((message, index) => (
            <div
              key={`${message}-${index}`}
              className={`flex gap-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              {message.role === "assistant" && (
                <Avatar className="w-10 h-10 shadow-sm">
                  <AvatarImage src={personaAvatar} alt={`${personaName} avatar`} className="object-cover" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}

              <Card
                className={`max-w-[70%] border border-border/50 shadow-sm rounded-2xl ${
                  message.role === "user" ? "gradient-message" : "bg-card"
                }`}
              >
                <div className="p-3">
                  {message.role === "assistant" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight, rehypeRaw]}
                      components={MarkdownComponents}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-end leading-relaxed">{message.content}</p>
                  )}
                </div>
              </Card>

              {message.role === "user" && (
                <Avatar className="w-10 h-10 shadow-sm">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 justify-start animate-fade-in">
              <Avatar className="w-10 h-10 shadow-sm">
                <AvatarImage src={personaAvatar} alt={`${personaName} avatar`} className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>

              <Card className="border border-border/50 shadow-sm rounded-2xl">
                <div className="p-3">
                  <div className="flex items-center gap-2" aria-label={`${personaName} is typing`}>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{personaName} is typing...</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <div className="flex mx-4 gap-4 justify-start animate-fade-in">
          <Avatar>
            <AvatarImage src={personaAvatar} alt={`${personaName} avatar`} className="object-cover" />
            <AvatarFallback className="bg-primary/10 text-primary">
              <Bot className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>

          <Card className="max-w-[70%] shadow-sm border border-border/50 rounded-2xl">
            <div className="p-4">
              <p>Hey! what happening how can i help you?</p>
            </div>
          </Card>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
