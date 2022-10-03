// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
var uuid = require("uuid");

// Load credentials and set Region
const credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
AWS.config.update({ region: "eu-west-1" });

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

var productTable = "products";

// Add the four results for spades
var params = {
  RequestItems: {
    products: [
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Keychron K4" },
            description: { S: "Normal profile wireless mechanical keyboard" },
            price: { N: "127" },
            img: { S: "keychron-k4" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "NuPhy Air 75" },
            description: { S: "Low profile wireless mechanical keyboard" },
            price: { N: "99" },
            img: { S: "nuphy-air75" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Case for NuPhy Air 75" },
            description: { S: "Case and mobile devices carrier" },
            price: { N: "20" },
            img: { S: "air75-case" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Case for Keychron K4" },
            description: { S: "Case for safe transportation" },
            price: { N: "30" },
            img: { S: "case-keychronk4" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Gateron Phantom Switch" },
            description: {
              S: "Premium smooth and tactile typing experience for Keychrone K4. Normal profile",
            },
            price: { N: "19" },
            img: { S: "full-profile-red" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Gateron CJ Switch" },
            description: {
              S: "Linear and smooth switch for Keychrone K4. Normal profile",
            },
            price: { N: "69" },
            img: { S: "full-profile-light-blue" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Gateron Yellow Ink V2" },
            description: {
              S: "Switches with a shorter travel distance of 3.5mm for Keychrone K4. Normal profile",
            },
            price: { N: "75" },
            img: { S: "full-profile-yellow" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Wood palm rest" },
            description: {
              S: "Perfect for Keychrone K4",
            },
            price: { N: "40" },
            img: { S: "KeychronK4-rest-wood" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Resin palm rest" },
            description: {
              S: "Ideal for NuPhy Air 75",
            },
            price: { N: "20" },
            img: { S: "nuphy-air75-rest" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Black PBT Keycaps" },
            description: {
              S: "For Keychrone K4",
            },
            price: { N: "45" },
            img: { S: "keychron-black" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Green PBT Keycaps" },
            description: {
              S: "For Keychrone K4",
            },
            price: { N: "50" },
            img: { S: "keychron-green-keycaps" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Lambda PBT Keycaps" },
            description: {
              S: "For Keychrone K4",
            },
            price: { N: "55" },
            img: { S: "keychron-lambda" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Mint PBT Keycaps" },
            description: {
              S: "For Keychrone K4",
            },
            price: { N: "45" },
            img: { S: "keychron-mint" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Gradient PBT Keycaps" },
            description: {
              S: "For Keychrone K4",
            },
            price: { N: "35" },
            img: { S: "keychron-warm-gradient-2" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: uuid.v4() },
            title: { S: "Purple PBT Keycaps" },
            description: {
              S: "For Keychrone K4",
            },
            price: { N: "50" },
            img: { S: "keychron-warm-gradient" },
          },
        },
      },
    ],
  },
};
post();

function post() {
  ddb.batchWriteItem(params, function (err, data) {
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
