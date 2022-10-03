var AWS = require("aws-sdk");

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

async function getItem(itemId) {
  if (!ddb) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Connection Failed" }),
    };
  }

  try {
    var params = {
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": { S: itemId },
      },
    };

    const data = await ddb.query(params).promise();
    return data;
  } catch (err) {
    return JSON.stringify(err.message);
  }
}

export const getProductById = async (event) => {
  const { id } = event.pathParameters;

  try {
    const data = await getItem(id);
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
