import { LayoutDashboard, Map, Network, Satellite, Server, Radar, ShieldCheck, FileText, Waves, Bell, Settings } from "lucide-react";

export const PORTAL_ROLES = [
  { id: "oceanographer", name: "Oceanographer", short: "Oceanographer", initials: "OM", person: "Dr. A. Mehra", title: "Oceanographer", color: "#2563eb", tagline: "Real-time ocean monitoring" },
  { id: "fisheries", name: "Fisheries Agent", short: "Fisheries", initials: "FA", person: "Dr. R. Nair", title: "Fisheries Agent", color: "#0F62FE", tagline: "Productivity & PFZ intelligence" },
  { id: "coral", name: "Coral Reef Agent", short: "Coral Reef", initials: "CR", person: "Dr. S. Pillai", title: "Coral Reef Agent", color: "#D9383A", tagline: "Reef thermal stress & bleaching" },
  { id: "climate", name: "Climate Change Agent", short: "Climate", initials: "CC", person: "Dr. M. Khan", title: "Climate Change Agent", color: "#E67E22", tagline: "Climate trends & anomalies" },
  { id: "coastal", name: "Coastal Disasters & Marine Scientist Agent", short: "Coastal & Marine", initials: "CD", person: "Dr. L. Ortiz", title: "Coastal Disasters & Marine Scientist", color: "#7c3aed", tagline: "Hazards, coastal & marine ops" },
];

export const PORTAL_NAV = [
  { to: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard, page: 1 },
  { to: "real-time-maps", label: "Real-time Maps", icon: Map, page: 2 },
  { to: "query-synthesis", label: "Multi-Agent Query Synthesis", icon: Network, page: 3 },
  { to: "satellite-datasets", label: "Raw Satellite Datasets", icon: Satellite, page: 4 },
  { to: "isko-server", label: "Isko Ocean Data Server", icon: Server, page: 5 },
  { to: "swarm-tracking", label: "ORCA Swarm Tracking", icon: Radar, page: 6 },
  { to: "data-policy", label: "Indian Oceanographic Data Policy", icon: ShieldCheck, page: 7 },
  { to: "reports", label: "Reports & Analytics", icon: FileText, page: 8 },
  { to: "states-monitor", label: "9 Maritime States Monitor", icon: Waves, page: 9 },
  { to: "alerts", label: "Alerts", icon: Bell, page: 10 },
  { to: "settings", label: "Settings", icon: Settings, page: 11 },
];

export const roleById = (id) => PORTAL_ROLES.find((r) => r.id === id) || PORTAL_ROLES[0];