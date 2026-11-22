import React from "react";
import { Satellite, Cpu, FileSearch, Map } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import { IMAGES } from "@/lib/images";

const STEPS = [
  { icon: Satellite, title: "Collect", text: "Live SST, waves, currents and wind from ocean models, plus PFZ, chlorophyll, coral and AIS datasets." },
  { icon: Cpu, title: "Route", text: "The orchestrator reads your question and calls only the agents it needs." },
  { icon: FileSearch, title: "Reason with evidence", text: "Every answer carries source, timestamp, location, value and confidence." },
  { icon: Map, title: "Act on the map", text: "Relevant zones are highlighted instantly, with alerts pushed in real time." },
];

export default function HowItWorks() {
  return (
    <section className="orca-container grid items-center gap-12 py-20 lg:grid-cols-2">
      <Reveal className="relative">
        <div className="absolute -left-3 -top-3 h-full w-full rounded-[2.5rem_0.5rem_2.5rem_0.5rem] border-2 border-[#0088FF]" />
        <img src={IMAGES.coral} alt="Coral reef" className="relative aspect-[4/5] w-full rounded-[2.5rem_0.5rem_2.5rem_0.5rem] object-cover sm:aspect-[5/4]" />
        <div className="orca-card absolute -bottom-6 right-4 max-w-[240px] p-4">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#4A607A]">Flow</p>
          <p className="mt-1 text-sm font-medium text-[#0A2540]">User → Orchestrator → Agents → Data → Evidence → Map</p>
        </div>
      </Reveal>
      <div>
        <Reveal>
          <p className="orca-eyebrow">How ORCA works</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#0A2540] sm:text-5xl">From ocean signal to a clear answer.</h2>
        </Reveal>
        <div className="mt-8 space-y-5">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0F6FF] text-[#0F62FE]"><Icon className="h-5 w-5" /></span>
                <div>
                  <p className="font-display text-lg font-semibold text-[#0A2540]"><span className="mr-2 font-mono text-sm text-[#0088FF]">0{i + 1}</span>{title}</p>
                  <p className="mt-1 text-sm text-[#4A607A]">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}