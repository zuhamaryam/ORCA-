import React from "react";
import { Marker, Polygon, Polyline, Popup, Tooltip } from "react-leaflet";
import { useEntity } from "@/hooks/useOceanData";
import { vesselIcon } from "@/components/map/icons";
import { formatTime } from "@/lib/geo";
import MapPopup from "@/components/map/MapPopup";

const TYPE_COLOR = { fishing: "#0F62FE", cargo: "#0A2540", tanker: "#7c3aed", passenger: "#0088FF", research: "#16a34a", other: "#4A607A" };
const FENCE_COLOR = { mpa: "#16a34a", restricted: "#D9383A", eez: "#0088FF", port: "#4A607A" };

export default function VesselLayers({ layers }) {
  const { data: vessels = [] } = useEntity("VesselTrack", "-last_seen");
  const { data: fences = [] } = useEntity("Geofence");

  return (
    <>
      {layers.geofences && fences.map((f) => (
        <Polygon key={f.id} positions={f.polygon || []} pathOptions={{ color: FENCE_COLOR[f.zone_type], weight: 2, dashArray: "6 6", fillOpacity: 0.08 }}>
          <Tooltip>{f.name} · {f.zone_type.toUpperCase()}</Tooltip>
        </Polygon>
      ))}
      {layers.vessels && vessels.map((v) => (
        <React.Fragment key={v.id}>
          {v.track?.length > 1 && <Polyline positions={v.track} pathOptions={{ color: TYPE_COLOR[v.vessel_type] || "#4A607A", weight: 1.5, opacity: 0.5 }} />}
          <Marker position={[v.lat, v.lon]} icon={vesselIcon(TYPE_COLOR[v.vessel_type] || "#4A607A", v.heading)}>
            <Popup>
              <MapPopup title={v.name} live={!v.is_demo} rows={[
                ["MMSI", v.mmsi], ["Type", v.vessel_type], ["Speed", `${v.speed_kn} kn`], ["Heading", `${v.heading}°`],
                ["Flag", v.flag], ["AIS gap", v.ais_gap_hours ? `${v.ais_gap_hours} h` : null], ["Last seen", formatTime(v.last_seen)],
              ]} />
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </>
  );
}