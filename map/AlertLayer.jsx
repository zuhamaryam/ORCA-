import React from "react";
import { Marker, Popup } from "react-leaflet";
import { useEntity } from "@/hooks/useOceanData";
import { SEVERITY } from "@/lib/colors";
import { pulseIcon } from "@/components/map/icons";
import { formatTime } from "@/lib/geo";
import MapPopup from "@/components/map/MapPopup";

export default function AlertLayer({ show }) {
  const { data: alerts = [] } = useEntity("MarineAlert", "-issued_at");
  if (!show) return null;
  return alerts.filter((a) => a.status !== "resolved").map((a) => (
    <Marker key={a.id} position={[a.lat, a.lon]} icon={pulseIcon(SEVERITY[a.severity]?.color || "#D9383A")}>
      <Popup>
        <MapPopup title={a.title} live={a.verification === "verified"} rows={[
          ["Severity", SEVERITY[a.severity]?.label], ["Region", a.region], ["Parameter", a.parameter],
          ["Value", a.value], ["Issued", formatTime(a.issued_at)], ["Source", a.source],
        ]} />
      </Popup>
    </Marker>
  ));
}