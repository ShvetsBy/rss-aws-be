export const basicAuthorizer = async (event, ctx, cb) => {
  console.log("Event: ", JSON.stringify(event));
  if (event["type" != "TOKEN"]) {
    cb({
      statusCode: 401,
      body: JSON.stringify({ msg: "Auth header is not provided" }),
    });
  }
  try {
    const authToken = event.authorizationToken;
    const codedCredentials = authToken.split(" ")[1];
    const decodedCredentials = Buffer.from(codedCredentials, "base64");
    const credentials = decodedCredentials.toString("utf-8").split(":");
    const login = credentials[0];
    const password = credentials[1];
    const localPassword = process.env[login];
    const effect =
      !localPassword || password !== localPassword ? "Deny" : "Allow";
    const policy = generatePolicy(codedCredentials, event.methodArn, effect);
    cb(null, policy);
  } catch (e) {
    cb({
      statusCode: 401,
      body: JSON.stringify({ msg: e.message }),
    });
  }
};

const generatePolicy = (principalId, resource, effect = "Allow") => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};
