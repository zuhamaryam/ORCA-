import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LANGUAGES } from "@/lib/languages";

export default function LanguageSelect({ value, onChange, className = "w-[130px]" }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`h-9 rounded-full border-[#D8E2EF] bg-white text-sm ${className}`} aria-label="Language">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="z-[1300]">
        {LANGUAGES.map((l) => (
          <SelectItem key={l.code} value={l.code}>
            {l.native}{l.code !== "en" && <span className="ml-1 text-[#4A607A]">· {l.name}</span>}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}