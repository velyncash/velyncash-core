import { AuthError, type AuthSession, type SignInInput, type SignUpInput } from "../types";
import { validatePassword, validatePin6, validateUsername } from "../validators";
import { createSession } from "../entities/Session";
import { createUser, type User } from "../entities/User";

export type UserRepository = {
  findByUsername(username: string): Promise<User | null>;
  create(user: User): Promise<void>;
};

export type SessionRepository = {
  create(session: AuthSession): Promise<void>;
};

export type IdGenerator = {
  userId(): string;
  sessionId(): string;
};

export type Clock = {
  nowISO(): string;
};

export type AuthServiceDeps = {
  users: UserRepository;
  sessions: SessionRepository;
  ids: IdGenerator;
  clock: Clock;

  password: {
    hashPassword(plain: string): Promise<string>;
    verifyPassword(plain: string, hash: string): Promise<boolean>;
  };

  pin: {
    hashPin(plain: string): Promise<string>;
    verifyPin(plain: string, hash: string): Promise<boolean>;
  };
};

export function createAuthService(deps: AuthServiceDeps) {
  return {
    async signUp(input: SignUpInput): Promise<AuthSession> {
      const username = validateUsername(input.username);
      const password = validatePassword(input.password);
      const pin6 = validatePin6(input.pin6);

      const existing = await deps.users.findByUsername(username);
      if (existing) {
        throw new AuthError("USERNAME_TAKEN", "Username already taken.");
      }

      const [passwordHash, pinHash] = await Promise.all([
        deps.password.hashPassword(password),
        deps.pin.hashPin(pin6)
      ]);

      const user = createUser({
        id: deps.ids.userId(),
        username,
        passwordHash,
        pinHash,
        createdAt: deps.clock.nowISO()
      });

      await deps.users.create(user);

      const session = createSession({
        sessionId: deps.ids.sessionId(),
        userId: user.id,
        username: user.username,
        createdAt: deps.clock.nowISO()
      });

      await deps.sessions.create(session);
      return session;
    },

    async signIn(input: SignInInput): Promise<AuthSession> {
      const username = validateUsername(input.username);
      const password = input.password ?? "";
      const pin6 = input.pin6 ?? "";

      const user = await deps.users.findByUsername(username);
      if (!user) {
        throw new AuthError("INVALID_CREDENTIALS", "Invalid username or password.");
      }

      if (user.isLocked) {
        throw new AuthError("ACCOUNT_LOCKED", "Account is locked.");
      }

      const okPassword = await deps.password.verifyPassword(password, user.passwordHash);
      if (!okPassword) {
        throw new AuthError("INVALID_CREDENTIALS", "Invalid username or password.");
      }

      const okPin = await deps.pin.verifyPin(pin6, user.pinHash);
      if (!okPin) {
        throw new AuthError("INVALID_CREDENTIALS", "Invalid PIN.");
      }

      const session = createSession({
        sessionId: deps.ids.sessionId(),
        userId: user.id,
        username: user.username,
        createdAt: deps.clock.nowISO()
      });

      await deps.sessions.create(session);
      return
