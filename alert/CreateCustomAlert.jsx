import React, { useState } from "react";
import { Bell, Loader2, Send } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useOrca } from "@/lib/OrcaContext";

const TYPES = [
  ["cyclone", "Cyclone"], ["tsunami", "Tsunami"], ["lightning", "Lightning"],
  ["high_waves", "High waves"], ["strong_wind", "Strong wind"], ["marine_warning", "Marine warning"],
  ["geofence", "Geofence"], ["coral_stress", "Coral stress"], ["chlorophyll_bloom", "Chlorophyll bloom"],
];
const SEVERITIES = [["critical", "Critical"], ["high", "High"], ["medium", "Medium"], ["low", "Low"]];

export default function CreateCustomAlert({ onCreated }) {
  const { user } = useOrca();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "", type: "high_waves", severity: "medium",
    region: "", lat: "", lon: "", description: "", parameter: "", value: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || form.lat === "" || form.lon === "") return;
    setBusy(true);
    const created = await base44.entities.MarineAlert.create({
      ...form,
      lat: Number(form.lat), lon: Number(form.lon),
      status: "active", verification: "demo",
      source: user?.full_name ? `Custom alert by ${user.full_name}` : "Custom alert",
      issued_at: new Date().toISOString(),
    });
    setBusy(false);
    setForm({ title: "", type: "high_waves", severity: "medium", region: "", lat: "", lon: "", description: "", parameter: "", value: "" });
    setOpen(false);
    onCreated?.(created);
  };

  return (
    <div className="orca-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-[#0A2540]">
            <Bell className="h-5 w-5 text-[#0F62FE]" /> Create custom alert
          </h3>
          <p className="text-xs text-[#4A607A]">Configure your own marine alert with location, type and severity. Saved to the live alert feed.</p>
        </div>
        <button onClick={() => setOpen((o) => !o)} className="inline-flex h-10 items-center rounded-full bg-[#0A2540] px-4 text-sm font-semibold text-white hover:bg-[#0F62FE]">
          {open ? "Cancel" : "+ New alert"}
        </button>
      </div>

      {open && (
        <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="Alert title" className="sm:col-span-2">
            <input value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="e.g. Unusual chlorophyll bloom detected" className={inputCls} />
          </Field>
          <Field label="Type">
            <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputCls}>
              {TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </Field>
          <Field label="Severity">
            <select value={form.severity} onChange={(e) => set("severity", e.target.value)} className={inputCls}>
              {SEVERITIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </Field>
          <Field label="Region (label)">
            <input value={form.region} onChange={(e) => set("region", e.target.value)} placeholder="e.g. Arabian Sea" className={inputCls} />
          </Field>
          <Field label="Parameter">
            <input value={form.parameter} onChange={(e) => set("parameter", e.target.value)} placeholder="e.g. Chlorophyll-a" className={inputCls} />
          </Field>
          <Field label="Latitude (°)">
            <input type="number" step="any" value={form.lat} onChange={(e) => set("lat", e.target.value)} required placeholder="15.0" className={inputCls} />
          </Field>
          <Field label="Longitude (°)">
            <input type="number" step="any" value={form.lon} onChange={(e) => set("lon", e.target.value)} required placeholder="73.0" className={inputCls} />
          </Field>
          <Field label="Measured value" className="sm:col-span-2">
            <input value={form.value} onChange={(e) => set("value", e.target.value)} placeholder="e.g. 3.4 mg/m³" className={inputCls} />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} placeholder="Short description of what was detected…" className={inputCls} />
          </Field>
          <div className="sm:col-span-2">
            <button type="submit" disabled={busy || !form.title || form.lat === "" || form.lon === ""} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0F62FE] px-5 text-sm font-semibold text-white disabled:opacity-50">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Publish alert
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

const inputCls = "h-10 w-full rounded-lg border border-[#D8E2EF] bg-[#F8FBFF] px-3 text-sm text-[#0A2540] outline-none focus:border-[#0F62FE]";

function Field({ label, className, children }) {
  return (
    <label className={`block ${className || ""}`}>
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#4A607A]">{label}</span>
      {children}
    </label>
  );
}