import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Plus, Minus } from "lucide-react";
import GridLayers from "@/components/map/GridLayers";
import ChlorophyllSatLayer from "@/components/map/ChlorophyllSatLayer";
import FisheriesLayers from "@/components/map/FisheriesLayers";
import CoralLayer from "@/components/map/CoralLayer";
import VesselLayers from "@/components/map/VesselLayers";
import AlertLayer from "@/components/map/AlertLayer";
import { BASEMAPS } from "@/services/mapService";

function ZoomButtons() {
  const map = useMap();
  return (
    <div className="absolute right-2 top-2 z-[1000] flex flex-col overflow-hidden rounded-md border border-[#D8E2EF] bg-white shadow-sm">
      <button onClick={() => map.zoomIn()} aria-label="Zoom in" className="flex h-6 w-6 items-center justify-center text-[#0A2540] hover:bg-[#F0F6FF]"><Plus className="h-3 w-3" /></button>
      <div className="h-px bg-[#D8E2EF]" />
      <button onClick={() => map.zoomOut()} aria-label="Zoom out" className="flex h-6 w-6 items-center justify-center text-[#0A2540] hover:bg-[#F0F6FF]"><Minus className="h-3 w-3" /></button>
    </div>
  );
}

function FixSize() {
  const map = useMap();
  useEffect(() => {
    const invalidate = () => {
      try { map.invalidateSize(); } catch (e) { /* ignore */ }
    };
    const t = setTimeout(invalidate, 100);
    const t2 = setTimeout(invalidate, 500);
    window.addEventListener("resize", invalidate);
    document.addEventListener("visibilitychange", invalidate);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      window.removeEventListener("resize", invalidate);
      document.removeEventListener("visibilitychange", invalidate);
    };
  }, [map]);
  return null;
}

// Compact, non-interactive-by-scroll Leaflet map for dashboard tiles.
export default function MiniMap({ layers = {}, overlays = {}, basemap = "light", center = [14, 78], zoom = 4, className = "" }) {
  const bm = BASEMAPS[basemap] || BASEMAPS.light;
  const all = { ...layers, ...overlays };
  return (
    <div className={`overflow-hidden rounded-xl ${className}`} style={{ position: "relative" }}>
      <MapContainer center={center} zoom={zoom} minZoom={3} maxZoom={8} zoomControl={false} scrollWheelZoom={false} attributionControl={false} style={{ height: "100%", width: "100%" }}>
        <FixSize />
        <TileLayer url={bm.url} />
        <ChlorophyllSatLayer show={all.chlorophyll} opacity={0.78} />
        <GridLayers layers={all} />
        <FisheriesLayers layers={all} />
        <CoralLayer show={all.coral} />
        <VesselLayers layers={all} />
        <AlertLayer show={all.alerts} />
        <ZoomButtons />
      </MapContainer>
    </div>
  );
}