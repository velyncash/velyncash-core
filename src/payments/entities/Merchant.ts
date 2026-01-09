import type { MerchantId, ISODateString } from "../types";

export type Merchant = {
  id: MerchantId;
  name: string;
  isInternal: boolean;
  createdAt: ISODateString;
};
