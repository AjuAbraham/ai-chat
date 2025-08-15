'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CodeBlock({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);
  
  const language = className?.replace('language-', '') || 'text';
  const code = String(children).replace(/\n$/, '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-muted/50 px-4 py-2 border-b border-border/50">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-6 w-6 p-0 hover:bg-primary/10"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check className="w-3 h-3 text-green-500" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      </div>
      <pre
        className="overflow-x-auto p-4 bg-muted/30 border border-border/50 rounded-b-lg"
        {...props}
      >
        <code className={`language-${language} text-sm`}>
          {children}
        </code>
      </pre>
    </div>
  );
}