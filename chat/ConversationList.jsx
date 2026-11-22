import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useOrca } from "@/lib/OrcaContext";
import { formatTime } from "@/lib/geo";

export default function ConversationList() {
  const { user, conversationId, loadConversation, messages } = useOrca();
  const { data: convs = [], isLoading } = useQuery({
    queryKey: ["conversations", user?.id, messages.length > 0 && conversationId],
    enabled: !!user,
    queryFn: () => base44.entities.Conversation.filter({ created_by_id: user.id }, "-created_date", 40),
  });

  return (
    <div className="flex h-full flex-col">
      <p className="px-4 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-[#4A607A]">Conversation history</p>
      <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-4">
        {isLoading && <div className="mx-2 h-24 animate-pulse rounded-lg bg-[#F0F6FF]" />}
        {!isLoading && convs.length === 0 && <p className="px-2 text-sm text-[#4A607A]">No conversations yet.</p>}
        {convs.map((c) => (
          <button key={c.id} onClick={() => loadConversation(c)} className={`flex w-full gap-2 rounded-lg px-3 py-2.5 text-left ${c.id === conversationId ? "bg-[#F0F6FF]" : "hover:bg-[#F0F6FF]/60"}`}>
            <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#0F62FE]" />
            <span className="min-w-0">
              <span dir="auto" className="block truncate text-sm text-[#0A2540]">{c.title}</span>
              <span className="text-xs text-[#4A607A]">{formatTime(c.created_date)}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}