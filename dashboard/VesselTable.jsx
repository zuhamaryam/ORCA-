import React from "react";
import { useEntity } from "@/hooks/useOceanData";
import DataBadge from "@/components/common/DataBadge";

export default function VesselTable({ limit = 6 }) {
  const { data: vessels = [] } = useEntity("VesselTrack", "-last_seen");
  return (
    <div className="orca-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-[#0A2540]">Fishing activity (AIS)</h3>
        <DataBadge live={false} label="Demo" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="border-b border-[#D8E2EF] text-left text-xs uppercase tracking-wider text-[#4A607A]">
              <th className="py-2 font-semibold">Vessel</th><th className="font-semibold">Type</th><th className="font-semibold">Position</th><th className="text-right font-semibold">Speed</th>
            </tr>
          </thead>
          <tbody>
            {vessels.slice(0, limit).map((v) => (
              <tr key={v.id} className="border-b border-[#D8E2EF]/60 last:border-0">
                <td className="py-2.5 font-medium text-[#0A2540]">{v.name}</td>
                <td className="capitalize text-[#4A607A]">{v.vessel_type}</td>
                <td className="font-mono text-xs text-[#4A607A]">{v.lat.toFixed(2)}°N, {v.lon.toFixed(2)}°E</td>
                <td className="text-right font-mono">{v.speed_kn} kn</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}