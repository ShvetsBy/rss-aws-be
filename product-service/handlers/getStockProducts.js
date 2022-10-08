var AWS = require("aws-sdk");

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

var productParams = {
  TableName: process.env.TABLE_NAME,
};

var stockParams = {
  TableName: process.env.STOCK_TABLE,
};

async function getItems(params) {
  if (!ddb) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Connection Failed" }),
    };
  }
  try {
    const data = await ddb.scan(params).promise();

    return data;
  } catch (err) {
    return JSON.stringify(err.message);
  }
}

export const getStockProducts = async (event) => {
  try {
    const products = await getItems(productParams);
    const stock = await getItems(stockParams);
    const data = [...stock, products];
    console.log(data);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err.message),
    };
  }
};
