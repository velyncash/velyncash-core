export type PaymentId = string;
export type UserId = string;
export type MerchantId = string;
export type ISODateString = string;

export type PaymentMethod =
  | "WALLET_USDC"
  | "VIRTUAL_CARD"
  | "QR_INTERNAL";

export type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

export type Currency = "USD" | "USDC";

export class PaymentError extends Error {
  code:
    | "PAYMENT_NOT_FOUND"
    | "INVALID_AMOUNT"
    | "PAYMENT_ALREADY_FINALIZED"
    | "INSUFFICIENT_BALANCE";

  constructor(code: PaymentError["code"], message: string) {
    super(message);
    this.code = code;
  }
}
