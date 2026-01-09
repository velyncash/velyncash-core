import { AuthError, DEFAULT_SECURITY_POLICY, type Username } from "../types";

const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

export function validateUsername(username: string): Username {
  const u = (username ?? "").trim();

  if (u.length < DEFAULT_SECURITY_POLICY.usernameMin || u.length > DEFAULT_SECURITY_POLICY.usernameMax) {
    throw new AuthError(
      "INVALID_USERNAME",
      `Username must be ${DEFAULT_SECURITY_POLICY.usernameMin}-${DEFAULT_SECURITY_POLICY.usernameMax} characters.`
    );
  }

  if (!USERNAME_REGEX.test(u)) {
    throw new AuthError("INVALID_USERNAME", "Username may contain only letters, numbers, and underscore.");
  }

  // Optional: enforce lowercase to normalize
  return u.toLowerCase();
}
