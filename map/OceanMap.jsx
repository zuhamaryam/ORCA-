import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, ZoomControl, Marker, Tooltip, useMap } from "react-leaflet";
import GridLayers from "@/components/map/GridLayers";
import ChlorophyllSatLayer from "@/components/map/ChlorophyllSatLayer";
import FisheriesLayers from "@/components/map/FisheriesLayers";
import CoralLayer from "@/components/map/CoralLayer";
import VesselLayers from "@/components/map/VesselLayers";
import AlertLayer from "@/components/map/AlertLayer";
import HighlightLayer from "@/components/map/HighlightLayer";
import { pinIcon } from "@/components/map/icons";
import { BASEMAPS } from "@/services/mapService";

export { BASEMAPS };

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

function FlyTo({ focus }) {
  const map = useMap();
  useEffect(() => {
    if (focus) map.flyTo([focus.lat, focus.lon], focus.zoom || 7, { duration: 1.2 });
  }, [focus?.lat, focus?.lon, focus?.zoom]);
  return null;
}

export default function OceanMap({ layers = {}, highlights, focus, basemap = "light", className = "h-full w-full", pin }) {
  const bm = BASEMAPS[basemap] || BASEMAPS.light;
  return (
    <MapContainer center={[13, 80]} zoom={5} minZoom={3} zoomControl={false} scrollWheelZoom className={className}>
      <FixSize />
      <ZoomControl position="bottomright" />
      <TileLayer key={basemap} url={bm.url} attribution={bm.attribution} />
      <ChlorophyllSatLayer show={layers.chlorophyll} />
      <GridLayers layers={layers} />
      <FisheriesLayers layers={layers} />
      <CoralLayer show={layers.coral} />
      <VesselLayers layers={layers} />
      <AlertLayer show={layers.alerts} />
      <HighlightLayer highlights={highlights} />
      {pin && (
        <Marker position={[pin.lat, pin.lon]} icon={pinIcon("#0F62FE")}>
          <Tooltip permanent direction="top" offset={[0, -30]}>{pin.name}</Tooltip>
        </Marker>
      )}
      <FlyTo focus={focus} />
    </MapContainer>
  );
}