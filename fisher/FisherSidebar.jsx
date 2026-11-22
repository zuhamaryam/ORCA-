import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Map, Droplets, Fish, Radio, Activity, CloudRain, BarChart3, AlertTriangle, Settings as SettingsIcon, Ship, X } from "lucide-react";

const NAV = [
  { to: "/fisher/dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
  { to: "/fisher/pfz-map", label: "PFZ Map", icon: Map },
  { to: "/fisher/chlorophyll", label: "Chlorophyll Map", icon: Droplets },
  { to: "/fisher/catch-log", label: "Catch Log and Tracker", icon: Fish },
  { to: "/fisher/pods", label: "Solar LoRaWAN Tree Pod Sensor Data", icon: Radio },
  { to: "/fisher/yolo", label: "Micro YOLO Audio Classifier", icon: Activity },
  { to: "/fisher/weather", label: "Weather Data Monitoring", icon: CloudRain },
  { to: "/fisher/reports", label: "Reports & Profit Calculator", icon: BarChart3 },
  { to: "/fisher/sos", label: "Emergency SOS", icon: AlertTriangle },
  { to: "/fisher/settings", label: "Settings", icon: SettingsIcon },
];

export default function FisherSidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={onClose} />}
      <aside className={`fixed left-0 top-0 z-50 h-full w-[240px] bg-white border-r border-[#E3F2FD] flex flex-col transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 h-14 border-b border-[#E3F2FD]">
          <div className="flex items-center gap-2">
            <div className="grid place-items-center h-8 w-8 rounded-lg bg-[#0A2351]"><Ship className="h-4 w-4 text-[#1976D2]" /></div>
            <div className="leading-tight">
              <div className="text-[13px] font-bold text-[#0A2351]">OCRA MARINE</div>
              <div className="text-[9px] font-medium text-[#1976D2] tracking-wide uppercase">Fisherman Bio Agent</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-[#0A2351]"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 text-[12px]">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-lg ${isActive ? "bg-[#E3F2FD] text-[#0A2351] font-semibold" : "text-[#0A2351]/70 hover:bg-[#F5F9FF]"}`}>
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-3 text-[10px] text-[#0A2351]/50 border-t border-[#E3F2FD]">v1.4.2 © 2026 OCRA MARINE</div>
      </aside>
    </>
  );
}