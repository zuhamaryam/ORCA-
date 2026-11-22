import React from "react";
import { X } from "lucide-react";
import EvidenceList from "@/components/common/EvidenceList";
import { AGENT_META } from "@/lib/agentMeta";

export default function ResultPanel({ result, onClose }) {
  return (
    <div className="orca-card flex max-h-full flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-2 border-b border-[#D8E2EF] p-4">
        <div>
          <p className="text-xs uppercase tracking-wider font-semibold text-[#0088FF]">AI result on map</p>
          <p className="mt-1 text-sm text-[#0A2540]">{result.runs.map((r) => AGENT_META[r.agent]?.short).join(" · ")} agents</p>
        </div>
        <button onClick={onClose} aria-label="Clear result" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F0F6FF]"><X className="h-4 w-4" /></button>
      </div>
      <div className="overflow-y-auto p-4">
        {result.answer && <p dir="auto" className="mb-3 text-sm leading-relaxed text-[#0D1B2A]">{result.answer}</p>}
        <EvidenceList evidence={result.evidence} compact />
      </div>
    </div>
  );
}