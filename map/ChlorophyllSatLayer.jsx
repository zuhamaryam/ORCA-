import React from "react";
import { TileLayer } from "react-leaflet";

// Live chlorophyll-a satellite imagery from NASA GIBS (MODIS Aqua, daily composite).
// Public, no API key. The "default" time token resolves to the most recent
// available composite, so the layer always shows current data without date guessing.
const GIBS_CHL_URL =
  "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Aqua_L2_Chlorophyll_A/default/default/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png";

export const GIBS_CHL_ATTRIBUTION = "Chlorophyll-a © NASA GIBS (MODIS Aqua)";

export default function ChlorophyllSatLayer({ show, opacity = 0.8 }) {
  if (!show) return null;
  return (
    <TileLayer
      url={GIBS_CHL_URL}
      attribution={GIBS_CHL_ATTRIBUTION}
      opacity={opacity}
      maxZoom={7}
      zIndex={200}
    />
  );
}