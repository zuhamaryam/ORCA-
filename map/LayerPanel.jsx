import React from "react";
import { Switch } from "@/components/ui/switch";

export const LAYER_DEFS = [
  { key: "sst", label: "Sea surface temp.", color: "#f29e2e", live: true },
  { key: "waves", label: "Waves", color: "#0088FF", live: true },
  { key: "currents", label: "Currents", color: "#0A2540", live: true },
  { key: "wind", label: "Wind / weather", color: "#0F62FE", live: true },
  { key: "chlorophyll", label: "Chlorophyll-a (NASA satellite)", color: "#10b981", live: true },
  { key: "pfz", label: "PFZ", color: "#E67E22", live: false },
  { key: "coral", label: "Coral zones", color: "#D9383A", live: false },
  { key: "vessels", label: "AIS vessels", color: "#0A2540", live: false },
  { key: "alerts", label: "Alerts", color: "#D9383A", live: false },
  { key: "geofences", label: "Geofences", color: "#16a34a", live: false },
];

function Group({ title, items, layers, onToggle }) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#4A607A]">{title}</p>
      {items.map((l) => (
        <label key={l.key} className="flex min-h-[36px] cursor-pointer items-center justify-between gap-3 text-sm text-[#0D1B2A]">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
            {l.label}
          </span>
          <Switch checked={!!layers[l.key]} onCheckedChange={() => onToggle(l.key)} />
        </label>
      ))}
    </div>
  );
}

export default function LayerPanel({ layers, onToggle }) {
  return (
    <div className="space-y-3">
      <Group title="Live data" items={LAYER_DEFS.filter((l) => l.live)} layers={layers} onToggle={onToggle} />
      <Group title="Demo Dataset" items={LAYER_DEFS.filter((l) => !l.live)} layers={layers} onToggle={onToggle} />
    </div>
  );
}
