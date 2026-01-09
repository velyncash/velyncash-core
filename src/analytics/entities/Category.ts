import type { CategoryKey, PaymentRail } from "../types";

export type CategoryRule = {
  id: string;
  key: CategoryKey;

  // simple rule-based classification
  match: {
    rail?: PaymentRail;
    contains?: string[]; // match against counterparty/reference strings
  };
};

export const DEFAULT_CATEGORY_RULES: CategoryRule[] = [
  { id: "r_income", key: "income", match: { contains: ["salary", "payroll"] } },
  { id: "r_food", key: "food", match: { contains: ["cafe", "coffee", "restaurant", "food"] } },
  { id: "r_transport", key: "transport", match: { contains: ["uber", "grab", "taxi", "train"] } },
  { id: "r_subs", key: "subscriptions", match: { contains: ["netflix", "spotify", "subscription"] } },
  { id: "r_shopping", key: "shopping", match: { contains: ["store", "shop", "market"] } },
  { id: "r_fees", key: "fees", match: { contains: ["fee", "gas", "network"] } }
];
