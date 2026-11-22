import { geocode } from "@/lib/oceanApi";

// Offshore reference points (sea-side coordinates so marine models return values)
export const PLACES = [
  { name: "Kochi", lat: 9.95, lon: 75.95 },
  { name: "Kozhikode", lat: 11.25, lon: 75.6 },
  { name: "Thiruvananthapuram", lat: 8.45, lon: 76.8 },
  { name: "Kanyakumari", lat: 7.95, lon: 77.5 },
  { name: "Mangaluru", lat: 12.87, lon: 74.6 },
  { name: "Goa", lat: 15.45, lon: 73.6 },
  { name: "Ratnagiri", lat: 17.0, lon: 73.1 },
  { name: "Mumbai", lat: 18.9, lon: 72.65 },
  { name: "Veraval", lat: 20.85, lon: 70.2 },
  { name: "Gulf of Kutch", lat: 22.7, lon: 69.6 },
  { name: "Tuticorin", lat: 8.75, lon: 78.4 },
  { name: "Rameswaram", lat: 9.2, lon: 79.45 },
  { name: "Gulf of Mannar", lat: 8.9, lon: 78.6 },
  { name: "Puducherry", lat: 11.93, lon: 79.95 },
  { name: "Chennai", lat: 13.08, lon: 80.45 },
  { name: "Nellore", lat: 14.4, lon: 80.3 },
  { name: "Kakinada", lat: 16.9, lon: 82.45 },
  { name: "Visakhapatnam", lat: 17.65, lon: 83.45 },
  { name: "Paradip", lat: 20.2, lon: 86.8 },
  { name: "Kolkata", lat: 21.2, lon: 88.1 },
  { name: "Port Blair", lat: 11.65, lon: 92.8 },
  { name: "Nicobar", lat: 7.5, lon: 93.5 },
  { name: "Lakshadweep", lat: 10.55, lon: 72.55 },
  { name: "Arabian Sea", lat: 15, lon: 67 },
  { name: "Bay of Bengal", lat: 15, lon: 88 },
  { name: "Andaman Sea", lat: 10.5, lon: 96 },
];

export const INDIAN_SEAS = { name: "Indian seas", lat: 13, lon: 80, generic: true };

export const TREND_SEAS = [
  { name: "Arabian Sea", lat: 15, lon: 66, color: "#E67E22" },
  { name: "Bay of Bengal", lat: 15, lon: 88, color: "#0F62FE" },
  { name: "Laccadive Sea", lat: 9, lon: 75, color: "#0A2540" },
  { name: "Andaman Sea", lat: 10.5, lon: 96, color: "#0088FF" },
];

// 2° analysis grid covering the North Indian Ocean around India
export const GRID = (() => {
  const pts = [];
  for (let lat = 4; lat <= 22; lat += 2) {
    for (let lon = 62; lon <= 96; lon += 2) pts.push({ lat, lon });
  }
  return pts;
})();

export async function resolvePlace(name) {
  if (!name || !name.trim()) return INDIAN_SEAS;
  const q = name.trim().toLowerCase();
  const known = PLACES.find((p) => p.name.toLowerCase() === q) || PLACES.find((p) => q.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(q));
  if (known) return known;
  const g = await geocode(name);
  return g || INDIAN_SEAS;
}