import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { PLACES, resolvePlace } from "@/lib/regions";

export default function LocationSearch({ onSelect }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const matches = q ? PLACES.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : [];

  const pick = (place) => { onSelect(place); setQ(place.name); setOpen(false); };
  const submit = async (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    const place = await resolvePlace(q);
    setLoading(false);
    pick(place);
  };

  return (
    <form onSubmit={submit} className="relative w-full">
      <div className="orca-card flex items-center gap-2 rounded-full px-4">
        <Search className="h-4 w-4 text-[#4A607A]" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          placeholder="Search a coast, port or sea…"
          className="h-11 w-full bg-transparent text-base sm:text-sm text-[#0D1B2A] placeholder:text-[#4A607A] focus:outline-none"
        />
        {loading && <Loader2 className="h-4 w-4 animate-spin text-[#0F62FE]" />}
      </div>
      {open && matches.length > 0 && (
        <div className="orca-card absolute inset-x-0 top-12 z-[1000] overflow-hidden py-1">
          {matches.map((p) => (
            <button type="button" key={p.name} onClick={() => pick(p)} className="block w-full px-4 py-2.5 text-left text-sm hover:bg-[#F0F6FF]">
              {p.name}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}