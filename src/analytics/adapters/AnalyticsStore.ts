import type { MoneyEvent } from "../entities/Event";
import type { AnalyticsSnapshot } from "../entities/Snapshot";
import type { TimeWindow } from "../types";

export type AnalyticsStore = {
  appendEvent(event: MoneyEvent): Promise<void>;

  listEvents(params: {
    userId: string;
    from: string;
    to: string;
  }): Promise<MoneyEvent[]>;

  saveSnapshot(snapshot: AnalyticsSnapshot): Promise<void>;

  getSnapshot(params: {
    userId: string;
    window: TimeWindow;
    from: string;
    to: string;
  }): Promise<AnalyticsSnapshot | null>;
};
