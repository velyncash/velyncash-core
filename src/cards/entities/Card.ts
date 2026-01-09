import type {
  CardId,
  UserId,
  CardStatus,
  CardType,
  CardNetwork,
  ISODateString
} from "../types";

export type Card = {
  id: CardId;
  userId: UserId;
  type: CardType;
  network: CardNetwork;
  last4: string;
  expMonth: number;
  expYear: number;
  status: CardStatus;
  createdAt: ISODateString;
};

export function createCard(card: Card): Card {
  return card;
}
