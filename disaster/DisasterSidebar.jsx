import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FlaskConical, CloudLightning, Droplets, Radio, Ship, AlertTriangle, BarChart3, Map as MapIcon, Settings as SettingsIcon, Siren, X } from "lucide-react";

const NAV = [
  { to: "/disaster/dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
  { to: "/disaster/hab", label: "HAB Risk Map", icon: FlaskConical },
  { to: "/disaster/cyclone", label: "Cyclone & Storm Tracking", icon: CloudLightning },
  { to: "/disaster/pollution", label: "Water Quality & Pollution", icon: Droplets },
  { to: "/disaster/pods", label: "Coastal Pods Network", icon: Radio },
  { to: "/disaster/vessels", label: "Vessels at Risk Monitoring", icon: Ship },
  { to: "/disaster/incident-form", label: "Emergency Incident Form", icon: AlertTriangle },
  { to: "/disaster/analytics", label: "Reports & Impact Analytics", icon: BarChart3 },
  { to: "/disaster/states", label: "9 Maritime States Disaster Monitor", icon: MapIcon },
  { to: "/disaster/settings", label: "Settings", icon: SettingsIcon },
];

export default function DisasterSidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={onClose} />}
      <aside className={`fixed left-0 top-0 z-50 h-full w-[240px] bg-white border-r border-[#E3F2FD] flex flex-col transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 h-14 border-b border-[#E3F2FD]">
          <div className="flex items-center gap-2">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-[#0A2351]"><Siren className="h-4 w-4 text-[#F44336]" /></div>
            <div className="leading-tight">
              <div className="text-[13px] font-bold text-[#0A2351]">OCRA MARINE</div>
              <div className="text-[9px] font-medium text-[#F44336] tracking-wide uppercase">Coastal Disaster Agent</div>
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
        <div className="px-4 py-3 text-[10px] text-[#0A2351]/50 border-t border-[#E3F2FD]">v1.2.0 © 2026 OCRA MARINE</div>
      </aside>
    </>
  );
}