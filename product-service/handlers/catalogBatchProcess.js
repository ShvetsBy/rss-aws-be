import AWS from "aws-sdk";
import { putProduct } from "./putProduct";

export const catalogBatchProcess = async (event) => {
  const sns = new AWS.SNS();
  const products = event.Records.map(({ body }) => body);

  try {
    for (const product of products) {
      console.log(product);

      await putProduct(product);
      sns.publish(
        {
          Subject: "new product added in AWS Course",
          message: JSON.stringify(product),
          TopicArn: "arn:aws:sns:eu-west-1:203064053127:createProductTopic",
        },
        () => {
          console.log("email sent: " + JSON.stringify(product));
        }
      );
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
