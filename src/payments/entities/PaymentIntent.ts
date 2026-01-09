import type {
  PaymentId,
  UserId,
  MerchantId,
  PaymentMethod,
  PaymentStatus,
  Currency,
  ISODateString
} from "../types";

export type PaymentIntent = {
  id: PaymentId;
  fromUserId: UserId;
  toMerchantId?: MerchantId;
  amount: string; // decimal string
  currency: Currency;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: ISODateString;
  completedAt?: ISODateString;
};

export function createPaymentIntent(intent: PaymentIntent): PaymentIntent {
  return intent;
}
