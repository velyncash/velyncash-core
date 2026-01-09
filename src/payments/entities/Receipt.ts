import type {
  PaymentId,
  UserId,
  MerchantId,
  ISODateString
} from "../types";

export type Receipt = {
  paymentId: PaymentId;
  payerUserId: UserId;
  merchantId?: MerchantId;
  amount: string;
  currency: string;
  issuedAt: ISODateString;
};
