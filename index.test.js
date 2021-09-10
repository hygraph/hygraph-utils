const { expect } = require("@jest/globals");

const { generateWebhookSignature, verifyWebhookSignature } = require(".");

it("should verify the signature", () => {
  const secret = "rCNwyiloY3oJYYkxgpBXaleIiUv5MYlx";

  const body = {
    hello: "world",
  };

  const signature = generateWebhookSignature({ body, secret });

  const webhook = verifyWebhookSignature({ body, signature, secret });

  expect(webhook).toBe(true);
});
