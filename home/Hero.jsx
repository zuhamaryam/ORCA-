import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useOrca } from "@/lib/OrcaContext";
import HeroLiveCards from "@/components/home/HeroLiveCards";

export default function Hero() {
  const { setChatOpen } = useOrca();
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: "easeOut" }} src={IMAGES.hero} alt="Research vessel on the Indian Ocean" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/95 via-[#0A2540]/55 to-[#0A2540]/20" />
      <div className="orca-container relative w-full pb-24 pt-32 sm:pb-16">
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="orca-title mt-4 max-w-4xl text-white">
          Marine EcOsystem Reasoning with Collaborative Agents
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
          Ocean models, fishing zones, coral stress and vessel activity — reasoned over by four AI agents, answered in your language, shown on the map.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 flex flex-wrap gap-3">
          <Link to="/dashboard" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#0088FF] px-6 text-sm font-semibold text-white transition hover:bg-[#0F62FE]">
            Explore platform <ArrowRight className="h-4 w-4" />
          </Link>
          <button onClick={() => setChatOpen(true)} className="inline-flex h-12 items-center gap-2 rounded-full border border-white/50 px-6 text-sm font-semibold text-white transition hover:bg-white/10">
            <MessageCircle className="h-4 w-4" /> Ask the ocean
          </button>
        </motion.div>
        <div className="mt-10 max-w-3xl"><HeroLiveCards /></div>
      </div>
    </section>
  );
}