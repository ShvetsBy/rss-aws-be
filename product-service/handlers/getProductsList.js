var AWS = require("aws-sdk");

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

var params = {
  TableName: process.env.TABLE_NAME,
};

async function getItems() {
  try {
    const data = await ddb.scan(params).promise();

    return data;
  } catch (err) {
    return JSON.stringify(err.message);
  }
}

export const getProductsList = async (event) => {
  try {
    const data = await getItems();
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
    return { err: "ept" };
  }
};
