import React from "react";
import { ArrowUpRight } from "lucide-react";

export const SAMPLE_QUERIES = [
  "Where are the nearest PFZs to Kochi?",
  "Is it safe to go fishing tomorrow morning near Chennai?",
  "Show high chlorophyll zones near Kochi.",
  "Any cyclone or high-wave warning?",
  "Show unusual vessel activity.",
  "Which areas have coral thermal stress?",
];

export default function QuickPrompts({ onPick, items = SAMPLE_QUERIES }) {
  return (
    <div className="grid gap-2">
      {items.map((q) => (
        <button
          key={q}
          onClick={() => onPick(q)}
          className="group flex min-h-[44px] items-center justify-between gap-3 rounded-lg border border-[#D8E2EF] bg-white px-3.5 py-2.5 text-left text-sm text-[#0D1B2A] transition hover:border-[#0088FF] hover:bg-[#F0F6FF]"
        >
          {q}
          <ArrowUpRight className="h-4 w-4 shrink-0 text-[#4A607A] transition group-hover:text-[#0F62FE]" />
        </button>
      ))}
    </div>
  );
}