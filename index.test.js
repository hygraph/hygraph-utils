const { expect } = require("@jest/globals");

const { generateWebhookSignature, verifyWebhookSignature } = require(".");

const smallRawPayload = '{"hello":"world"}';
const largeRawPayload =
  '{"operation":"update","data":{"__typename":"nec","sapien":null,"malesuadas":[{"__typename":"malesuada","id":"gcms-model-id-1234"},{"__typename":"malesuada","id":"gcms-model-id-1234"},{"__typename":"malesuada","id":"gcms-model-id-1234"}],"createdAt":"2021-11-24T22:27:58.702044+00:00","createdBy":{"__typename":"User","id":"gcms-model-id-1234"},"rhoncus":null,"Sed":null,"adipiscing":"imperdiet","id":"gcms-model-id-1234","imperdiet":false,"Praesent":" Quisque ut varius neque. Curabitur id neque suscipit, auctor nunc ac, placerat ante. In hac habitasse platea dictumst. Vivamus volutpat dignissim massa, ac pharetra quam mollis nec. Nunc dapibus eleifend dui, ac facilisis augue scelerisque eu. Nulla lobortis volutpat gravida. Quisque convallis tristique sapien ut auctor. Suspendisse commodo justo non turpis dignissim condimentum. Nam nunc nulla, commodo ut pellentesque sit amet, cursus sed felis. Proin vehicula enim tortor, sit amet auctor tortor mollis a. Sed lobortis nibh lectus, at posuere nibh scelerisque quis. Nam vitae ante molestie arcu lobortis pharetra. Mauris tristique metus a tempus pulvinar. Nunc pulvinar, quam ut volutpat fermentum, sapien mi lacinia dui, et rhoncus risus leo ut mi. Donec molestie elementum nisi in consequat. Vestibulum semper, sem nec ornare mollis, dui elit consectetur ipsum, a vestibulum purus orci at augue. Integer nec risus lobortis, efficitur enim id, molestie leo. Nullam dui dolor, interdum id magna ac, dictum interdum diam. Suspendisse quis lacinia diam. In consequat convallis dolor eget ornare. Vestibulum at massa aliquam, condimentum augue vitae, consequat ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed pretium enim, a elementum massa. Aenean egestas molestie augue at eleifend. Sed et metus a augue tristique tristique eget ac arcu. Nullam sollicitudin metus in metus suscipit, et interdum erat fringilla. Morbi vel nunc tempor, imperdiet diam ut, ullamcorper ipsum. Etiam sollicitudin hendrerit enim, a sollicitudin nibh. Fusce vitae libero vulputate, venenatis dui non, iaculis odio. Aliquam erat volutpat. Curabitur metus ipsum, viverra a fermentum sit amet, finibus congue sem. Sed eu lectus tempus, placerat sem ac, luctus velit. Suspendisse pretium rutrum convallis. Vivamus id dui vel urna sagittis commodo. Sed auctor dictum lorem tristique lobortis. Aliquam ornare eget ligula sit amet ultricies. Curabitur risus augue, egestas porttitor tristique iaculis, dictum ac diam. Proin risus ex, sodales ac venenatis id, iaculis id turpis. Integer in leo quis dui ultrices rhoncus nec eget est. ","localizations":[{"description":{"__typename":"Quisque","json":{"children":[{"children":[{"text":"Nunc magna est, fermentum sit amet lorem ac, faucibus pulvinar odio. Sed vestibulum nibh vitae laoreet volutpat. Cras pellentesque blandit massa, quis imperdiet purus faucibus sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum porta eros vel justo placerat eleifend eu a diam."}],"type":"paragraph"},{"children":[{"text":"Nunc magna est, fermentum sit amet lorem ac, faucibus pulvinar odio. Sed vestibulum nibh vitae laoreet volutpat. Cras pellentesque blandit massa, quis imperdiet purus faucibus sit amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum porta eros vel justo placerat eleifend eu a diam."}],"type":"paragraph"}]},"references":[]},"locale":"en","name":"Curabitur"}],"diam":null,"habitasse":[],"Nam":[],"mollis":null,"condimentum":null,"eget":[],"fringilla":[],"Aliquam":null,"vestibulum":{"__typename":"vestibulum","id":"gcms-model-id-1234"},"pharetra":"suscipit","cursus":"Mauris tristique metus a tempus pulvinar. Nunc pulvinar, quam ut volutpat fermentum, sapien mi lacinia dui, et rhoncus risus leo ut mi. ","stage":"DRAFT","justo":[{"__typename":"Proin","id":"gcms-model-id-1234"},{"__typename":"Proin","id":"gcms-model-id-1234"},{"__typename":"Proin","id":"gcms-model-id-1234"}],"fermentum":"lorem","updatedAt":"2021-11-29T18:21:57.652216+00:00","updatedBy":{"__typename":"User","id":"gcms-model-id-1234"},"sollicitudins":[{"__typename":"sollicitudin","id":"gcms-model-id-1234"},{"__typename":"sollicitudin","id":"gcms-model-id-1234"},{"__typename":"sollicitudin","id":"gcms-model-id-1234"}]}}';

it("should verify the signature", () => {
  const secret = "rCNwyiloY3oJYYkxgpBXaleIiUv5MYlx";

  const body = {
    hello: "world",
  };

  const signature = generateWebhookSignature({ body, secret });

  const webhook = verifyWebhookSignature({ body, signature, secret });

  expect(webhook).toBe(true);
});

it("should verify a small raw payload", () => {
  const secret = "rCNwyiloY3oJYYkxgpBXaleIiUv5MYlx";

  const signature = generateWebhookSignature({
    rawPayload: smallRawPayload,
    secret,
  });

  const webhook = verifyWebhookSignature({
    rawPayload: smallRawPayload,
    signature,
    secret,
  });

  expect(webhook).toBe(true);
});

it("should verify a large raw payload (4KB)", () => {
  const secret = "rCNwyiloY3oJYYkxgpBXaleIiUv5MYlx";

  const rawPayload = largeRawPayload;
  const body = JSON.parse(rawPayload);

  const signature = generateWebhookSignature({
    body,
    secret,
  });

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

it("should generate a signature with a custom environment name", () => {
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
