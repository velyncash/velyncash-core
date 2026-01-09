import { AnalyticsError } from "../types";
import type { MoneyEvent } from "../entities/Event";

function isValidAmount(amount: string): boolean {
  return typeof amount === "string" && /^[0-9]+(\.[0-9]+)?$/.test(amount) && Number(amount) >= 0;
}

export function normalizeEvent(input: MoneyEvent): MoneyEvent {
  if (!input.userId || !input.id) {
    throw new AnalyticsError("INVALID_EVENT", "Event must include id and userId.");
  }
  if (!isValidAmount(input.amount)) {
    throw new AnalyticsError("INVALID_EVENT", "Invalid amount format.");
  }
  if (!input.timestamp) {
    throw new AnalyticsError("INVALID_EVENT", "Event must include timestamp.");
  }

  const counterparty = input.counterparty?.trim();
  return {
    ...input,
    counterparty: counterparty && counterparty.length > 0 ? counterparty : undefined
  };
}
