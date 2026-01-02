import React from "react";
import { Zap, Moon, Puzzle, Code, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Intro() {
  return (
    <div className="max-w-3xl">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Introduction</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Beautiful, accessible map components for the Vite ecosystem.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {/* About Section */}
        <section className="space-y-4">
          <p className="text-muted-foreground leading-7">
            <strong className="text-foreground">mapcn.jsx</strong> provides beautifully designed, accessible, and customizable map components.
            This is a React Vite port of the original library, built on <a href="https://maplibre.org" target="_blank" className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors">MapLibre GL</a>,
            styled with <a href="https://tailwindcss.com" target="_blank" className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors">Tailwind CSS</a>,
            and designed to work perfectly with <a href="https://ui.shadcn.com" target="_blank" className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors">shadcn/ui</a>.
          </p>
        </section>

        {/* Why Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Why mapcn.jsx?</h2>
          <p className="text-muted-foreground leading-7">
            Most map integrations for React require complex configurations, API keys, or heavy wrapper libraries.
            mapcn.jsx gives you beautiful maps with zero config and free map tiles out of the box.
          </p>
        </section>

        {/* Features Grid */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold tracking-tight">Features</h2>
          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <FeatureCard
              icon={Zap}
              title="Zero Config"
              desc="Works out of the box with free map tiles. No API keys required."
            />
            <FeatureCard
              icon={Moon}
              title="Theme Aware"
              desc="Automatically adapts to light and dark mode using your Tailwind classes."
            />
            <FeatureCard
              icon={Puzzle}
              title="Composable"
              desc="Build complex UIs with simple, composable React components."
            />
            <FeatureCard
              icon={Code}
              title="React Vite"
              desc="Optimized for the modern Vite build tool without Next.js bloat."
            />
          </div>
        </section>

        {/* Next Page Link */}
        <div className="flex items-center justify-between gap-4 mt-14 pt-8 border-t border-border/50">
          <div />
          <Link to="/docs/installation" className="group flex flex-col items-end gap-1.5">
            <span className="text-xs text-muted-foreground">Next</span>
            <span className="text-sm font-medium group-hover:underline underline-offset-4 flex items-center gap-1">
              Installation <ArrowRight className="size-3" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-lg border bg-card p-4 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
          <Icon className="size-4 text-primary" />
        </div>
        <h3 className="font-medium text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
