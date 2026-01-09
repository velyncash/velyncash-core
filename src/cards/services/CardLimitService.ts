import { CardError } from "../types";
import type { CardLimit } from "../entities/CardLimit";

export function createCardLimitService() {
  return {
    validateSpend(params: {
      amount: string;
      dailySpent: string;
      monthlySpent: string;
      limit: CardLimit;
    }) {
      const amount = Number(params.amount);
      if (Number(params.dailySpent) + amount > Number(params.limit.dailyLimit)) {
        throw new CardError("LIMIT_EXCEEDED", "Daily card limit exceeded");
      }
      if (Number(params.monthlySpent) + amount > Number(params.limit.monthlyLimit)) {
        throw new CardError("LIMIT_EXCEEDED", "Monthly card limit exceeded");
      }
    }
  };
}
