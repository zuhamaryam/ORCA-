import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useOrca } from "@/lib/OrcaContext";
import { IMAGES } from "@/lib/images";
import ChatPanel from "@/components/chat/ChatPanel";

export default function ChatWidget() {
  const { chatOpen, setChatOpen } = useOrca();
  const { pathname } = useLocation();
  if (pathname === "/assistant") return null;

  return (
    <>
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="orca-card fixed bottom-24 right-3 z-[1200] h-[min(640px,calc(100vh-8rem))] w-[calc(100vw-1.5rem)] overflow-hidden sm:right-6 sm:w-[410px]"
          >
            <ChatPanel onClose={() => setChatOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="Open ORCA assistant"
        className="fixed bottom-5 right-3 z-[1200] flex items-center gap-3 rounded-full border border-[#D8E2EF] bg-white py-1.5 pl-1.5 pr-4 shadow-[0_8px_30px_rgba(10,37,64,0.15)] transition hover:-translate-y-0.5 sm:right-6"
      >
        <img src={IMAGES.shell} alt="" className="h-11 w-11 rounded-full object-cover" />
        <span className="text-left">
          <span className="block font-display text-sm font-semibold text-[#0A2540]">Ask ORCA</span>
          <span className="block text-xs text-[#4A607A]">Voice · 9 languages</span>
        </span>
      </button>
    </>
  );
}