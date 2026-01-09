src/payments/services/QrService.ts
export function createQrPayload(paymentId: string): string {
  return `velyn-pay:${paymentId}`;
}

export function parseQrPayload(payload: string): string {
  if (!payload.startsWith("velyn-pay:")) {
    throw new Error("Invalid Velyn QR payload");
  }
  return payload.replace("velyn-pay:", "");
}
