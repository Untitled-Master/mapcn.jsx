"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Hammer,
  Github,
  ArrowLeft,
  Construction,
  MapPin,
  ExternalLink,
  Sun,
  Moon
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UnderWork() {
  // Maintaining the same theme logic as your App.jsx
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden font-sans selection:bg-primary/20 transition-colors duration-500">

      {/* --- HEADER (Matching App.jsx) --- */}
      <header className="px-6 py-4 max-w-5xl mx-auto w-full">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" to="/">
              <MapPin className="size-4 text-primary" />
              <span className="font-semibold tracking-tight text-lg">mapcn.jsx</span>
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1 font-mono uppercase">the .jsx verion of mapcn</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-md hover:bg-accent transition-colors"
            >
              {dark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-blue-500" />}
            </button>
          </div>
        </nav>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full text-center space-y-8 relative z-10 animate-fade-up">

          {/* Visual Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <div className="bg-card border border-border/50 p-8 rounded-3xl shadow-2xl relative">
                <Construction className="size-16 text-primary" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-500 rounded-xl p-2 border-4 border-background shadow-xl rotate-12">
                <Hammer className="size-6 text-white" />
              </div>
            </div>
          </div>

          {/* Heading Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Under Development
            </h1>
            <p className="text-muted-foreground text-lg max-w-sm mx-auto leading-relaxed">
              We are currently porting the documentation and components to the React Vite environment.
            </p>
          </div>

          {/* Contribution Card */}
          <div className="bg-card/50 border border-border/50 rounded-2xl p-6 shadow-sm backdrop-blur-sm space-y-4">
            <p className="text-sm font-medium">
              Want to help speed up the process?
            </p>
            <a
              href="https://github.com/Untitled-Master/mapcn.jsx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all w-full justify-center group"
            >
              <Github className="size-5" />
              Contribute on GitHub
              <ExternalLink className="size-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Back to Safety */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Return to Dashboard
          </Link>

          {/* Credit Badge (Matching your Hero style) */}
          <div className="flex justify-center pt-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border text-[11px] font-medium">
                <span className="text-muted-foreground">Vite Port by</span>
                <span className="text-foreground underline underline-offset-2">
                  <a href="https://github.com/Untitled-Master" target="_blank" rel="noreferrer">
                    Belmehnouf Ahmed
                  </a>
                </span>
             </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER (Matching App.jsx) --- */}
      <footer className="w-full px-6 py-10 border-t border-border/40">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span>Original Library by <a href="https://github.com/AnmolSaini16" target="_blank" className="font-medium text-foreground hover:underline">Anmol Saini</a></span>
            <span>React Vite Port by <a href="https://github.com/Untitled-Master" target="_blank" className="font-medium text-foreground hover:underline">Belmehnouf Ahmed</a></span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Untitled-Master/mapcn.jsx" target="_blank" className="hover:text-foreground transition-colors flex items-center gap-1 font-medium">
              Source Code <Github size={12}/>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
