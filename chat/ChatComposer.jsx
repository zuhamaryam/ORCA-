import React, { useState } from "react";
import { Mic, Square, Send, Loader2 } from "lucide-react";
import { useSpeechInput } from "@/hooks/useSpeech";
import { getLang } from "@/lib/languages";

export default function ChatComposer({ onSend, busy, language }) {
  const [text, setText] = useState("");
  const lang = getLang(language);
  const mic = useSpeechInput({ bcp: lang.bcp, onResult: (t) => setText((prev) => (prev ? `${prev} ${t}` : t)) });

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim() || busy) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="border-t border-[#D8E2EF] bg-white p-3">
      {(mic.listening || mic.transcribing || mic.error) && (
        <p className={`mb-2 text-xs ${mic.error ? "text-[#D9383A]" : "text-[#0F62FE]"}`}>
          {mic.error || (mic.listening ? `Listening in ${lang.name}… tap stop when done` : "Transcribing your voice…")}
        </p>
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={mic.listening ? mic.stop : mic.start}
          disabled={mic.transcribing}
          aria-label={mic.listening ? "Stop recording" : "Speak"}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${mic.listening ? "border-[#D9383A] bg-red-50 text-[#D9383A]" : "border-[#D8E2EF] text-[#0A2540] hover:bg-[#F0F6FF]"}`}
        >
          {mic.transcribing ? <Loader2 className="h-4 w-4 animate-spin" /> : mic.listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </button>
        <input
          dir="auto"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Ask about the ocean in ${lang.name}…`}
          className="h-11 w-full rounded-full border border-[#D8E2EF] bg-[#FAFCFF] px-4 text-base sm:text-sm text-[#0D1B2A] placeholder:text-[#4A607A] focus:border-[#0088FF] focus:outline-none"
        />
        <button type="submit" disabled={busy || !text.trim()} aria-label="Send" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F62FE] text-white transition hover:bg-[#0A2540] disabled:opacity-40">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
    </form>
  );
}