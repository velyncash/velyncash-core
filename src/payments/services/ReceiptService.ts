import type { Receipt } from "../entities/Receipt";
import type { ISODateString } from "../types";

export type Clock = {
  now(): ISODateString;
};

export function createReceiptService(clock: Clock) {
  return {
    issue(receipt: Omit<Receipt, "issuedAt">): Receipt {
      return {
        ...receipt,
        issuedAt: clock.now()
      };
    }
  };
}
