import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export default function FisherHeader({ onMenu }) {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString("en-GB", { timeZone: "UTC", hour12: false }) + " UTC");
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <header className="sticky top-0 z-30 h-14 bg-white border-b border-[#E3F2FD] flex items-center justify-between px-4 lg:pl-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="lg:hidden text-[#0A2351]"><Menu className="h-5 w-5" /></button>
        <div>
          <div className="text-[14px] font-semibold text-[#0A2351]">Fisherman Bio Agent</div>
          <div className="text-[10px] text-[#0A2351]/50 font-mono">Kollam Coastal Station • KLM-007</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#4CAF50]"><span className="h-2 w-2 rounded-full bg-[#4CAF50] animate-pulse" />LIVE</span>
        <span className="hidden sm:inline text-[11px] text-[#0A2351]/50 font-mono">{now}</span>
      </div>
    </header>
  );
}