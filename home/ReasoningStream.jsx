import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useEntity } from "@/hooks/useOceanData";
import { AGENT_META } from "@/lib/agentMeta";
import { formatTime } from "@/lib/geo";
import { useOrca } from "@/lib/OrcaContext";
import EvidenceList from "@/components/common/EvidenceList";

export default function ReasoningStream() {
  const { lastResult } = useOrca();
  const { data: runs = [] } = useEntity("AgentExecution", "-created_date", 8);

  if (lastResult?.evidence?.length) {
    return (
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#4A607A]">Latest answer evidence</p>
        <EvidenceList evidence={lastResult.evidence.slice(0, 6)} compact />
      </div>
    );
  }

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#4A607A]">Recent agent executions</p>
      {runs.length === 0 && <p className="text-sm text-[#4A607A]">No agent runs yet — ask a question to see the reasoning stream.</p>}
      <div className="space-y-2">
        {runs.map((r) => (
          <div key={r.id} className="flex gap-3 rounded-lg border border-[#D8E2EF] bg-white p-3">
            {r.status === "completed" ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> : <XCircle className="h-4 w-4 shrink-0 text-[#D9383A]" />}
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#0A2540]">{AGENT_META[r.agent]?.name}</p>
              <p className="truncate text-xs text-[#4A607A]">{r.summary}</p>
              <p className="mt-0.5 font-mono text-[11px] text-[#4A607A]">{r.location_name} · {r.duration_ms} ms · {formatTime(r.created_date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}