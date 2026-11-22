import React from "react";
import { Polygon, Popup } from "react-leaflet";
import { useEntity } from "@/hooks/useOceanData";
import { formatTime } from "@/lib/geo";
import MapPopup from "@/components/map/MapPopup";

// Chlorophyll-a is now rendered as a live NASA GIBS satellite tile layer
// (see ChlorophyllSatLayer). This component keeps the demo PFZ polygons.
export default function FisheriesLayers({ layers }) {
  const { data: pfz = [] } = useEntity("PFZAnalysis");

  return (
    <>
      {layers.pfz && pfz.map((p) => (
        <Polygon key={p.id} positions={p.polygon || []} pathOptions={{ color: "#E67E22", weight: 1.5, fillColor: "#f59e0b", fillOpacity: 0.2 + 0.3 * (p.confidence || 0.5) }}>
          <Popup>
            <MapPopup title={`PFZ · ${p.name}`} live={!p.is_demo} rows={[
              ["Confidence", p.confidence != null ? `${Math.round(p.confidence * 100)}%` : null],
              ["SST", p.sst != null ? `${p.sst} °C` : null],
              ["Chlorophyll", p.chlorophyll != null ? `${p.chlorophyll} mg/m³` : null],
              ["Depth", p.depth_m ? `${p.depth_m} m` : null],
              ["Nearest port", p.nearest_port],
              ["Valid until", formatTime(p.valid_until)],
            ]} />
          </Popup>
        </Polygon>
      ))}
    </>
  );
}