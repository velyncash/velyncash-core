import type { CardStatus } from "../types";
import { CardError } from "../types";

export function createCardSecurityService() {
  return {
    ensureActive(status: CardStatus) {
      if (status === "LOCKED") {
        throw new CardError("CARD_LOCKED", "Card is locked");
      }
      if (status === "TERMINATED") {
        throw new CardError(
          "CARD_ALREADY_TERMINATED",
          "Card is terminated"
        );
      }
    }
  };
}
