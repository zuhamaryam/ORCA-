import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { SEVERITY } from "@/lib/colors";
import { formatTime } from "@/lib/geo";

export default function AlertsTable({ alerts, onFocus }) {
  const qc = useQueryClient();
  const setStatus = async (a, status) => {
    await base44.entities.MarineAlert.update(a.id, { status });
    qc.invalidateQueries({ queryKey: ["MarineAlert"] });
  };

  if (!alerts.length) return <p className="py-6 text-center text-sm text-[#4A607A]">No alerts match this filter.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-[#D8E2EF] text-left text-xs uppercase tracking-wider text-[#4A607A]">
            <th className="py-2.5 font-semibold">Alert</th><th className="font-semibold">Region</th><th className="font-semibold">Parameter</th>
            <th className="font-semibold">Severity</th><th className="font-semibold">Issued</th><th className="font-semibold">Source</th><th className="text-right font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((a) => (
            <tr key={a.id} className="border-b border-[#D8E2EF]/60">
              <td className="py-3"><button onClick={() => onFocus(a)} className="text-left font-medium text-[#0A2540] hover:text-[#0F62FE]">{a.title}</button></td>
              <td className="text-[#4A607A]">{a.region}</td>
              <td className="text-[#4A607A]">{a.parameter}{a.value ? ` · ${a.value}` : ""}</td>
              <td><span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${SEVERITY[a.severity]?.cls}`}>{SEVERITY[a.severity]?.label}</span></td>
              <td className="font-mono text-xs text-[#4A607A]">{formatTime(a.issued_at)}</td>
              <td><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${a.verification === "verified" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>{a.verification}</span></td>
              <td className="text-right">
                {a.status === "resolved"
                  ? <span className="text-xs text-[#4A607A]">Resolved</span>
                  : <button onClick={() => setStatus(a, "resolved")} className="h-8 rounded-full border border-[#D8E2EF] px-3 text-xs hover:bg-[#F0F6FF]">Resolve</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}