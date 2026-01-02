# mapcn.jsx 🗺️

**Beautiful maps, made simple.**
This is the **React Vite (.jsx)** port of the original [mapcn](https://mapcn.vercel.app/) library. Designed to be accessible, customizable, and high-performance.

[![Belmehnouf Ahmed](https://img.shields.io/badge/Vite--Port--by-Belmehnouf--Ahmed-blue?style=flat-square)](https://github.com/Untitled-Master)
[![Original by Anmol Saini](https://img.shields.io/badge/Original--by-Anmol--Saini-orange?style=flat-square)](https://github.com/AnmolSaini16)

---

## 🚀 One-Command Setup

Built to work seamlessly with **shadcn/ui**. Run the following command in your Vite project to install the component and its dependencies:

```bash
npx shadcn@latest add https://mapcnjsx.vercel.app/maps/map.json
```

---

## ✨ Features

- ⚛️ **Pure React Vite**: No Next.js dependencies, no `next-themes`.
- 🌙 **Automatic Dark Mode**: Detects your Tailwind dark mode class and swaps base maps automatically.
- 📍 **Rich Components**: Markers, Popups, Tooltips, Labels, and Routes.
- 🎮 **Interactive Controls**: Zoom, Compass (North-reset), Geolocation, and Fullscreen.
- 🎨 **Fully Stylable**: Markers are just React components. Style them with Tailwind CSS.
- ⚡ **MapLibre Powered**: High performance, vector-based rendering.

---

## 🛠️ Installation Requirements

Ensure you have the following dependencies installed in your project:

```bash
npm install maplibre-gl lucide-react clsx tailwind-merge
```

### Tailwind Configuration

Add the following animations to your `tailwind.config.js` to enable the "fade-up" effect used in the dashboard:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
      },
    },
  },
}
```

---

## 📖 Quick Start

```jsx
import { Map, MapMarker, MarkerContent, MapControls } from "@/components/ui/map";

export default function MyMap() {
  return (
    <div className="h-[500px] w-full border rounded-xl overflow-hidden">
      <Map
        initialViewState={{
          longitude: -74.006,
          latitude: 40.7128,
          zoom: 12
        }}
      >
        <MapControls showZoom showLocate />

        <MapMarker longitude={-74.006} latitude={40.7128}>
          <MarkerContent>
             <div className="bg-primary p-2 rounded-full shadow-lg border-2 border-white">
                <MapPin className="text-white size-4" />
             </div>
          </MarkerContent>
        </MapMarker>
      </Map>
    </div>
  );
}
```

---

## 🏗️ Available Components

| Component | Description |
| :--- | :--- |
| `Map` | The root provider. Handles MapLibre initialization and theme switching. |
| `MapControls` | UI overlays for Zoom, Compass, Geolocation, and Fullscreen. |
| `MapMarker` | Position a React element at a specific Longitude/Latitude. |
| `MarkerContent` | The wrapper for your custom marker visual. |
| `MarkerTooltip` | A hover-state popup for markers. |
| `MarkerLabel` | A permanent text label for markers (Top/Bottom). |
| `MapRoute` | Draws a GeoJSON LineString (Route) on the map. |
| `MapPopup` | A standalone or marker-linked info window. |

---

## 🤝 Credits

This project is a React Vite adaptation of the incredible work done by the original creators.

- **Original Library & Concept:** [Anmol Saini](https://github.com/AnmolSaini16) ([mapcn](https://github.com/AnmolSaini16/mapcn))
- **React Vite Port:** [Belmehnouf Ahmed](https://github.com/Untitled-Master)

## 📄 License

This project is licensed under the MIT License. Feel free to use it in your personal or commercial projects.

---
*Developed with ❤️ for the React Vite ecosystem.*
