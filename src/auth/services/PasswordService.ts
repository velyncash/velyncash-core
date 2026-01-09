export type PasswordHasher = {
  hash(plain: string): Promise<string>;
  verify(plain: string, hash: string): Promise<boolean>;
};

export function createPasswordService(hasher: PasswordHasher) {
  return {
    hashPassword: (plain: string) => hasher.hash(plain),
    verifyPassword: (plain: string, hash: string) => hasher.verify(plain, hash)
  };
}
