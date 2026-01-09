import type { SolanaClient } from "../adapters/SolanaAdapter";
import type { WalletBalance } from "../types";
import { TOKENS } from "../entities/Token";

function format(value: bigint, decimals: number): string {
  const s = value.toString().padStart(decimals + 1, "0");
  return `${s.slice(0, -decimals)}.${s.slice(-decimals)}`.replace(/\.?0+$/, "");
}

export function createBalanceService(solana: SolanaClient, now: () => string) {
  return {
    async getBalance(publicKey: string): Promise<WalletBalance> {
      const [sol, usdc] = await Promise.all([
        solana.getSolBalanceLamports(publicKey),
        solana.getUsdcBalanceAtoms(publicKey)
      ]);

      return {
        network: "solana-mainnet",
        publicKey,
        sol: format(sol, TOKENS.SOL.decimals),
        usdc: format(usdc, TOKENS.USDC.decimals),
        updatedAt: now()
      };
    }
  };
}
