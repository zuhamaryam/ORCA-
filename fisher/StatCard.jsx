import React from "react";

export default function StatCard({ title, value, sub, accent = "#1976D2", icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-[#E3F2FD] p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-[12px] font-medium text-[#0A2351]/60">{title}</div>
        {icon}
      </div>
      <div className="mt-1.5 text-[20px] font-bold text-[#0A2351] leading-tight">{value}</div>
      {sub && <div className="mt-1 text-[11px]">{sub}</div>}
      {children}
    </div>
  );
}