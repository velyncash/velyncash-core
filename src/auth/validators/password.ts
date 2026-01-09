src/auth/validators/password.tsimport { AuthError, DEFAULT_SECURITY_POLICY } from "../types";

export function validatePassword(password: string): string {
  const p = password ?? "";

  if (p.length < DEFAULT_SECURITY_POLICY.passwordMin) {
    throw new AuthError("INVALID_PASSWORD", `Password must be at least ${DEFAULT_SECURITY_POLICY.passwordMin} characters.`);
  }

  // Minimal sanity checks; keep it simple (MVP)
  const hasLetter = /[a-zA-Z]/.test(p);
  const hasNumber = /[0-9]/.test(p);

  if (!hasLetter || !hasNumber) {
    throw new AuthError("INVALID_PASSWORD", "Password must include at least one letter and one number.");
  }

  return p;
}
