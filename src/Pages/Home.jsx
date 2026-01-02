"use client";

import React, { useState, useEffect } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerTooltip,
  MapRoute,
} from "../components/ui/map";
import {
  Truck, Flame, TrendingUp, Zap, MapPin,
  Github, Copy, ArrowRight, Sun, Moon, ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * RECENT DATA PORTED FROM MAPCN
 */
const analyticsData = [
  { lng: -74.006, lat: 40.7128, city: "New York", users: 847, size: 14 },
  { lng: -0.1276, lat: 51.5074, city: "London", users: 623, size: 12 },
  { lng: 139.6917, lat: 35.6895, city: "Tokyo", users: 412, size: 10 },
  { lng: -122.4194, lat: 37.7749, city: "San Francisco", users: 298, size: 9 },
  { lng: 2.3522, lat: 48.8566, city: "Paris", users: 187, size: 8 },
];

function ExampleCard({ label, className, children }) {
  return (
    <div className={cn("rounded-xl overflow-hidden border border-border/50 shadow bg-card relative animate-fade-up", className)}>
      <div className="absolute top-2 left-2 z-10 text-[10px] text-muted-foreground bg-background/90 backdrop-blur-sm rounded px-2 py-1 border border-border/40">
        {label}
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden font-sans selection:bg-primary/20">

      {/* --- HEADER --- */}
      <header className="px-6 py-4 max-w-5xl mx-auto w-full">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a className="flex items-center gap-1.5 hover:opacity-80 transition-opacity" href="/">
              <MapPin className="size-4 text-primary" />
              <span className="font-semibold tracking-tight text-lg">mapcn.jsx</span>
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1 font-mono uppercase">the .jsx verion of mapcn</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Untitled-Master/mapcn.jsx"
              target="_blank"
              className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={16} />
            </a>
            <div className="h-4 w-px bg-border mx-1 hidden sm:block" />
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-md hover:bg-accent transition-colors"
            >
              {dark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-blue-500" />}
            </button>
          </div>
        </nav>
      </header>

      {/* --- HERO SECTION --- */}
      <main className="flex-1 px-6 py-20 mx-auto w-full max-w-5xl">
        <section className="space-y-20">

          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight animate-fade-up">
                Beautiful maps, made simple.
              </h1>
              <p className="text-foreground/80 text-lg max-w-xl mx-auto animate-fade-up [animation-delay:100ms]">
                React Vite version of the beautifully designed, open source map components. Zero config.
              </p>
              {/* CREDIT BADGE */}
              <div className="flex justify-center animate-fade-up [animation-delay:150ms]">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border text-[11px] font-medium">
                    <span className="text-muted-foreground">Vite Port by</span>
                    <span className="text-foreground underline underline-offset-2"><a href="https://github.com/Untitled-Master" target="_blank">Belmehnouf Ahmed</a></span>
                 </div>
              </div>
            </div>

            {/* CMD BOX */}
            <div className="flex justify-center animate-fade-up [animation-delay:200ms] w-full px-4">
              <div className="inline-flex items-center gap-3 bg-secondary/50 border border-border/50 rounded-full px-5 py-2.5 font-mono text-sm max-w-full overflow-x-auto group">
                <span className="text-muted-foreground shrink-0">$</span>
                <code className="whitespace-nowrap">npx shadcn@latest add https://mapcnjsx.vercel.app/maps/map.json</code>
                <button className="text-muted-foreground group-hover:text-foreground transition-colors">
                  <Copy size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 animate-fade-up [animation-delay:300ms]">
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-6 hover:opacity-90 transition-all">
                Get Started <ArrowRight size={16} />
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border border-input bg-background h-10 px-6 hover:bg-accent transition-all">
                View Examples
              </button>
            </div>
          </div>

          {/* --- WIDGET GRID (COPY OF ORIGINAL) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up [animation-delay:400ms]">

            {/* Analytics */}
            <ExampleCard label="Analytics" className="sm:col-span-2 sm:aspect-2/1 aspect-square">
               <div className="absolute top-12 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg p-3 border border-border/50 shadow-lg pointer-events-none">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-bold">Active Users</div>
                <div className="text-2xl font-semibold leading-tight">2,847</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="size-3 text-emerald-500" />
                  <span className="text-xs text-emerald-500 font-bold">+12.5%</span>
                </div>
              </div>
              <Map center={[10, 20]} zoom={1.2}>
                {analyticsData.map((loc) => (
                  <MapMarker key={loc.city} longitude={loc.lng} latitude={loc.lat}>
                    <MarkerContent>
                      <div className="relative flex items-center justify-center">
                        <div className="absolute rounded-full bg-emerald-500/20 animate-pulse" style={{ width: loc.size * 3, height: loc.size * 3 }} />
                        <div className="relative rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" style={{ width: loc.size, height: loc.size }} />
                      </div>
                    </MarkerContent>
                  </MapMarker>
                ))}
              </Map>
            </ExampleCard>

            {/* Delivery */}
            <ExampleCard label="Delivery" className="aspect-square lg:aspect-auto">
              <Map center={[-0.1076, 51.517]} zoom={12}>
                <MapRoute coordinates={[[-0.1276, 51.5074], [-0.105, 51.518], [-0.0876, 51.5274]]} color="#3b82f6" width={4} />
                <MapMarker longitude={-0.105} latitude={51.518}>
                  <MarkerContent>
                    <div className="bg-blue-600 rounded-full p-2 shadow-lg animate-bounce">
                      <Truck className="size-4 text-white" />
                    </div>
                  </MarkerContent>
                </MapMarker>
              </Map>
            </ExampleCard>

            {/* Trending */}
            <ExampleCard label="Trending" className="aspect-square">
              <Map center={[-73.99, 40.735]} zoom={10}>
                <MapMarker longitude={-73.9857} latitude={40.7484}>
                  <MarkerContent>
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full p-2.5 shadow-xl">
                      <Flame className="size-5 text-white" />
                    </div>
                  </MarkerContent>
                  <MarkerTooltip>High Activity</MarkerTooltip>
                </MapMarker>
              </Map>
            </ExampleCard>

            {/* EV Charging */}
            <ExampleCard label="EV Charging" className="aspect-square">
              <Map center={[-122.425, 37.777]} zoom={11}>
                <MapMarker longitude={-122.4194} latitude={37.7749}>
                  <MarkerContent>
                    <div className="bg-emerald-500 rounded-full p-2 border-2 border-white shadow-md">
                      <Zap className="size-4 text-white fill-white" />
                    </div>
                  </MarkerContent>
                </MapMarker>
              </Map>
            </ExampleCard>

            {/* Locate Me */}
            <ExampleCard label="Locate Me" className="aspect-square">
              <Map center={[0, 0]} zoom={1}>
                <MapControls showLocate onLocate={setUserLocation} position="bottom-right" />
                {userLocation && (
                  <MapMarker longitude={userLocation.longitude} latitude={userLocation.latitude}>
                    <MarkerContent>
                      <div className="size-4 rounded-full bg-blue-600 border-2 border-white shadow-2xl animate-ping" />
                    </MarkerContent>
                  </MapMarker>
                )}
              </Map>
            </ExampleCard>

          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full px-6 py-10 border-t border-border/40">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span>Original Library by <a href="https://github.com/AnmolSaini16" target="_blank" className="font-medium text-foreground hover:underline">Anmol Saini</a></span>
            <span>React Vite Port by <a href="https://github.com/Untitled-Master" target="_blank" className="font-medium text-foreground hover:underline">Belmehnouf Ahmed</a></span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/AnmolSaini16/mapcn" target="_blank" className="hover:text-foreground transition-colors flex items-center gap-1">
              GitHub <ExternalLink size={10}/>
            </a>
            <a href="/docs" className="hover:text-foreground transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
