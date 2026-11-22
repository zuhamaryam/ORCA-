import React from "react";

export default function MapLegend({ layers }) {
  if (!layers.sst && !layers.chlorophyll) return null;
  return (
    <div className="orca-card space-y-2 px-3 py-2.5 text-xs text-[#4A607A]">
      {layers.sst && (
        <div>
          <p className="font-semibold text-[#0A2540]">SST (°C)</p>
          <div className="mt-1 h-2 w-44 rounded-full bg-gradient-to-r from-[#2c7bb6] via-[#90eb9d] via-50% to-[#d7191c]" />
          <div className="mt-0.5 flex w-44 justify-between font-mono"><span>24</span><span>28</span><span>32</span></div>
        </div>
      )}
      {layers.chlorophyll && (
        <div>
          <p className="font-semibold text-[#0A2540]">Chlorophyll-a · NASA GIBS</p>
          <div className="mt-1 h-2 w-44 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#10b981] to-[#ca8a04]" />
          <div className="mt-0.5 flex w-44 justify-between font-mono"><span>low</span><span>mid</span><span>high</span></div>
          <p className="mt-0.5 font-mono text-[10px] text-[#4A607A]">MODIS Aqua · daily · live</p>
        </div>
      )}
    </div>
  );
}