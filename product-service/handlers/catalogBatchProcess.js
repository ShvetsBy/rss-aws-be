import AWS from "aws-sdk";
import axios from "axios";

export const catalogBatchProcess = async (event) => {
  const products = event.Records.map(({ body }) => body);

  try {
    const sns = new AWS.SNS();
    for (const product of products) {
      console.log("Product:");
      console.log(product);

      await axios.post(
        "https://h4uuydbl93.execute-api.eu-west-1.amazonaws.com/products",
        JSON.parse(product)
      );

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
