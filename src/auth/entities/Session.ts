import type { ISODateString, UserId, Username } from "../types";

export type Session = {
  sessionId: string;
  userId: UserId;
  username: Username;
  createdAt: ISODateString;
};

export function createSession(params: {
  sessionId: string;
  userId: UserId;
  username: Username;
  createdAt: ISODateString;
}): Session {
  return {
    sessionId: params.sessionId,
    userId: params.userId,
    username: params.username,
    createdAt: params.createdAt
  };
}
