// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
var uuid = require("uuid");
// Load credentials and set Region from JSON file
const credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
AWS.config.update({ region: "eu-west-1" });

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const getId = async () => {
  try {
    const results = await ddb
      .scan({
        TableName: "products",
      })
      .promise();
    results.Items.forEach((el) => {
      var params = {
        TableName: "stocks",
        Item: { product_id: { S: el.id.S }, count: { N: getCount() } },
      };

      post(params);
    });
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err.message),
    };
  }
};

function post(params) {
  ddb.putItem(params, function (err, data) {
    if (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err.message),
      };
    } else {
      console.log("Success", data);
    }
  });
}

const getCount = () => Math.floor(Math.random() * 11).toString();

getId();
