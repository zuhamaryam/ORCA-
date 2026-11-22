import React, { useEffect, useRef } from "react";
import { X, Plus } from "lucide-react";
import { useOrca } from "@/lib/OrcaContext";
import { useSpeaker } from "@/hooks/useSpeech";
import { getLang } from "@/lib/languages";
import { IMAGES } from "@/lib/images";
import LanguageSelect from "@/components/chat/LanguageSelect";
import QuickPrompts from "@/components/chat/QuickPrompts";
import MessageBubble from "@/components/chat/MessageBubble";
import ChatComposer from "@/components/chat/ChatComposer";

export default function ChatPanel({ onClose }) {
  const { messages, busy, send, language, setLanguage, settings, newConversation } = useOrca();
  const speaker = useSpeaker(settings.voiceRate);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length, busy]);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (settings.autoSpeak && last?.fresh && last.role === "assistant" && !last.error) {
      last.fresh = false;
      speaker.toggle(last.id, last.content, getLang(last.language));
    }
  }, [messages.length]);

  return (
    <div className="flex h-full flex-col bg-[#FAFCFF]">
      <div className="flex items-center gap-3 border-b border-[#D8E2EF] bg-white px-4 py-3">
        <img src={IMAGES.shell} alt="ORCA seashell" className="h-10 w-10 rounded-full border border-[#D8E2EF] object-cover" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold text-[#0A2540]">ORCA Marine Assistant</p>
          <p className="truncate text-xs text-[#4A607A]">4 agents · live ocean data + demo datasets</p>
        </div>
        <LanguageSelect value={language} onChange={setLanguage} className="w-[112px]" />
        <button onClick={newConversation} aria-label="New conversation" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F0F6FF]"><Plus className="h-4 w-4" /></button>
        {onClose && <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F0F6FF]"><X className="h-4 w-4" /></button>}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div>
            <p className="font-display text-lg font-semibold text-[#0A2540]">Ask the ocean anything.</p>
            <p className="mb-4 mt-1 text-sm text-[#4A607A]">Type or speak in any of 9 Indian languages. Answers come with evidence and update the map.</p>
            <QuickPrompts onPick={send} />
          </div>
        )}
        {messages.map((m) => <MessageBubble key={m.id} message={m} speaker={speaker} />)}
        {busy && (
          <div className="inline-flex items-center gap-2 rounded-2xl border border-[#D8E2EF] bg-white px-4 py-3 text-sm text-[#4A607A]">
            <span className="flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0088FF]" style={{ animationDelay: `${i * 150}ms` }} />)}</span>
            Orchestrator is routing to agents…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <ChatComposer onSend={send} busy={busy} language={language} />
    </div>
  );
}