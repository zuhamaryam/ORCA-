import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Loader2, Map, ChevronDown } from "lucide-react";
import EvidenceList from "@/components/common/EvidenceList";
import { AGENT_META } from "@/lib/agentMeta";
import { getLang } from "@/lib/languages";
import { useOrca } from "@/lib/OrcaContext";

export default function MessageBubble({ message, speaker }) {
  const [showEvidence, setShowEvidence] = useState(false);
  const { setLastResult, setChatOpen } = useOrca();
  const navigate = useNavigate();
  const r = message.result;

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p dir="auto" className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#0A2540] px-4 py-2.5 text-sm text-white">{message.content}</p>
      </div>
    );
  }

  const playing = speaker.state.id === message.id;
  const openMap = () => { setLastResult(r); setChatOpen(false); navigate("/map"); };

  return (
    <div className="max-w-[92%] rounded-2xl rounded-bl-sm border border-[#D8E2EF] bg-white px-4 py-3">
      {r?.runs?.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {r.runs.map((run) => (
            <span key={run.agent} className="rounded-full bg-[#F0F6FF] px-2 py-0.5 text-[11px] font-semibold text-[#0F62FE]">
              {AGENT_META[run.agent]?.short} agent{run.status === "failed" ? " · failed" : ""}
            </span>
          ))}
        </div>
      )}
      <p dir="auto" className={`whitespace-pre-wrap text-sm leading-relaxed ${message.error ? "text-[#D9383A]" : "text-[#0D1B2A]"}`}>{message.content}</p>
      {r?.reasoning_summary && <p dir="auto" className="mt-2 text-xs italic text-[#4A607A]">Checked: {r.reasoning_summary}</p>}
      {!message.error && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button onClick={() => speaker.toggle(message.id, message.content, getLang(message.language))} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#D8E2EF] px-3 text-xs font-medium text-[#0A2540] hover:bg-[#F0F6FF]">
            {playing && speaker.state.loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : playing && !speaker.state.paused ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing && !speaker.state.paused ? "Pause" : "Listen"}
          </button>
          {r?.evidence?.length > 0 && (
            <button onClick={() => setShowEvidence((s) => !s)} className="inline-flex h-8 items-center gap-1 rounded-full border border-[#D8E2EF] px-3 text-xs font-medium text-[#0A2540] hover:bg-[#F0F6FF]">
              Evidence ({r.evidence.length}) <ChevronDown className={`h-3.5 w-3.5 transition ${showEvidence ? "rotate-180" : ""}`} />
            </button>
          )}
          {r?.focus && (
            <button onClick={openMap} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#0F62FE] px-3 text-xs font-medium text-white hover:bg-[#0A2540]">
              <Map className="h-3.5 w-3.5" /> View on map
            </button>
          )}
          {r?.confidence != null && <span className="text-xs text-[#4A607A]">Confidence {Math.round(r.confidence * 100)}%</span>}
        </div>
      )}
      {showEvidence && <div className="mt-3"><EvidenceList evidence={r.evidence} compact /></div>}
    </div>
  );
}