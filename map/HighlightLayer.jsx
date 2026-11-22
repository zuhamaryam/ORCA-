import React from "react";
import { Circle, Polygon, Marker, Tooltip } from "react-leaflet";
import { pinIcon } from "@/components/map/icons";

export default function HighlightLayer({ highlights = [] }) {
  return highlights.map((h, i) => {
    const style = { color: h.color, weight: 3, dashArray: "8 6", className: "orca-highlight", fillOpacity: 0.12 };
    if (h.kind === "circle") {
      return (
        <Circle key={i} center={[h.lat, h.lon]} radius={(h.radiusKm || 30) * 1000} pathOptions={style}>
          <Tooltip>{h.label}</Tooltip>
        </Circle>
      );
    }
    if (h.kind === "polygon" && h.polygon?.length) {
      return (
        <Polygon key={i} positions={h.polygon} pathOptions={style}>
          <Tooltip>{h.label}</Tooltip>
        </Polygon>
      );
    }
    if (h.kind === "marker") {
      return (
        <Marker key={i} position={[h.lat, h.lon]} icon={pinIcon(h.color)}>
          <Tooltip>{h.label}</Tooltip>
        </Marker>
      );
    }
    return null;
  });
}