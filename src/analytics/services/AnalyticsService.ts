import type { AnalyticsStore } from "../adapters/AnalyticsStore";
import type { MoneyEvent } from "../entities/Event";
import type { TimeWindow, Currency, ISODateString } from "../types";
import { normalizeEvent } from "./EventNormalizer";
import { aggregateEvents } from "./AggregationService";

export type Clock = { now(): ISODateString };

export function createAnalyticsService(deps: {
  store: AnalyticsStore;
  clock: Clock;
}) {
  return {
    async ingestEvent(event: MoneyEvent): Promise<void> {
      const normalized = normalizeEvent(event);
      await deps.store.appendEvent(normalized);
    },

    async buildSnapshot(params: {
      userId: string;
      window: TimeWindow;
      from: ISODateString;
      to: ISODateString;
      currency: Currency;
    }) {
      const cached = await deps.store.getSnapshot({
        userId: params.userId,
        window: params.window,
        from: params.from,
        to: params.to
      });

      if (cached) return cached;

      const events = await deps.store.listEvents({
        userId: params.userId,
        from: params.from,
        to: params.to
      });

      const snapshot = aggregateEvents({
        userId: params.userId,
        window: params.window,
        from: params.from,
        to: params.to,
        currency: params.currency,
        events,
        updatedAt: deps.clock.now()
      });

      await deps.store.saveSnapshot(snapshot);
      return snapshot;
    }
  };
}
