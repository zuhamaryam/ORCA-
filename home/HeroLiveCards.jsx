import React, { useState } from "react";
import { motion } from "framer-motion";
import { Thermometer, Waves, Fish } from "lucide-react";
import { useMarineGrid, useEntity } from "@/hooks/useOceanData";

const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);

export default function HeroLiveCards() {
  const { data: grid = [], isLoading } = useMarineGrid();
  const { data: pfz = [] } = useEntity("PFZAnalysis");
  const [layer, setLayer] = useState("sst");

  const sst = avg(grid.map((c) => c.sst).filter((v) => v != null));
  const maxWave = Math.max(...grid.map((c) => c.wave ?? 0), 0);
  const pfzConf = avg(pfz.map((p) => p.confidence).filter((v) => v != null));

  const cards = [
    { key: "sst", icon: Thermometer, label: "Mean SST · N. Indian Ocean", value: sst != null ? `${sst.toFixed(1)} °C` : "—", tag: "Live" },
    { key: "waves", icon: Waves, label: "Max wave height", value: grid.length ? `${maxWave.toFixed(1)} m` : "—", tag: "Live" },
    { key: "pfz", icon: Fish, label: `PFZ confidence · ${pfz.length} zones`, value: pfzConf != null ? `${Math.round(pfzConf * 100)}%` : "—", tag: "Demo" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map(({ key, icon: Icon, label, value, tag }, i) => (
        <motion.button
          key={key}
          onClick={() => setLayer(key)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.12 }}
          className={`rounded-lg border p-4 text-left backdrop-blur transition ${layer === key ? "border-white bg-white text-[#0A2540]" : "border-white/30 bg-white/10 text-white hover:bg-white/20"}`}
        >
          <div className="flex items-center justify-between">
            <Icon className="h-5 w-5" />
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${tag === "Live" ? (layer === key ? "text-emerald-700" : "text-emerald-300") : layer === key ? "text-amber-700" : "text-amber-200"}`}>{tag}</span>
          </div>
          <p className="mt-3 font-display text-2xl font-semibold">{isLoading && tag === "Live" ? "…" : value}</p>
          <p className={`text-xs ${layer === key ? "text-[#4A607A]" : "text-white/75"}`}>{label}</p>
        </motion.button>
      ))}
    </div>
  );
}