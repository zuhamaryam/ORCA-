import React from "react";
import { Link } from "react-router-dom";
import { useEntity } from "@/hooks/useOceanData";
import { SEVERITY } from "@/lib/colors";
import { formatTime } from "@/lib/geo";

export default function AlertsFeed({ limit = 6 }) {
  const { data: alerts = [], isLoading } = useEntity("MarineAlert", "-issued_at");
  const active = alerts.filter((a) => a.status !== "resolved").slice(0, limit);

  return (
    <div className="orca-card flex h-full flex-col p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-[#0A2540]">Recent alerts</h3>
        <Link to="/alerts" className="text-sm font-medium text-[#0F62FE]">View all</Link>
      </div>
      {isLoading && <div className="h-40 animate-pulse rounded-lg bg-[#F0F6FF]" />}
      {!isLoading && active.length === 0 && <p className="text-sm text-[#4A607A]">No active alerts.</p>}
      <div className="space-y-2">
        {active.map((a) => (
          <div key={a.id} className="flex gap-3 rounded-lg border border-[#D8E2EF] p-3">
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: SEVERITY[a.severity]?.color }} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[#0A2540]">{a.title}</p>
              <p className="text-xs text-[#4A607A]">{a.region} · {formatTime(a.issued_at)}</p>
            </div>
            <span className={`h-fit shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${a.verification === "verified" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>
              {a.verification === "verified" ? "Verified" : a.verification}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}