import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, Code, Braces, Map, Settings, MapPin, MessageSquare, Route, Wrench } from "lucide-react";
import { cn } from "../../lib/utils";

const menuItems = [
  {
    label: "Basics",
    items: [
      { name: "Getting Started", path: "/docs", icon: BookOpen },
      { name: "Installation", path: "/docs/installation", icon: Code },
      { name: "API Reference", path: "/docs/api-reference", icon: Braces },
    ],
  },
  {
    label: "Examples",
    items: [
      { name: "Basic Map", path: "/docs/basic-map", icon: Map },
      { name: "Map Controls", path: "/docs/controls", icon: Settings },
      { name: "Markers", path: "/docs/markers", icon: MapPin },
      { name: "Popups", path: "/docs/popups", icon: MessageSquare },
      { name: "Routes", path: "/docs/routes", icon: Route },
      { name: "Advanced Usage", path: "/docs/advanced-usage", icon: Wrench },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r md:sticky md:block overflow-y-auto">
      <div className="flex h-full flex-col gap-2 p-4">
        {menuItems.map((group) => (
          <div key={group.label} className="mb-4">
            <h4 className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
              {group.label}
            </h4>
            <div className="grid grid-flow-row auto-rows-max gap-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/docs"}
                  className={({ isActive }) =>
                    cn(
                      "group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-foreground",
                      isActive
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground"
                    )
                  }
                >
                  <item.icon className="size-4" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
