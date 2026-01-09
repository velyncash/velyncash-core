import type { ISODateString, TimeWindow, Currency, CategoryKey } from "../types";

export type CategoryBreakdown = {
  category: CategoryKey;
  totalOut: string;
  totalIn: string;
};

export type AnalyticsSnapshot = {
  userId: string;
  window: TimeWindow;

  // window boundaries (inclusive start, exclusive end)
  from: ISODateString;
  to: ISODateString;

  currency: Currency;

  totalIn: string;
  totalOut: string;
  net: string;

  breakdown: CategoryBreakdown[];

  updatedAt: ISODateString;
};

export function createSnapshot(snapshot: AnalyticsSnapshot): AnalyticsSnapshot {
  return snapshot;
}
