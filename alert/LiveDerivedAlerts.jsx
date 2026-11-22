import React from "react";
import { useMarineGrid, useWindGrid } from "@/hooks/useOceanData";
import DataBadge from "@/components/common/DataBadge";

// Threshold exceedances computed directly from live model output
export default function LiveDerivedAlerts() {
  const { data: grid = [], isLoading } = useMarineGrid();
  const { data: wind = [] } = useWindGrid();
  const items = [
    ...grid.filter((c) => c.wave >= 2.5).map((c) => ({ key: `w${c.lat}${c.lon}`, title: "High waves", value: `${c.wave.toFixed(1)} m`, c })),
    ...grid.filter((c) => c.sst >= 31).map((c) => ({ key: `s${c.lat}${c.lon}`, title: "High SST (thermal stress risk)", value: `${c.sst.toFixed(1)} °C`, c })),
    ...wind.filter((c) => c.gust >= 50).map((c) => ({ key: `g${c.lat}${c.lon}`, title: "Strong wind gusts", value: `${Math.round(c.gust)} km/h`, c })),
  ];

  return (
    <div className="orca-card p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#0A2540]">Model-derived exceedances</h3>
          <p className="text-xs text-[#4A607A]">Waves ≥ 2.5 m, SST ≥ 31 °C, gusts ≥ 50 km/h on the 2° grid. Not official warnings.</p>
        </div>
        <DataBadge live label="Live · computed" />
      </div>
      {isLoading && <div className="h-20 animate-pulse rounded-lg bg-[#F0F6FF]" />}
      {!isLoading && items.length === 0 && <p className="text-sm text-[#4A607A]">No thresholds exceeded right now.</p>}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 12).map((i) => (
          <div key={i.key} className="rounded-lg border border-[#D8E2EF] p-3">
            <p className="text-sm font-medium text-[#0A2540]">{i.title}</p>
            <p className="font-mono text-xs text-[#4A607A]">{i.value} · {i.c.lat}°N {i.c.lon}°E</p>
          </div>
        ))}
      </div>
    </div>
  );
}