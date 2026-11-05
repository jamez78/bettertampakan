import executiveOrdersData from '@/data/directory/executive-orders.json';

export interface ExecutiveOrderTable {
  title: string;
  note?: string | null;
  columns: string[];
  rows: string[][];
}

export interface ExecutiveOrderKeyPoints {
  heading: string;
  points: string[];
}

export interface ExecutiveOrder {
  slug: string;
  number: string;
  series: number;
  title: string;
  short_title: string;
  /** Date signed, YYYY-MM-DD */
  signed: string;
  effectivity: string;
  signatory: { name: string; title: string };
  source?: { url?: string | null; label?: string | null } | null;
  summary_fil?: string | null;
  tables?: ExecutiveOrderTable[];
  key_points?: ExecutiveOrderKeyPoints[];
}

/** Newest first. To add an order, add an entry to executive-orders.json. */
export const executiveOrders: ExecutiveOrder[] = (
  executiveOrdersData as unknown as ExecutiveOrder[]
)
  .slice()
  .sort((a, b) => b.signed.localeCompare(a.signed));

export function getExecutiveOrder(slug: string): ExecutiveOrder | undefined {
  return executiveOrders.find(order => order.slug === slug);
}

export function executiveOrderLabel(order: ExecutiveOrder): string {
  return `Executive Order No. ${order.number}, Series of ${order.series}`;
}

/** "2026-11-04" -> "November 4, 2026" without any time zone shift */
export function formatSignedDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
