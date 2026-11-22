import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Map, MessageSquare, Database, Server, Satellite, ScrollText, BarChart3, Map as MapIcon, Settings as SettingsIcon, Waves, X } from "lucide-react";

const NAV = [
  { to: "/oceanographer/dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
  { to: "/oceanographer/maps", label: "Real-time Maps SST/Chl/Salinity", icon: Map },
  { to: "/oceanographer/query", label: "Multi-Agent Query Synthesis", icon: MessageSquare },
  { to: "/oceanographer/datasets", label: "Raw Satellite Datasets", icon: Database },
  { to: "/oceanographer/server", label: "Isko Ocean Data Server", icon: Server },
  { to: "/oceanographer/swarm", label: "ORCA Swarm Tracking", icon: Satellite },
  { to: "/oceanographer/policy", label: "Data Policy & CRZ 2023", icon: ScrollText },
  { to: "/oceanographer/reports", label: "Reports & Analytics", icon: BarChart3 },
  { to: "/oceanographer/states", label: "9 Maritime States Monitor", icon: MapIcon },
  { to: "/oceanographer/settings", label: "Settings", icon: SettingsIcon },
];

export default function OceanSidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={onClose} />}
      <aside className={`fixed left-0 top-0 z-50 h-full w-[240px] bg-white border-r border-[#E3F2FD] flex flex-col transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 h-14 border-b border-[#E3F2FD]">
          <div className="flex items-center gap-2">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-[#0A2351]"><Waves className="h-4 w-4 text-[#1976D2]" /></div>
            <div className="leading-tight">
              <div className="text-[13px] font-bold text-[#0A2351]">OCRA MARINE</div>
              <div className="text-[9px] font-medium text-[#1976D2] tracking-wide uppercase">Oceanographer Agent</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-[#0A2351]"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 text-[12px]">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-lg ${isActive ? "bg-[#E3F2FD] text-[#0A2351] font-semibold" : "text-[#0A2351]/70 hover:bg-[#F5F9FF]"}`}>
              <Icon className="h-4 w-4 shrink-0" /><span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-3 text-[10px] text-[#0A2351]/50 border-t border-[#E3F2FD]">v1.4.2 © 2026 OCRA MARINE</div>
      </aside>
    </>
  );
}