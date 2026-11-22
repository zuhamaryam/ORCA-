import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DisasterSidebar from "./DisasterSidebar";
import DisasterHeader from "./DisasterHeader";

export default function DisasterLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F7FAFD]">
      <DisasterSidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-[240px]">
        <DisasterHeader onMenu={() => setOpen(true)} />
        <main className="p-4 sm:p-6"><Outlet /></main>
      </div>
    </div>
  );
}