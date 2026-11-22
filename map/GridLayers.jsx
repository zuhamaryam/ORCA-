import React from "react";
import { Rectangle, CircleMarker, Marker, Tooltip } from "react-leaflet";
import { useMarineGrid, useWindGrid } from "@/hooks/useOceanData";
import { sstColor, waveColor } from "@/lib/colors";
import { arrowIcon } from "@/components/map/icons";

export default function GridLayers({ layers }) {
  const { data: grid = [] } = useMarineGrid();
  const { data: wind = [] } = useWindGrid(!!layers.wind);

  return (
    <>
      {layers.sst && grid.filter((c) => c.sst != null).map((c) => (
        <Rectangle key={`sst-${c.lat}-${c.lon}`} bounds={[[c.lat - 1, c.lon - 1], [c.lat + 1, c.lon + 1]]} pathOptions={{ stroke: false, fillColor: sstColor(c.sst), fillOpacity: 0.5 }}>
          <Tooltip sticky>SST {c.sst.toFixed(1)} °C · live</Tooltip>
        </Rectangle>
      ))}
      {layers.waves && grid.filter((c) => c.wave != null).map((c) => (
        <CircleMarker key={`w-${c.lat}-${c.lon}`} center={[c.lat, c.lon]} radius={4 + c.wave * 4} pathOptions={{ color: waveColor(c.wave), weight: 1.5, fillOpacity: 0.25 }}>
          <Tooltip>Wave height {c.wave.toFixed(1)} m · live</Tooltip>
        </CircleMarker>
      ))}
      {layers.currents && grid.filter((c) => c.current != null).map((c) => (
        <Marker key={`c-${c.lat}-${c.lon}`} position={[c.lat + 0.4, c.lon + 0.4]} icon={arrowIcon(c.currentDir, "#0A2540", Math.min(26, 12 + c.current * 4))}>
          <Tooltip>Current {c.current.toFixed(1)} km/h towards {Math.round(c.currentDir)}° · live</Tooltip>
        </Marker>
      ))}
      {layers.wind && wind.filter((c) => c.wind != null).map((c) => (
        <Marker key={`wd-${c.lat}-${c.lon}`} position={[c.lat - 0.4, c.lon - 0.4]} icon={arrowIcon((c.windDir + 180) % 360, "#0F62FE", Math.min(26, 10 + c.wind / 3))}>
          <Tooltip>Wind {Math.round(c.wind)} km/h from {Math.round(c.windDir)}° · gusts {Math.round(c.gust)} km/h · live</Tooltip>
        </Marker>
      ))}
    </>
  );
}