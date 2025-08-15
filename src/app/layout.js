import { Inter } from "next/font/google";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dual Persona Talk",
  description:
    "Connect with specialized AI personas for meaningful conversations",
  keywords: "AI, personas, chat, Hitesh, Piyush, conversation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com" />
      </head>
      <body className={inter.className}>
        <TooltipProvider>
          <main className="min-h-screen bg-background">{children}</main>
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}
