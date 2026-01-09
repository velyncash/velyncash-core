import {
  createPaymentIntent,
  type PaymentIntent
} from "../entities/PaymentIntent";
import { PaymentError } from "../types";

export type PaymentRepository = {
  findById(id: string): Promise<PaymentIntent | null>;
  create(intent: PaymentIntent): Promise<void>;
  update(intent: PaymentIntent): Promise<void>;
};

export type BalanceChecker = {
  hasSufficientBalance(userId: string, amount: string): Promise<boolean>;
  deduct(userId: string, amount: string): Promise<void>;
};

export type Clock = {
  now(): string;
};

export type PaymentServiceDeps = {
  payments: PaymentRepository;
  balances: BalanceChecker;
  clock: Clock;
  newId(): string;
};

export function createPaymentService(deps: PaymentServiceDeps) {
  return {
    async createPayment(params: {
      fromUserId: string;
      toMerchantId?: string;
      amount: string;
      currency: "USD" | "USDC";
      method: "WALLET_USDC" | "VIRTUAL_CARD" | "QR_INTERNAL";
    }): Promise<PaymentIntent> {
      if (Number(params.amount) <= 0) {
        throw new PaymentError("INVALID_AMOUNT", "Amount must be greater than zero");
      }

      const intent = createPaymentIntent({
        id: deps.newId(),
        fromUserId: params.fromUserId,
        toMerchantId: params.toMerchantId,
        amount: params.amount,
        currency: params.currency,
        method: params.method,
        status: "PENDING",
        createdAt: deps.clock.now()
      });

      await deps.payments.create(intent);
      return intent;
    },

    async completePayment(paymentId: string): Promise<PaymentIntent> {
      const intent = await deps.payments.findById(paymentId);
      if (!intent) {
        throw new PaymentError("PAYMENT_NOT_FOUND", "Payment not found");
      }

      if (intent.status !== "PENDING") {
        throw new PaymentError(
          "PAYMENT_ALREADY_FINALIZED",
          "Payment already finalized"
        );
      }

      const hasBalance = await deps.balances.hasSufficientBalance(
        intent.fromUserId,
        intent.amount
      );

      if (!hasBalance) {
        throw new PaymentError(
          "INSUFFICIENT_BALANCE",
          "Insufficient balance"
        );
      }

      await deps.balances.deduct(intent.fromUserId, intent.amount);

      intent.status = "COMPLETED";
      intent.completedAt = deps.clock.now();

      await deps.payments.update(intent);
      return intent;
    }
  };
}
