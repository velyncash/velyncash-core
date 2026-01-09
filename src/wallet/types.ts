export type WalletId = string;
export type UserId = string;

export type PublicKeyBase58 = string;
export type EncryptedSecret = string;
export type ISODateString = string;

export type Wallet = {
  id: WalletId;
  userId: UserId;
  network: "solana-mainnet";
  publicKey: PublicKeyBase58;
  encryptedSecretKey: EncryptedSecret;
  createdAt: ISODateString;
};

export type WalletBalance = {
  network: "solana-mainnet";
  publicKey: PublicKeyBase58;
  sol: string;
  usdc: string;
  updatedAt: ISODateString;
};

export class WalletError extends Error {
  code:
    | "WALLET_NOT_FOUND"
    | "DECRYPT_FAILED"
    | "PROVIDER_ERROR";

  constructor(code: WalletError["code"], message: string) {
    super(message);
    this.code = code;
  }
}
