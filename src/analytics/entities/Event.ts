import type {
  EventId,
  UserId,
  ISODateString,
  Currency,
  Direction,
  PaymentRail,
  CategoryKey
} from "../types";

export type MoneyEvent = {
  id: EventId;
  userId: UserId;

  timestamp: ISODateString;

  // amounts are stored as decimal strings to avoid float errors
  amount: string;
  currency: Currency;

  direction: Direction;

  rail: PaymentRail;

  // optional enrichment
  counterparty?: string;     // merchant name, address, username, etc.
  referenceId?: string;      // tx hash / payment id / card auth id
  category: CategoryKey;

  // optional metadata
  meta?: Record<string, unknown>;
};

export function createMoneyEvent(event: MoneyEvent): MoneyEvent {
  return event;
}
