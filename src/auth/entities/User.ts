import type { UserId, Username, PasswordHash, PinHash, ISODateString } from "../types";

export type User = {
  id: UserId;
  username: Username;
  passwordHash: PasswordHash;
  pinHash: PinHash;
  createdAt: ISODateString;
  isLocked?: boolean;
};

export function createUser(params: {
  id: UserId;
  username: Username;
  passwordHash: PasswordHash;
  pinHash: PinHash;
  createdAt: ISODateString;
}): User {
  return {
    id: params.id,
    username: params.username,
    passwordHash: params.passwordHash,
    pinHash: params.pinHash,
    createdAt: params.createdAt,
    isLocked: false
  };
}
