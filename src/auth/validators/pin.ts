import { AuthError, DEFAULT_SECURITY_POLICY, type Pin6 } from "../types";

export function validatePin6(pin: string): Pin6 {
  const p = (pin ?? "").trim();

  if (p.length !== DEFAULT_SECURITY_POLICY.pinLength) {
    throw new AuthError("INVALID_PIN", `PIN must be exactly ${DEFAULT_SECURITY_POLICY.pinLength} digits.`);
  }

  if (!/^\d{6}$/.test(p)) {
    throw new AuthError("INVALID_PIN", "PIN must contain digits only.");
  }

  // Optional: block super-weak pins
  const weakPins = new Set(["000000", "111111", "123456", "654321"]);
  if (weakPins.has(p)) {
    throw new AuthError("INVALID_PIN", "PIN is too weak. Please choose a different one.");
  }

  return p as Pin6;
}
