import React from "react";
import { Thermometer, Waves, Wind, Navigation, Bell, Ship } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import { usePointConditions, useEntity } from "@/hooks/useOceanData";
import { assessSafety } from "@/lib/agents/thermal";

export default function LiveConditions({ place }) {
  const { data, isLoading, error } = usePointConditions(place);
  const { data: alerts = [] } = useEntity("MarineAlert", "-issued_at");
  const { data: vessels = [] } = useEntity("VesselTrack", "-last_seen");
  const c = data?.marine.current || {};
  const w = data?.weather.current || {};
  const safety = data ? assessSafety(c.wave_height ?? 0, w.wind_gusts_10m ?? 0) : null;
  const fmt = (v, d = 1) => (v != null ? v.toFixed(d) : "—");

  return (
    <div>
      {error && <p className="mb-3 text-sm text-[#D9383A]">Live ocean data unavailable right now: {error.message}</p>}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        <StatCard icon={Thermometer} label="Sea surface temp" value={fmt(c.sea_surface_temperature)} unit="°C" live loading={isLoading} accent="#E67E22" />
        <StatCard icon={Waves} label="Wave height" value={fmt(c.wave_height)} unit="m" sub={safety?.label} live loading={isLoading} />
        <StatCard icon={Wind} label="Wind / gusts" value={w.wind_speed_10m != null ? `${Math.round(w.wind_speed_10m)}/${Math.round(w.wind_gusts_10m)}` : "—"} unit="km/h" live loading={isLoading} accent="#0088FF" />
        <StatCard icon={Navigation} label="Surface current" value={fmt(c.ocean_current_velocity)} unit="km/h" live loading={isLoading} accent="#0A2540" />
        <StatCard icon={Bell} label="Active alerts" value={alerts.filter((a) => a.status === "active").length} live={false} accent="#D9383A" />
        <StatCard icon={Ship} label="Tracked vessels" value={vessels.length} live={false} accent="#0A2540" />
      </div>
    </div>
  );
}