import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

const SAT = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const LIGHT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

function icon(color, label, pulse) {
  return L.divIcon({
    className: "fisher-pin",
    html: `<div style="position:relative;width:14px;height:14px"><span style="display:block;width:14px;height:14px;border-radius:9999px;background:${color};border:2px solid #fff;box-shadow:0 0 0 2px ${color}33"></span>${pulse ? `<span style="position:absolute;inset:0;border-radius:9999px;background:${color};animation:fisher-pulse 1.6s ease-out infinite"></span>` : ""}<div style="position:absolute;left:18px;top:-6px;white-space:nowrap;background:#fff;color:#0A2351;font:600 10px Inter,sans-serif;padding:2px 6px;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.25)">${label}</div></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

function FixSize() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

export default function FisherMap({ center = [10.5, 80], zoom = 6, markers = [], tracks = [], className = "", satellite = true, height = 420 }) {
  return (
    <div style={{ height, position: "relative" }} className={`overflow-hidden rounded-xl ${className}`}>
      <style>{`@keyframes fisher-pulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(3);opacity:0}}`}</style>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
        <FixSize />
        <TileLayer url={satellite ? SAT : LIGHT} attribution="Esri" />
        {tracks.map((t, i) => (
          <Polyline key={`t${i}`} positions={t.path} pathOptions={{ color: t.color || "#1976D2", weight: 2, dashArray: "4 4" }} />
        ))}
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lon]} icon={icon(m.color || "#1976D2", m.label, m.pulse)}>
            {m.popup && <Popup>{m.popup}</Popup>}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}