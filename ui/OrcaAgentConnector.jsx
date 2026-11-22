import React from "react";
import AgentSwitcher from "@/components/AgentSwitcher";

export default function OrcaAgentConnector() {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AgentSwitcher dropUp />
    </div>
  );
}