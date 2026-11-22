import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { useSstTrend } from "@/hooks/useOceanData";
import { TREND_SEAS } from "@/lib/regions";
import DataBadge from "@/components/common/DataBadge";

export default function SstTrendChart() {
  const { data = [], isLoading } = useSstTrend();

  // Daily means per sea
  const rows = useMemo(() => {
    if (!data.length) return [];
    const byDay = {};
    data.forEach((sea) => sea.time.forEach((t, i) => {
      const v = sea.sst[i];
      if (v == null) return;
      const day = t.slice(5, 10);
      byDay[day] = byDay[day] || { day };
      byDay[day][sea.name] = byDay[day][sea.name] || [];
      byDay[day][sea.name].push(v);
    }));
    return Object.values(byDay).map((d) => {
      const out = { day: d.day };
      TREND_SEAS.forEach((s) => { if (d[s.name]) out[s.name] = +(d[s.name].reduce((a, b) => a + b, 0) / d[s.name].length).toFixed(2); });
      return out;
    });
  }, [data]);

  return (
    <div className="orca-card p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#0A2540]">Sea surface temperature</h3>
          <p className="text-xs text-[#4A607A]">Daily mean, past 7 days + today</p>
        </div>
        <DataBadge live label="Live" />
      </div>
      <div className="h-64">
        {isLoading ? <div className="h-full animate-pulse rounded-lg bg-[#F0F6FF]" /> : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rows} margin={{ left: -16, right: 8 }}>
              <CartesianGrid stroke="#D8E2EF" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#4A607A" }} />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12, fill: "#4A607A" }} unit="°" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {TREND_SEAS.map((s) => <Line key={s.name} dataKey={s.name} stroke={s.color} strokeWidth={2} dot={false} />)}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}