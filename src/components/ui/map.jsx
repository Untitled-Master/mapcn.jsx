"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { X, Minus, Plus, Locate, Maximize, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Custom hook for Vite to detect dark mode without next-themes
 */
function useResolvedTheme() {
  const [theme, setTheme] = useState(
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

const MapContext = createContext(null);

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}

const defaultStyles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
};

const DefaultLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex gap-1">
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse" />
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
      <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
    </div>
  </div>
);

export function Map({ children, styles, ...props }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const resolvedTheme = useResolvedTheme();

  const mapStyles = useMemo(
    () => ({
      dark: styles?.dark ?? defaultStyles.dark,
      light: styles?.light ?? defaultStyles.light,
    }),
    [styles]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const mapStyle = resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;

    const mapInstance = new MapLibreGL.Map({
      container: containerRef.current,
      style: mapStyle,
      renderWorldCopies: false,
      attributionControl: {
        compact: true,
      },
      ...props,
    });

    const styleDataHandler = () => setIsStyleLoaded(true);
    const loadHandler = () => setIsLoaded(true);

    mapInstance.on("load", loadHandler);
    mapInstance.on("styledata", styleDataHandler);
    mapRef.current = mapInstance;

    return () => {
      mapInstance.off("load", loadHandler);
      mapInstance.off("styledata", styleDataHandler);
      mapInstance.remove();
      mapRef.current = null;
    };
  }, [isMounted]);

  useEffect(() => {
    if (mapRef.current) {
      setIsStyleLoaded(false);
      mapRef.current.setStyle(
        resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light,
        { diff: true }
      );
    }
  }, [resolvedTheme, mapStyles]);

  const isLoading = !isMounted || !isLoaded || !isStyleLoaded;

  return (
    <MapContext.Provider
      value={{
        map: mapRef.current,
        isLoaded: isMounted && isLoaded && isStyleLoaded,
      }}
    >
      <div ref={containerRef} className="relative w-full h-full min-h-[400px]">
        {isLoading && <DefaultLoader />}
        {isMounted && children}
      </div>
    </MapContext.Provider>
  );
}

const MarkerContext = createContext(null);

function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error("Marker components must be used within MapMarker");
  }
  return context;
}

export function MapMarker({
  longitude,
  latitude,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onDragStart,
  onDrag,
  onDragEnd,
  draggable = false,
  ...markerOptions
}) {
  const { map, isLoaded } = useMap();
  const markerRef = useRef(null);
  const markerElementRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const markerOptionsRef = useRef(markerOptions);

  useEffect(() => {
    if (!isLoaded || !map) return;

    const container = document.createElement("div");
    markerElementRef.current = container;

    const marker = new MapLibreGL.Marker({
      ...markerOptions,
      element: container,
      draggable,
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    markerRef.current = marker;

    const handleClick = (e) => onClick?.(e);
    const handleMouseEnter = (e) => onMouseEnter?.(e);
    const handleMouseLeave = (e) => onMouseLeave?.(e);

    container.addEventListener("click", handleClick);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    const handleDragStart = () => {
      const lngLat = marker.getLngLat();
      onDragStart?.({ lng: lngLat.lng, lat: lngLat.lat });
    };
    const handleDrag = () => {
      const lngLat = marker.getLngLat();
      onDrag?.({ lng: lngLat.lng, lat: lngLat.lat });
    };
    const handleDragEnd = () => {
      const lngLat = marker.getLngLat();
      onDragEnd?.({ lng: lngLat.lng, lat: lngLat.lat });
    };

    marker.on("dragstart", handleDragStart);
    marker.on("drag", handleDrag);
    marker.on("dragend", handleDragEnd);

    setIsReady(true);

    return () => {
      container.removeEventListener("click", handleClick);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      marker.off("dragstart", handleDragStart);
      marker.off("drag", handleDrag);
      marker.off("dragend", handleDragEnd);
      marker.remove();
      markerRef.current = null;
      markerElementRef.current = null;
      setIsReady(false);
    };
  }, [map, isLoaded]);

  useEffect(() => {
    markerRef.current?.setLngLat([longitude, latitude]);
  }, [longitude, latitude]);

  useEffect(() => {
    markerRef.current?.setDraggable(draggable);
  }, [draggable]);

  useEffect(() => {
    if (!markerRef.current) return;
    const prev = markerOptionsRef.current;
    if (prev.offset !== markerOptions.offset) markerRef.current.setOffset(markerOptions.offset ?? [0, 0]);
    if (prev.rotation !== markerOptions.rotation) markerRef.current.setRotation(markerOptions.rotation ?? 0);
    if (prev.rotationAlignment !== markerOptions.rotationAlignment) markerRef.current.setRotationAlignment(markerOptions.rotationAlignment ?? "auto");
    if (prev.pitchAlignment !== markerOptions.pitchAlignment) markerRef.current.setPitchAlignment(markerOptions.pitchAlignment ?? "auto");
    markerOptionsRef.current = markerOptions;
  }, [markerOptions]);

  return (
    <MarkerContext.Provider value={{ markerRef, markerElementRef, map, isReady }}>
      {children}
    </MarkerContext.Provider>
  );
}

export function MarkerContent({ children, className }) {
  const { markerElementRef, isReady } = useMarkerContext();
  if (!isReady || !markerElementRef.current) return null;
  return createPortal(
    <div className={cn("relative cursor-pointer", className)}>
      {children || <DefaultMarkerIcon />}
    </div>,
    markerElementRef.current
  );
}

function DefaultMarkerIcon() {
  return <div className="relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />;
}

export function MarkerPopup({ children, className, closeButton = false, ...popupOptions }) {
  const { markerRef, isReady } = useMarkerContext();
  const containerRef = useRef(null);
  const popupRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const popupOptionsRef = useRef(popupOptions);

  useEffect(() => {
    if (!isReady || !markerRef.current) return;
    const container = document.createElement("div");
    containerRef.current = container;
    const popup = new MapLibreGL.Popup({ offset: 16, ...popupOptions, closeButton: false })
      .setMaxWidth("none")
      .setDOMContent(container);
    popupRef.current = popup;
    markerRef.current.setPopup(popup);
    setMounted(true);
    return () => {
      popup.remove();
      popupRef.current = null;
      containerRef.current = null;
      setMounted(false);
    };
  }, [isReady]);

  useEffect(() => {
    if (!popupRef.current) return;
    const prev = popupOptionsRef.current;
    if (prev.offset !== popupOptions.offset) popupRef.current.setOffset(popupOptions.offset ?? 16);
    if (prev.maxWidth !== popupOptions.maxWidth && popupOptions.maxWidth) popupRef.current.setMaxWidth(popupOptions.maxWidth ?? "none");
    popupOptionsRef.current = popupOptions;
  }, [popupOptions]);

  if (!mounted || !containerRef.current) return null;
  return createPortal(
    <div className={cn("relative rounded-md border bg-popover p-3 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95", className)}>
      {closeButton && (
        <button type="button" onClick={() => popupRef.current?.remove()} className="absolute top-1 right-1 z-10 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
      {children}
    </div>,
    containerRef.current
  );
}

export function MarkerTooltip({ children, className, ...popupOptions }) {
  const { markerRef, markerElementRef, map, isReady } = useMarkerContext();
  const containerRef = useRef(null);
  const popupRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const popupOptionsRef = useRef(popupOptions);

  useEffect(() => {
    if (!isReady || !markerRef.current || !markerElementRef.current || !map) return;
    const container = document.createElement("div");
    containerRef.current = container;
    const popup = new MapLibreGL.Popup({ offset: 16, ...popupOptions, closeOnClick: true, closeButton: false })
      .setMaxWidth("none")
      .setDOMContent(container);
    popupRef.current = popup;
    const markerElement = markerElementRef.current;
    const marker = markerRef.current;
    const handleMouseEnter = () => popup.setLngLat(marker.getLngLat()).addTo(map);
    const handleMouseLeave = () => popup.remove();
    markerElement.addEventListener("mouseenter", handleMouseEnter);
    markerElement.addEventListener("mouseleave", handleMouseLeave);
    setMounted(true);
    return () => {
      markerElement.removeEventListener("mouseenter", handleMouseEnter);
      markerElement.removeEventListener("mouseleave", handleMouseLeave);
      popup.remove();
      popupRef.current = null;
      containerRef.current = null;
      setMounted(false);
    };
  }, [isReady, map]);

  if (!mounted || !containerRef.current) return null;
  return createPortal(
    <div className={cn("rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md animate-in fade-in-0 zoom-in-95", className)}>
      {children}
    </div>,
    containerRef.current
  );
}

export function MarkerLabel({ children, className, position = "top" }) {
  const positionClasses = { top: "bottom-full mb-1", bottom: "top-full mt-1" };
  return (
    <div className={cn("absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-foreground", positionClasses[position], className)}>
      {children}
    </div>
  );
}

const mapControlPositionClasses = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-10 right-2",
};

function ControlGroup({ children }) {
  return <div className="flex flex-col rounded-md border border-border bg-background shadow-sm overflow-hidden [&>button:not(:last-child)]:border-b [&>button:not(:last-child)]:border-border">{children}</div>;
}

function ControlButton({ onClick, label, children, disabled = false }) {
  return (
    <button onClick={onClick} aria-label={label} type="button" disabled={disabled} className={cn("flex items-center justify-center size-8 hover:bg-accent dark:hover:bg-accent/40 transition-colors", disabled && "opacity-50 pointer-events-none cursor-not-allowed")}>
      {children}
    </button>
  );
}

export function MapControls({ position = "bottom-right", showZoom = true, showCompass = false, showLocate = false, showFullscreen = false, className, onLocate }) {
  const { map, isLoaded } = useMap();
  const [waitingForLocation, setWaitingForLocation] = useState(false);

  const handleZoomIn = useCallback(() => map?.zoomTo(map.getZoom() + 1, { duration: 300 }), [map]);
  const handleZoomOut = useCallback(() => map?.zoomTo(map.getZoom() - 1, { duration: 300 }), [map]);
  const handleResetBearing = useCallback(() => map?.resetNorthPitch({ duration: 300 }), [map]);
  const handleLocate = useCallback(() => {
    setWaitingForLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = { longitude: pos.coords.longitude, latitude: pos.coords.latitude };
        map?.flyTo({ center: [coords.longitude, coords.latitude], zoom: 14, duration: 1500 });
        onLocate?.(coords);
        setWaitingForLocation(false);
      }, () => setWaitingForLocation(false));
    }
  }, [map, onLocate]);
  const handleFullscreen = useCallback(() => {
    const container = map?.getContainer();
    if (!container) return;
    document.fullscreenElement ? document.exitFullscreen() : container.requestFullscreen();
  }, [map]);

  if (!isLoaded) return null;
  return (
    <div className={cn("absolute z-10 flex flex-col gap-1.5", mapControlPositionClasses[position], className)}>
      {showZoom && <ControlGroup><ControlButton onClick={handleZoomIn} label="Zoom in"><Plus className="size-4" /></ControlButton><ControlButton onClick={handleZoomOut} label="Zoom out"><Minus className="size-4" /></ControlButton></ControlGroup>}
      {showCompass && <ControlGroup><CompassButton onClick={handleResetBearing} /></ControlGroup>}
      {showLocate && <ControlGroup><ControlButton onClick={handleLocate} label="Find my location" disabled={waitingForLocation}>{waitingForLocation ? <Loader2 className="size-4 animate-spin" /> : <Locate className="size-4" />}</ControlButton></ControlGroup>}
      {showFullscreen && <ControlGroup><ControlButton onClick={handleFullscreen} label="Toggle fullscreen"><Maximize className="size-4" /></ControlButton></ControlGroup>}
    </div>
  );
}

function CompassButton({ onClick }) {
  const { isLoaded, map } = useMap();
  const compassRef = useRef(null);
  useEffect(() => {
    if (!isLoaded || !map || !compassRef.current) return;
    const updateRotation = () => {
      compassRef.current.style.transform = `rotateX(${map.getPitch()}deg) rotateZ(${-map.getBearing()}deg)`;
    };
    map.on("rotate", updateRotation);
    map.on("pitch", updateRotation);
    updateRotation();
    return () => { map.off("rotate", updateRotation); map.off("pitch", updateRotation); };
  }, [isLoaded, map]);
  return (
    <ControlButton onClick={onClick} label="Reset bearing to north">
      <svg ref={compassRef} viewBox="0 0 24 24" className="size-5 transition-transform duration-200" style={{ transformStyle: "preserve-3d" }}>
        <path d="M12 2L16 12H12V2Z" className="fill-red-500" /><path d="M12 2L8 12H12V2Z" className="fill-red-300" />
        <path d="M12 22L16 12H12V22Z" className="fill-muted-foreground/60" /><path d="M12 22L8 12H12V22Z" className="fill-muted-foreground/30" />
      </svg>
    </ControlButton>
  );
}

export function MapPopup({ longitude, latitude, onClose, children, className, closeButton = false, ...popupOptions }) {
  const { map } = useMap();
  const popupRef = useRef(null);
  const container = useMemo(() => document.createElement("div"), []);
  useEffect(() => {
    if (!map) return;
    const popup = new MapLibreGL.Popup({ offset: 16, ...popupOptions, closeButton: false }).setDOMContent(container).setLngLat([longitude, latitude]).addTo(map);
    popup.on("close", () => onClose?.());
    popupRef.current = popup;
    return () => { if (popup.isOpen()) popup.remove(); popupRef.current = null; };
  }, [map]);
  useEffect(() => { popupRef.current?.setLngLat([longitude, latitude]); }, [longitude, latitude]);
  return createPortal(
    <div className={cn("relative rounded-md border bg-popover p-3 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95", className)}>
      {closeButton && (
        <button type="button" onClick={() => { popupRef.current?.remove(); onClose?.(); }} className="absolute top-1 right-1 z-10 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <X className="h-4 w-4" />
        </button>
      )}
      {children}
    </div>,
    container
  );
}

export function MapRoute({ coordinates, color = "#4285F4", width = 3, opacity = 0.8, dashArray }) {
  const { map, isLoaded } = useMap();
  const id = useId();
  const sourceId = `route-source-${id}`;
  const layerId = `route-layer-${id}`;
  useEffect(() => {
    if (!isLoaded || !map) return;
    map.addSource(sourceId, { type: "geojson", data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [] } } });
    map.addLayer({ id: layerId, type: "line", source: sourceId, layout: { "line-join": "round", "line-cap": "round" }, paint: { "line-color": color, "line-width": width, "line-opacity": opacity, ...(dashArray && { "line-dasharray": dashArray }) } });
    return () => { try { if (map.getLayer(layerId)) map.removeLayer(layerId); if (map.getSource(sourceId)) map.removeSource(sourceId); } catch {} };
  }, [isLoaded, map]);
  useEffect(() => {
    if (!isLoaded || !map || coordinates.length < 2) return;
    const source = map.getSource(sourceId);
    if (source) source.setData({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates } });
  }, [isLoaded, map, coordinates]);
  return null;
}
