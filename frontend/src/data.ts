export type View =
  | "Overview"
  | "Soil & crop recommendations"
  | "Crop calendar"
  | "Harvest & market prices"
  | "Storage locations"
  | "My farm"
  | "Settings";

export type CropKey = "Rice" | "Maize" | "Groundnut" | "Cotton" | "Green gram";

export interface CropInfo {
  name: CropKey;
  variety: string;
  days: number;
  water: string;
  soil: string;
  season: string;
  pricePerQuintal: number;
  image: string;
  explanation: string;
  stages: { name: string; day: number }[];
}

export interface Activity {
  id: string;
  title: string;
  stage: string;
  day: number;
  duration?: number;
  description: string;
}

export interface Facility {
  id: string;
  name: string;
  type: string;
  crops: CropKey[];
  capacity: number;
  charge: number;
  contact: string;
  sampleDistrict: string;
  distance: number;
  description: string;
  country: string;
  state: string;
  locality: string;
  address: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  condition: "Excellent" | "Good" | "Needs Maintenance" | "Critical";
  cleanliness: string;
  ventilation: string;
  moistureProtection: string;
  pestControl: string;
  inspectionDate: string;
  maintenanceNotes: string;
  availability: "Available" | "Limited Availability" | "Unavailable";
  occupiedCapacity: number;
  capacityUnit: "tonnes" | "kilograms";
  dailyPrice: number;
  pricingUnit: "per tonne per day" | "per kilogram per day" | "per facility per day";
  minimumDays: number;
  handlingFee: number;
  loadingFee: number;
  pricingNotes: string;
  availabilityNotes: string;
  devices: MonitoringDevice[];
  updatedAt: string;
  providerManaged: boolean;
}

export interface MonitoringDevice {
  id: string;
  name: string;
  type: "Temperature Sensor" | "Humidity Sensor" | "Combined Temperature & Humidity Sensor";
  identifier: string;
  area: string;
  status: "Online" | "Offline" | "Maintenance";
  enabled: boolean;
  temperature: number | null;
  humidity: number | null;
  temperatureThreshold: number;
  humidityThreshold: number;
  updatedAt: string;
}

export interface RevenueSummary {
  saleableQuintals: number;
  grossRevenue: number;
  totalCosts: number;
  netReturn: number;
}

export const crops: CropInfo[] = [
  {
    name: "Rice",
    variety: "Sona Masuri (demo variety)",
    days: 125,
    water: "High",
    soil: "Clay loam, pH 5.5-7.0",
    season: "Kharif · Jun to Jul",
    pricePerQuintal: 2280,
    image: "/crop-alt-2.jpg",
    explanation: "Sample fit for moisture-retentive soil and reliable irrigation.",
    stages: [
      { name: "Land preparation", day: 0 },
      { name: "Establishment", day: 18 },
      { name: "Tillering", day: 42 },
      { name: "Flowering", day: 78 },
      { name: "Grain filling", day: 101 },
      { name: "Harvest window", day: 125 },
    ],
  },
  {
    name: "Maize",
    variety: "HQPM-1 (demo variety)",
    days: 100,
    water: "Medium",
    soil: "Well-drained loam, pH 5.8-7.2",
    season: "Kharif · Jun to Jul",
    pricePerQuintal: 2140,
    image: "/crop-alt-1.jpg",
    explanation: "Sample fit for well-drained soil with moderate water access.",
    stages: [
      { name: "Land preparation", day: 0 },
      { name: "Germination", day: 8 },
      { name: "Vegetative growth", day: 32 },
      { name: "Tasseling", day: 55 },
      { name: "Kernel development", day: 76 },
      { name: "Harvest window", day: 100 },
    ],
  },
  {
    name: "Groundnut",
    variety: "Kadiri-6 (demo variety)",
    days: 105,
    water: "Low to medium",
    soil: "Loose sandy loam, pH 6.0-7.0",
    season: "Kharif · Jun to Jul",
    pricePerQuintal: 5820,
    image: "/crop-alt-3.jpg",
    explanation: "Sample fit for loose, well-drained soil and moderate rainfall.",
    stages: [
      { name: "Seedbed preparation", day: 0 },
      { name: "Emergence", day: 10 },
      { name: "Flowering", day: 32 },
      { name: "Pegging", day: 48 },
      { name: "Pod development", day: 76 },
      { name: "Harvest window", day: 105 },
    ],
  },
  {
    name: "Cotton",
    variety: "Suraj (demo variety)",
    days: 160,
    water: "Medium",
    soil: "Deep black soil, pH 6.0-8.0",
    season: "Kharif · May to Jun",
    pricePerQuintal: 7120,
    image: "/farm-field.jpg",
    explanation: "Sample fit for deep soils that can retain moisture between checks.",
    stages: [
      { name: "Field preparation", day: 0 },
      { name: "Emergence", day: 12 },
      { name: "Vegetative growth", day: 48 },
      { name: "Flowering", day: 82 },
      { name: "Boll development", day: 122 },
      { name: "Picking window", day: 160 },
    ],
  },
  {
    name: "Green gram",
    variety: "ML-818 (demo variety)",
    days: 70,
    water: "Low",
    soil: "Well-drained loam, pH 6.2-7.5",
    season: "Kharif · Jun to Jul",
    pricePerQuintal: 7420,
    image: "/crop-alt-3.jpg",
    explanation: "Sample fit for a shorter season and lower water availability.",
    stages: [
      { name: "Field preparation", day: 0 },
      { name: "Emergence", day: 7 },
      { name: "Branching", day: 22 },
      { name: "Flowering", day: 38 },
      { name: "Pod filling", day: 54 },
      { name: "Harvest window", day: 70 },
    ],
  },
];

export const activities: Activity[] = [
  { id: "prepare", title: "Prepare the field", stage: "Land preparation", day: -5, description: "Check drainage and prepare a level seedbed for the selected crop." },
  { id: "sow", title: "Sow selected crop", stage: "Sowing", day: 0, description: "Use seed and spacing guidance verified with your local agriculture officer." },
  { id: "emergence", title: "Check crop establishment", stage: "Germination", day: 9, description: "Inspect emergence across the field and note any uneven patches." },
  { id: "water", title: "Review soil moisture", stage: "Irrigation check", day: 18, description: "Check soil moisture before deciding whether irrigation is needed." },
  { id: "weed", title: "Inspect for weeds", stage: "Early growth", day: 25, description: "Walk the field and record weed pressure for local advice." },
  { id: "nutrient", title: "Review nutrient plan", stage: "Nutrient management", day: 35, description: "Use soil-test results and locally verified guidance to plan nutrients." },
  { id: "scout", title: "Scout for pests and disease", stage: "Crop monitoring", day: 46, description: "Identify any pest or disease, assess threshold, and seek local advice. Follow product labels if treatment is needed." },
  { id: "flower", title: "Monitor flowering", stage: "Flowering", day: 60, description: "Record flowering progress and check for moisture stress." },
  { id: "weather", title: "Review rainfall conditions", stage: "Crop monitoring", day: 76, description: "Sample weather reminder only. Check a trusted local forecast before field decisions." },
  { id: "readiness", title: "Check harvest readiness", stage: "Harvest readiness", day: 90, description: "Compare crop maturity with local harvest guidance before planning labor." },
  { id: "harvest", title: "Plan harvest window", stage: "Harvest", day: 105, description: "Confirm maturity, drying space, and transport before harvest." },
];

export const facilities: Facility[] = [
  {
    id: "warehouse-1", name: "Green Valley Warehouse (sample)", type: "Warehouse", crops: ["Rice", "Maize", "Groundnut", "Green gram"],
    capacity: 84, occupiedCapacity: 31, capacityUnit: "tonnes", charge: 42, dailyPrice: 1.4, pricingUnit: "per tonne per day",
    contact: "00000 00001 (demo)", sampleDistrict: "Guntur", distance: 12, country: "India", state: "Andhra Pradesh",
    locality: "Tenali example", address: "Sample market road", postalCode: "522201", latitude: "", longitude: "",
    condition: "Good", cleanliness: "Provider-reported clean", ventilation: "Provider-reported adequate",
    moistureProtection: "Provider-reported protected", pestControl: "Provider-reported routine checks",
    inspectionDate: "2026-08-15", maintenanceNotes: "No independent inspection is recorded.",
    availability: "Available", description: "Illustrative dry storage with ventilated bays and sample handling fees.",
    minimumDays: 1, handlingFee: 120, loadingFee: 80, pricingNotes: "Sample fee only; confirm charges with a real provider.",
    availabilityNotes: "Sample availability only.", devices: [], updatedAt: "Sample record", providerManaged: false,
  },
  {
    id: "grain-1", name: "Kisan Grain Store (sample)", type: "Grain storage", crops: ["Rice", "Maize", "Green gram"],
    capacity: 56, occupiedCapacity: 25, capacityUnit: "tonnes", charge: 35, dailyPrice: 1.15, pricingUnit: "per tonne per day",
    contact: "00000 00002 (demo)", sampleDistrict: "Guntur", distance: 19, country: "India", state: "Andhra Pradesh",
    locality: "Guntur example", address: "Sample grain market lane", postalCode: "522002", latitude: "", longitude: "",
    condition: "Needs Maintenance", cleanliness: "Provider-reported fair", ventilation: "Provider-reported needs review",
    moistureProtection: "Provider-reported fair", pestControl: "Provider-reported routine checks",
    inspectionDate: "2026-07-20", maintenanceNotes: "Sample note: roof maintenance review pending.",
    availability: "Limited Availability", description: "Example facility for bagged grains. Capacity and charges are not verified.",
    minimumDays: 3, handlingFee: 100, loadingFee: 75, pricingNotes: "Sample fee only; confirm charges with a real provider.",
    availabilityNotes: "Limited sample capacity.", devices: [{
      id: "seed-humidity", name: "North bay humidity (sample)", type: "Humidity Sensor",
      identifier: "DEMO-HUM-02", area: "North bay", status: "Online", enabled: true,
      temperature: null, humidity: 69, temperatureThreshold: 30, humidityThreshold: 65, updatedAt: "Simulated sample reading",
    }], updatedAt: "Sample record", providerManaged: false,
  },
  {
    id: "cold-1", name: "Harvest Cold Rooms (sample)", type: "Cold storage", crops: ["Groundnut"],
    capacity: 32, occupiedCapacity: 14, capacityUnit: "tonnes", charge: 68, dailyPrice: 2.3, pricingUnit: "per tonne per day",
    contact: "00000 00003 (demo)", sampleDistrict: "Guntur", distance: 27, country: "India", state: "Andhra Pradesh",
    locality: "Narasaraopet example", address: "Sample cold-chain access road", postalCode: "522601", latitude: "", longitude: "",
    condition: "Good", cleanliness: "Provider-reported clean", ventilation: "Provider-reported controlled",
    moistureProtection: "Provider-reported protected", pestControl: "Provider-reported routine checks",
    inspectionDate: "2026-08-02", maintenanceNotes: "No independent inspection is recorded.",
    availability: "Available", description: "Example temperature-managed unit. Confirm crop suitability with an actual operator.",
    minimumDays: 2, handlingFee: 150, loadingFee: 100, pricingNotes: "Sample fee only; confirm charges with a real provider.",
    availabilityNotes: "Sample availability only.", devices: [{
      id: "seed-combined", name: "Cold room monitor (sample)", type: "Combined Temperature & Humidity Sensor",
      identifier: "DEMO-TH-03", area: "Cold room A", status: "Online", enabled: true,
      temperature: 8.5, humidity: 72, temperatureThreshold: 12, humidityThreshold: 75, updatedAt: "Simulated sample reading",
    }], updatedAt: "Sample record", providerManaged: false,
  },
  {
    id: "warehouse-2", name: "Riverbend Produce Hub (sample)", type: "Warehouse", crops: ["Cotton", "Maize", "Rice"],
    capacity: 110, occupiedCapacity: 110, capacityUnit: "tonnes", charge: 48, dailyPrice: 1.6, pricingUnit: "per tonne per day",
    contact: "00000 00004 (demo)", sampleDistrict: "Krishna", distance: 34, country: "India", state: "Andhra Pradesh",
    locality: "Vijayawada example", address: "Sample produce access road", postalCode: "520001", latitude: "", longitude: "",
    condition: "Excellent", cleanliness: "Provider-reported clean", ventilation: "Provider-reported adequate",
    moistureProtection: "Provider-reported protected", pestControl: "Provider-reported routine checks",
    inspectionDate: "2026-09-01", maintenanceNotes: "No independent inspection is recorded.",
    availability: "Unavailable", description: "Illustrative multi-crop warehouse with sample fees and no live inventory.",
    minimumDays: 1, handlingFee: 100, loadingFee: 100, pricingNotes: "Sample fee only; confirm charges with a real provider.",
    availabilityNotes: "Example listing is not accepting storage.", devices: [{
      id: "seed-temp", name: "Storage temperature (sample)", type: "Temperature Sensor",
      identifier: "DEMO-TMP-04", area: "Central bay", status: "Offline", enabled: true,
      temperature: 31, humidity: null, temperatureThreshold: 30, humidityThreshold: 65, updatedAt: "Simulated sample reading",
    }], updatedAt: "Sample record", providerManaged: false,
  },
];

export const markets = [
  { name: "Guntur market (sample)", priceFactor: 1.02, change: "+1.8%" },
  { name: "Tenali market (sample)", priceFactor: 0.98, change: "-0.6%" },
  { name: "Vijayawada market (sample)", priceFactor: 1.05, change: "+0.9%" },
];

export const priceHistoryFactors = [0.91, 0.93, 0.92, 0.95, 0.94, 0.97, 0.96, 1.02, 0.99, 1.04, 1.02, 1];

function currentIntlLocale(): string {
  const language = document.documentElement.lang;
  return language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN";
}

export function formatRupees(value: number): string {
  return new Intl.NumberFormat(currentIntlLocale(), {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatStorageRate(value: number): string {
  return new Intl.NumberFormat(currentIntlLocale(), {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function addDays(date: string, days: number): string {
  if (!isIsoDate(date) || !Number.isFinite(days)) return "";
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day + Math.trunc(days)));
  if (value.getUTCFullYear() < 1000 || value.getUTCFullYear() > 9999) return "";
  return [
    value.getUTCFullYear().toString().padStart(4, "0"),
    (value.getUTCMonth() + 1).toString().padStart(2, "0"),
    value.getUTCDate().toString().padStart(2, "0"),
  ].join("-");
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function localDateString(date = new Date()): string {
  return [
    date.getFullYear().toString().padStart(4, "0"),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
  ].join("-");
}

export function daysBetween(from: string, to: string): number {
  if (!isIsoDate(from) || !isIsoDate(to)) return 0;
  const [fromYear, fromMonth, fromDay] = from.split("-").map(Number);
  const [toYear, toMonth, toDay] = to.split("-").map(Number);
  const start = Date.UTC(fromYear, fromMonth - 1, fromDay);
  const end = Date.UTC(toYear, toMonth - 1, toDay);
  return Math.round((end - start) / 86400000);
}

export function quantityInQuintals(quantity: number, unit: string): number {
  const factors: Record<string, number> = {
    quintals: 1,
    tonnes: 10,
    kilograms: 0.01,
  };
  const factor = factors[unit] ?? 1;
  return Number.isFinite(quantity) ? Math.max(0, quantity) * factor : 0;
}

export function calculateRevenue(
  quantity: number,
  unit: string,
  pricePerQuintal: number,
  costs: number[],
  storageLossPercent = 0,
): RevenueSummary {
  const saleableQuintals = quantityInQuintals(quantity, unit) * (1 - Math.min(100, Math.max(0, storageLossPercent)) / 100);
  const grossRevenue = saleableQuintals * Math.max(0, Number.isFinite(pricePerQuintal) ? pricePerQuintal : 0);
  const totalCosts = costs.reduce((sum, cost) => sum + Math.max(0, Number.isFinite(cost) ? cost : 0), 0);
  return {
    saleableQuintals,
    grossRevenue,
    totalCosts,
    netReturn: grossRevenue - totalCosts,
  };
}

export function samplePriceHistory(referencePrice: number): number[] {
  return priceHistoryFactors.map((factor) => Math.round(referencePrice * factor));
}

export function cropActivities(crop: CropInfo): Activity[] {
  const scale = crop.days / 105;
  return activities.map((activity) => {
    const adjustedDay = Math.round(activity.day * scale);
    return {
      ...activity,
      day: activity.id === "harvest" ? crop.days - 5 : adjustedDay,
      duration: activity.id === "harvest" ? 5 : undefined,
    };
  });
}
