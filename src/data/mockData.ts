// ── Types ──
export interface Timezone {
  id: string;
  name: string;
  abbreviation: string;
  offset: number;
  cities: string[];
}

export interface ConflictHotspot {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type: "armed-conflict" | "protests" | "terrorism" | "coup" | "sanctions" | "refugees";
  severity: "critical" | "high" | "medium" | "low";
  detail: string;
  value?: string;
}

export interface ActiveConflict {
  id: string;
  name: string;
  region: string;
  sides: string;
  status: string;
  startYear: number;
  severity: "critical" | "high" | "medium" | "low";
  casualties?: string;
}

export interface ConflictAlert {
  id: string;
  region: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  time: string;
}

export interface CasualtyData {
  region: string;
  conflict: string;
  killed: string;
  wounded: string;
  civilian: string;
  period: string;
}

export interface SanctionEntry {
  id: string;
  target: string;
  by: string;
  reason: string;
  since: string;
  status: "active" | "partial" | "lifted";
}

export interface RefugeeData {
  region: string;
  displaced: string;
  refugees: string;
  destination: string;
  trend: "up" | "stable" | "down";
}

export interface IntelEvent {
  id: string;
  time: string;
  region: string;
  type: string;
  headline: string;
  source: string;
  severity: "critical" | "high" | "medium" | "low";
}

// ── Timezones ──
export const timezones: Timezone[] = [
  { id: 'utc', name: 'Coordinated Universal Time', abbreviation: 'UTC', offset: 0, cities: ['London (Winter)', 'Reykjavik'] },
  { id: 'asia-bangkok', name: 'Indochina Time', abbreviation: 'ICT', offset: 420, cities: ['Bangkok', 'Hanoi', 'Jakarta'] },
  { id: 'asia-tokyo', name: 'Japan Standard Time', abbreviation: 'JST', offset: 540, cities: ['Tokyo', 'Seoul', 'Osaka'] },
  { id: 'europe-london', name: 'British Summer Time', abbreviation: 'BST', offset: 60, cities: ['London', 'Dublin', 'Lisbon'] },
  { id: 'america-new-york', name: 'Eastern Time', abbreviation: 'ET', offset: -300, cities: ['New York', 'Miami', 'Toronto'] },
  { id: 'asia-dubai', name: 'Gulf Standard Time', abbreviation: 'GST', offset: 240, cities: ['Dubai', 'Abu Dhabi', 'Muscat'] },
  { id: 'asia-singapore', name: 'Singapore Time', abbreviation: 'SGT', offset: 480, cities: ['Singapore', 'Hong Kong', 'Beijing'] },
];

export function getTimezoneById(id: string): Timezone | undefined {
  return timezones.find(tz => tz.id === id);
}

export function formatTimeWithTimezone(date: Date, timezoneOffset: number): string {
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
  const targetTime = new Date(utcTime + (timezoneOffset * 60000));
  const hours = String(targetTime.getHours()).padStart(2, '0');
  const minutes = String(targetTime.getMinutes()).padStart(2, '0');
  const seconds = String(targetTime.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// ── Conflict Hotspots on Map ──
export const conflictHotspots: ConflictHotspot[] = [
  { id: "1",  lat: 48.37, lng: 31.17, label: "Ukraine — War", type: "armed-conflict", severity: "critical", detail: "Russia-Ukraine war, ongoing frontline clashes", value: "ACTIVE" },
  { id: "2",  lat: 31.5,  lng: 34.47, label: "Gaza — Conflict", type: "armed-conflict", severity: "critical", detail: "Israel-Hamas war, heavy urban combat", value: "CRITICAL" },
  { id: "3",  lat: 15.6,  lng: 32.53, label: "Sudan — Civil War", type: "armed-conflict", severity: "critical", detail: "SAF vs RSF civil war, mass atrocities", value: "CRITICAL" },
  { id: "4",  lat: 19.74, lng: 96.12, label: "Myanmar — Civil War", type: "armed-conflict", severity: "high", detail: "Junta vs resistance forces nationwide", value: "HIGH" },
  { id: "5",  lat: 18.97, lng: -72.34, label: "Haiti — Gang Violence", type: "terrorism", severity: "high", detail: "Gang coalition controls Port-au-Prince", value: "HIGH" },
  { id: "6",  lat: -1.67, lng: 29.22, label: "DRC — Eastern Conflict", type: "armed-conflict", severity: "high", detail: "M23/Rwanda-backed forces, eastern DRC", value: "HIGH" },
  { id: "7",  lat: 4.86,  lng: 7.01,  label: "Nigeria — Boko Haram", type: "terrorism", severity: "medium", detail: "Boko Haram / ISWAP insurgency, NE Nigeria", value: "MEDIUM" },
  { id: "8",  lat: 14.5,  lng: -14.5, label: "Sahel — Instability", type: "terrorism", severity: "high", detail: "JNIM / ISWAP operations across Burkina, Mali, Niger", value: "HIGH" },
  { id: "9",  lat: 2.05,  lng: 45.34, label: "Somalia — Al-Shabaab", type: "terrorism", severity: "high", detail: "Al-Shabaab insurgency, IED attacks ongoing", value: "HIGH" },
  { id: "10", lat: 33.89, lng: 35.5,  label: "Lebanon — Tensions", type: "armed-conflict", severity: "high", detail: "Israel-Hezbollah ceasefire fragile, sporadic fire", value: "ELEVATED" },
  { id: "11", lat: 4.15,  lng: -73.63, label: "Colombia — ELN", type: "terrorism", severity: "medium", detail: "ELN guerrilla attacks, peace talks stalled", value: "MEDIUM" },
  { id: "12", lat: 10.48, lng: -66.88, label: "Venezuela — Crisis", type: "coup", severity: "medium", detail: "Post-election political crisis, opposition arrests", value: "MEDIUM" },
  { id: "13", lat: 37.57, lng: 127.0,  label: "S. Korea — Crisis", type: "coup", severity: "low", detail: "Martial law aftermath, presidential impeachment", value: "RESOLVED" },
  { id: "14", lat: 48.85, lng: 2.35,  label: "France — Protests", type: "protests", severity: "medium", detail: "Far-right / immigration protests, clashes in Paris", value: "ONGOING" },
  { id: "15", lat: 41.69, lng: 44.83, label: "Georgia — Protests", type: "protests", severity: "high", detail: "Pro-EU protests vs government, police crackdown", value: "HIGH" },
  { id: "16", lat: 23.82, lng: 90.36, label: "Bangladesh — Unrest", type: "protests", severity: "medium", detail: "Post-revolution instability, political clashes", value: "MEDIUM" },
  { id: "17", lat: 13.51, lng: 2.12,  label: "Niger — Coup Aftermath", type: "coup", severity: "medium", detail: "ECOWAS sanctions, junta consolidates power", value: "MEDIUM" },
  { id: "18", lat: 30.38, lng: 74.87, label: "India-Pakistan Border", type: "armed-conflict", severity: "medium", detail: "Line of Control skirmishes, Kashmir tensions", value: "ELEVATED" },
  { id: "19", lat: 39.02, lng: 125.75, label: "N. Korea — Provocations", type: "armed-conflict", severity: "medium", detail: "Ballistic missile tests, troops to Russia", value: "ELEVATED" },
  { id: "20", lat: 23.7,  lng: 120.96, label: "Taiwan Strait", type: "armed-conflict", severity: "medium", detail: "PLA incursions, military exercises increasing", value: "ELEVATED" },
  { id: "21", lat: 55.75, lng: 37.62, label: "Russia — Sanctioned", type: "sanctions", severity: "high", detail: "SWIFT exclusion, oil price cap, G7 asset freeze", value: "ACTIVE" },
  { id: "22", lat: 35.69, lng: 51.39, label: "Iran — Sanctioned", type: "sanctions", severity: "high", detail: "US/EU nuclear sanctions, oil embargo", value: "ACTIVE" },
];

// ── Active Conflicts ──
export const activeConflicts: ActiveConflict[] = [
  { id: "c1", name: "Russia-Ukraine War", region: "Eastern Europe", sides: "Russia vs Ukraine + NATO support", status: "Active frontline", startYear: 2022, severity: "critical", casualties: "500,000+" },
  { id: "c2", name: "Gaza War", region: "Middle East", sides: "Israel vs Hamas / Islamic Jihad", status: "Active combat", startYear: 2023, severity: "critical", casualties: "45,000+" },
  { id: "c3", name: "Sudan Civil War", region: "East Africa", sides: "SAF vs RSF (Rapid Support Forces)", status: "Mass atrocity", startYear: 2023, severity: "critical", casualties: "150,000+" },
  { id: "c4", name: "Myanmar Civil War", region: "Southeast Asia", sides: "Military Junta vs EAOs + PDF", status: "Resistance advancing", startYear: 2021, severity: "high", casualties: "50,000+" },
  { id: "c5", name: "DRC Eastern War", region: "Central Africa", sides: "DRC Army vs M23/Rwanda", status: "Cities under threat", startYear: 2021, severity: "high", casualties: "7,000+" },
  { id: "c6", name: "Sahel Insurgency", region: "West Africa", sides: "JNIM/ISWAP vs Sahel states", status: "Spreading westward", startYear: 2012, severity: "high", casualties: "20,000+" },
  { id: "c7", name: "Somalia — Al-Shabaab", region: "East Africa", sides: "Al-Shabaab vs ATMIS + Somalia", status: "Ongoing insurgency", startYear: 2006, severity: "high", casualties: "500,000+" },
  { id: "c8", name: "Colombia ELN", region: "South America", sides: "ELN vs Colombia government", status: "Peace talks paused", startYear: 1964, severity: "medium", casualties: "220,000+" },
];

// ── Recent Conflict Alerts ──
export const conflictAlerts: ConflictAlert[] = [
  { id: "a1", region: "Gaza / West Bank", type: "AIRSTRIKE", severity: "critical", description: "IDF strikes on Rafah — 40+ casualties reported", time: "8m ago" },
  { id: "a2", region: "Eastern Ukraine", type: "MISSILE ATTACK", severity: "critical", description: "Russian Shahed drone attack on Kharkiv infrastructure", time: "22m ago" },
  { id: "a3", region: "Sudan — Khartoum", type: "GROUND ASSAULT", severity: "critical", description: "RSF offensive in South Khartoum, civilians trapped", time: "45m ago" },
  { id: "a4", region: "DRC — Goma", type: "CITY ASSAULT", severity: "high", description: "M23 forces advancing on Goma city outskirts", time: "1h ago" },
  { id: "a5", region: "Myanmar — Mandalay", type: "AIRSTRIKE", severity: "high", description: "Junta jet airstrike on resistance-held village", time: "2h ago" },
  { id: "a6", region: "Georgia — Tbilisi", type: "CIVIL UNREST", severity: "high", description: "Police water cannons vs pro-EU protesters, 200+ arrested", time: "3h ago" },
  { id: "a7", region: "Somalia — Mogadishu", type: "IED ATTACK", severity: "high", description: "Al-Shabaab IED kills 12 near government compound", time: "4h ago" },
  { id: "a8", region: "Sahel — Burkina Faso", type: "AMBUSH", severity: "high", description: "JNIM ambush kills 30 soldiers on supply convoy", time: "5h ago" },
];

// ── Casualties Data ──
export const casualtiesData: CasualtyData[] = [
  { region: "Ukraine", conflict: "Russia-Ukraine War", killed: "500,000+", wounded: "1.2M+", civilian: "12,000+", period: "Since Feb 2022" },
  { region: "Gaza", conflict: "Gaza War", killed: "45,000+", wounded: "110,000+", civilian: "70%+", period: "Since Oct 2023" },
  { region: "Sudan", conflict: "Civil War", killed: "150,000+", wounded: "N/A", civilian: "High", period: "Since Apr 2023" },
  { region: "Myanmar", conflict: "Civil War", killed: "50,000+", wounded: "200,000+", civilian: "30%+", period: "Since Feb 2021" },
  { region: "DRC", conflict: "Eastern Conflict", killed: "7,000+", wounded: "15,000+", civilian: "High", period: "2022–present" },
  { region: "Somalia", conflict: "Al-Shabaab", killed: "500,000+", wounded: "N/A", civilian: "Majority", period: "Since 2006" },
  { region: "Sahel", conflict: "Insurgency", killed: "20,000+", wounded: "N/A", civilian: "High", period: "Since 2012" },
  { region: "Nigeria", conflict: "Boko Haram/ISWAP", killed: "35,000+", wounded: "N/A", civilian: "High", period: "Since 2009" },
];

// ── Sanctions ──
export const sanctionsData: SanctionEntry[] = [
  { id: "s1", target: "Russia", by: "US / EU / G7", reason: "Ukraine invasion", since: "Feb 2022", status: "active" },
  { id: "s2", target: "Iran", by: "US / EU", reason: "Nuclear program", since: "2010", status: "active" },
  { id: "s3", target: "North Korea", by: "UN / US / EU", reason: "Nuclear / missile program", since: "2006", status: "active" },
  { id: "s4", target: "Myanmar (Junta)", by: "US / EU / UK", reason: "Military coup 2021", since: "Feb 2021", status: "active" },
  { id: "s5", target: "Venezuela", by: "US / EU", reason: "Political crisis, human rights", since: "2017", status: "active" },
  { id: "s6", target: "Syria (Assad)", by: "US / EU", reason: "Civil war atrocities", since: "2011", status: "active" },
  { id: "s7", target: "Sudan (RSF leaders)", by: "US / UK / EU", reason: "War crimes, Darfur", since: "2023", status: "active" },
  { id: "s8", target: "Niger (Junta)", by: "ECOWAS", reason: "Military coup 2023", since: "Jul 2023", status: "partial" },
];

// ── Refugee & Displacement Data ──
export const refugeeData: RefugeeData[] = [
  { region: "Ukraine", displaced: "6.5M IDPs", refugees: "6.2M abroad", destination: "Poland, Germany, Czech", trend: "stable" },
  { region: "Gaza / Palestine", displaced: "2M+ IDPs", refugees: "5.9M (UNRWA)", destination: "Egypt, Jordan, Lebanon", trend: "up" },
  { region: "Sudan", displaced: "8.2M IDPs", refugees: "2.1M abroad", destination: "Chad, Egypt, S. Sudan", trend: "up" },
  { region: "Myanmar", displaced: "2.6M IDPs", refugees: "1.5M abroad", destination: "Thailand, Bangladesh, India", trend: "up" },
  { region: "DRC", displaced: "6.9M IDPs", refugees: "1.2M abroad", destination: "Uganda, Rwanda, Burundi", trend: "up" },
  { region: "Somalia", displaced: "3.8M IDPs", refugees: "900K abroad", destination: "Kenya, Ethiopia, Yemen", trend: "stable" },
  { region: "Syria", displaced: "7.2M IDPs", refugees: "6.7M abroad", destination: "Turkey, Lebanon, Jordan", trend: "stable" },
  { region: "Afghanistan", displaced: "3.5M IDPs", refugees: "5.7M abroad", destination: "Pakistan, Iran, Europe", trend: "up" },
];

// ── Intel Feed Events ──
export const intelFeed: IntelEvent[] = [
  { id: "i1", time: "4m ago", region: "Ukraine", type: "SIGINT", headline: "Russia deploys additional S-400 battery near Kherson", source: "Open OSINT", severity: "high" },
  { id: "i2", time: "12m ago", region: "Taiwan Strait", type: "MILITARY", headline: "PLA carrier group enters Taiwan Strait exercise zone", source: "US INDOPACOM", severity: "high" },
  { id: "i3", time: "28m ago", region: "Middle East", type: "DIPLOMATIC", headline: "Qatar-brokered Gaza ceasefire talks resume in Cairo", source: "Reuters", severity: "medium" },
  { id: "i4", time: "45m ago", region: "Iran", type: "NUCLEAR", headline: "IAEA reports Iran enrichment at 60% — near weapons grade", source: "IAEA Report", severity: "critical" },
  { id: "i5", time: "1h ago", region: "North Korea", type: "MILITARY", headline: "DPRK deploys 10,000+ troops to Russia confirmed by ROK", source: "ROK Intelligence", severity: "critical" },
  { id: "i6", time: "2h ago", region: "Sudan", type: "HUMANITARIAN", headline: "UN declares Sudan worst humanitarian crisis in the world", source: "OCHA", severity: "critical" },
  { id: "i7", time: "3h ago", region: "Venezuela", type: "POLITICAL", headline: "Opposition leader Edmundo González confirmed winner by US", source: "State Dept", severity: "medium" },
  { id: "i8", time: "4h ago", region: "Myanmar", type: "MILITARY", headline: "Brotherhood Alliance captures key Mandalay supply route", source: "OSINT / DVB", severity: "high" },
  { id: "i9", time: "5h ago", region: "DRC", type: "MILITARY", headline: "M23 seizes Minova — Goma supply corridor at risk", source: "MONUSCO", severity: "high" },
  { id: "i10", time: "6h ago", region: "Pacific", type: "DIPLOMATIC", headline: "US-China defence hotline reactivated after 3-year pause", source: "Pentagon", severity: "low" },
];

// ── Map Layers ──
export const layers = [
  { id: "armed-conflict", label: "ARMED CONFLICTS", color: "#dc2626", enabled: true },
  { id: "protests", label: "PROTESTS / UNREST", color: "#f59e0b", enabled: true },
  { id: "terrorism", label: "TERRORISM / ATTACKS", color: "#7c2d12", enabled: true },
  { id: "coup", label: "COUPS / POLITICAL CRISIS", color: "#7c3aed", enabled: true },
  { id: "sanctions", label: "ECONOMIC SANCTIONS", color: "#0891b2", enabled: false },
  { id: "refugees", label: "REFUGEE MOVEMENTS", color: "#6b7280", enabled: false },
  { id: "supply-routes", label: "SUPPLY / ARMS ROUTES", color: "#22d3ee", enabled: false },
  { id: "flight-paths", label: "FLIGHT PATHS", color: "#f97316", enabled: false },
];
