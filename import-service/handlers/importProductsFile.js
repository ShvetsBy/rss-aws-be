var AWS = require("aws-sdk");

const s3 = new AWS.S3();

export const importProductsFile = async (event) => {
  const name = event.queryStringParameters.name;
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `uploaded/${name}`,
    Expires: 3600,
    ContentType: "text/csv",
  };

  try {
    const signedUrl = await s3.getSignedUrlPromise("putObject", params);
    return {
      statusCode: 200,
      headers: {
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({ url: `${signedUrl}` }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify("Something went wrong"),
    };
  }
};
