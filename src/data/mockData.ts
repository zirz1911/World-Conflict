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
  { id: "1",  lat: 48.37, lng: 31.17, label: "Ukraine — War", type: "armed-conflict", severity: "critical", detail: "Russia-Ukraine war, frontlines stabilised; peace talks pressure in 2025", value: "ACTIVE" },
  { id: "2",  lat: 31.5,  lng: 34.47, label: "Gaza — Post-Ceasefire", type: "armed-conflict", severity: "critical", detail: "Phase 1 ceasefire Jan 2025; hostage deal ongoing, reconstruction blocked", value: "CEASEFIRE" },
  { id: "3",  lat: 15.6,  lng: 32.53, label: "Sudan — Civil War", type: "armed-conflict", severity: "critical", detail: "SAF vs RSF — worst humanitarian crisis globally, 11M+ displaced", value: "CRITICAL" },
  { id: "4",  lat: 19.74, lng: 96.12, label: "Myanmar — Civil War", type: "armed-conflict", severity: "high", detail: "Junta losing ground; resistance controls ~60% of territory (2025)", value: "HIGH" },
  { id: "5",  lat: 18.97, lng: -72.34, label: "Haiti — Gang Crisis", type: "terrorism", severity: "high", detail: "Viv Ansanm gang coalition controls 80%+ of Port-au-Prince", value: "HIGH" },
  { id: "6",  lat: -1.67, lng: 29.22, label: "DRC — Goma Fallen", type: "armed-conflict", severity: "critical", detail: "M23 seized Goma Jan 2025; Rwanda-backed forces advancing on Bukavu", value: "CRITICAL" },
  { id: "7",  lat: 4.86,  lng: 7.01,  label: "Nigeria — Boko Haram", type: "terrorism", severity: "medium", detail: "Boko Haram / ISWAP insurgency, NE Nigeria — ISWAP splinter tensions", value: "MEDIUM" },
  { id: "8",  lat: 14.5,  lng: -14.5, label: "Sahel — Instability", type: "terrorism", severity: "high", detail: "JNIM/ISWAP + Africa Corps (ex-Wagner) operations across Burkina, Mali, Niger", value: "HIGH" },
  { id: "9",  lat: 2.05,  lng: 45.34, label: "Somalia — Al-Shabaab", type: "terrorism", severity: "high", detail: "Al-Shabaab resurgent after ATMIS withdrawal; major offensives in 2025", value: "HIGH" },
  { id: "10", lat: 33.7,  lng: 36.3,  label: "Syria — Transition", type: "coup", severity: "high", detail: "HTS governs Damascus post-Assad (Dec 2024); fragile transition, ISIS resurging", value: "TRANSITION" },
  { id: "11", lat: 33.89, lng: 35.5,  label: "Lebanon — Reconstruction", type: "armed-conflict", severity: "medium", detail: "Israel-Hezbollah ceasefire Nov 2024; IDF slow withdrawal, Hezbollah weakened", value: "FRAGILE" },
  { id: "12", lat: 4.15,  lng: -73.63, label: "Colombia — ELN", type: "terrorism", severity: "medium", detail: "ELN collapsed peace talks 2025; guerrilla attacks increasing in Catatumbo", value: "MEDIUM" },
  { id: "13", lat: 10.48, lng: -66.88, label: "Venezuela — Crisis", type: "coup", severity: "medium", detail: "Maduro claimed re-election despite González winning; opposition crackdown", value: "MEDIUM" },
  { id: "14", lat: 48.85, lng: 2.35,  label: "France — Protests", type: "protests", severity: "low", detail: "Immigration and pension protests; political instability post-election 2024", value: "LOW" },
  { id: "15", lat: 41.69, lng: 44.83, label: "Georgia — Crisis", type: "protests", severity: "high", detail: "Pro-EU protests suppressed; ruling party suspended EU accession bid", value: "HIGH" },
  { id: "16", lat: 23.82, lng: 90.36, label: "Bangladesh — Unrest", type: "protests", severity: "medium", detail: "Interim government post-Hasina; political violence and economic strain", value: "MEDIUM" },
  { id: "17", lat: 13.51, lng: 2.12,  label: "Niger — Junta", type: "coup", severity: "medium", detail: "Alliance des États du Sahel (AES) bloc formed; anti-France, pro-Russia", value: "MEDIUM" },
  { id: "18", lat: 30.38, lng: 74.87, label: "India-Pakistan Border", type: "armed-conflict", severity: "medium", detail: "Kashmir LoC skirmishes; India-Pakistan diplomatic tensions elevated 2025", value: "ELEVATED" },
  { id: "19", lat: 39.02, lng: 125.75, label: "N. Korea — Provocations", type: "armed-conflict", severity: "high", detail: "DPRK troops in Russia confirmed; ballistic missile tests continue in 2025", value: "ELEVATED" },
  { id: "20", lat: 23.7,  lng: 120.96, label: "Taiwan Strait", type: "armed-conflict", severity: "high", detail: "PLA Joint Sword exercises 2025; drone incursions increasing near Kinmen", value: "ELEVATED" },
  { id: "21", lat: 55.75, lng: 37.62, label: "Russia — Sanctioned", type: "sanctions", severity: "high", detail: "G7 asset freeze, oil price cap, SWIFT exclusion — sanctions intact 2025", value: "ACTIVE" },
  { id: "22", lat: 35.69, lng: 51.39, label: "Iran — Sanctioned", type: "sanctions", severity: "high", detail: "US max-pressure renewed 2025; enrichment at 60%, nuclear talks collapsed", value: "ACTIVE" },
  { id: "23", lat: 15.55, lng: 32.53, label: "Sudan — Famine", type: "refugees", severity: "critical", detail: "IPC Phase 5 famine declared in 5 states; 25M+ facing acute food insecurity", value: "FAMINE" },
];

// ── Active Conflicts ──
export const activeConflicts: ActiveConflict[] = [
  { id: "c1", name: "Russia-Ukraine War", region: "Eastern Europe", sides: "Russia vs Ukraine + Western support", status: "Frontlines stabilised; peace pressure", startYear: 2022, severity: "critical", casualties: "700,000+" },
  { id: "c2", name: "Gaza War / Ceasefire", region: "Middle East", sides: "Israel vs Hamas / Islamic Jihad", status: "Phase 1 ceasefire — Jan 2025", startYear: 2023, severity: "critical", casualties: "50,000+" },
  { id: "c3", name: "Sudan Civil War", region: "East Africa", sides: "SAF vs RSF (Rapid Support Forces)", status: "Famine — worst global crisis", startYear: 2023, severity: "critical", casualties: "200,000+" },
  { id: "c4", name: "DRC — Eastern War", region: "Central Africa", sides: "DRC Army + SADC vs M23/Rwanda", status: "Goma fallen — Jan 2025", startYear: 2021, severity: "critical", casualties: "15,000+" },
  { id: "c5", name: "Myanmar Civil War", region: "Southeast Asia", sides: "Military Junta vs EAOs + PDF", status: "Resistance controls ~60% territory", startYear: 2021, severity: "high", casualties: "60,000+" },
  { id: "c6", name: "Syria — Post-Assad Transition", region: "Middle East", sides: "HTS vs ISIS remnants + factions", status: "Assad fell Dec 2024; HTS governing", startYear: 2011, severity: "high", casualties: "620,000+" },
  { id: "c7", name: "Sahel Insurgency", region: "West Africa", sides: "JNIM/ISWAP + Africa Corps vs AES states", status: "Spreading — AES bloc vs ECOWAS", startYear: 2012, severity: "high", casualties: "25,000+" },
  { id: "c8", name: "Somalia — Al-Shabaab", region: "East Africa", sides: "Al-Shabaab vs SNA + AUSSOM", status: "Resurgent after ATMIS withdrawal", startYear: 2006, severity: "high", casualties: "500,000+" },
  { id: "c9", name: "Haiti — Gang War", region: "Caribbean", sides: "Viv Ansanm coalition vs HNP + KSS", status: "MSS (Kenya) deployed; limited progress", startYear: 2021, severity: "high", casualties: "8,000+" },
  { id: "c10", name: "Colombia ELN", region: "South America", sides: "ELN vs Colombia government", status: "Peace talks collapsed Feb 2025", startYear: 1964, severity: "medium", casualties: "220,000+" },
];

// ── Recent Conflict Alerts ──
export const conflictAlerts: ConflictAlert[] = [
  { id: "a1", region: "DRC — South Kivu", type: "CITY ASSAULT", severity: "critical", description: "M23 forces advancing on Bukavu — 500,000+ civilians at risk", time: "6m ago" },
  { id: "a2", region: "Eastern Ukraine", type: "MISSILE ATTACK", severity: "critical", description: "Russian Iskander-M strike on Zaporizhzhia energy grid", time: "18m ago" },
  { id: "a3", region: "Sudan — North Darfur", type: "AIRSTRIKE", severity: "critical", description: "SAF airstrike on RSF-held El Fasher market — 30+ dead", time: "40m ago" },
  { id: "a4", region: "Gaza — Phase 1", type: "DIPLOMATIC", severity: "high", description: "Phase 2 ceasefire negotiations stalled — Hamas rejects IDF presence", time: "1h ago" },
  { id: "a5", region: "Myanmar — Mandalay", type: "GROUND ASSAULT", severity: "high", description: "Brotherhood Alliance breaches Mandalay city defence perimeter", time: "2h ago" },
  { id: "a6", region: "Syria — Deir ez-Zor", type: "TERRORISM", severity: "high", description: "ISIS ambush kills 14 HTS fighters in eastern desert offensive", time: "3h ago" },
  { id: "a7", region: "Somalia — Mogadishu", type: "IED ATTACK", severity: "high", description: "Al-Shabaab SVBIED kills 18 near Halane base compound", time: "4h ago" },
  { id: "a8", region: "Taiwan Strait", type: "MILITARY", severity: "high", description: "PLA deploys carrier group east of median line — ROCAF scrambles jets", time: "5h ago" },
];

// ── Casualties Data ──
export const casualtiesData: CasualtyData[] = [
  { region: "Ukraine", conflict: "Russia-Ukraine War", killed: "700,000+", wounded: "1.5M+", civilian: "15,000+", period: "Since Feb 2022" },
  { region: "Gaza", conflict: "Gaza War", killed: "50,000+", wounded: "115,000+", civilian: "70%+", period: "Oct 2023 – Jan 2025 ceasefire" },
  { region: "Sudan", conflict: "Civil War", killed: "200,000+", wounded: "N/A", civilian: "High", period: "Since Apr 2023" },
  { region: "Syria", conflict: "Civil War (total)", killed: "620,000+", wounded: "2M+", civilian: "Majority", period: "2011 – Assad fall Dec 2024" },
  { region: "DRC", conflict: "Eastern War", killed: "15,000+", wounded: "30,000+", civilian: "High", period: "2021 – present" },
  { region: "Myanmar", conflict: "Civil War", killed: "60,000+", wounded: "250,000+", civilian: "35%+", period: "Since Feb 2021" },
  { region: "Somalia", conflict: "Al-Shabaab", killed: "500,000+", wounded: "N/A", civilian: "Majority", period: "Since 2006" },
  { region: "Sahel", conflict: "Insurgency", killed: "25,000+", wounded: "N/A", civilian: "High", period: "Since 2012" },
];

// ── Sanctions ──
export const sanctionsData: SanctionEntry[] = [
  { id: "s1", target: "Russia", by: "US / EU / G7", reason: "Ukraine invasion", since: "Feb 2022", status: "active" },
  { id: "s2", target: "Iran", by: "US / EU", reason: "Nuclear program — max-pressure resumed 2025", since: "2010", status: "active" },
  { id: "s3", target: "North Korea", by: "UN / US / EU", reason: "Nuclear / missile program + troops to Russia", since: "2006", status: "active" },
  { id: "s4", target: "Myanmar (Junta)", by: "US / EU / UK", reason: "Military coup 2021 — expanded 2024", since: "Feb 2021", status: "active" },
  { id: "s5", target: "Venezuela", by: "US / EU", reason: "Election fraud 2024, human rights", since: "2017", status: "active" },
  { id: "s6", target: "Syria (Assad era)", by: "US / EU", reason: "Civil war atrocities — partial review post-Assad fall", since: "2011", status: "partial" },
  { id: "s7", target: "Sudan (RSF leaders)", by: "US / UK / EU", reason: "War crimes, Darfur genocide 2023–2025", since: "2023", status: "active" },
  { id: "s8", target: "Haiti (gang leaders)", by: "US / Canada / UN", reason: "Gang violence, state capture", since: "2022", status: "active" },
];

// ── Refugee & Displacement Data ──
export const refugeeData: RefugeeData[] = [
  { region: "Sudan", displaced: "11M+ IDPs", refugees: "3.2M abroad", destination: "Chad, Egypt, S. Sudan, Uganda", trend: "up" },
  { region: "Syria", displaced: "7.4M IDPs", refugees: "6.4M abroad", destination: "Turkey, Lebanon, Jordan — some returning post-Assad", trend: "down" },
  { region: "DRC", displaced: "7.8M IDPs", refugees: "1.4M abroad", destination: "Uganda, Rwanda, Burundi — spike after Goma Jan 2025", trend: "up" },
  { region: "Ukraine", displaced: "5.1M IDPs", refugees: "6.0M abroad", destination: "Poland, Germany, Czech — some returning", trend: "stable" },
  { region: "Gaza / Palestine", displaced: "1.9M IDPs", refugees: "5.9M (UNRWA)", destination: "Egypt — ceasefire allows partial return", trend: "stable" },
  { region: "Myanmar", displaced: "3.2M IDPs", refugees: "1.8M abroad", destination: "Thailand, Bangladesh, India", trend: "up" },
  { region: "Somalia", displaced: "3.9M IDPs", refugees: "950K abroad", destination: "Kenya, Ethiopia — ATMIS withdrawal impact", trend: "up" },
  { region: "Afghanistan", displaced: "3.8M IDPs", refugees: "5.9M abroad", destination: "Pakistan, Iran — mass deportations from Pakistan 2025", trend: "up" },
];

// ── Intel Feed Events ──
export const intelFeed: IntelEvent[] = [
  { id: "i1", time: "5m ago", region: "DRC — Goma", type: "MILITARY", headline: "M23 command post established in Goma — SADC forces repositioning", source: "MONUSCO / OSINT", severity: "critical" },
  { id: "i2", time: "15m ago", region: "Ukraine", type: "SIGINT", headline: "Russia deploys Oreshnik hypersonic missile battalion to Belarus border", source: "UA Intel / OSINT", severity: "critical" },
  { id: "i3", time: "30m ago", region: "Middle East", type: "DIPLOMATIC", headline: "Qatar: Phase 2 Gaza talks require IDF full withdrawal — Israel rejects", source: "Al Jazeera", severity: "high" },
  { id: "i4", time: "1h ago", region: "Iran", type: "NUCLEAR", headline: "IAEA: Iran enrichment stockpile at 60% — sufficient for multiple devices", source: "IAEA Report Q1 2025", severity: "critical" },
  { id: "i5", time: "2h ago", region: "North Korea", type: "MILITARY", headline: "DPRK deploys additional 15,000 troops to Kursk front — ROK assessment", source: "NIS / ROK Intelligence", severity: "critical" },
  { id: "i6", time: "3h ago", region: "Sudan", type: "HUMANITARIAN", headline: "WFP: famine confirmed in 5 Sudanese states — access blocked by RSF", source: "WFP / OCHA 2025", severity: "critical" },
  { id: "i7", time: "4h ago", region: "Syria", type: "TERRORISM", headline: "ISIS executes 22 HTS fighters in Deir ez-Zor — caliphate revival messaging", source: "SITE Intelligence", severity: "high" },
  { id: "i8", time: "5h ago", region: "Taiwan", type: "MILITARY", headline: "PLA Rocket Force conducts live-fire drill — DF-26 ASBM units on alert", source: "US INDOPACOM", severity: "high" },
  { id: "i9", time: "6h ago", region: "Myanmar", type: "MILITARY", headline: "3 Brotherhood Alliance captures Mandalay airport perimeter — junta loses air hub", source: "OSINT / DVB", severity: "high" },
  { id: "i10", time: "8h ago", region: "Sahel", type: "DIPLOMATIC", headline: "AES bloc (Mali, Niger, Burkina) officially leaves ECOWAS — new regional bloc declared", source: "AFP / Reuters", severity: "medium" },
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
