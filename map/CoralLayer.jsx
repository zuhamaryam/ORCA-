import React from "react";
import { CircleMarker, Popup } from "react-leaflet";
import { useEntity } from "@/hooks/useOceanData";
import { BLEACHING, bleachingFromDhw } from "@/lib/colors";
import MapPopup from "@/components/map/MapPopup";

export default function CoralLayer({ show }) {
  const { data: reefs = [] } = useEntity("CoralObservation");
  if (!show) return null;
  return reefs.map((r) => {
    const level = BLEACHING[r.bleaching_level || bleachingFromDhw(r.dhw)];
    return (
      <CircleMarker key={r.id} center={[r.lat, r.lon]} radius={9} pathOptions={{ color: "white", weight: 2, fillColor: level.color, fillOpacity: 0.95 }}>
        <Popup>
          <MapPopup title={`Coral · ${r.reef_name}`} live={!r.is_demo} rows={[
            ["Region", r.region], ["DHW", `${r.dhw} °C-weeks`], ["Level", level.label],
            ["SST anomaly", r.sst_anomaly != null ? `+${r.sst_anomaly} °C` : null], ["Health score", r.health_score],
          ]} />
        </Popup>
      </CircleMarker>
    );
  });
}