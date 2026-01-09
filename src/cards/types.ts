export type CardId = string;
export type UserId = string;
export type ISODateString = string;

export type CardStatus = "ACTIVE" | "LOCKED" | "TERMINATED";
export type CardType = "VIRTUAL";

export type CardNetwork = "VISA" | "MASTERCARD";

export type Currency = "USD";

export class CardError extends Error {
  code:
    | "CARD_NOT_FOUND"
    | "CARD_ALREADY_TERMINATED"
    | "CARD_LOCKED"
    | "LIMIT_EXCEEDED"
    | "ISSUER_ERROR";

  constructor(code: CardError["code"], message: string) {
    super(message);
    this.code = code;
  }
}
