import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Home } from "lucide-react";

const AGENTS = [
  { to: "/climate/dashboard", label: "Climate Change Agent", color: "#F44336" },
  { to: "/fisher/dashboard", label: "Fisherman Bio Agent", color: "#1976D2" },
  { to: "/disaster/dashboard", label: "Coastal Disaster Agent", color: "#FF9800" },
  { to: "/oceanographer/dashboard", label: "Oceanographer Agent", color: "#0A2351" },
  { to: "/reef/dashboard", label: "Reef Coral Heal Agent", color: "#00BFA6" },
];

export default function AgentSwitcher({ dropUp = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#E3F2FD] text-[12px] text-[#0A2351] hover:bg-[#F5F9FF]">
        <span className="grid place-items-center h-6 w-6 rounded-full bg-[#0A2351] text-white text-[10px] font-bold">O</span>
        <span className="hidden sm:block max-w-[140px] truncate">ORCA</span>
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className={`absolute right-0 ${dropUp ? "bottom-full mb-1" : "top-full mt-1"} w-56 bg-white rounded-xl border border-[#E3F2FD] shadow-lg py-1 z-50 text-[12px]`}>
          <div className="px-3 py-2 text-[10px] uppercase tracking-wide text-[#0A2351]/50">Switch Agent</div>
          {AGENTS.map((a) => (
            <Link key={a.to} to={a.to} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 hover:bg-[#F5F9FF] text-[#0A2351]">
              <span className="h-2 w-2 rounded-full" style={{ background: a.color }} />{a.label}
            </Link>
          ))}
          <div className="my-1 border-t border-[#E3F2FD]" />
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 hover:bg-[#F5F9FF] text-[#0A2351]"><Home className="h-4 w-4" /> Back to ORCA Home</Link>
        </div>
      )}
    </div>
  );
}