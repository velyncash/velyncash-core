import type { CardNetwork } from "../types";

export type IssuedCard = {
  issuerCardId: string;
  network: CardNetwork;
  last4: string;
  expMonth: number;
  expYear: number;
};

export type CardIssuerAdapter = {
  issueVirtualCard(userId: string): Promise<IssuedCard>;
  lockCard(issuerCardId: string): Promise<void>;
  unlockCard(issuerCardId: string): Promise<void>;
  terminateCard(issuerCardId: string): Promise<void>;
};
