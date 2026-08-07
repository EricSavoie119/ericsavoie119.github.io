const LONDON_TIME_ZONE = 'Europe/London';
const SETTLEMENT_PERIOD_MS = 30 * 60 * 1000;

export const ACTIVITY_WINDOWS = [
  { minutes: 30, label: '30 minutes', example: 'Quick appliance cycle', energyKWh: 0.5 },
  { minutes: 60, label: '1 hour', example: 'Dishwasher', energyKWh: 1.1 },
  { minutes: 120, label: '2 hours', example: 'Washing and drying', energyKWh: 2.5 },
  { minutes: 240, label: '4 hours', example: 'EV top-up', energyKWh: 28 },
] as const;

export interface UtilityWindow {
  start: string;
  end: string;
  value: number;
  costPence?: number;
  comparisonPercent?: number;
}

export interface UtilityRecommendation {
  minutes: number;
  label: string;
  example: string;
  energyKWh: number;
  window: UtilityWindow | null;
}

export interface CleanestTimeData {
  available: boolean;
  generatedAt: string;
  recommendationDate: string | null;
  recommendations: UtilityRecommendation[];
  error?: string;
}

export interface AgileRegionData {
  code: string;
  name: string;
  recommendationDate: string | null;
  recommendations: UtilityRecommendation[];
}

export interface AgileTimeData {
  available: boolean;
  generatedAt: string;
  productCode: string | null;
  regions: AgileRegionData[];
  error?: string;
}

interface Interval {
  start: Date;
  end: Date;
  value: number;
}

const AGILE_REGIONS = [
  ['A', 'Eastern England'],
  ['B', 'East Midlands'],
  ['C', 'London'],
  ['D', 'Merseyside and Northern Wales'],
  ['E', 'West Midlands'],
  ['F', 'North Eastern England'],
  ['G', 'North Western England'],
  ['H', 'Southern England'],
  ['J', 'South Eastern England'],
  ['K', 'Southern Wales'],
  ['L', 'South Western England'],
  ['M', 'Yorkshire'],
  ['N', 'Southern Scotland'],
  ['P', 'Northern Scotland'],
] as const;

function londonDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: LONDON_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function chooseRecommendationDate(intervals: Interval[], now: Date) {
  const futureDates = [...new Set(
    intervals
      .filter((interval) => interval.end > now)
      .map((interval) => londonDate(interval.start)),
  )].sort();
  const today = londonDate(now);
  return futureDates.includes(today) ? today : futureDates[0] ?? null;
}

function candidateWindows(
  intervals: Interval[],
  minutes: number,
  now: Date,
  recommendationDate: string,
) {
  const count = minutes / 30;
  const usable = intervals
    .filter((interval) => interval.end > now && londonDate(interval.start) === recommendationDate)
    .sort((left, right) => left.start.getTime() - right.start.getTime());
  const candidates: UtilityWindow[] = [];

  for (let index = 0; index <= usable.length - count; index += 1) {
    const slice = usable.slice(index, index + count);
    const isConsecutive = slice.every((interval, sliceIndex) => (
      sliceIndex === 0
      || Math.abs(interval.start.getTime() - slice[sliceIndex - 1].end.getTime()) < 1000
    ));
    if (!isConsecutive) continue;
    const duration = slice[slice.length - 1].end.getTime() - slice[0].start.getTime();
    if (Math.abs(duration - minutes * 60 * 1000) > 1000) continue;
    candidates.push({
      start: slice[0].start.toISOString(),
      end: slice[slice.length - 1].end.toISOString(),
      value: slice.reduce((total, interval) => total + interval.value, 0) / count,
    });
  }

  return candidates;
}

function recommendations(intervals: Interval[], now: Date, mode: 'carbon' | 'price') {
  const recommendationDate = chooseRecommendationDate(intervals, now);
  if (!recommendationDate) {
    return { recommendationDate: null, recommendations: ACTIVITY_WINDOWS.map((activity) => ({ ...activity, window: null })) };
  }

  return {
    recommendationDate,
    recommendations: ACTIVITY_WINDOWS.map((activity) => {
      const candidates = candidateWindows(intervals, activity.minutes, now, recommendationDate);
      const best = candidates.reduce<UtilityWindow | null>((selected, candidate) => (
        !selected || candidate.value < selected.value ? candidate : selected
      ), null);
      if (best && mode === 'price') {
        const highest = Math.max(...candidates.map((candidate) => candidate.value));
        best.costPence = best.value * activity.energyKWh;
        best.comparisonPercent = highest > 0
          ? Math.max(0, ((highest - best.value) / highest) * 100)
          : undefined;
      }
      return { ...activity, window: best };
    }),
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`Request failed with HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getCleanestTimeData(now = new Date()): Promise<CleanestTimeData> {
  try {
    const aligned = new Date(Math.floor(now.getTime() / SETTLEMENT_PERIOD_MS) * SETTLEMENT_PERIOD_MS);
    const timestamp = aligned.toISOString().replace('.000', '');
    const payload = await fetchJson<{
      data: Array<{
        from: string;
        to: string;
        intensity: { forecast?: number };
      }>;
    }>(`https://api.carbonintensity.org.uk/intensity/${timestamp}/fw24h`);
    const intervals = payload.data.flatMap((period) => {
      if (typeof period.intensity.forecast !== 'number') return [];
      return [{ start: new Date(period.from), end: new Date(period.to), value: period.intensity.forecast }];
    });
    const result = recommendations(intervals, now, 'carbon');
    return {
      available: result.recommendations.some((item) => item.window),
      generatedAt: now.toISOString(),
      ...result,
    };
  } catch (error) {
    return {
      available: false,
      generatedAt: now.toISOString(),
      recommendationDate: null,
      recommendations: ACTIVITY_WINDOWS.map((activity) => ({ ...activity, window: null })),
      error: error instanceof Error ? error.message : 'The forecast is temporarily unavailable.',
    };
  }
}

export async function getAgileTimeData(now = new Date()): Promise<AgileTimeData> {
  try {
    const products = await fetchJson<{
      results: Array<{
        code: string;
        display_name: string;
        available_from: string;
        available_to: string | null;
        direction?: string | null;
      }>;
    }>('https://api.octopus.energy/v1/products/?brand=OCTOPUS_ENERGY&is_business=false&page_size=100');
    const product = products.results
      .filter((item) => item.display_name.toLowerCase() === 'agile octopus')
      .filter((item) => !item.available_to && (!item.direction || item.direction === 'IMPORT'))
      .sort((left, right) => right.available_from.localeCompare(left.available_from))[0];
    if (!product) throw new Error('No active Agile Octopus product was found.');

    const periodFrom = new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString();
    const periodTo = new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString();
    const regions = await Promise.all(AGILE_REGIONS.map(async ([code, name]) => {
      const tariffCode = `E-1R-${product.code}-${code}`;
      const url = new URL(`https://api.octopus.energy/v1/products/${product.code}/electricity-tariffs/${tariffCode}/standard-unit-rates/`);
      url.searchParams.set('period_from', periodFrom);
      url.searchParams.set('period_to', periodTo);
      url.searchParams.set('page_size', '100');
      const payload = await fetchJson<{
        results: Array<{
          value_inc_vat: number;
          valid_from: string;
          valid_to: string;
        }>;
      }>(url.toString());
      const intervals = payload.results.map((rate) => ({
        start: new Date(rate.valid_from),
        end: new Date(rate.valid_to),
        value: rate.value_inc_vat,
      }));
      return { code, name, ...recommendations(intervals, now, 'price') };
    }));

    return {
      available: regions.some((region) => region.recommendations.some((item) => item.window)),
      generatedAt: now.toISOString(),
      productCode: product.code,
      regions,
    };
  } catch (error) {
    return {
      available: false,
      generatedAt: now.toISOString(),
      productCode: null,
      regions: [],
      error: error instanceof Error ? error.message : 'Agile prices are temporarily unavailable.',
    };
  }
}

