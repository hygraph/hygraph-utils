export declare function verifyWebhookSignature({
  body,
  signature,
  secret,
  rawPayload,
}: {
  body?: any;
  signature: string;
  secret: string;
  rawPayload?: string;
}): boolean;

export declare function generateWebhookSignature({
  body,
  environmentName,
  secret,
  rawPayload,
}: {
  body?: any;
  environmentName?: string;
  secret: string;
  rawPayload?: string;
}): string;
