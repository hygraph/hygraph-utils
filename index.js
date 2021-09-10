const { createHmac } = require("crypto");

exports.verifyWebhookSignature = ({ body, signature, secret }) => {
  const [rawSign, rawEnv, rawTimestamp] = signature.split(", ");

  const sign = rawSign.replace("sign=", "");
  const EnvironmentName = rawEnv.replace("env=", "");
  const Timestamp = parseInt(rawTimestamp.replace("t=", ""));

  let payload = JSON.stringify({
    Body: JSON.stringify(body),
    EnvironmentName,
    TimeStamp: Timestamp,
  });

  const hash = createHmac("sha256", secret).update(payload).digest("base64");

  return sign === hash;
};

exports.generateWebhookSignature = ({
  body,
  environmentName = "master",
  secret,
}) => {
  const TimeStamp = Date.now();

  const payload = JSON.stringify({
    Body: JSON.stringify(body),
    EnvironmentName: environmentName,
    TimeStamp,
  });

  const hash = createHmac("sha256", secret).update(payload).digest("base64");

  return `sign=${hash}, env=${environmentName}, t=${TimeStamp}`;
};
