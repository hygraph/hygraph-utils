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

it("should generate a signature", () => {
  const secret = "rCNwyiloY3oJYYkxgpBXaleIiUv5MYlx";

  const body = {
    hello: "world",
  };

  const signature = generateWebhookSignature({ body, secret });

  expect(signature).toContain("sign=");
  expect(signature).toContain("env=master");
  expect(signature).toContain("t=");
});

it("should generate a signature with a custom enviornment name", () => {
  const secret = "rCNwyiloY3oJYYkxgpBXaleIiUv5MYlx";

  const body = {
    hello: "world",
  };

  const signature = generateWebhookSignature({
    body,
    secret,
    environmentName: "test",
  });

  expect(signature).toContain("sign=");
  expect(signature).toContain("env=test");
  expect(signature).toContain("t=");
});
