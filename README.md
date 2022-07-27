# Hygraph Utils

## Install

```bash
npm i @graphcms/utils
```

## Usage

### `verifyWebhookSignature`

```js
const { verifyWebhookSignature } = require("@graphcms/utils");

const secret = "rCNwyiloY3oJYYkxgpBXaleIiUv5MYlx";

const body = {}; // Typically req.body
const signature = "..."; // Typically req.headers['gcms-signature']

const isValid = verifyWebhookSignature({ body, signature, secret });
```

`verifyWebhookSignature` also accepts a `rawPayload` in the case that the body
has not yet been parsed.

```js
const { verifyWebhookSignature } = require("@graphcms/utils");

const secret = "rCNwyiloY3oJYYkxgpBXaleIiUv5MYlx";

const rawPayload = '{"hello":"world"}';
const signature = "..."; // Typically req.headers['gcms-signature']

const isValid = verifyWebhookSignature({ rawPayload, signature, secret });
```

[Learn more about webhooks](https://hygraph.com/docs/api-reference/basics/webhooks)

### `generateWebhookSignature`

This is useful for testing signed webhooks. You can generate a Hygraph webhook signature, and then use it to test your webhook.

```js
const { generateWebhookSignature } = require("@graphcms/utils");

const secret = "rCNwyiloY3oJYYkxgpBXaleIiUv5MYlx";

const body = {
  hello: "world",
};

const signature = generateWebhookSignature({ body, secret });
```

[Learn more about webhooks](https://hygraph.com/docs/api-reference/basics/webhooks)
