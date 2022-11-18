import AWS from "aws-sdk";

export const importProductsFile = async (event) => {
  const s3 = new AWS.S3();
  const name = event.queryStringParameters.name;
  console.log(name);
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
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
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
