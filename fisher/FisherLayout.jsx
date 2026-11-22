import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import FisherSidebar from "./FisherSidebar";
import FisherHeader from "./FisherHeader";

export default function FisherLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F7FAFD]">
      <FisherSidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-[240px]">
        <FisherHeader onMenu={() => setOpen(true)} />
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}