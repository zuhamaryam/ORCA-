import React from "react";

export default function MapPopup({ title, rows = [], live }) {
  return (
    <div className="min-w-[180px] font-body">
      <p className="font-display text-sm font-semibold text-[#0A2540]">{title}</p>
      <div className="mt-1.5 space-y-0.5">
        {rows.filter(([, v]) => v != null && v !== "").map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 text-xs">
            <span className="text-[#4A607A]">{k}</span>
            <span className="font-mono text-[#0D1B2A]">{v}</span>
          </div>
        ))}
      </div>
      <p className={`mt-2 text-[11px] font-semibold uppercase tracking-wider ${live ? "text-emerald-700" : "text-amber-700"}`}>
        {live ? "Live model data" : "Demo Dataset"}
      </p>
    </div>
  );
}