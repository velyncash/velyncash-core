import { createWallet } from "../entities/Wallet";
import type { Wallet, UserId } from "../types";
import { WalletError } from "../types";
import type { SolanaClient } from "../adapters/SolanaAdapter";
import type { Encryptor } from "./EncryptionService";

export type WalletRepository = {
  findByUserId(userId: UserId): Promise<Wallet | null>;
  create(wallet: Wallet): Promise<void>;
};

export type WalletServiceDeps = {
  wallets: WalletRepository;
  solana: SolanaClient;
  encryptor: Encryptor;
  now(): string;
  newId(): string;
};

export function createWalletService(deps: WalletServiceDeps) {
  return {
    async createUserWallet(userId: UserId, pinContext: string): Promise<Wallet> {
      const existing = await deps.wallets.findByUserId(userId);
      if (existing) return existing;

      const keypair = deps.solana.generateKeypair();
      const encrypted = await deps.encryptor.encrypt(
        keypair.secretKeyBytes,
        pinContext
      );

      const wallet = createWallet({
        id: deps.newId(),
        userId,
        network: "solana-mainnet",
        publicKey: keypair.publicKeyBase58,
        encryptedSecretKey: encrypted,
        createdAt: deps.now()
      });

      await deps.wallets.create(wallet);
      return wallet;
    },

    async revealPrivateKey(userId: UserId, pinContext: string): Promise<Uint8Array> {
      const wallet = await deps.wallets.findByUserId(userId);
      if (!wallet) {
        throw new WalletError("WALLET_NOT_FOUND", "Wallet not found");
      }

      try {
        return await deps.encryptor.decrypt(
          wallet.encryptedSecretKey,
          pinContext
        );
      } catch {
        throw new WalletError("DECRYPT_FAILED", "Invalid PIN context");
      }
    }
  };
}
