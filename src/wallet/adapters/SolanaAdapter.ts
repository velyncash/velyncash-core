import type { PublicKeyBase58 } from "../types";

export type SolanaKeypair = {
  publicKeyBase58: PublicKeyBase58;
  secretKeyBytes: Uint8Array;
};

export type SolanaClient = {
  generateKeypair(): SolanaKeypair;
  getSolBalanceLamports(publicKey: PublicKeyBase58): Promise<bigint>;
  getUsdcBalanceAtoms(publicKey: PublicKeyBase58): Promise<bigint>;
};

export const SOLANA_NETWORK = "solana-mainnet";
