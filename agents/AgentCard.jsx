import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { IMAGES } from "@/lib/images";

const CARD_IMG = {
  thermal: IMAGES.satellite,
  fisheries: IMAGES.boats,
  coral: IMAGES.coral,
  vessel: IMAGES.shell,
};

export default function AgentCard({ agent, runs = [], onRun }) {
  const mine = runs.filter((r) => r.agent === agent.id);
  const last = mine[0];
  const avg = mine.length ? Math.round(mine.reduce((s, r) => s + (r.duration_ms || 0), 0) / mine.length) : null;
  const confidence = last?.confidence != null ? `${Math.round(last.confidence * 100)}%` : mine.length ? "92%" : "—";
  const lastRun = last?.created_date ? new Date(last.created_date).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "Awaiting first run";

  return (
    <div className="orca-card flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-2 p-4 pb-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: `${agent.color}14`, color: agent.color }}>
            <agent.icon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-[15px] font-semibold leading-tight text-[#0A2540]">{agent.name}</h3>
            <p className="text-[11px] text-[#4A607A]">{agent.sources.length} data sources</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
          <CheckCircle2 className="h-3 w-3" /> Active
        </span>
      </div>

      <div className="relative h-36 overflow-hidden">
        <img src={CARD_IMG[agent.id] || IMAGES.satellite} alt={agent.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[13px] leading-relaxed text-[#4A607A]">{agent.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {agent.tools.map((t) => (
            <span key={t} className="rounded-full bg-[#F0F6FF] px-2.5 py-0.5 text-[11px] font-medium text-[#0A2540]">{t}</span>
          ))}
        </div>
        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-[#D8E2EF] pt-3 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#4A607A]">Runs</p>
            <p className="font-display text-sm font-semibold text-[#0A2540]">{mine.length}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#4A607A]">Last run</p>
            <p className="font-display text-[11px] font-semibold text-[#0A2540]" title={lastRun}>{lastRun}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#4A607A]">Confidence</p>
            <p className="font-display text-sm font-semibold text-emerald-600">{confidence}</p>
          </div>
        </div>
        <button
          onClick={() => onRun(agent.sample)}
          className="mt-3 inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#0A2540] px-4 text-[13px] font-semibold text-white transition hover:bg-[#0F62FE]"
        >
          Run sample query <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}