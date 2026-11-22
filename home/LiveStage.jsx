import React, { useState } from "react";
import { Map, ListChecks } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import SectionTitle from "@/components/common/SectionTitle";
import OceanMap from "@/components/map/OceanMap";
import MapLegend from "@/components/map/MapLegend";
import QuickPrompts from "@/components/chat/QuickPrompts";
import ReasoningStream from "@/components/home/ReasoningStream";
import { useOrca } from "@/lib/OrcaContext";

const BASE_LAYERS = { sst: true, pfz: true, alerts: true };

export default function LiveStage() {
  const { lastResult, send, setChatOpen, busy } = useOrca();
  const [view, setView] = useState("map");
  const layers = lastResult ? { ...BASE_LAYERS, ...Object.fromEntries(lastResult.layers.map((l) => [l, true])) } : BASE_LAYERS;
  const ask = (q) => { setChatOpen(true); send(q); };

  return (
    <section className="orca-container py-20">
      <SectionTitle eyebrow="Live stage" title="Ask, and watch the map respond." subtitle="Live SST from ocean models with demo PFZ and alert layers. Answers highlight the zones they refer to." />
      <div className="mb-3 flex gap-2 lg:hidden">
        {[["map", "Map", Map], ["feed", "Evidence feed", ListChecks]].map(([k, label, Icon]) => (
          <button key={k} onClick={() => setView(k)} className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-sm font-medium ${view === k ? "bg-[#0A2540] text-white" : "border border-[#D8E2EF] bg-white text-[#0A2540]"}`}>
            <Icon className="h-4 w-4" />{label}
          </button>
        ))}
      </div>
      <Reveal>
        <div className="grid gap-4 lg:grid-cols-[65fr_35fr]">
          <div className={`orca-card relative h-[460px] overflow-hidden sm:h-[560px] ${view === "map" ? "block" : "hidden"} lg:block`}>
            <OceanMap layers={layers} highlights={lastResult?.highlights} focus={lastResult?.focus} />
            <div className="absolute bottom-3 left-3 z-[500]"><MapLegend layers={layers} /></div>
          </div>
          <div className={`orca-card flex h-[460px] flex-col overflow-hidden sm:h-[560px] ${view === "feed" ? "flex" : "hidden"} lg:flex`}>
            <div className="border-b border-[#D8E2EF] p-4">
              <p className="font-display font-semibold text-[#0A2540]">Quick marine queries</p>
              <div className="mt-3"><QuickPrompts onPick={ask} items={["Show high chlorophyll zones near Kochi.", "Any cyclone or high-wave warning?", "Which areas have coral thermal stress?"]} /></div>
              {busy && <p className="mt-2 text-xs text-[#0F62FE]">Agents working…</p>}
            </div>
            <div className="flex-1 overflow-y-auto p-4"><ReasoningStream /></div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}