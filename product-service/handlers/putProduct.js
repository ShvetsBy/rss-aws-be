var AWS = require("aws-sdk");
var uuid = require("uuid");

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

export const putProduct = async (event) => {
  if (!ddb) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Connection Failed" }),
    };
  }
  try {
    const body = JSON.parse(event.body);

    const { count, ...rest } = body;

    const id = uuid.v4();
    const product = {
      ...rest,
      id: { S: id },
    };
    console.log(product);
    const stock = {
      count,
      product_id: { S: id },
    };
    console.log(stock);
    if (
      !product.hasOwnProperty("title") &&
      !product.hasOwnProperty("description") &&
      !product.hasOwnProperty("price") &&
      !product.hasOwnProperty("count")
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify("product data is invalid"),
      };
    }

    await ddb
      .putItem(
        {
          TableName: process.env.PRODUCTS_TABLE,
          Item: product,
        },
        function (err, data) {
          if (err) {
            return {
              statusCode: 500,
              body: JSON.stringify(err.message),
            };
          } else {
            console.log("Success", data);
          }
        }
      )
      .promise();

    await ddb
      .putItem(
        {
          TableName: process.env.STOCK_TABLE,
          Item: stock,
        },
        function (err, data) {
          if (err) {
            console.log("Error", err);
          } else {
            console.log("Success", data);
          }
        }
      )
      .promise();

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify("Successfully added:" + product.title.S),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err.message),
    };
  }
};
