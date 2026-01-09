import type { MoneyEvent } from "../entities/Event";
import type { AnalyticsSnapshot, CategoryBreakdown } from "../entities/Snapshot";
import type { CategoryKey, Currency, ISODateString, TimeWindow } from "../types";

function add(a: string, b: string): string {
  return (Number(a) + Number(b)).toFixed(6).replace(/\.?0+$/, "");
}

function sub(a: string, b: string): string {
  return (Number(a) - Number(b)).toFixed(6).replace(/\.?0+$/, "");
}

export function aggregateEvents(params: {
  userId: string;
  window: TimeWindow;
  from: ISODateString;
  to: ISODateString;
  currency: Currency;
  events: MoneyEvent[];
  updatedAt: ISODateString;
}): AnalyticsSnapshot {
  let totalIn = "0";
  let totalOut = "0";

  const map = new Map<CategoryKey, { in: string; out: string }>();

  for (const e of params.events) {
    if (e.currency !== params.currency) continue;

    if (!map.has(e.category)) map.set(e.category, { in: "0", out: "0" });

    const bucket = map.get(e.category)!;
    if (e.direction === "IN") {
      totalIn = add(totalIn, e.amount);
      bucket.in = add(bucket.in, e.amount);
    } else {
      totalOut = add(totalOut, e.amount);
      bucket.out = add(bucket.out, e.amount);
    }
  }

  const breakdown: CategoryBreakdown[] = Array.from(map.entries()).map(([category, v]) => ({
    category,
    totalIn: v.in,
    totalOut: v.out
  }));

  return {
    userId: params.userId,
    window: params.window,
    from: params.from,
    to: params.to,
    currency: params.currency,
    totalIn,
    totalOut,
    net: sub(totalIn, totalOut),
    breakdown,
    updatedAt: params.updatedAt
  };
}
