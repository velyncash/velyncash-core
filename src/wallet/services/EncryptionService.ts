import type { EncryptedSecret } from "../types";

export type Encryptor = {
  encrypt(data: Uint8Array, context: string): Promise<EncryptedSecret>;
  decrypt(data: EncryptedSecret, context: string): Promise<Uint8Array>;
};

export function createEncryptionService(encryptor: Encryptor) {
  return {
    encryptSecret: (data: Uint8Array, context: string) =>
      encryptor.encrypt(data, context),

    decryptSecret: (data: EncryptedSecret, context: string) =>
      encryptor.decrypt(data, context)
  };
}
