import L from "leaflet";

export function pinIcon(color) {
  return L.divIcon({
    className: "orca-pin",
    html: `<svg width="28" height="36" viewBox="0 0 28 36"><path d="M14 35s11-11.6 11-21A11 11 0 0 0 3 14c0 9.4 11 21 11 21z" fill="${color}" stroke="white" stroke-width="2"/><circle cx="14" cy="14" r="4.5" fill="white"/></svg>`,
    iconSize: [28, 36],
    iconAnchor: [14, 35],
    popupAnchor: [0, -30],
  });
}

export function pulseIcon(color) {
  return L.divIcon({ className: "orca-divicon", html: `<span class="orca-pulse" style="--c:${color}"></span>`, iconSize: [18, 18], iconAnchor: [9, 9] });
}

export function vesselIcon(color, heading = 0) {
  return L.divIcon({
    className: "orca-divicon",
    html: `<svg width="18" height="18" viewBox="0 0 18 18" style="transform:rotate(${heading}deg)"><path d="M9 1 L15 16 L9 12 L3 16 Z" fill="${color}" stroke="white" stroke-width="1.2"/></svg>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export function arrowIcon(deg = 0, color = "#0A2540", size = 16) {
  return L.divIcon({
    className: "orca-divicon",
    html: `<svg width="${size}" height="${size}" viewBox="0 0 20 20" style="transform:rotate(${deg}deg);opacity:.85"><path d="M10 1 L15 9 H11.5 V19 H8.5 V9 H5 Z" fill="${color}"/></svg>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}