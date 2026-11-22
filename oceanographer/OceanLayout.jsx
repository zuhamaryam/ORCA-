import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import OceanSidebar from "./OceanSidebar";
import OceanHeader from "./OceanHeader";

export default function OceanLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F7FAFD]">
      <OceanSidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-[240px]">
        <OceanHeader onMenu={() => setOpen(true)} />
        <main className="p-4 sm:p-6"><Outlet /></main>
      </div>
    </div>
  );
}