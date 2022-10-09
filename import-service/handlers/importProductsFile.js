var AWS = require("aws-sdk");

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

export const importProductsFile = async (event) => {
  const name = event.queryStringParameters.name;
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({ name }),
  // };

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `uploaded/${name}`,
    Expires: 3600,
    ContentType: "text/csv",
  };

  try {
    const signedUrl = await s3.getSignedUrl("putObject", params);
    console.log(event);
    console.log();
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

  // try {
  //   let signedUrl = s3.getSignedUrl("PutObject", params, function (err, url) {
  //     if (err) {
  //       return {
  //         body: JSON.stringify({
  //           msg: err.message,
  //           name: fileName,
  //           Bucket: Bucket,
  //           Key: key,
  //           Expires: Expires,
  //           ContentType: ContentType,
  //         }),
  //       };
  //     } else {
  //       console.log("The URL is", url);
  //       return {
  //         signedUrl,
  //       };
  //     }
  //   });
  // } catch (err) {
  //   return JSON.stringify({
  //     msg: err.message,
  //     name: fileName,
  //     Bucket: Bucket,
  //     Key: key,
  //     Expires: Expires,
  //     ContentType: ContentType,
  //   });
  // }
};
