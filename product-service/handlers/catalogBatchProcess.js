import AWS from "aws-sdk";
import { putProduct } from "./putProduct";

export const catalogBatchProcess = async (event) => {
  const products = event.Records.map(({ body }) => body);

  try {
    const sns = new AWS.SNS();
    for (const product of products) {
      await putProduct(product);
      await sns
        .publish(
          {
            Subject: "new product added in AWS Course",
            Message: JSON.stringify(product),
            TopicArn: process.env.SNS_ARN,
          },
          () => {
            console.log("email sent: " + JSON.stringify(product));
          }
        )
        .promise();
    }

    console.log({
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify({ msg: "product created!" }),
    });
  } catch (e) {
    console.log(e);
  }
};
