import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Github, Sun, Moon } from "lucide-react";

export default function Navbar({ dark, setDark }) {
  return (
    <header className="w-full px-6 py-4 sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" to="/">
            <MapPin className="size-4 text-primary" />
            <span className="font-semibold tracking-tight text-lg">mapcn.jsx</span>
            <span className="hidden sm:block text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1 font-mono uppercase leading-none">
              Vite Version
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1.5 h-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground rounded-md h-8 px-2 gap-1.5 text-muted-foreground"
            href="https://github.com/Untitled-Master/mapcn.jsx"
          >
            <Github className="size-4 text-foreground" />
            <span className="text-xs tabular-nums hidden sm:inline">Contribute</span>
          </a>

          <div className="bg-border shrink-0 w-px h-full mx-2" />

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-md hover:bg-accent transition-colors"
          >
            {dark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-blue-500" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
