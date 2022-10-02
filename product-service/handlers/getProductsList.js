// import products from "../DB/products";
var AWS = require("aws-sdk");

// const credentials = new AWS.SharedIniFileCredentials();
// AWS.config.credentials = credentials;
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: "eu-west-1",
// });
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

var params = {
  TableName: process.env.TABLE_NAME,
};

async function getItems() {
  try {
    const data = await ddb
      .scan(params)
      .promise()
      .then((res) => res.Items);
    return data;
  } catch (err) {
    return err;
  }
}

export const getProductsList = async (event, context, callback) => {
  try {
    const data = await getItems();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      data: JSON.stringify(data),
    };
  } catch (err) {
    return { err: "ept" };
  }
};
