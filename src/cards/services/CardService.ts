import { createCard } from "../entities/Card";
import type { Card } from "../entities/Card";
import { CardError } from "../types";
import type { CardIssuerAdapter } from "../adapters/CardIssuerAdapter";

export type CardRepository = {
  findById(cardId: string): Promise<Card | null>;
  create(card: Card): Promise<void>;
  update(card: Card): Promise<void>;
};

export type Clock = {
  now(): string;
};

export type CardServiceDeps = {
  cards: CardRepository;
  issuer: CardIssuerAdapter;
  clock: Clock;
  newId(): string;
};

export function createCardService(deps: CardServiceDeps) {
  return {
    async issueVirtualCard(userId: string): Promise<Card> {
      const issued = await deps.issuer.issueVirtualCard(userId);

      const card = createCard({
        id: deps.newId(),
        userId,
        type: "VIRTUAL",
        network: issued.network,
        last4: issued.last4,
        expMonth: issued.expMonth,
        expYear: issued.expYear,
        status: "ACTIVE",
        createdAt: deps.clock.now()
      });

      await deps.cards.create(card);
      return card;
    },

    async lock(cardId: string): Promise<Card> {
      const card = await deps.cards.findById(cardId);
      if (!card) throw new CardError("CARD_NOT_FOUND", "Card not found");

      await deps.issuer.lockCard(cardId);
      card.status = "LOCKED";
      await deps.cards.update(card);
      return card;
    },

    async unlock(cardId: string): Promise<Card> {
      const card = await deps.cards.findById(cardId);
      if (!card) throw new CardError("CARD_NOT_FOUND", "Card not found");

      await deps.issuer.unlockCard(cardId);
      card.status = "ACTIVE";
      await deps.cards.update(card);
      return card;
    },

    async terminate(cardId: string): Promise<Card> {
      const card = await deps.cards.findById(cardId);
      if (!card) throw new CardError("CARD_NOT_FOUND", "Card not found");

      await deps.issuer.terminateCard(cardId);
      card.status = "TERMINATED";
      await deps.cards.update(card);
      return card;
    }
  };
}
