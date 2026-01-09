export type UserId = string;
export type EventId = string;
export type ISODateString = string;

export type Currency = "USD" | "USDC";

export type Direction = "IN" | "OUT";

export type PaymentRail =
  | "ONCHAIN"
  | "QR_INTERNAL"
  | "VIRTUAL_CARD"
  | "NFC"
  | "RFID"
  | "BANK";

export type CategoryKey =
  | "income"
  | "transfer"
  | "shopping"
  | "food"
  | "transport"
  | "subscriptions"
  | "fees"
  | "other";

export type TimeWindow = "DAILY" | "WEEKLY" | "MONTHLY";

export class AnalyticsError extends Error {
  code: "INVALID_EVENT" | "STORE_ERROR";
  constructor(code: AnalyticsError["code"], message: string) {
    super(message);
    this.code = code;
  }
}
