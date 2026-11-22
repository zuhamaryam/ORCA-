import React from "react";
import { CheckCircle2, Radio, Database, Wifi, MessageSquare } from "lucide-react";
import { AGENT_META, AGENT_IDS } from "@/lib/agentMeta";
import { useEntity } from "@/hooks/useOceanData";
import AutoScroll from "@/components/common/AutoScroll";

const QUERIES = [
  "Find the nearest PFZ near Veraval",
  "Is it safe to go fishing tomorrow?",
  "Show coral stress around Lakshadweep",
  "Which vessels entered the geofence?",
  "Cyclone risk for the Arabian Sea",
];

export default function AgentsSidebar({ runs = [] }) {
  const { data: conv = [] } = useEntity("Conversation", "-created_date", 8);
  const byAgent = (id) => runs.filter((r) => r.agent === id);
  const fmt = (d) => (d ? new Date(d).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "—");

  const activity = AGENT_IDS.map((id) => ({ id, last: byAgent(id)[0] }));

  return (
    <aside className="flex flex-col gap-4">
      <section className="orca-card p-4">
        <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-[#0A2540]">
          <Radio className="h-4 w-4 text-[#0F62FE]" /> Agent activity
        </h3>
        <AutoScroll
          items={activity}
          speed={20}
          className="h-44"
          itemClassName="py-1"
          renderItem={({ id, last }) => {
            const a = AGENT_META[id];
            return (
              <div className="flex items-center justify-between gap-2 rounded-lg bg-[#F8FBFF] px-3 py-2">
                <span className="flex items-center gap-2 text-[13px] font-medium text-[#0A2540]">
                  <a.icon className="h-4 w-4" style={{ color: a.color }} />
                  {a.short}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-[#4A607A]">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  {last ? fmt(last.created_date) : "Idle"}
                </span>
              </div>
            );
          }}
        />
      </section>

      <section className="orca-card p-4">
        <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-[#0A2540]">
          <MessageSquare className="h-4 w-4 text-[#0F62FE]" /> Recent queries
        </h3>
        <AutoScroll
          items={conv.length ? conv.slice(0, 8).map((c) => c.title) : QUERIES}
          speed={22}
          className="h-40"
          itemClassName="py-1.5"
          renderItem={(q) => (
            <div className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F62FE]" />
              <p className="text-[12px] leading-snug text-[#4A607A]">{q}</p>
            </div>
          )}
        />
      </section>

      <section className="orca-card p-4">
        <h3 className="mb-3 font-display text-sm font-semibold text-[#0A2540]">System status</h3>
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <p className="text-[13px] font-medium text-emerald-700">All systems operational</p>
        </div>
        <div className="space-y-2">
          <StatusRow icon={Radio} label="Data feeds" ok />
          <StatusRow icon={Wifi} label="WebSocket" ok />
          <StatusRow icon={Database} label="Database" ok />
        </div>
      </section>
    </aside>
  );
}

function StatusRow({ icon: Icon, label, ok }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#D8E2EF] px-3 py-2">
      <span className="flex items-center gap-2 text-[13px] text-[#0A2540]"><Icon className="h-3.5 w-3.5 text-[#4A607A]" />{label}</span>
      <span className={`flex items-center gap-1 text-[11px] font-semibold ${ok ? "text-emerald-600" : "text-amber-600"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-emerald-500" : "bg-amber-500"}`} />
        {ok ? "Online" : "Degraded"}
      </span>
    </div>
  );
}