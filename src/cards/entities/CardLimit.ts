import type { CardId } from "../types";

export type CardLimit = {
  cardId: CardId;
  dailyLimit: string;   // decimal string
  monthlyLimit: string; // decimal string
};

export function createCardLimit(limit: CardLimit): CardLimit {
  return limit;
}
