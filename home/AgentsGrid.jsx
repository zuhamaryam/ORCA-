import React from "react";
import Reveal from "@/components/common/Reveal";
import SectionTitle from "@/components/common/SectionTitle";
import { AGENT_META } from "@/lib/agentMeta";
import { useOrca } from "@/lib/OrcaContext";

export default function AgentsGrid() {
  const { send, setChatOpen } = useOrca();
  const ask = (q) => { setChatOpen(true); send(q); };

  return (
    <section className="bg-[#F0F6FF] py-20">
      <div className="orca-container">
        <SectionTitle eyebrow="Collaborative agents" title="Four specialists, one orchestrator." subtitle="Each agent owns its data and tools. The orchestrator decides who answers." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(AGENT_META).map((a, i) => (
            <Reveal key={a.id} delay={i * 0.08}>
              <div className="orca-card flex h-full flex-col p-5 transition hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: `${a.color}14`, color: a.color }}><a.icon className="h-6 w-6" /></span>
                <h3 className="mt-4 text-lg font-semibold text-[#0A2540]">{a.name}</h3>
                <p className="mt-2 flex-1 text-sm text-[#4A607A]">{a.description}</p>
                <button onClick={() => ask(a.sample)} className="mt-4 text-left text-sm font-medium text-[#0F62FE] hover:underline">Try: “{a.sample}”</button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}