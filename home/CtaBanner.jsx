import React from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/common/Reveal";
import { IMAGES } from "@/lib/images";

export default function CtaBanner() {
  return (
    <section className="orca-container">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl">
          <img src={IMAGES.boats} alt="Fishing boats off the Kerala coast" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/90 via-[#0A2540]/65 to-transparent" />
          <div className="relative px-6 py-14 sm:px-12 sm:py-20">
            <h2 className="max-w-xl text-3xl font-semibold text-white sm:text-5xl">Smarter marine intelligence. Safer seas.</h2>
            <p className="mt-4 max-w-md text-white/80">Check tomorrow's sea state before you sail, find productive waters and track reef stress — in your language.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/map" className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-[#0A2540] hover:bg-[#F0F6FF]">Open marine map</Link>
              <Link to="/alerts" className="inline-flex h-12 items-center rounded-full border border-white/50 px-6 text-sm font-semibold text-white hover:bg-white/10">View alerts</Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}